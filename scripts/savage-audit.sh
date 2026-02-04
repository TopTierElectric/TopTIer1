#!/usr/bin/env bash
set -euo pipefail

# =========================
# Savage Audit Pipeline
# - Repo hygiene
# - Secrets scan
# - Dependency vuln scan
# - SAST scan
# - Build + basic performance/SEO/accessibility gates (if configured)
# - Image sanity + bloat report
# =========================

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

REPORT_DIR="${REPORT_DIR:-reports}"
mkdir -p "$REPORT_DIR"

RED="\033[0;31m"; GRN="\033[0;32m"; YLW="\033[0;33m"; BLU="\033[0;34m"; NC="\033[0m"
say()  { printf "%b\n" "$*"; }
ok()   { say "${GRN}✔${NC} $*"; }
warn() { say "${YLW}⚠${NC} $*"; }
die()  { say "${RED}✖${NC} $*"; exit 1; }

need_cmd() { command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"; }

# --- Basics
need_cmd git

say "${BLU}== SAVAGE AUDIT START ==${NC}"
say "Repo: $ROOT"
say "Branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
say "Commit: $(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
say

# --- Repo hygiene
say "${BLU}== Repo Hygiene ==${NC}"
git_status="$(git status --porcelain || true)"
if [[ -n "$git_status" ]]; then
  warn "Working tree not clean. Audit will still run, but your results may be noisy."
  printf "%s\n" "$git_status" | sed 's/^/  /' | tee "$REPORT_DIR/git-status.txt" >/dev/null
else
  ok "Working tree clean."
fi

# Guardrails: forbid committing secrets or huge binaries accidentally
say "Checking for suspicious files (keys, env, credentials)…"
{
  git ls-files -z | while IFS= read -r -d '' f; do
    case "$f" in
      *.pem|*.key|*.p12|*.pfx|*.jks|*.keystore|*id_rsa*|*id_dsa*|*.kdbx|*.ovpn|*.env|*.env.*)
        echo "SUSPICIOUS: $f"
        ;;
    esac
  done
} | tee "$REPORT_DIR/suspicious-files.txt" >/dev/null

if grep -q "SUSPICIOUS:" "$REPORT_DIR/suspicious-files.txt"; then
  warn "Suspicious files detected (see reports/suspicious-files.txt). Ensure these are not real secrets or are properly ignored."
else
  ok "No obvious secret file patterns tracked by git."
fi
say

# --- Inventory & bloat report
say "${BLU}== Repo Inventory & Bloat ==${NC}"
need_cmd python3

python3 - <<'PY' > "reports/repo-inventory.txt"
import os, pathlib, mimetypes, sys
root = pathlib.Path(".").resolve()
paths = []
for p in root.rglob("*"):
    if p.is_dir():
        continue
    # skip git internals + node_modules in inventory to keep signal high
    if ".git" in p.parts:
        continue
    if "node_modules" in p.parts:
        continue
    try:
        size = p.stat().st_size
    except Exception:
        continue
    rel = p.relative_to(root)
    mt = mimetypes.guess_type(str(p))[0] or ""
    paths.append((size, str(rel), mt))

paths.sort(reverse=True)
print("Top 80 largest tracked-ish files (excluding node_modules/.git):")
for size, rel, mt in paths[:80]:
    print(f"{size:>12}  {rel}  {mt}")
PY

ok "Wrote reports/repo-inventory.txt (largest files list)."

# Image bloat snapshot
python3 - <<'PY' > "reports/image-bloat.txt"
import os, pathlib
root = pathlib.Path(".").resolve()
exts = {".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"}
imgs=[]
for p in root.rglob("*"):
    if p.is_dir():
        continue
    if ".git" in p.parts or "node_modules" in p.parts:
        continue
    if p.suffix.lower() in exts:
        try:
            imgs.append((p.stat().st_size, str(p.relative_to(root))))
        except Exception:
            pass

imgs.sort(reverse=True)
total = sum(s for s, _ in imgs)
print(f"Image count: {len(imgs)}")
print(f"Total image bytes: {total}")
print("\nTop 60 largest images:")
for s, rel in imgs[:60]:
    print(f"{s:>12}  {rel}")
PY
ok "Wrote reports/image-bloat.txt."
say

# --- Tooling: optional but savage
# We support either native installs OR docker fallbacks for semgrep/gitleaks/trivy.
have_docker=0
if command -v docker >/dev/null 2>&1; then have_docker=1; fi

ci_mode="${SAVAGE_CI:-0}"

run_gitleaks() {
  say "${BLU}== Secrets Scan (gitleaks) ==${NC}"
  if command -v gitleaks >/dev/null 2>&1; then
    gitleaks detect --redact --report-format sarif --report-path "$REPORT_DIR/gitleaks.sarif" --no-banner || true
    ok "gitleaks completed (see reports/gitleaks.sarif)."
  elif [[ $have_docker -eq 1 ]]; then
    docker run --rm -v "$ROOT:/repo" -w /repo zricethezav/gitleaks:latest detect --redact --report-format sarif --report-path "$REPORT_DIR/gitleaks.sarif" --no-banner || true
    ok "gitleaks (docker) completed (see reports/gitleaks.sarif)."
  else
    warn "gitleaks not found and docker unavailable. Skipping secrets scan."
  fi
  # Fail hard if leaks are found (SARIF presence is not enough; gitleaks exits non-zero when leaks found,
  # but we used '|| true' to always finish. So we parse for results count best-effort.)
  if [[ -f "$REPORT_DIR/gitleaks.sarif" ]]; then
    need_cmd python3
    set +e
    python3 - <<'PY' "$REPORT_DIR/gitleaks.sarif"
import json, sys
path = sys.argv[1]
data = json.loads(open(path, "r", encoding="utf-8").read())
results = data.get("runs", [{}])[0].get("results", [])
if results:
    print(f"gitleaks findings: {len(results)}")
    sys.exit(1)
PY
    status=$?
    set -e
    if [[ $status -ne 0 ]]; then
      die "Secrets scan shows findings. Fix leaks BEFORE proceeding."
    fi
  fi
  say
}

run_semgrep() {
  say "${BLU}== SAST Scan (semgrep) ==${NC}"
  if command -v semgrep >/dev/null 2>&1; then
    semgrep scan --config p/owasp-top-ten --config p/javascript --config p/typescript --sarif -o "$REPORT_DIR/semgrep.sarif" || true
    ok "semgrep completed (see reports/semgrep.sarif)."
  elif [[ $have_docker -eq 1 ]]; then
    docker run --rm -v "$ROOT:/src" returntocorp/semgrep semgrep scan --config p/owasp-top-ten --config p/javascript --config p/typescript --sarif -o /src/"$REPORT_DIR/semgrep.sarif" || true
    ok "semgrep (docker) completed (see reports/semgrep.sarif)."
  else
    warn "semgrep not found and docker unavailable. Skipping SAST scan."
  fi
  say
}

run_trivy() {
  say "${BLU}== Supply Chain + Misconfig Scan (trivy) ==${NC}"
  if command -v trivy >/dev/null 2>&1; then
    trivy fs --security-checks vuln,secret,config --format sarif --output "$REPORT_DIR/trivy.sarif" . || true
    ok "trivy completed (see reports/trivy.sarif)."
  elif [[ $have_docker -eq 1 ]]; then
    docker run --rm -v "$ROOT:/src" aquasec/trivy:latest fs --security-checks vuln,secret,config --format sarif --output /src/"$REPORT_DIR/trivy.sarif" /src || true
    ok "trivy (docker) completed (see reports/trivy.sarif)."
  else
    warn "trivy not found and docker unavailable. Skipping supply chain scan."
  fi
  say
}

# --- Node project checks (if package.json exists)
detect_pm() {
  if [[ -f pnpm-lock.yaml ]]; then
    echo "pnpm"
  elif [[ -f yarn.lock ]]; then
    echo "yarn"
  else
    echo "npm"
  fi
}

has_pkg_script() {
  local name="$1"
  node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts['$name'] ? 0 : 1)" >/dev/null 2>&1
}

run_node_pipeline() {
  [[ -f package.json ]] || { warn "No package.json found. Skipping Node build/lint/test/perf gates."; return 0; }

  say "${BLU}== Node Toolchain ==${NC}"
  need_cmd node

  pm="$(detect_pm)"
  if ! command -v "$pm" >/dev/null 2>&1; then
    if [[ "$pm" == "pnpm" ]]; then die "pnpm-lock.yaml found but pnpm is not installed."; fi
    if [[ "$pm" == "yarn" ]]; then die "yarn.lock found but yarn is not installed."; fi
    # npm should exist if node exists, but still:
    need_cmd npm
  fi
  ok "Using package manager: $pm"

  # Install deps if requested or if node_modules missing
  if [[ ! -d node_modules ]]; then
    if [[ "${SAVAGE_INSTALL:-0}" == "1" || "$ci_mode" == "1" ]]; then
      say "Installing dependencies (SAVAGE_INSTALL=1 or SAVAGE_CI=1)…"
      if [[ "$pm" == "npm" ]]; then npm ci; else "$pm" install; fi
      ok "Dependencies installed."
    else
      die "node_modules missing. Run install first (or rerun with SAVAGE_INSTALL=1 or SAVAGE_CI=1)."
    fi
  fi
  say

  say "${BLU}== Dependency Vulnerability Scan ==${NC}"
  if [[ "$pm" == "npm" ]]; then
    if [[ ! -f package-lock.json ]]; then
      warn "package-lock.json missing. Run npm install --package-lock-only to enable npm audit gating."
    else
      npm audit --audit-level=high || die "npm audit failed at high/critical level. Fix vulnerabilities."
    fi
  elif [[ "$pm" == "pnpm" ]]; then
    if [[ ! -f pnpm-lock.yaml ]]; then
      warn "pnpm-lock.yaml missing. Run pnpm install to enable pnpm audit gating."
    else
      pnpm audit --audit-level high || die "pnpm audit failed at high/critical level. Fix vulnerabilities."
    fi
  else
    # yarn classic has limited audit; yarn berry uses npm registry plugin.
    yarn npm audit --severity high >/dev/null 2>&1 && ok "yarn npm audit passed." || warn "yarn audit unavailable or failed. Consider trivy/semgrep as source of truth."
  fi
  ok "Dependency audit gate passed (or warned)."
  say

  say "${BLU}== Lint / Typecheck / Tests (Zero Warnings Allowed) ==${NC}"

  if has_pkg_script lint; then
    "$pm" run lint
    ok "lint passed."
  else
    warn "No lint script found. Add one (eslint) for real enforcement."
  fi

  if has_pkg_script typecheck; then
    "$pm" run typecheck
    ok "typecheck passed."
  else
    warn "No typecheck script found. Add one (tsc) for real enforcement."
  fi

  if has_pkg_script test; then
    "$pm" run test
    ok "tests passed."
  else
    warn "No test script found. Add unit tests for real enforcement."
  fi
  say

  say "${BLU}== Build Gate ==${NC}"
  if has_pkg_script build; then
    "$pm" run build
    ok "build passed."
  else
    warn "No build script found."
  fi
  say

  # Lighthouse gate is optional because it requires a preview server and a URL.
  # You can set:
  #   SAVAGE_PREVIEW_CMD="npm run start -- --port 3000"
  #   SAVAGE_PREVIEW_URL="http://localhost:3000"
  #   SAVAGE_LH_MIN_PERF=95 SAVAGE_LH_MIN_SEO=95 SAVAGE_LH_MIN_A11Y=95 SAVAGE_LH_MIN_BP=95
  if [[ -n "${SAVAGE_PREVIEW_CMD:-}" && -n "${SAVAGE_PREVIEW_URL:-}" ]]; then
    say "${BLU}== Lighthouse Gate (Performance/SEO/A11y/Best Practices) ==${NC}"
    need_cmd npx
    min_perf="${SAVAGE_LH_MIN_PERF:-95}"
    min_seo="${SAVAGE_LH_MIN_SEO:-95}"
    min_a11y="${SAVAGE_LH_MIN_A11Y:-95}"
    min_bp="${SAVAGE_LH_MIN_BP:-95}"

    # Start preview server
    set +e
    bash -lc "$SAVAGE_PREVIEW_CMD" >/dev/null 2>&1 &
    srv_pid=$!
    set -e

    # Wait briefly for server (best-effort)
    for i in {1..20}; do
      if command -v curl >/dev/null 2>&1; then
        if curl -fsS "$SAVAGE_PREVIEW_URL" >/dev/null 2>&1; then
          break
        fi
      else
        sleep 1
      fi
      sleep 1
    done

    # Run Lighthouse (headless)
    npx -y lighthouse "$SAVAGE_PREVIEW_URL" \
      --output json --output html \
      --output-path "$REPORT_DIR/lighthouse" \
      --chrome-flags="--headless=new --no-sandbox" >/dev/null

    # Kill server
    kill "$srv_pid" >/dev/null 2>&1 || true

    # Parse scores
    python3 - <<PY
import json, sys, pathlib
p = pathlib.Path("$REPORT_DIR/lighthouse.report.json")
if not p.exists():
    # lighthouse writes as lighthouse.report.json by default when output-path is a base name
    # try to locate a json report
    j = list(pathlib.Path("$REPORT_DIR").glob("lighthouse*.report.json")) + list(pathlib.Path("$REPORT_DIR").glob("lighthouse*.json"))
    if j: p = j[0]
if not p.exists():
    print("No lighthouse json report found.")
    sys.exit(2)
data=json.loads(p.read_text())
cats=data.get("categories", {})

def score(name):
    s=cats.get(name, {}).get("score", 0)
    return int(round((s or 0) * 100))

perf=score("performance")
seo=score("seo")
a11y=score("accessibility")
bp=score("best-practices")
print(f"Performance: {perf}")
print(f"SEO: {seo}")
print(f"Accessibility: {a11y}")
print(f"Best Practices: {bp}")
mins={"performance":$min_perf, "seo":$min_seo, "accessibility":$min_a11y, "best-practices":$min_bp}
vals={"performance":perf, "seo":seo, "accessibility":a11y, "best-practices":bp}
bad=[k for k in mins if vals[k] < mins[k]]
if bad:
    print("FAIL: Below minimums:", ", ".join(f"{k} {vals[k]}<{mins[k]}" for k in bad))
    sys.exit(1)
print("PASS: Lighthouse minimums satisfied.")
PY
    ok "Lighthouse gate passed."
    ok "See reports/ for HTML/JSON."
    say
  else
    warn "Lighthouse gate skipped (set SAVAGE_PREVIEW_CMD + SAVAGE_PREVIEW_URL to enable)."
    warn "Example:"
    warn "  SAVAGE_PREVIEW_CMD=\"npm run build && npm run start -- --port 3000\" SAVAGE_PREVIEW_URL=\"http://localhost:3000\" ./scripts/savage-audit.sh"
    say
  fi
}

# Run savage scans
run_gitleaks
run_semgrep
run_trivy
run_node_pipeline

say "${GRN}== SAVAGE AUDIT COMPLETE ==${NC}"
say "Artifacts in: $REPORT_DIR"

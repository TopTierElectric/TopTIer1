#!/usr/bin/env bash
set -uo pipefail

# =========================
# SAVAGE AUDIT (single repo/worktree)
# Parallelizes independent security scans, then verifies and writes meta.json.
# =========================

# ---- Config
SAVAGE_STRICT="${SAVAGE_STRICT:-1}"      # 1 = fail if gates fail, 0 = always exit 0 (still writes meta)
SAVAGE_MODE="${SAVAGE_MODE:-full}"       # full|fast
SAVAGE_NODE="${SAVAGE_NODE:-1}"          # 1 = run node gates when package.json exists
SAVAGE_LH="${SAVAGE_LH:-0}"              # 1 = run lighthouse if preview vars set

# Default install behavior depends on mode (unless user explicitly set SAVAGE_INSTALL)
if [[ -z "${SAVAGE_INSTALL+x}" ]]; then
  if [[ "$SAVAGE_MODE" == "full" ]]; then SAVAGE_INSTALL=1; else SAVAGE_INSTALL=0; fi
fi

REPORT_DIR="${REPORT_DIR:-reports}"

# ---- Colors / log helpers
RED="\033[0;31m"; GRN="\033[0;32m"; YLW="\033[0;33m"; BLU="\033[0;34m"; NC="\033[0m"
say()  { printf "%b\n" "$*"; }
ok()   { say "${GRN}✔${NC} $*"; }
warn() { say "${YLW}⚠${NC} $*"; }
bad()  { say "${RED}✖${NC} $*"; }

# ---- Hard requirements
command -v git >/dev/null 2>&1 || { echo "git is required" >&2; exit 2; }
command -v python3 >/dev/null 2>&1 || { echo "python3 is required" >&2; exit 2; }

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

mkdir -p "$REPORT_DIR"

# absolute report dir (for docker mounts + stable paths)
if command -v realpath >/dev/null 2>&1; then
  REPORT_DIR_ABS="$(realpath "$REPORT_DIR")"
else
  REPORT_DIR_ABS="$(python3 -c "import os,sys; print(os.path.abspath(sys.argv[1]))" "$REPORT_DIR")"
fi
mkdir -p "$REPORT_DIR_ABS"

HAVE_DOCKER=0
command -v docker >/dev/null 2>&1 && HAVE_DOCKER=1

# ---- Meta
START_ISO="$(date -Iseconds 2>/dev/null || date)"
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo detached)"
COMMIT_SHORT="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
COMMIT_SHA="$(git rev-parse HEAD 2>/dev/null || echo unknown)"

FAIL=0

# Step statuses (filled in later)
GITLEAKS_RC=""; GITLEAKS_STATUS="skipped"
SEMGREP_RC="";  SEMGREP_STATUS="skipped"
TRIVY_RC="";    TRIVY_STATUS="skipped"

NODE_PM=""; NODE_VERSION=""
NODE_INSTALL_RC=""; NODE_INSTALL_STATUS="skipped"
NODE_AUDIT_RC="";   NODE_AUDIT_STATUS="skipped"
LINT_RC="";         LINT_STATUS="skipped"
TYPECHECK_RC="";    TYPECHECK_STATUS="skipped"
TEST_RC="";         TEST_STATUS="skipped"
BUILD_RC="";        BUILD_STATUS="skipped"

LH_RC=""; LH_STATUS="skipped"
LH_PERF=""; LH_SEO=""; LH_A11Y=""; LH_BP=""

mark_fail() { FAIL=1; }

# ---- Repo hygiene + inventory
say "${BLU}== SAVAGE AUDIT ==${NC}  branch=${BRANCH}  commit=${COMMIT_SHORT}"
say "Report dir: ${REPORT_DIR_ABS}"
say

say "${BLU}== Repo Hygiene ==${NC}"
git status --porcelain > "${REPORT_DIR_ABS}/git-status.txt" 2>/dev/null || true
if [[ -s "${REPORT_DIR_ABS}/git-status.txt" ]]; then
  warn "Working tree not clean (see git-status.txt). Auditing anyway."
else
  ok "Working tree clean."
fi

# Suspicious tracked files
{
  echo "Tracked suspicious filename patterns:"
  git ls-files -z 2>/dev/null | while IFS= read -r -d "" f; do
    case "$f" in
      *.pem|*.key|*.p12|*.pfx|*.jks|*.keystore|*id_rsa*|*id_dsa*|*.kdbx|*.ovpn|*.env|*.env.*)
        echo "SUSPICIOUS: $f"
        ;;
    esac
  done
} > "${REPORT_DIR_ABS}/suspicious-files.txt" 2>/dev/null || true

if grep -q "SUSPICIOUS:" "${REPORT_DIR_ABS}/suspicious-files.txt" 2>/dev/null; then
  warn "Suspicious tracked files detected (suspicious-files.txt)."
fi
say

say "${BLU}== Repo Inventory & Asset Bloat ==${NC}"
python3 - <<'PY' > "${REPORT_DIR_ABS}/repo-inventory.txt"
import pathlib, mimetypes
root = pathlib.Path(".").resolve()
paths=[]
for p in root.rglob("*"):
    if p.is_dir(): 
        continue
    if ".git" in p.parts or "node_modules" in p.parts:
        continue
    try:
        size=p.stat().st_size
    except Exception:
        continue
    rel=str(p.relative_to(root))
    mt=mimetypes.guess_type(rel)[0] or ""
    paths.append((size, rel, mt))
paths.sort(reverse=True)
print("Top 100 largest files (excluding node_modules/.git):")
for size, rel, mt in paths[:100]:
    print(f"{size:>12}  {rel}  {mt}")
PY
python3 - <<'PY' > "${REPORT_DIR_ABS}/image-bloat.txt"
import pathlib
root = pathlib.Path(".").resolve()
exts={".png",".jpg",".jpeg",".webp",".avif",".gif",".svg"}
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
total=sum(s for s,_ in imgs)
print(f"Image count: {len(imgs)}")
print(f"Total image bytes: {total}")
print("\nTop 80 largest images:")
for s, rel in imgs[:80]:
    print(f"{s:>12}  {rel}")
PY

# Optional EXIF sweep if exiftool exists (privacy + metadata leakage)
if command -v exiftool >/dev/null 2>&1; then
  exiftool -r -q -q -json -GPSLatitude -GPSLongitude -Make -Model -Software -CreatorTool -DateTimeOriginal \
    . > "${REPORT_DIR_ABS}/image-exif.json" 2>/dev/null || true
fi
ok "Wrote repo-inventory.txt + image-bloat.txt (and image-exif.json if exiftool exists)."
say

# =========================
# Security scans (parallel)
# =========================
say "${BLU}== Security Scans (parallel) ==${NC}"

TMP_DIR="$(mktemp -d 2>/dev/null || mktemp -d -t savage)"
cleanup_tmp() { rm -rf "$TMP_DIR" >/dev/null 2>&1 || true; }
trap cleanup_tmp EXIT

# gitleaks
(
  rc=0
  if command -v gitleaks >/dev/null 2>&1; then
    gitleaks detect --redact --report-format sarif --report-path "${REPORT_DIR_ABS}/gitleaks.sarif" --no-banner \
      > "${REPORT_DIR_ABS}/gitleaks.log" 2>&1
    rc=$?
  elif [[ $HAVE_DOCKER -eq 1 ]]; then
    docker run --rm -v "${ROOT}:/repo" -v "${REPORT_DIR_ABS}:/out" -w /repo zricethezav/gitleaks:latest \
      detect --redact --report-format sarif --report-path /out/gitleaks.sarif --no-banner \
      > "${REPORT_DIR_ABS}/gitleaks.log" 2>&1
    rc=$?
  else
    rc=127
    echo "gitleaks not installed and docker unavailable" > "${REPORT_DIR_ABS}/gitleaks.log"
  fi
  echo "$rc" > "${TMP_DIR}/gitleaks.rc"
) &

# semgrep
(
  rc=0
  if command -v semgrep >/dev/null 2>&1; then
    semgrep scan --config p/owasp-top-ten --config p/javascript --config p/typescript \
      --sarif -o "${REPORT_DIR_ABS}/semgrep.sarif" \
      > "${REPORT_DIR_ABS}/semgrep.log" 2>&1
    rc=$?
  elif [[ $HAVE_DOCKER -eq 1 ]]; then
    docker run --rm -v "${ROOT}:/repo" -v "${REPORT_DIR_ABS}:/out" -w /repo returntocorp/semgrep \
      semgrep scan --config p/owasp-top-ten --config p/javascript --config p/typescript \
      --sarif -o /out/semgrep.sarif \
      > "${REPORT_DIR_ABS}/semgrep.log" 2>&1
    rc=$?
  else
    rc=127
    echo "semgrep not installed and docker unavailable" > "${REPORT_DIR_ABS}/semgrep.log"
  fi
  echo "$rc" > "${TMP_DIR}/semgrep.rc"
) &

# trivy
(
  rc=0
  if command -v trivy >/dev/null 2>&1; then
    trivy fs --security-checks vuln,secret,config \
      --severity HIGH,CRITICAL --exit-code 1 \
      --format sarif --output "${REPORT_DIR_ABS}/trivy.sarif" . \
      > "${REPORT_DIR_ABS}/trivy.log" 2>&1
    rc=$?
  elif [[ $HAVE_DOCKER -eq 1 ]]; then
    docker run --rm -v "${ROOT}:/repo" -v "${REPORT_DIR_ABS}:/out" aquasec/trivy:latest \
      fs --security-checks vuln,secret,config --severity HIGH,CRITICAL --exit-code 1 \
      --format sarif --output /out/trivy.sarif /repo \
      > "${REPORT_DIR_ABS}/trivy.log" 2>&1
    rc=$?
  else
    rc=127
    echo "trivy not installed and docker unavailable" > "${REPORT_DIR_ABS}/trivy.log"
  fi
  echo "$rc" > "${TMP_DIR}/trivy.rc"
) &

wait || true

GITLEAKS_RC="$(cat "${TMP_DIR}/gitleaks.rc" 2>/dev/null || echo 127)"
SEMGREP_RC="$(cat "${TMP_DIR}/semgrep.rc" 2>/dev/null || echo 127)"
TRIVY_RC="$(cat "${TMP_DIR}/trivy.rc" 2>/dev/null || echo 127)"

# Evaluate results (verification)
if [[ "$GITLEAKS_RC" == "0" ]]; then GITLEAKS_STATUS="pass"; ok "gitleaks: pass"; \
elif [[ "$GITLEAKS_RC" == "127" ]]; then GITLEAKS_STATUS="missing"; bad "gitleaks: missing"; mark_fail;
else GITLEAKS_STATUS="fail"; bad "gitleaks: FAIL (rc=$GITLEAKS_RC) — see gitleaks.log"; mark_fail; fi

if [[ "$SEMGREP_RC" == "0" ]]; then SEMGREP_STATUS="pass"; ok "semgrep: pass";
elif [[ "$SEMGREP_RC" == "127" ]]; then SEMGREP_STATUS="missing"; bad "semgrep: missing"; mark_fail;
else SEMGREP_STATUS="fail"; bad "semgrep: FAIL (rc=$SEMGREP_RC) — see semgrep.log"; mark_fail; fi

if [[ "$TRIVY_RC" == "0" ]]; then TRIVY_STATUS="pass"; ok "trivy: pass";
elif [[ "$TRIVY_RC" == "127" ]]; then TRIVY_STATUS="missing"; bad "trivy: missing"; mark_fail;
else TRIVY_STATUS="fail"; bad "trivy: FAIL (rc=$TRIVY_RC) — see trivy.log"; mark_fail; fi

say

# =========================
# Node gates (optional)
# =========================
if [[ "$SAVAGE_MODE" == "fast" ]]; then
  warn "SAVAGE_MODE=fast: skipping Node quality gates."
else
  if [[ -f package.json && "$SAVAGE_NODE" == "1" ]]; then
    say "${BLU}== Node Gates ==${NC}"
    if ! command -v node >/dev/null 2>&1; then
      bad "node missing but package.json exists."
      NODE_VERSION="missing"
      mark_fail
    else
      NODE_VERSION="$(node -v 2>/dev/null || echo unknown)"
      # detect package manager
      NODE_PM="npm"
      if [[ -f pnpm-lock.yaml ]]; then NODE_PM="pnpm"; fi
      if [[ -f yarn.lock ]]; then NODE_PM="yarn"; fi

      # ensure PM exists
      if ! command -v "$NODE_PM" >/dev/null 2>&1; then
        bad "Package manager '$NODE_PM' missing."
        mark_fail
      else
        # Install deps if needed
        if [[ ! -d node_modules ]]; then
          if [[ "${SAVAGE_INSTALL}" == "1" ]]; then
            say "Installing deps ($NODE_PM)…"
            if [[ "$NODE_PM" == "npm" ]]; then
              npm ci --no-audit --no-fund > "${REPORT_DIR_ABS}/install.log" 2>&1; NODE_INSTALL_RC=$?
            elif [[ "$NODE_PM" == "pnpm" ]]; then
              pnpm install --frozen-lockfile > "${REPORT_DIR_ABS}/install.log" 2>&1; NODE_INSTALL_RC=$?
            else
              (yarn install --immutable || yarn install --frozen-lockfile) > "${REPORT_DIR_ABS}/install.log" 2>&1; NODE_INSTALL_RC=$?
            fi
            if [[ "${NODE_INSTALL_RC}" == "0" ]]; then NODE_INSTALL_STATUS="pass"; ok "install: pass"
            else NODE_INSTALL_STATUS="fail"; bad "install: FAIL (rc=$NODE_INSTALL_RC) — see install.log"; mark_fail
            fi
          else
            NODE_INSTALL_STATUS="skipped"
            warn "node_modules missing; set SAVAGE_INSTALL=1 for full gates."
            mark_fail
          fi
        else
          NODE_INSTALL_STATUS="pass"
          NODE_INSTALL_RC="0"
        fi

        # Dependency audit
        if [[ "$NODE_PM" == "npm" ]]; then
          npm audit --audit-level=high --json > "${REPORT_DIR_ABS}/npm-audit.json" 2>/dev/null; NODE_AUDIT_RC=$?
        elif [[ "$NODE_PM" == "pnpm" ]]; then
          pnpm audit --audit-level high --json > "${REPORT_DIR_ABS}/pnpm-audit.json" 2>/dev/null; NODE_AUDIT_RC=$?
        else
          # best-effort
          yarn npm audit --severity high --json > "${REPORT_DIR_ABS}/yarn-audit.json" 2>/dev/null; NODE_AUDIT_RC=$?
        fi
        if [[ "${NODE_AUDIT_RC}" == "0" ]]; then NODE_AUDIT_STATUS="pass"; ok "dep audit: pass"
        else NODE_AUDIT_STATUS="fail"; bad "dep audit: FAIL (rc=$NODE_AUDIT_RC)"; mark_fail
        fi

        # Helper: does package.json have a script?
        has_script() {
          local s="$1"
          node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts['$s'] ? 0 : 1)" >/dev/null 2>&1
        }

        # Lint / typecheck / test / build (best effort; missing scripts = skipped)
        if has_script lint; then "$NODE_PM" run lint > "${REPORT_DIR_ABS}/lint.log" 2>&1; LINT_RC=$?
          if [[ "$LINT_RC" == "0" ]]; then LINT_STATUS="pass"; ok "lint: pass"
          else LINT_STATUS="fail"; bad "lint: FAIL — see lint.log"; mark_fail; fi
        fi

        if has_script typecheck; then "$NODE_PM" run typecheck > "${REPORT_DIR_ABS}/typecheck.log" 2>&1; TYPECHECK_RC=$?
          if [[ "$TYPECHECK_RC" == "0" ]]; then TYPECHECK_STATUS="pass"; ok "typecheck: pass"
          else TYPECHECK_STATUS="fail"; bad "typecheck: FAIL — see typecheck.log"; mark_fail; fi
        fi

        if has_script test; then "$NODE_PM" run test > "${REPORT_DIR_ABS}/test.log" 2>&1; TEST_RC=$?
          if [[ "$TEST_RC" == "0" ]]; then TEST_STATUS="pass"; ok "test: pass"
          else TEST_STATUS="fail"; bad "test: FAIL — see test.log"; mark_fail; fi
        fi

        if has_script build; then "$NODE_PM" run build > "${REPORT_DIR_ABS}/build.log" 2>&1; BUILD_RC=$?
          if [[ "$BUILD_RC" == "0" ]]; then BUILD_STATUS="pass"; ok "build: pass"
          else BUILD_STATUS="fail"; bad "build: FAIL — see build.log"; mark_fail; fi
        fi

        # Lighthouse optional
        if [[ "${SAVAGE_LH}" == "1" ]]; then
          if command -v npx >/dev/null 2>&1 && [[ -n "${SAVAGE_PREVIEW_CMD:-}" && -n "${SAVAGE_PREVIEW_URL:-}" ]]; then
            say "${BLU}== Lighthouse ==${NC}"
            bash -lc "${SAVAGE_PREVIEW_CMD}" > "${REPORT_DIR_ABS}/preview.log" 2>&1 &
            SRV_PID=$!
            sleep "${SAVAGE_PREVIEW_WAIT:-3}"

            npx -y lighthouse "${SAVAGE_PREVIEW_URL}" \
              --output json --output html \
              --output-path "${REPORT_DIR_ABS}/lighthouse" \
              --chrome-flags="--headless=new --no-sandbox" \
              > "${REPORT_DIR_ABS}/lighthouse.log" 2>&1
            LH_RC=$?

            kill "${SRV_PID}" >/dev/null 2>&1 || true

            # Parse scores (best effort)
            python3 - <<PY 2>/dev/null || true
import json, pathlib, sys
p = pathlib.Path(r"${REPORT_DIR_ABS}")
cand = list(p.glob("lighthouse*.report.json")) + list(p.glob("lighthouse*.json"))
j = cand[0] if cand else None
if not j: sys.exit(0)
data=json.loads(j.read_text())
cats=data.get("categories",{})
def score(k):
    s=cats.get(k,{}).get("score",0) or 0
    return int(round(s*100))
perf=score("performance"); seo=score("seo"); a11y=score("accessibility"); bp=score("best-practices")
out = pathlib.Path(r"${REPORT_DIR_ABS}")/"lighthouse-scores.txt"
out.write_text(f"performance={perf}\nseo={seo}\na11y={a11y}\nbest_practices={bp}\n")
PY

            if [[ "${LH_RC}" == "0" ]]; then LH_STATUS="pass"; ok "lighthouse: pass"
            else LH_STATUS="fail"; bad "lighthouse: FAIL — see lighthouse.log"; mark_fail; fi

            if [[ -f "${REPORT_DIR_ABS}/lighthouse-scores.txt" ]]; then
              LH_PERF="$(grep -E "^performance=" "${REPORT_DIR_ABS}/lighthouse-scores.txt" | cut -d= -f2 || true)"
              LH_SEO="$(grep -E "^seo=" "${REPORT_DIR_ABS}/lighthouse-scores.txt" | cut -d= -f2 || true)"
              LH_A11Y="$(grep -E "^a11y=" "${REPORT_DIR_ABS}/lighthouse-scores.txt" | cut -d= -f2 || true)"
              LH_BP="$(grep -E "^best_practices=" "${REPORT_DIR_ABS}/lighthouse-scores.txt" | cut -d= -f2 || true)"
            fi

            # Enforce minimums if provided
            MIN_PERF="${SAVAGE_LH_MIN_PERF:-95}"
            MIN_SEO="${SAVAGE_LH_MIN_SEO:-95}"
            MIN_A11Y="${SAVAGE_LH_MIN_A11Y:-95}"
            MIN_BP="${SAVAGE_LH_MIN_BP:-95}"

            if [[ -n "${LH_PERF}" && -n "${LH_SEO}" && -n "${LH_A11Y}" && -n "${LH_BP}" ]]; then
              if (( LH_PERF < MIN_PERF || LH_SEO < MIN_SEO || LH_A11Y < MIN_A11Y || LH_BP < MIN_BP )); then
                bad "Lighthouse below minimums: perf=${LH_PERF}/${MIN_PERF}, seo=${LH_SEO}/${MIN_SEO}, a11y=${LH_A11Y}/${MIN_A11Y}, bp=${LH_BP}/${MIN_BP}"
                mark_fail
              fi
            fi
          else
            warn "Lighthouse skipped (need SAVAGE_LH=1, npx, SAVAGE_PREVIEW_CMD, SAVAGE_PREVIEW_URL)."
          fi
        fi
      fi
    fi
    say
  fi
fi

# =========================
# Final verification + meta
# =========================
END_ISO="$(date -Iseconds 2>/dev/null || date)"

FINAL_RC=0
if [[ "${SAVAGE_STRICT}" == "1" ]]; then
  [[ "$FAIL" == "1" ]] && FINAL_RC=1
else
  FINAL_RC=0
fi

python3 - <<PY
import json, os
data = {
  "start_iso": r"${START_ISO}",
  "end_iso": r"${END_ISO}",
  "repo_root": r"${ROOT}",
  "report_dir": r"${REPORT_DIR_ABS}",
  "git": {"branch": r"${BRANCH}", "commit_short": r"${COMMIT_SHORT}", "commit_sha": r"${COMMIT_SHA}"},
  "config": {
    "savage_strict": int(r"${SAVAGE_STRICT}"),
    "savage_mode": r"${SAVAGE_MODE}",
    "savage_node": int(r"${SAVAGE_NODE}"),
    "savage_install": int(r"${SAVAGE_INSTALL}"),
    "savage_lh": int(r"${SAVAGE_LH}"),
  },
  "results": {
    "gitleaks": {"status": r"${GITLEAKS_STATUS}", "rc": r"${GITLEAKS_RC}"},
    "semgrep":  {"status": r"${SEMGREP_STATUS}",  "rc": r"${SEMGREP_RC}"},
    "trivy":    {"status": r"${TRIVY_STATUS}",    "rc": r"${TRIVY_RC}"},
    "node": {
      "pm": r"${NODE_PM}",
      "node_version": r"${NODE_VERSION}",
      "install":   {"status": r"${NODE_INSTALL_STATUS}", "rc": r"${NODE_INSTALL_RC}"},
      "dep_audit": {"status": r"${NODE_AUDIT_STATUS}",   "rc": r"${NODE_AUDIT_RC}"},
      "lint":      {"status": r"${LINT_STATUS}",         "rc": r"${LINT_RC}"},
      "typecheck": {"status": r"${TYPECHECK_STATUS}",    "rc": r"${TYPECHECK_RC}"},
      "test":      {"status": r"${TEST_STATUS}",         "rc": r"${TEST_RC}"},
      "build":     {"status": r"${BUILD_STATUS}",        "rc": r"${BUILD_RC}"},
    },
    "lighthouse": {
      "status": r"${LH_STATUS}",
      "rc": r"${LH_RC}",
      "scores": {"performance": r"${LH_PERF}", "seo": r"${LH_SEO}", "a11y": r"${LH_A11Y}", "best_practices": r"${LH_BP}"}
    }
  },
  "final_exit_code": int(r"${FINAL_RC}")
}
path = os.path.join(r"${REPORT_DIR_ABS}", "meta.json")
with open(path, "w") as f:
  json.dump(data, f, indent=2)
print("Wrote meta:", path)
PY

if [[ "${FINAL_RC}" == "0" ]]; then
  ok "Audit PASS"
else
  bad "Audit FAIL (see ${REPORT_DIR_ABS})"
fi

exit "${FINAL_RC}"

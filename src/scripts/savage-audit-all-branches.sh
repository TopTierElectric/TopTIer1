#!/usr/bin/env bash
set -uo pipefail

# =========================
# SAVAGE AUDIT ALL BRANCHES (parallel + verified)
# - Creates a detached worktree per branch commit (sequential, safe)
# - Runs audits in parallel (configurable concurrency)
# - Verifies by producing reports/branches/summary.(csv|md)
# - Removes worktrees (unless KEEP_WORKTREES=1)
# =========================

command -v git >/dev/null 2>&1 || { echo "git required" >&2; exit 2; }
command -v python3 >/dev/null 2>&1 || { echo "python3 required" >&2; exit 2; }

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

# Config
SAVAGE_JOBS="${SAVAGE_JOBS:-4}"                # parallel audits
INCLUDE_REMOTES="${INCLUDE_REMOTES:-0}"        # 1 = include origin/*
FETCH_ALL="${FETCH_ALL:-0}"                    # 1 = git fetch --all --prune
KEEP_WORKTREES="${KEEP_WORKTREES:-0}"          # 1 = keep temp worktrees

SAVAGE_MODE="${SAVAGE_MODE:-full}"
SAVAGE_STRICT="${SAVAGE_STRICT:-1}"

# Select base branch for diffs
if [[ -z "${SAVAGE_BASE_BRANCH:-}" ]]; then
  if git show-ref --verify --quiet refs/heads/main; then SAVAGE_BASE_BRANCH="main"
  elif git show-ref --verify --quiet refs/heads/master; then SAVAGE_BASE_BRANCH="master"
  else SAVAGE_BASE_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"
  fi
fi
BASE="${SAVAGE_BASE_BRANCH}"

mkdir -p reports/branches
LIST="reports/branches/branch-list.txt"
MAP="reports/branches/worktree-map.tsv"

if [[ "${FETCH_ALL}" == "1" ]]; then
  git fetch --all --prune >/dev/null 2>&1 || true
fi

# Build branch list
: > "$LIST"
git for-each-ref --format="%(refname:short)" refs/heads >> "$LIST"

if [[ "${INCLUDE_REMOTES}" == "1" ]]; then
  git for-each-ref --format="%(refname:short)" refs/remotes/origin | grep -v "^origin/HEAD$" >> "$LIST" || true
fi

# Deduplicate
sort -u "$LIST" -o "$LIST"

# Temp worktree root
TMP_ROOT="$(mktemp -d 2>/dev/null || mktemp -d -t savage-wt)"
cleanup_all() {
  # remove worktrees sequentially to avoid git metadata contention
  if [[ "${KEEP_WORKTREES}" != "1" && -f "$MAP" ]]; then
    while IFS=$'\t' read -r safe ref commit wt report; do
      git worktree remove --force "$wt" >/dev/null 2>&1 || true
      rm -rf "$wt" >/dev/null 2>&1 || true
    done < "$MAP"
    rm -rf "$TMP_ROOT" >/dev/null 2>&1 || true
  else
    echo "Keeping worktrees at: $TMP_ROOT"
  fi
}
trap cleanup_all EXIT

# Create worktrees sequentially (safe)
: > "$MAP"
while IFS= read -r ref; do
  [[ -z "$ref" ]] && continue
  commit="$(git rev-parse "$ref" 2>/dev/null || true)"
  [[ -z "$commit" ]] && continue
  short="$(git rev-parse --short "$commit" 2>/dev/null || echo "unknown")"

  safe="$(python3 - <<PY
import re,sys
s=sys.argv[1]
s=re.sub(r"[^A-Za-z0-9._-]+","_",s)
print(s[:120] if s else "branch")
PY
"$ref")"
  safe="${safe}__${short}"

  wt="${TMP_ROOT}/${safe}"
  report="${ROOT}/reports/branches/${safe}"
  mkdir -p "$report"

  # Add detached worktree at the branch tip commit
  git worktree add --detach "$wt" "$commit" >/dev/null 2>&1 || true

  printf "%s\t%s\t%s\t%s\t%s\n" "$safe" "$ref" "$commit" "$wt" "$report" >> "$MAP"
done < "$LIST"

# Parallel throttle (portable — works on bash 3.2+)
throttle() {
  while true; do
    local n
    n="$(jobs -pr 2>/dev/null | wc -l | tr -d " ")"
    [[ "$n" -lt "$SAVAGE_JOBS" ]] && break
    sleep 0.2
  done
}

audit_one() {
  local safe="$1" ref="$2" commit="$3" wt="$4" report="$5"

  mkdir -p "$report"
  echo "$ref" > "$report/ref.txt"
  echo "$commit" > "$report/commit.txt"
  echo "$wt" > "$report/worktree.txt"

  # Diff against base (verification of branch delta)
  if [[ -n "$BASE" && "$ref" != "$BASE" ]]; then
    git -C "$ROOT" diff --name-only "$BASE"... "$ref" > "$report/diff-name-only.txt" 2>/dev/null || true
    git -C "$ROOT" diff --stat "$BASE"... "$ref" > "$report/diff-stat.txt" 2>/dev/null || true
  fi

  # Run audit in that worktree; write per-branch log
  (
    cd "$wt" 2>/dev/null || exit 1
    REPORT_DIR="$report" \
    SAVAGE_MODE="$SAVAGE_MODE" \
    SAVAGE_STRICT="$SAVAGE_STRICT" \
    SAVAGE_LH="${SAVAGE_LH:-0}" \
    SAVAGE_INSTALL="${SAVAGE_INSTALL:-}" \
    SAVAGE_PREVIEW_CMD="${SAVAGE_PREVIEW_CMD:-}" \
    SAVAGE_PREVIEW_URL="${SAVAGE_PREVIEW_URL:-}" \
    SAVAGE_LH_MIN_PERF="${SAVAGE_LH_MIN_PERF:-95}" \
    SAVAGE_LH_MIN_SEO="${SAVAGE_LH_MIN_SEO:-95}" \
    SAVAGE_LH_MIN_A11Y="${SAVAGE_LH_MIN_A11Y:-95}" \
    SAVAGE_LH_MIN_BP="${SAVAGE_LH_MIN_BP:-95}" \
    bash "$ROOT/scripts/savage-audit.sh"
  ) > "$report/audit.log" 2>&1

  echo "$?" > "$report/exit-code.txt"
}

echo "Auditing branches in parallel (jobs=${SAVAGE_JOBS})…"
echo "Base branch for diffs: ${BASE}"
echo "Reports: ${ROOT}/reports/branches/"
echo

# Run audits in parallel
while IFS=$'\t' read -r safe ref commit wt report; do
  [[ -z "$safe" ]] && continue
  throttle
  audit_one "$safe" "$ref" "$commit" "$wt" "$report" &
done < "$MAP"

wait || true

# Verify: compile summary
python3 - <<PY
import os, glob, json, csv

root = r"${ROOT}"
base = r"${BASE}"
branches_dir = os.path.join(root, "reports", "branches")

metas = glob.glob(os.path.join(branches_dir, "*", "meta.json"))
rows=[]
fail=[]
for mp in sorted(metas):
    try:
        data=json.load(open(mp,"r"))
    except Exception:
        fail.append((mp,"meta_parse_fail"))
        continue
    b = data.get("git",{}).get("branch","")
    # We stored detached worktrees; use ref.txt as canonical ref
    ref_txt = os.path.join(os.path.dirname(mp), "ref.txt")
    ref = open(ref_txt).read().strip() if os.path.exists(ref_txt) else b
    exit_code = data.get("final_exit_code", 999)
    res = data.get("results",{})
    gl = res.get("gitleaks",{})
    sg = res.get("semgrep",{})
    tv = res.get("trivy",{})
    node = res.get("node",{})
    lh = res.get("lighthouse",{})
    rows.append({
        "ref": ref,
        "commit_short": data.get("git",{}).get("commit_short",""),
        "final_exit_code": exit_code,
        "gitleaks": gl.get("status",""),
        "semgrep": sg.get("status",""),
        "trivy": tv.get("status",""),
        "node_pm": node.get("pm",""),
        "node_version": node.get("node_version",""),
        "dep_audit": node.get("dep_audit",{}).get("status",""),
        "lint": node.get("lint",{}).get("status",""),
        "typecheck": node.get("typecheck",{}).get("status",""),
        "test": node.get("test",{}).get("status",""),
        "build": node.get("build",{}).get("status",""),
        "lh": lh.get("status",""),
        "lh_perf": lh.get("scores",{}).get("performance",""),
        "lh_seo": lh.get("scores",{}).get("seo",""),
        "lh_a11y": lh.get("scores",{}).get("a11y",""),
        "lh_bp": lh.get("scores",{}).get("best_practices",""),
        "report_dir": data.get("report_dir","")
    })
    if int(exit_code) != 0:
        fail.append((ref, f"exit={exit_code}"))

# CSV
csv_path = os.path.join(branches_dir, "summary.csv")
with open(csv_path,"w",newline="") as f:
    w=csv.DictWriter(f, fieldnames=list(rows[0].keys()) if rows else ["ref","final_exit_code"])
    w.writeheader()
    for r in rows:
        w.writerow(r)

# Markdown
md_path = os.path.join(branches_dir, "summary.md")
def esc(s):
    s = "" if s is None else str(s)
    return s.replace("|","\\|")
cols = ["ref","commit_short","final_exit_code","gitleaks","trivy","semgrep","dep_audit","build","lh","lh_perf","lh_seo","lh_a11y","lh_bp"]
lines=[]
lines.append(f"# Branch Audit Summary (base: {base})")
lines.append("")
lines.append("| " + " | ".join(cols) + " |")
lines.append("|" + "|".join(["---"]*len(cols)) + "|")
for r in rows:
    lines.append("| " + " | ".join(esc(r.get(c,"")) for c in cols) + " |")
open(md_path,"w").write("\n".join(lines))

# Fail list
fail_path = os.path.join(branches_dir, "FAILED.md")
if fail:
    out=["# Failed Branch Audits", ""]
    for ref, why in fail:
        out.append(f"- {ref} — {why}")
    open(fail_path,"w").write("\n".join(out))
else:
    open(fail_path,"w").write("# Failed Branch Audits\n\nNone 🎯\n")

print("Wrote:")
print(" -", csv_path)
print(" -", md_path)
print(" -", fail_path)
PY

echo
echo "DONE. Open:"
echo " - reports/branches/summary.md"
echo " - reports/branches/FAILED.md"

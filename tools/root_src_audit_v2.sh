#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="${1:-.}"
SRC_DIR="${2:-src}"
OUT_DIR="${3:-_audit_root_vs_src}"
GH_REPO="${4:-}"          # optional OWNER/REPO (enables github/ collection if gh is configured)
INCLUDE_GITHUB="${5:-1}"  # include .github in ROOT snapshot
ENABLE_FUZZY="${6:-1}"    # generate heuristic pairing diffs/cmp
INCLUDE_OUTPUTS="${7:-0}" # include dist/build/out/.next etc in ROOT snapshot if 1

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing dependency: $1" >&2; exit 2; }; }

need rsync
need git
need cmp
need find
need awk
need sed

SHA256_CMD=""
if command -v sha256sum >/dev/null 2>&1; then
  SHA256_CMD="sha256sum"
elif command -v shasum >/dev/null 2>&1; then
  SHA256_CMD="shasum -a 256"
else
  echo "Missing dependency: sha256sum (or shasum)" >&2
  exit 2
fi

JQ_OK=0
if command -v jq >/dev/null 2>&1; then JQ_OK=1; fi
GH_OK=0
if command -v gh >/dev/null 2>&1; then GH_OK=1; fi

ABS_REPO_ROOT="$(cd "$REPO_ROOT" && pwd)"
ABS_SRC_DIR="$ABS_REPO_ROOT/$SRC_DIR"
if [[ ! -d "$ABS_SRC_DIR" ]]; then
  echo "SRC dir not found: $ABS_SRC_DIR" >&2
  exit 2
fi

mkdir -p "$OUT_DIR"
OUT_DIR="$(cd "$OUT_DIR" && pwd)"

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

ROOT_SNAP="$WORKDIR/root_version"
SRC_SNAP="$WORKDIR/src_version"
mkdir -p "$ROOT_SNAP" "$SRC_SNAP"

EXCLUDES=(
  --exclude "_audit_root_vs_src/"
  --exclude "tools/root_src_audit*.sh"
  --exclude "tools/fuzzy_pair.py"
  --exclude "tools/generate_root_src_reports.py"
  --exclude ".git/"
  --exclude "$SRC_DIR/"
  --exclude "node_modules/"
  --exclude ".turbo/"
  --exclude ".cache/"
  --exclude "coverage/"
  --exclude "*.log"
)

if [[ "$INCLUDE_GITHUB" != "1" ]]; then
  EXCLUDES+=( --exclude ".github/" )
fi

if [[ "$INCLUDE_OUTPUTS" != "1" ]]; then
  EXCLUDES+=( --exclude "dist/" --exclude "build/" --exclude "out/" --exclude ".next/" )
fi

echo "[1/8] Snapshot ROOT_VERSION -> $ROOT_SNAP"
rsync -a "${EXCLUDES[@]}" "$ABS_REPO_ROOT/" "$ROOT_SNAP/"

echo "[2/8] Snapshot SRC_VERSION (/src as root) -> $SRC_SNAP"
rsync -a --exclude ".git/" "$ABS_SRC_DIR/" "$SRC_SNAP/"

manifest() {
  local base="$1"
  local out="$2"
  (
    cd "$base"
    find . -type f -print0 \
      | LC_ALL=C sort -z \
      | while IFS= read -r -d '' f; do
          rel="${f#./}"
          if stat --version >/dev/null 2>&1; then
            size="$(stat -c '%s' "$rel")"
          else
            size="$(stat -f '%z' "$rel")"
          fi
          sha="$($SHA256_CMD "$rel" | awk '{print $1}')"
          printf "%s\t%s\t%s\n" "$sha" "$size" "$rel"
        done
  ) > "$out"
}

echo "[3/8] Build manifests"
manifest "$ROOT_SNAP" "$OUT_DIR/root_manifest.tsv"
manifest "$SRC_SNAP"  "$OUT_DIR/src_manifest.tsv"

echo "[4/8] Exact-path pairing + byte verify"
awk -F'\t' '{print $3"\t"$1"\t"$2}' "$OUT_DIR/root_manifest.tsv" > "$OUT_DIR/_root_map.tsv"
awk -F'\t' '{print $3"\t"$1"\t"$2}' "$OUT_DIR/src_manifest.tsv"  > "$OUT_DIR/_src_map.tsv"

PAIR_OUT="$OUT_DIR/pairing.tsv"
: > "$PAIR_OUT"

while IFS=$'\t' read -r rel rsha rsize; do
  line="$(awk -F'\t' -v k="$rel" '$1==k{print; exit}' "$OUT_DIR/_src_map.tsv" || true)"
  if [[ -z "$line" ]]; then
    printf "MISSING_IN_SRC\t%s\t%s\t\t%s\t\n" "$rel" "$rsha" "$rsize" >> "$PAIR_OUT"
    continue
  fi
  ssha="$(echo "$line" | awk -F'\t' '{print $2}')"
  ssize="$(echo "$line" | awk -F'\t' '{print $3}')"
  if cmp -s "$ROOT_SNAP/$rel" "$SRC_SNAP/$rel"; then
    printf "IDENTICAL\t%s\t%s\t%s\t%s\t%s\n" "$rel" "$rsha" "$ssha" "$rsize" "$ssize" >> "$PAIR_OUT"
  else
    printf "CHANGED\t%s\t%s\t%s\t%s\t%s\n" "$rel" "$rsha" "$ssha" "$rsize" "$ssize" >> "$PAIR_OUT"
  fi
done < <(awk -F'\t' '{print $3"\t"$1"\t"$2}' "$OUT_DIR/root_manifest.tsv")

while IFS=$'\t' read -r rel ssha ssize; do
  line="$(awk -F'\t' -v k="$rel" '$1==k{print; exit}' "$OUT_DIR/_root_map.tsv" || true)"
  if [[ -z "$line" ]]; then
    printf "EXTRA_IN_SRC\t%s\t\t%s\t\t%s\n" "$rel" "$ssha" "$ssize" >> "$PAIR_OUT"
  fi
done < <(awk -F'\t' '{print $3"\t"$1"\t"$2}' "$OUT_DIR/src_manifest.tsv")

echo "[5/8] Produce diffs + cmp evidence for exact CHANGED files"
mkdir -p "$OUT_DIR/diffs" "$OUT_DIR/byte_diffs"
awk -F'\t' '$1=="CHANGED"{print $2}' "$PAIR_OUT" | while IFS= read -r rel; do
  safe="$(echo "$rel" | sed 's#[/ ]#_#g')"
  git diff --no-index -- "$ROOT_SNAP/$rel" "$SRC_SNAP/$rel" > "$OUT_DIR/diffs/${safe}.diff" || true
  (cmp -l "$ROOT_SNAP/$rel" "$SRC_SNAP/$rel" | head -n 200) > "$OUT_DIR/byte_diffs/${safe}.cmp.txt" || true
done

echo "[6/8] Heuristic pairing (fuzzy) + diffs + cmp (if enabled)"
if [[ "$ENABLE_FUZZY" == "1" ]]; then
  need python3
  tools/fuzzy_pair.py \
    --root-snap "$ROOT_SNAP" \
    --src-snap "$SRC_SNAP" \
    --root-manifest "$OUT_DIR/root_manifest.tsv" \
    --src-manifest "$OUT_DIR/src_manifest.tsv" \
    --out "$OUT_DIR/fuzzy_pairing.tsv" \
    --min-score 0.35 \
    --max-candidates 10 \
    --read-bytes 400000

  mkdir -p "$OUT_DIR/fuzzy_diffs" "$OUT_DIR/fuzzy_byte_diffs"
  : > "$OUT_DIR/fuzzy_pairs_index.tsv"

  tail -n +2 "$OUT_DIR/fuzzy_pairing.tsv" | sort -t$'\t' -k3,3nr | head -n 300 | while IFS=$'\t' read -r rrel srel score rsha ssha rsize ssize; do
    safe="$(echo "${rrel}__TO__${srel}" | sed 's#[/ ]#_#g')"
    git diff --no-index -- "$ROOT_SNAP/$rrel" "$SRC_SNAP/$srel" > "$OUT_DIR/fuzzy_diffs/${safe}.diff" || true
    (cmp -l "$ROOT_SNAP/$rrel" "$SRC_SNAP/$srel" | head -n 200) > "$OUT_DIR/fuzzy_byte_diffs/${safe}.cmp.txt" || true
    printf "%s\t%s\t%s\n" "$rrel" "$srel" "$score" >> "$OUT_DIR/fuzzy_pairs_index.tsv"
  done
fi

echo "[7/8] Optional: GitHub deployments/previews metadata (if gh configured + GH_REPO provided)"
if [[ "$GH_OK" -eq 1 && -n "$GH_REPO" ]]; then
  mkdir -p "$OUT_DIR/github"
  gh api -H "Accept: application/vnd.github+json" "repos/$GH_REPO/environments" > "$OUT_DIR/github/environments.json" || true
  gh api -H "Accept: application/vnd.github+json" "repos/$GH_REPO/deployments?per_page=100" > "$OUT_DIR/github/deployments.json" || true
  gh api -H "Accept: application/vnd.github+json" "repos/$GH_REPO/pages" > "$OUT_DIR/github/pages.json" || true
  gh api -H "Accept: application/vnd.github+json" "repos/$GH_REPO/actions/workflows?per_page=100" > "$OUT_DIR/github/workflows.json" || true
  gh api -H "Accept: application/vnd.github+json" "repos/$GH_REPO/actions/runs?per_page=50" > "$OUT_DIR/github/runs.json" || true

  if [[ "$JQ_OK" -eq 1 ]]; then
    gh pr list -R "$GH_REPO" --state open --json number,headRefOid,url > "$OUT_DIR/github/open_prs.json" || true
    jq -r '.[].number' "$OUT_DIR/github/open_prs.json" | while IFS= read -r pr; do
      gh pr view -R "$GH_REPO" "$pr" --json number,url,statusCheckRollup > "$OUT_DIR/github/pr_${pr}_checks.json" || true
    done
  fi
fi

echo "[8/8] README"
cat > "$OUT_DIR/README.txt" <<'TXT'
This folder contains a multi-layer audit:
1) Exact pairing (pairing.tsv) with diffs/ and byte_diffs/ for exact CHANGED files.
2) Heuristic pairing (fuzzy_pairing.tsv) with fuzzy_diffs/ and fuzzy_byte_diffs/ (candidate mappings).
If github/ exists, it contains environments, deployments, pages, workflows, runs, and PR checks for preview/deploy enumeration.
TXT

echo "DONE -> $OUT_DIR"

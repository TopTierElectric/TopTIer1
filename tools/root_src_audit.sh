#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="${1:-.}"
SRC_DIR="${2:-src}"
OUT_DIR="${3:-_audit_root_vs_src}"
GH_REPO="${4:-}"  # optional: OWNER/REPO for gh api calls
OUT_DIR_REL_TO_REPO="${OUT_DIR_REL_TO_REPO:-}"

# Exclusions for the "root version" snapshot
EXCLUDES=(
  --exclude ".git/"
  --exclude ".github/"   # keep out unless you explicitly want workflow comparisons in the root snapshot
  --exclude "$SRC_DIR/"
  --exclude "node_modules/"
  --exclude "dist/"
  --exclude "build/"
  --exclude "out/"
  --exclude ".next/"
  --exclude ".turbo/"
  --exclude ".cache/"
  --exclude "coverage/"
  --exclude "*.log"
)

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing dependency: $1" >&2; exit 2; }; }

need rsync
need git
need cmp
need find
need awk
need sed

# sha256 tool detection (GNU vs macOS)
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
OUT_DIR_BASENAME="$(basename "${OUT_DIR_REL_TO_REPO:-$OUT_DIR}")"

EXCLUDES+=(
  --exclude "_audit_root_vs_src/"
  --exclude "$OUT_DIR_BASENAME/"
)

if [[ ! -d "$ABS_REPO_ROOT" ]]; then
  echo "Repo root not found: $ABS_REPO_ROOT" >&2
  exit 2
fi

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

echo "[1/7] Snapshot ROOT_VERSION (repo root excluding /src) -> $ROOT_SNAP"
rsync -a "${EXCLUDES[@]}" "$ABS_REPO_ROOT/" "$ROOT_SNAP/"

echo "[2/7] Snapshot SRC_VERSION (/src treated as root) -> $SRC_SNAP"
rsync -a --exclude ".git/" "$ABS_SRC_DIR/" "$SRC_SNAP/"

manifest() {
  local base="$1"
  local out="$2"
  (
    cd "$base"
    # TSV: sha256 \t size_bytes \t relpath
    find . -type f -print0 \
      | LC_ALL=C sort -z \
      | while IFS= read -r -d '' f; do
          rel="${f#./}"
          # size
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

echo "[3/7] Build manifests"
manifest "$ROOT_SNAP" "$OUT_DIR/root_manifest.tsv"
manifest "$SRC_SNAP"  "$OUT_DIR/src_manifest.tsv"

echo "[4/7] Pair + byte-verify"
# Create quick lookup maps
awk -F'\t' '{print $3"\t"$1"\t"$2}' "$OUT_DIR/root_manifest.tsv" > "$OUT_DIR/_root_map.tsv"
awk -F'\t' '{print $3"\t"$1"\t"$2}' "$OUT_DIR/src_manifest.tsv"  > "$OUT_DIR/_src_map.tsv"

# Output: status \t relpath \t root_sha \t src_sha \t root_size \t src_size
PAIR_OUT="$OUT_DIR/pairing.tsv"
: > "$PAIR_OUT"

# Root -> Src
while IFS=$'\t' read -r rel rsha rsize; do
  line="$(awk -F'\t' -v k="$rel" '$1==k{print; exit}' "$OUT_DIR/_src_map.tsv" || true)"
  if [[ -z "$line" ]]; then
    printf "MISSING_IN_SRC\t%s\t%s\t\t%s\t\n" "$rel" "$rsha" "$rsize" >> "$PAIR_OUT"
    continue
  fi
  ssha="$(echo "$line" | awk -F'\t' '{print $2}')"
  ssize="$(echo "$line" | awk -F'\t' '{print $3}')"
  if [[ "$rsha" == "$ssha" && "$rsize" == "$ssize" ]]; then
    # Strong signal identical; still allow optional cmp if you want absolute confirmation:
    if cmp -s "$ROOT_SNAP/$rel" "$SRC_SNAP/$rel"; then
      printf "IDENTICAL\t%s\t%s\t%s\t%s\t%s\n" "$rel" "$rsha" "$ssha" "$rsize" "$ssize" >> "$PAIR_OUT"
    else
      # Extremely unlikely unless TOCTOU; still handle it:
      printf "CHANGED\t%s\t%s\t%s\t%s\t%s\n" "$rel" "$rsha" "$ssha" "$rsize" "$ssize" >> "$PAIR_OUT"
    fi
  else
    # Not identical -> bytewise cmp
    if cmp -s "$ROOT_SNAP/$rel" "$SRC_SNAP/$rel"; then
      printf "IDENTICAL\t%s\t%s\t%s\t%s\t%s\n" "$rel" "$rsha" "$ssha" "$rsize" "$ssize" >> "$PAIR_OUT"
    else
      printf "CHANGED\t%s\t%s\t%s\t%s\t%s\n" "$rel" "$rsha" "$ssha" "$rsize" "$ssize" >> "$PAIR_OUT"
    fi
  fi
done < <(awk -F'\t' '{print $3"\t"$1"\t"$2}' "$OUT_DIR/root_manifest.tsv")

# Src-only
while IFS=$'\t' read -r rel ssha ssize; do
  line="$(awk -F'\t' -v k="$rel" '$1==k{print; exit}' "$OUT_DIR/_root_map.tsv" || true)"
  if [[ -z "$line" ]]; then
    printf "EXTRA_IN_SRC\t%s\t\t%s\t\t%s\n" "$rel" "$ssha" "$ssize" >> "$PAIR_OUT"
  fi
done < <(awk -F'\t' '{print $3"\t"$1"\t"$2}' "$OUT_DIR/src_manifest.tsv")

LC_ALL=C sort -t$'\t' -k2,2 -k1,1 "$PAIR_OUT" -o "$PAIR_OUT"

echo "[5/7] Produce diffs + byte-offset evidence for CHANGED files"
mkdir -p "$OUT_DIR/diffs" "$OUT_DIR/byte_diffs"

# For each changed file: create unified diff and cmp offset listing
awk -F'\t' '$1=="CHANGED"{print $2}' "$PAIR_OUT" | while IFS= read -r rel; do
  rootf="$ROOT_SNAP/$rel"
  srcf="$SRC_SNAP/$rel"
  safe="$(echo "$rel" | sed 's#[/ ]#_#g')"

  # Unified diff
  git diff --no-index -- "$rootf" "$srcf" > "$OUT_DIR/diffs/${safe}.diff" || true

  # Byte-offset evidence: show first 200 differing bytes (offset + byte values)
  # cmp -l format: byte_position octal1 octal2
  (cmp -l "$rootf" "$srcf" | head -n 200) > "$OUT_DIR/byte_diffs/${safe}.cmp.txt" || true
done

echo "[6/7] Optional: GitHub deployments/previews metadata (if gh configured)"
if [[ "$GH_OK" -eq 1 && -n "$GH_REPO" ]]; then
  mkdir -p "$OUT_DIR/github"
  # Environments (deploy environments)
  gh api -H "Accept: application/vnd.github+json" "repos/$GH_REPO/environments" > "$OUT_DIR/github/environments.json" || true
  # Deployments (may be empty if your stack doesn't use GitHub deployments API)
  gh api -H "Accept: application/vnd.github+json" "repos/$GH_REPO/deployments?per_page=100" > "$OUT_DIR/github/deployments.json" || true

  # Pages (if used)
  gh api -H "Accept: application/vnd.github+json" "repos/$GH_REPO/pages" > "$OUT_DIR/github/pages.json" || true

  # Open PRs + checks (best-effort preview URL harvesting)
  if [[ "$JQ_OK" -eq 1 ]]; then
    gh pr list -R "$GH_REPO" --state open --json number,headRefOid,url > "$OUT_DIR/github/open_prs.json" || true
    jq -r '.[].number' "$OUT_DIR/github/open_prs.json" | while IFS= read -r pr; do
      gh pr view -R "$GH_REPO" "$pr" --json number,url,statusCheckRollup > "$OUT_DIR/github/pr_${pr}_checks.json" || true
    done
  fi
fi

echo "[7/7] Write README for how to consume the audit"
cat > "$OUT_DIR/README.txt" <<'TXT'
This folder contains a bytewise ROOT_VERSION ↔ SRC_VERSION audit.

Key files:
- root_manifest.tsv / src_manifest.tsv: sha256 + size + relpath manifests
- pairing.tsv: per-relpath status (IDENTICAL / CHANGED / MISSING_IN_SRC / EXTRA_IN_SRC)
- diffs/*.diff: unified diffs for each CHANGED file
- byte_diffs/*.cmp.txt: first 200 byte offsets that differ for each CHANGED file

If github/ exists:
- environments.json, deployments.json, pages.json, pr_*_checks.json: deployment/preview metadata.

Recommended workflow:
1) Feed pairing.tsv + diffs/ + manifests into your analysis prompt.
2) For every change you plan to transplant, reference the exact diff hunks.
3) Verify by running tests/build and ensuring no regressions.
TXT

echo "DONE -> $OUT_DIR"

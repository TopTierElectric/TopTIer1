#!/usr/bin/env bash
set -euo pipefail

RANGE="${1:-}"

fallback_range() {
  if git rev-parse --verify HEAD~1 >/dev/null 2>&1; then
    echo "HEAD~1..HEAD"
  else
    echo "HEAD"
  fi
}

is_valid_range() {
  local candidate="$1"

  if [[ -z "$candidate" ]]; then
    return 1
  fi

  if [[ "$candidate" == *".."* ]]; then
    local left="${candidate%%..*}"
    local right="${candidate##*..}"

    if [[ -z "$left" || -z "$right" ]]; then
      return 1
    fi

    git rev-parse --verify "$left" >/dev/null 2>&1 &&
      git rev-parse --verify "$right" >/dev/null 2>&1
    return $?
  fi

  git rev-parse --verify "$candidate" >/dev/null 2>&1
}

if ! is_valid_range "$RANGE"; then
  RANGE="$(fallback_range)"
fi

BINARY_PATTERN='\.(avif|webp|png|jpe?g|gif|bmp|tiff?|ico)$'

if ! changed_files="$(git diff --name-only --diff-filter=AM "$RANGE")"; then
  RANGE="$(fallback_range)"
  changed_files="$(git diff --name-only --diff-filter=AM "$RANGE")"
fi

if [[ -z "$changed_files" ]]; then
  echo "No added/modified files detected for range: $RANGE"
  exit 0
fi

binary_changes="$(printf '%s\n' "$changed_files" | rg -i "$BINARY_PATTERN" || true)"
if [[ -n "$binary_changes" ]]; then
  echo "Binary image files detected in diff range: $RANGE"
  echo "Remove these from the PR or host them externally instead:"
  printf '%s\n' "$binary_changes"
  exit 1
fi

echo "No binary image files detected in diff range: $RANGE"

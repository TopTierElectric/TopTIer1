#!/usr/bin/env bash
set -euo pipefail

RANGE="${1:-}"

if [[ -z "$RANGE" ]]; then
  if git rev-parse --verify HEAD~1 >/dev/null 2>&1; then
    RANGE="HEAD~1..HEAD"
  else
    RANGE="HEAD"
  fi
fi

BINARY_PATTERN='\.(avif|webp|png|jpe?g|gif|bmp|tiff?|ico)$'

changed_files="$(git diff --name-only --diff-filter=AM "$RANGE")"
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

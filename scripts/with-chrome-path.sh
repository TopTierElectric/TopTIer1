#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  echo "Usage: $0 <command...>" >&2
  exit 64
fi

is_usable_browser() {
  local bin="$1"
  [[ -x "$bin" ]] || return 1
  "$bin" --version >/dev/null 2>&1
}

if [[ -z "${CHROME_PATH:-}" ]]; then
  for candidate in chromium google-chrome-stable google-chrome chromium-browser; do
    if command -v "$candidate" >/dev/null 2>&1; then
      candidate_path="$(command -v "$candidate")"
      if is_usable_browser "$candidate_path"; then
        CHROME_PATH="$candidate_path"
        break
      fi
    fi
  done
fi

if [[ -z "${CHROME_PATH:-}" ]]; then
  for cached in "$HOME"/.cache/puppeteer/chrome/*/chrome-linux64/chrome; do
    if is_usable_browser "$cached"; then
      CHROME_PATH="$cached"
      break
    fi
  done
fi

if [[ -z "${CHROME_PATH:-}" ]]; then
  echo "CHROME_PATH is not set and no usable Chrome/Chromium executable was found." >&2
  if [[ "${CI:-}" == "true" ]]; then
    echo "Install Chrome/Chromium or set CHROME_PATH explicitly." >&2
    exit 1
  fi

  echo "Skipping browser-dependent check outside CI." >&2
  exit 0
fi

export CHROME_PATH
exec "$@"

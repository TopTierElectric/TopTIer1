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

discover_browser() {
  if [[ -n "${CHROME_PATH:-}" ]] && is_usable_browser "$CHROME_PATH"; then
    return 0
  fi

  for candidate in chromium google-chrome-stable google-chrome chromium-browser; do
    if command -v "$candidate" >/dev/null 2>&1; then
      candidate_path="$(command -v "$candidate")"
      if is_usable_browser "$candidate_path"; then
        CHROME_PATH="$candidate_path"
        export CHROME_PATH
        return 0
      fi
    fi
  done

  for cached in "$HOME"/.cache/puppeteer/chrome/*/chrome-linux64/chrome; do
    if is_usable_browser "$cached"; then
      CHROME_PATH="$cached"
      export CHROME_PATH
      return 0
    fi
  done

  for cached in "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux/chrome; do
    if is_usable_browser "$cached"; then
      CHROME_PATH="$cached"
      export CHROME_PATH
      return 0
    fi
  done

  return 1
}

install_puppeteer_chrome() {
  echo "No Chrome/Chromium detected. Installing a pinned browser via Puppeteer cache..." >&2
  npx --yes puppeteer@24.15.0 browsers install chrome --path "$HOME/.cache/puppeteer" >&2
}

install_playwright_chromium() {
  echo "Attempting Playwright Chromium install (with system deps)..." >&2
  npx --yes playwright@1.54.2 install --with-deps chromium >&2
}

install_system_chromium_linux() {
  if [[ "${WITH_CHROME_AUTO_APT:-1}" != "1" ]]; then
    return 0
  fi

  if ! command -v apt-get >/dev/null 2>&1; then
    return 0
  fi

  echo "Attempting system Chromium install via apt-get for missing runtime dependencies..." >&2
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -y >&2 || return 0
  apt-get install -y chromium >&2 || apt-get install -y chromium-browser >&2 || true
}

print_browser_diagnostics() {
  local browser="$1"
  echo "Browser diagnostics for $browser" >&2
  "$browser" --version >&2 || true

  if command -v ldd >/dev/null 2>&1; then
    echo "Potential missing shared libs:" >&2
    ldd "$browser" 2>/dev/null | grep "not found" >&2 || echo "none" >&2
  fi
}

if ! discover_browser; then
  install_puppeteer_chrome || true
  discover_browser || install_playwright_chromium || true
  discover_browser || install_system_chromium_linux
  discover_browser || {
    echo "CHROME_PATH is not set and no usable Chrome/Chromium executable was found after install attempts." >&2
    echo "Fix: install Chrome/Chromium dependencies or set CHROME_PATH to a valid browser executable." >&2
    exit 1
  }
fi

print_browser_diagnostics "$CHROME_PATH"

export CHROME_PATH
exec "$@"

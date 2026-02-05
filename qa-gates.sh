#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4173}"

npm run build

npx http-server -p "$PORT" > /dev/null 2>&1 &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT

sleep 2

npm run format:check
npm run lint
npm run validate:html
npm run audit:links
npm run audit:a11y
npx lighthouse "http://127.0.0.1:${PORT}/" --output=html --output-path=reports/lighthouse-home.html --chrome-flags='--headless=new --no-sandbox'
npx lighthouse "http://127.0.0.1:${PORT}/services.html" --output=html --output-path=reports/lighthouse-services.html --chrome-flags='--headless=new --no-sandbox'
npx lighthouse "http://127.0.0.1:${PORT}/contact.html" --output=html --output-path=reports/lighthouse-contact.html --chrome-flags='--headless=new --no-sandbox'
npx lighthouse "http://127.0.0.1:${PORT}/panel-upgrades.html" --output=html --output-path=reports/lighthouse-panel-upgrades.html --chrome-flags='--headless=new --no-sandbox'
npx lighthouse "http://127.0.0.1:${PORT}/service-areas.html" --output=html --output-path=reports/lighthouse-service-areas.html --chrome-flags='--headless=new --no-sandbox'

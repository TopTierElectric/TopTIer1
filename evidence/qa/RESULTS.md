# QA Results Summary

## Pass/Fail
- Build: ✅ (npm run build)
- Prettier: ❌ (format:check failed; unformatted files)
- HTML Validate: ❌ (html-validate errors across pages)
- ESLint: ✅ (after config adjustments)
- Stylelint: ❌ (styles.css violations)
- Linkinator: ❌ (403 on repo root)
- Pa11y: ❌ (Puppeteer/Chromium missing system dependencies)
- Lighthouse: ❌ (Chrome not installed; CHROME_PATH not set)
- Console sweep: ❌ (Playwright/Chromium not available)
- qa-gates.sh: ❌ (fails early due to format/lint errors)

## Logs
See evidence/logs for full command output.

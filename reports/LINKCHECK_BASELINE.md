# Linkcheck Baseline

## Method
- Attempted local HTTP server for status checks, but the environment did not allow binding to localhost.
- Used `node scripts/crawl.js` with filesystem fallback to collect internal links and determine 200/404 based on file presence.

## Findings
- Broken internal links (4xx/5xx): None detected in baseline crawl.
- Redirect chains: None detected in baseline crawl.
- Orphan pages (no inbound internal links from the crawl set): None detected.

## Notes
- External links (mailto:, tel:, sms:, maps embeds) were excluded from crawl status checks.

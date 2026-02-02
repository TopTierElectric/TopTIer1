# Verification Playbook

This playbook lists exact commands, tools, and thresholds required to validate each phase.

## 1) Local server
```bash
npm run dev
```
- Serves site at `http://localhost:8888/`.

## 2) URL inventory + crawl (baseline and post-sprint)
```bash
node scripts/crawl.js http://localhost:8888/ reports
```
**Outputs:**
- `reports/crawl_raw.json`
- `reports/BASELINE_URL_INVENTORY.csv`

**Acceptance targets:**
- All URLs return 200.
- Canonical present on all indexable pages.
- Single H1 per page.

## 3) Link integrity
Uses the same crawl outputs.
- Broken internal links: none.
- Redirect chains: none.
- Orphan pages: none.

If needed, cross-check with:
```bash
npm run test:links
```

## 4) Lighthouse (baseline + final)
**Required pages:** /, /services.html, /booking.html, /contact.html, /panel-upgrades.html, /emergency.html

**Commands:**
```bash
npx lighthouse http://localhost:8888/ --output json --output-path reports/lighthouse/home.mobile.json --form-factor=mobile --chrome-flags="--headless --no-sandbox" --quiet
npx lighthouse http://localhost:8888/ --output json --output-path reports/lighthouse/home.desktop.json --preset=desktop --chrome-flags="--headless --no-sandbox" --quiet
```

**Thresholds (Sprint 4 gate):**
- Mobile Performance >= 90
- CLS < 0.1 (lab)
- Best Practices >= 95
- Accessibility >= 95

**Note:** Lighthouse requires Chrome/Chromium. If missing, set `CHROME_PATH` to a local Chrome binary or run in an environment with Chrome installed.

## 5) Forms verification (Sprint 1 gate)
- Submit test form on Booking + Contact pages.
- Confirm deterministic thank-you UX.
- Validate Turnstile token rejection on bot-like submit (empty token).

## 6) Analytics (GA4)
- Enable GA4 snippet with real measurement ID.
- Use GA4 DebugView to verify events:
  - `call_click`
  - `text_click`
  - `book_submit`
  - `estimate_submit`
  - `email_click`

## 7) Reviews engine validation
- With `/data/reviews.json` aggregate count/rating set to null, confirm that no numeric review claims are rendered.

## 8) Cloudflare headers/redirects
- **Pages**: ensure `_headers` and `_redirects` exist in output root.
- **Non-Pages**: verify Cloudflare dashboard rules as documented.

Use curl in production to validate headers:
```bash
curl -I https://www.toptier-electrical.com/
```

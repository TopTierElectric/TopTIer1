# Audit Snapshot (Step 3)

## What changed + why

- Consolidated global header/nav/footer to a single consistent markup with CTA buttons for clearer conversion flow and consistent brand navigation. (See `index.html`, `services.html`, `contact.html` for the shared structure.)
- Implemented TopTier design tokens and component layer so brand styling can be reused consistently without duplicating variables in `styles.css`.
- Updated form handling to a real Formsubmit endpoint with a honeypot field to reduce spam and remove placeholder risk.
- Added Cloudflare Pages canonical + HTTPS redirects and extended caching rules for new CSS/images directories.
- Added QA scripts + workflow and placeholder checks to prevent shipping placeholder tokens.
- Added asset optimization pipeline (`sharp`) and optimized logo + hero outputs (AVIF/WEBP) to reduce CLS and improve performance.

## File pointers

- Header/footer consolidation: `index.html`, `services.html`, `contact.html`, and all other `.html` pages updated to shared header/footer markup.
- Tokens + components: `css/design-tokens.css`, `css/components.css`, `styles.css`.
- Forms + honeypot: `index.html`, `booking.html`, `contact.html`.
- Cloudflare Pages rules: `_redirects`, `_headers`.
- QA + checks: `package.json`, `.github/workflows/qa.yml`, `scripts/check-placeholders.js`.
- Asset optimization: `scripts/optimize-assets.mjs`, outputs in `assets/images/hero.avif`, `assets/images/hero.webp`, and `images/logos/*.webp`.

## Before/after evidence

- Canonical + OG URLs: previously pointed to `https://www.toptier-electrical.com/` and now use the apex `https://toptier-electrical.com/` in all HTML heads.
- Forms: previously used `https://formsubmit.co/your-email@example.com`; now use `https://formsubmit.co/toptierelectric117@gmail.com` with honeypot field.
- Analytics: placeholder Cloudflare beacon tokens removed and replaced with a real token in every HTML head.

## Reports + outputs

- Lighthouse output is generated to `reports/lighthouse.html` when `npm run qa` completes.
- QA workflow uploads the `reports/` directory as an artifact.

## Savage audit automation

- Single worktree audit: `./scripts/savage-audit.sh` (writes `reports/meta.json` plus security scan logs).
- All branches audit: `SAVAGE_JOBS=6 SAVAGE_MODE=full SAVAGE_STRICT=1 ./scripts/savage-audit-all-branches.sh` (writes `reports/branches/summary.md` and per-branch `meta.json`).
- Fast mode (skip Node gates): `SAVAGE_MODE=fast ./scripts/savage-audit-all-branches.sh`.

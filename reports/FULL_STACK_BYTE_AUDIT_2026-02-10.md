# TopTier Electrical — Full-Stack Byte/Line/Block + Image/Brand/SEO Audit (2026-02-10)

## Summary
- Completed repository-wide duplicate-file sweep (SHA-256 grouping) and removed exact duplicate placeholders/files that provided no functional value.
- Repaired a broken gallery image reference pointing to a zero-byte file and replaced it with a valid project image plus SEO-aligned alt text.
- Performed config/redirect review of `_redirects` and mapped exact Cloudflare-side canonical behavior requirements.
- Produced one ranked, implementation-ready master improvement list across UX, conversion, SEO, performance, accessibility, and trust.

## Byte/Line/Block Analysis

### 1) File + Asset Deduplication (byte-level)
- Method: byte-hash grouping (SHA-256 + file-size) excluding `.git` and `node_modules`.
- Findings:
  - `readme.md` was a byte-identical duplicate of `README.md`.
  - `TopTIer1-main`, `seo`, and `reports/.gitkeep` were all identical zero-byte placeholders.
  - `assets/images/projects/fire-response.jpg` was also zero-byte and unresolved for production display.
- Applied fixes:
  - Removed `readme.md`, `TopTIer1-main`, `seo`, and empty `fire-response.jpg`.
  - Updated clean-export script allowlist to remove now-deleted duplicate `readme.md` entry.

### 2) Redirect + Canonical Behavior (line/block)
- `_redirects` contains path-level redirects only (correct for Cloudflare Pages).
- Current in-repo rules avoid chains and loops at path level.
- Canonical domain/protocol behavior is intentionally externalized to Cloudflare Redirect Rules.
- Required canonical target:
  - Single-hop: `http://www` → `https://apex`
  - Single-hop: `http://apex` → `https://apex`
  - Single-hop: `https://www` → `https://apex`

### 3) Image + Media Audit (page/component)
- Gallery contained one broken media entry (`fire-response.jpg`, 0 bytes), causing visual trust/perceived-quality loss.
- Updated to valid asset: `fire-response-2.jpg` with local-intent alt text.
- Remaining image system opportunities:
  - Several heavy JPG files (>1 MB) should be converted to AVIF/WebP with `<picture>` for LCP and bandwidth efficiency.
  - Some filenames are generic (`IMG_####.jpg`) and should be mapped to semantic names for SEO/media governance.

## Issues/Risks
1. Zero-byte/broken image reference in conversion-critical gallery.
2. Duplicate files created maintainability noise and export ambiguity.
3. Canonical host/protocol still depends on external Cloudflare config (operational risk if drift occurs).
4. Multiple pages likely still over-reliant on generic camera filenames and non-modern image formats.

## MASTER IMPROVEMENT LIST (Highest → Lowest Impact)

### 1) Standardize emergency-first hero conversion pattern
- WHAT: Hero messaging hierarchy varies by page and can bury urgent intent.
- WHY: Impacts conversion and trust for service-business users with urgent electrical problems.
- EXACT FIX: Use one hero formula on all core service pages:
  - H1 problem + geography (`24/7 Electrician in West Michigan` pattern)
  - proof line (licensed/insured, years, response window)
  - Primary CTA: `Call Now`
  - Secondary CTA: `Request Estimate`
  - Financing microcopy below CTAs.
- PAGE(S): `index.html`, `services.html`, `emergency.html`, `electrical-repairs.html`, `panel-upgrades.html`, `ev-chargers.html`, `generators.html`, `lighting.html`.

### 2) Fix image SEO governance and media performance
- WHAT: Generic filenames and JPG-only patterns weaken SEO + performance.
- WHY: Affects Core Web Vitals (LCP), topical relevance, and credibility.
- EXACT FIX:
  - Rename `IMG_*.jpg` to semantic slugs (example: `west-michigan-office-lighting-retrofit.jpg`).
  - Create AVIF/WebP derivatives for hero/gallery images.
  - Keep intrinsic width/height and lazy loading for non-LCP media.
  - Use descriptive alt text tied to service + location + outcome.
- PAGE(S): `gallery.html`, `index.html`, `blog.html`, all service pages.

### 3) Establish canonical redirect contract in docs + automated checks
- WHAT: Canonical logic is split between repo and Cloudflare dashboard.
- WHY: Any drift can create redirect loops/chains and dilute index signals.
- EXACT FIX:
  - Document canonical matrix in `reports/verification` and enforce in CI checks.
  - Maintain one canonical host (`https://toptier-electrical.com`).
  - Keep `_redirects` path-only.
- PAGE(S): platform-level + `_redirects`.

### 4) Tighten trust signal placement and consistency
- WHAT: Some trust cues are present but not consistently grouped near primary CTA.
- WHY: Strong trust grouping increases form/call conversion and lowers decision friction.
- EXACT FIX:
  - Add consistent trust strip: license, insured, service area, review count.
  - Place trust strip directly beneath hero CTA group.
- PAGE(S): home + all service landing pages.

### 5) Improve gallery taxonomy clarity for buying intent
- WHAT: Gallery categories exist but project context labels can be more buyer-oriented.
- WHY: Better scannability improves qualification and conversion.
- EXACT FIX:
  - Use category labels based on customer goals (Safety, Backup Power, EV Charging, Commercial Controls).
  - Add short project result captions (`Reduced outage risk`, `Code-compliant upgrade`).
- PAGE(S): `gallery.html`.

### 6) Expand internal-link pathways by intent cluster
- WHAT: Links exist but could better route users from informational content to service conversion pages.
- WHY: Improves crawl depth, topical authority, and lead funnel continuity.
- EXACT FIX:
  - Add contextual links from blog posts to matching service + booking pages.
  - Add “Next step” modules at bottom of blog/service pages.
- PAGE(S): `blog*.html`, `services.html`, `booking.html`, `contact.html`.

### 7) FAQ/Financing readability refinement (mobile-first)
- WHAT: Dense text blocks can reduce scannability on mobile.
- WHY: Impacts comprehension and accessibility.
- EXACT FIX:
  - Shorten answer paragraphs into bullets where possible.
  - Increase spacing between accordion items and strengthen open-state focus styles.
- PAGE(S): `faq.html`, `financing.html`.

## Standards Mapping (2025–2026)
- Core Web Vitals: LCP/INP improvements via modern image formats and lighter media payloads.
- WCAG 2.2 AA: stronger alt quality, better hierarchy, clearer CTA grouping, improved mobile readability.
- Modern SEO: canonical consistency, semantic image naming, internal-link intent mapping, structured trust cues.
- Conversion UX: hero clarity, urgency prioritization, trust signal adjacency to primary CTA.

## Step-by-Step Verification Checklist (for each applied change)

### A. Duplicate-file integrity
1. What to test: no remaining exact duplicate file groups.
2. How: run SHA-256 grouping script across repo (exclude dependencies).
3. Expected: no non-intentional duplicate groups.
4. Pass/fail: pass if duplicate groups == 0 (or justified exceptions only).

### B. Broken media prevention
1. What to test: no gallery image references resolve to missing/zero-byte files.
2. How: run `npm run audit:images` + manual open of gallery page.
3. Expected: no missing-file warnings; image renders normally.
4. Pass/fail: pass on zero missing/broken image findings.

### C. Redirect/canonical safety
1. What to test: no loops/chains and one canonical endpoint.
2. How: run `npm run check:origin-redirects` and `npm run check:redirects-cloudflare`.
3. Expected: single-hop redirect behavior for host/protocol + clean path redirects.
4. Pass/fail: pass when both checks return success.

### D. HTML validity
1. What to test: markup remains valid after file/ref changes.
2. How: run `npm run lint:html`.
3. Expected: no validation errors.
4. Pass/fail: exit code 0.

### E. Visual QA (desktop + mobile)
1. What to test: gallery “Fire Response Repair” card image loads and reads correctly.
2. How: run local server + browser screenshot at desktop and mobile widths.
3. Expected: image visible, no layout shift, alt text semantically accurate.
4. Pass/fail: visual card present and no broken-image icon.

## Next Steps
1. Execute hero standardization rollout page-by-page.
2. Generate AVIF/WebP pipeline and implement `<picture>` wrappers on high-impact templates.
3. Rename generic image files to SEO-safe semantic slugs with redirect-safe path updates.
4. Add explicit canonical redirect verification to CI release gate.

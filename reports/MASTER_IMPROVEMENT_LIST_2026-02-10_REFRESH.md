# Master Improvement List (Refresh) — TopTier1

## Scope covered in this refresh

- File/asset deduplication check across repository bytes/hashes.
- Redirect/canonical behavior check for Cloudflare Pages and origin-level patterns.
- Image/media reference integrity sweep and brand/SEO cleanup for broken project-gallery image references.

## Highest → Lowest Impact (implementation-ready)

1. **Fix broken homepage/commercial gallery image references (immediate trust + conversion + SEO impact).**

   - **What is wrong:** `index.html` and `commercial.html` referenced non-existent files (`lighting.jpg`, `led-shelfs-3.jpg`, `control-work-3.jpg`).
   - **Why it matters:** Broken imagery produces visible gaps and CLS risk, lowers trust, weakens topical relevance, and can reduce image-search indexing quality.
   - **Exact fix:** Repointed image sources to existing assets:
     - `lighting.jpg` → `horse-stall-lighting.jpg`
     - `led-shelfs-3.jpg` → `led-shelfs.jpg`
     - `control-work-3.jpg` → `control-work.jpg`
   - **Page(s):** `index.html`, `commercial.html`.
   - **Standards addressed:** Core Web Vitals (stability/UX continuity), modern technical SEO (crawlable render-complete pages), WCAG 2.2 perceivability (non-broken non-text content).

2. **Remove exact duplicate documentation file to reduce maintenance drift and accidental mismatches.**

   - **What is wrong:** `README.md` and `readme.md` were exact duplicates (same byte hash).
   - **Why it matters:** Duplicate docs increase update drift and can create case-sensitivity issues across CI/CD and different host filesystems.
   - **Exact fix:** Removed lowercase duplicate `readme.md`; retained canonical `README.md`.
   - **Page(s):** Repository docs/global.
   - **Standards addressed:** Maintainability and repository hygiene best practices (2025+ CI portability).

3. **Confirm redirect/canonical baseline remains loop-free and host-level canonicalized.**
   - **What is wrong:** No active redirect loops/chains detected, but behavior depends on Cloudflare zone-level host/protocol rules.
   - **Why it matters:** Canonical consistency (HTTPS-first + single host) is essential for SEO consolidation and trust.
   - **Exact fix:** Keep `_redirects` path aliases minimal and preserve host/protocol canonicalization in Cloudflare Redirect Rules (apex vs www policy).
   - **Page(s):** Global (`_redirects`, Cloudflare zone config).
   - **Standards addressed:** Modern SEO canonicalization and platform edge-routing best practices.

## Image/media audit notes (brand + performance + SEO)

- **Brand fit:** Existing project images remain authentic/service-real (non-flashy), consistent with West Michigan service-business trust positioning.
- **Performance/format:** Current project assets are mostly JPG; next pass should migrate heavy hero/gallery assets to modern AVIF/WebP with responsive `srcset`.
- **SEO metadata:** Alt text coverage is currently present; next pass should tighten semantic filenames over generic camera names (`IMG_XXXX.jpg`) and align nearby captions with service intents.

## Step-by-step verification checklist

### A) Broken image references

1. **What to test:** Missing-file image references in HTML.
2. **How to test:** `npm run audit:images`.
3. **Expected result:** `Missing image/file references: 0`.
4. **Pass/fail:** Pass only if zero missing references and no non-decorative empty alt regressions.

### B) Redirect/canonical safety

1. **What to test:** Redirect loop/chain/mis-scope in `_redirects` and origin configs.
2. **How to test:** `npm run check:redirects-cloudflare` and `npm run check:origin-redirects`.
3. **Expected result:** both commands return OK with no forbidden host/protocol redirect anti-patterns.
4. **Pass/fail:** Fail on any loop, chain, or host/protocol conflict.

### C) Dedup integrity

1. **What to test:** duplicate hash collisions for files.
2. **How to test:** local SHA-256 duplicate scan script/manual run.
3. **Expected result:** no duplicate `README` variants and no accidental duplicate component/docs artifacts introduced.
4. **Pass/fail:** Fail on exact duplicates that are not intentionally required.

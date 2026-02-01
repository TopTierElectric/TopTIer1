# Top Tier Electrical Audit Deliverables (Netlify Deploy Preview)

1) Site Crawl Inventory (Pages + Templates)
- **Crawl scope + parity check:** Netlify deploy preview home page responded (200). Production home page returned HTTP 503 during crawl, so parity could not be confirmed beyond the deploy preview response. (See crawl note in §2 for required inputs.)
- **Discovered pages + purpose (Netlify preview URLs):**
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/ — Home, primary marketing funnel + lead capture.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/services.html — Services overview + section anchors.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/contact.html — Contact/estimate form.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/booking.html — Booking call-to-action.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/testimonials.html — Reviews/testimonials.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/financing.html — Financing options.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/emergency.html — Emergency services.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/gallery.html — Project gallery.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/faq.html — FAQ.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/blog.html — Blog landing page.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/blog-electrical-safety.html — Blog detail.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/blog-right-electrician.html — Blog detail.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/blog-ev-charging.html — Blog detail.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/blog-surge-protection.html — Blog detail.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/service-areas.html — Service areas.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/panel-upgrades.html — Service detail.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/ev-chargers.html — Service detail.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/lighting.html — Service detail.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/404.html — 404 page.
  - https://697d4b34cba0de1bd51c556c--toptierelectrical.netlify.app/styleguide-top-tier-electrical.html — Style guide (internal reference).
- **Repeating section types observed:** header/nav, hero/intro, trust strip, content grid (services/blog/testimonials), CTA block, pre-footer, footer.
- **SEO-score-relevant issues found during crawl (no structural changes suggested):**
  - `styleguide-top-tier-electrical.html` lacks a canonical tag (all other pages include one).
  - Production URL returned HTTP 503 during crawl, so production parity (titles/canonicals) could not be verified.

2) Network Requests Audit (27 Requests from Netlify Observability)
**Missing input required:** I cannot access the Netlify Observability request list programmatically. Please provide **only** one of the following: (a) an exported list/screenshot of the 27 requests (name + type + domain + cache headers if visible). Once provided, I will replace the placeholders below with exact values and validation steps.

| Req ID | Resource URL + domain | Resource type | Current cache behavior | Lighthouse risk | Fix (exact) + where to implement | Verification steps in Edge DevTools |
| --- | --- | --- | --- | --- | --- | --- |
| REQ-001 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-002 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-003 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-004 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-005 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-006 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-007 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-008 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-009 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-010 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-011 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-012 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-013 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-014 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-015 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-016 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-017 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-018 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-019 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-020 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-021 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-022 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-023 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-024 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-025 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-026 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |
| REQ-027 | unknown (need Netlify Observability export) | unknown | unknown | unknown | Provide request list; then map fixes to `netlify.toml`/`_headers`/HTML head | Network tab: confirm request + response headers; Lighthouse re-run |

3) Image Asset Audit (single master table; ALL images currently used)
**Note:** Visual inspection is not available in this environment; issues are based on dimensions, orientation, and file integrity. Provide any image URLs or screenshots if you want visual quality validation (lighting, clutter, color balance).

| Audit ID | Page + section where used | Current URL/path | Current dimensions + file size | Current aspect ratio | Visible issues | Treatment using SAME image | Re-export spec |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IMG-001 | Site-wide header/footer logo | assets/images/logo.svg | SVG + 0.2 KB | Vector | None observed | Keep; ensure consistent sizing | Keep as SVG; no re-export |
| IMG-002 | Hero background (home + most pages) | assets/images/hero.jpg | 1600×1200 + 241.1 KB | 4:3 | Not 16:9 target; requires crop | Crop to 16:9; center on key subject; straighten horizon | GLOBAL-STANDARDS v1 → Hero/header |
| IMG-003 | Blog hero + Gallery grid | assets/images/projects/led-handrail.jpg | 1600×2133 + 178.8 KB | 3:4 | Portrait vs 16:9 (blog hero) / 4:3 (gallery) | Create 16:9 hero crop; create 4:3 gallery crop; keep focal lights centered | GLOBAL-STANDARDS v1 → Hero + Gallery |
| IMG-004 | Blog card + Gallery grid | assets/images/projects/kitchen-led.jpg | 1600×2133 + 234.2 KB | 3:4 | Portrait vs 4:3 target | Crop to 4:3 with fixture centered | GLOBAL-STANDARDS v1 → Gallery/Service thumbs |
| IMG-005 | Blog card + Gallery grid | assets/images/projects/control-cabinet.jpg | 1600×2133 + 315.7 KB | 3:4 | Portrait vs 4:3 target | Crop to 4:3; keep cabinet door and controls in frame | GLOBAL-STANDARDS v1 → Gallery/Service thumbs |
| IMG-006 | Blog card + Gallery grid | assets/images/projects/myenergi-4SyUf9MvWjU-unsplash.jpg | 1920×1080 + 267.6 KB | 16:9 | None observed; ratio ok for hero, wide for gallery | For gallery: crop to 4:3; for hero: keep 16:9 | GLOBAL-STANDARDS v1 → Hero + Gallery |
| IMG-007 | Blog card + Gallery grid | assets/images/projects/control-work.jpg | 1600×2133 + 358.0 KB | 3:4 | Portrait vs 4:3 target | Crop to 4:3; keep technician/work area centered | GLOBAL-STANDARDS v1 → Gallery/Service thumbs |
| IMG-008 | Gallery grid | assets/images/projects/IMG_8262.jpg | 2048×1536 + 912.2 KB | 4:3 | Oversize; file size high | Downscale and compress to 4:3 target | GLOBAL-STANDARDS v1 → Gallery |
| IMG-009 | Gallery grid | assets/images/projects/IMG_0567.jpg | 1536×2048 + 714.1 KB | 3:4 | Portrait vs 4:3 target + large file size | Crop to 4:3; downscale to target px | GLOBAL-STANDARDS v1 → Gallery |
| IMG-010 | Gallery grid + Home about image | assets/images/projects/service-after.jpg | 1600×1200 + 228.9 KB | 4:3 | None observed | Keep 4:3; minor crop for consistency | GLOBAL-STANDARDS v1 → Gallery |
| IMG-011 | Gallery grid | assets/images/projects/service-upgrade-before.jpg | 1600×2133 + 350.0 KB | 3:4 | Portrait vs 4:3 target | Crop to 4:3; keep panel centered | GLOBAL-STANDARDS v1 → Gallery |
| IMG-012 | Gallery grid | assets/images/projects/barn-photo.jpg | 1536×2048 + 924.2 KB | 3:4 | Portrait vs 4:3 + large file size | Crop to 4:3; downscale | GLOBAL-STANDARDS v1 → Gallery |
| IMG-013 | Gallery grid | assets/images/projects/3-phase-service.jpg | 1600×2133 + 252.3 KB | 3:4 | Portrait vs 4:3 target | Crop to 4:3 | GLOBAL-STANDARDS v1 → Gallery |
| IMG-014 | Gallery grid | assets/images/projects/480v-3-phase.jpg | 1600×2133 + 691.8 KB | 3:4 | Portrait vs 4:3 + large file size | Crop to 4:3; compress | GLOBAL-STANDARDS v1 → Gallery |
| IMG-015 | Gallery grid | assets/images/projects/conduit.jpg | 1600×2133 + 370.4 KB | 3:4 | Portrait vs 4:3 | Crop to 4:3 | GLOBAL-STANDARDS v1 → Gallery |
| IMG-016 | Gallery grid | assets/images/projects/conduit-piping.jpg | 1600×2133 + 304.2 KB | 3:4 | Portrait vs 4:3 | Crop to 4:3 | GLOBAL-STANDARDS v1 → Gallery |
| IMG-017 | Gallery grid | assets/images/projects/dust-collector-motor.jpg | 1600×1200 + 304.4 KB | 4:3 | Slightly large | Downscale to 4:3 target | GLOBAL-STANDARDS v1 → Gallery |
| IMG-018 | Gallery grid | assets/images/projects/dust-collector-system.jpg | 1600×2133 + 432.7 KB | 3:4 | Portrait vs 4:3 + large file size | Crop to 4:3; compress | GLOBAL-STANDARDS v1 → Gallery |
| IMG-019 | Gallery grid | assets/images/projects/motor.jpg | 1600×2133 + 219.5 KB | 3:4 | Portrait vs 4:3 | Crop to 4:3 | GLOBAL-STANDARDS v1 → Gallery |
| IMG-020 | Gallery grid | assets/images/projects/pipe-rack.jpg | 1600×2133 + 290.1 KB | 3:4 | Portrait vs 4:3 | Crop to 4:3 | GLOBAL-STANDARDS v1 → Gallery |
| IMG-021 | Gallery grid | assets/images/projects/piping.jpg | 1600×2133 + 278.2 KB | 3:4 | Portrait vs 4:3 | Crop to 4:3 | GLOBAL-STANDARDS v1 → Gallery |
| IMG-022 | Gallery grid | assets/images/projects/selenoids.jpg | 1600×2133 + 328.9 KB | 3:4 | Portrait vs 4:3 | Crop to 4:3 | GLOBAL-STANDARDS v1 → Gallery |
| IMG-023 | Gallery grid | assets/images/projects/transformer.jpg | 1600×2133 + 381.0 KB | 3:4 | Portrait vs 4:3 | Crop to 4:3 | GLOBAL-STANDARDS v1 → Gallery |
| IMG-024 | Gallery grid | assets/images/projects/electrical-project-49-1200.jpg | 1600×1200 + 335.2 KB | 4:3 | Slightly large | Downscale to 4:3 target | GLOBAL-STANDARDS v1 → Gallery |
| IMG-025 | Gallery grid | assets/images/projects/IMG_8164.jpg | 1536×2048 + 673.2 KB | 3:4 | Portrait vs 4:3 + large file size | Crop to 4:3; compress | GLOBAL-STANDARDS v1 → Gallery |
| IMG-026 | Gallery grid | assets/images/projects/lighting.jpg | 1600×1200 + 241.1 KB | 4:3 | None observed | Keep 4:3; minor crop for consistency | GLOBAL-STANDARDS v1 → Gallery |
| IMG-027 | Gallery grid | assets/images/projects/fire-response.jpg | Unknown (file unreadable; 0 KB on disk) | Unknown | File appears corrupted/unreadable | **REPLACE REQUIRED**: file cannot be decoded; re-export from original | GLOBAL-STANDARDS v1 → Gallery |
| IMG-028 | Gallery grid | assets/images/projects/led-shelves.jpg | 1600×1200 + 179.1 KB | 4:3 | None observed | Keep 4:3; minor crop for consistency | GLOBAL-STANDARDS v1 → Gallery |

4) GLOBAL-STANDARDS v1 (single source of truth; referenced later)
A) Aspect ratios
- Hero/header: **16:9** with a mobile-safe crop rule (center 60% of focal subject remains within 4:5 safe area).
- Gallery/portfolio: **4:3**.
- Service thumbnails (if present): **4:3** to match gallery and reduce layout variation.

B) Photo treatment (applies to ALL existing images)
- Slight brightness lift (+5–8%); cleaner whites; consistent warmth; no heavy filters.
- Straighten verticals/horizons; crop edge clutter; consistent framing rule (subject centered or rule-of-thirds, keep electrical work legible).

C) Text-on-image readability
- Add subtle black/charcoal gradient overlay for hero text **only when** contrast is insufficient (e.g., light backgrounds). Opacity range: **35–55%**.
- Minimum mobile readability: body text passes WCAG AA contrast using overlay + font-weight (no palette changes).

D) UI polish (no palette changes)
- Icons (if present): single style, consistent sizing and stroke weight; neutral colors from existing palette.
- Typography (no font changes): use standardized weights; enforce H1/H2 hierarchy; mobile line-height targets 1.3–1.4 for headings, 1.5–1.7 for body.

E) Image performance rules
- Convert to **WEBP** (and AVIF only if current build already supports it without restructuring).
- Size caps: **most images 200–300 KB**; **hero 300–450 KB**.
- Responsive images (`srcset`/`sizes`) for key visuals.
- Lazy-load below-the-fold images.

5) Page-by-Page Graphics Action List (references IMG Audit IDs; no repeated standards)
- **Home (index.html):**
  - IMG-001 KEEP.
  - IMG-002 KEEP → RECROP → REEXPORT (Hero 16:9 per GLOBAL-STANDARDS v1).
  - IMG-010 KEEP → RECROP → REEXPORT (Gallery 4:3 per GLOBAL-STANDARDS v1).
- **Services (services.html) + Service detail pages (panel-upgrades.html, ev-chargers.html, lighting.html):**
  - IMG-001 KEEP.
  - IMG-002 KEEP → RECROP → REEXPORT (Hero 16:9 per GLOBAL-STANDARDS v1).
- **Contact/Booking/Testimonials/Financing/Emergency/FAQ/Service Areas/404/Styleguide:**
  - IMG-001 KEEP.
  - IMG-002 KEEP → RECROP → REEXPORT (Hero 16:9 per GLOBAL-STANDARDS v1).
- **Blog landing (blog.html):**
  - IMG-001 KEEP.
  - IMG-003 KEEP → RECROP → REEXPORT (Hero 16:9 per GLOBAL-STANDARDS v1).
  - IMG-004/IMG-005/IMG-006/IMG-007 KEEP → RECROP → REEXPORT (4:3 per GLOBAL-STANDARDS v1).
- **Blog detail pages (blog-*.html):**
  - IMG-001 KEEP.
  - IMG-003 KEEP → RECROP → REEXPORT (Hero 16:9 per GLOBAL-STANDARDS v1).
- **Gallery (gallery.html):**
  - IMG-003 through IMG-028: KEEP → RECROP → REEXPORT (4:3 per GLOBAL-STANDARDS v1), **except** IMG-027 REPLACE REQUIRED (corrupted file).

Allowed micro-adjustments (within existing structure): normalize padding around existing sections; alignment refinements for image presentation.

6) Implementation-Ready Asset Processing Plan (deterministic)
- **File naming convention:**
  - `hero-{page}.webp`
  - `services-{service-name}.webp`
  - `gallery-{topic}-{nn}.webp`
- **Export priority queue:**
  1) Above-the-fold hero + first viewport images.
  2) Services section images.
  3) Gallery/portfolio images.
  4) Secondary page visuals.
- **Export settings (exact):**
  - HERO: 16:9, max 1920 px wide (desktop), 1280 px (tablet), 768 px (mobile); **300–450 KB cap**, WEBP quality 70–80.
  - GALLERY/SERVICE THUMBNAILS: 4:3, max 1200 px wide; **200–300 KB cap**, WEBP quality 70–80.
- **Graphics verification checklist:**
  - Hero text legible on mobile; consistent crops; no compression artifacts; palette/structure unchanged.

7) Lighthouse Remediation Plan (modular, audit-ready, Netlify/static)
Issue → Why it matters → Exact fix → Where to implement → Code/config snippet → How to verify.

7A) Performance Optimization
- **Render-blocking CSS/JS** → blocks First Paint → Inline critical CSS + `defer` non-essential JS → `index.html` + `script.js` loading →
```
<link rel="preload" href="styles.css" as="style">
<link rel="stylesheet" href="styles.css">
<script src="script.js" defer></script>
```
→ Verify in Edge DevTools: Network waterfall + Lighthouse Performance.

- **Font loading** → delays text rendering → preload critical font + `font-display: swap` → HTML `<head>` →
```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
```
→ Verify: Lighthouse Performance + no FOIT in Rendering panel.

- **Responsive images + lazy loading** → reduce LCP/data → implement `srcset`/`sizes` and `loading="lazy"` below the fold → HTML templates → (reference GLOBAL-STANDARDS v1, Image performance rules) → Verify: Network tab shows smaller image variants and `img` requests lazy-load.

- **Caching for immutable assets** → improve repeat visits → Netlify headers for `/assets/*` → `_headers` or `netlify.toml` →
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```
→ Verify: Network tab → Response Headers for static assets.

- **Preconnect/preload key assets** → reduce latency → HTML head for critical hero and fonts →
```
<link rel="preload" as="image" href="assets/images/hero.jpg">
```
→ Verify: Network tab shows preload before render.

7B) Accessibility Enhancements
- **Accessible names for all buttons/links** → supports screen readers → ensure `aria-label` or visible text for icons → HTML templates → Verify: Lighthouse Accessibility + Accessibility tree.
- **Replace `<div>` clickables** → semantics → use `<button>`/`<a>` → HTML templates → Verify: Keyboard navigation and focus order.
- **ARIA roles + landmarks + heading order** → logical nav → ensure single H1 + hierarchical H2/H3 → HTML templates → Verify: Lighthouse + Accessibility tree.
- **Descriptive alt text** → image context → update `alt` attributes for imagery → HTML templates → Verify: Axe/Accessibility tree.
- **Keyboard navigation + focus visibility** → usability → ensure visible focus state (no palette change) → `styles.css` → Verify: Tab through page.
- **Contrast compliance without palette change** → readability → use overlays/weights/underlines (GLOBAL-STANDARDS v1) → `styles.css` → Verify: Lighthouse Accessibility.

7C) Best Practices Fixes (baseline 83)
- **Security headers** → prevent common attacks → Netlify `_headers` or `netlify.toml` →
```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; img-src 'self' https: data:; script-src 'self' https:; style-src 'self' https: 'unsafe-inline'
```
→ Verify: Security headers in Network response + Lighthouse Best Practices.

- **HTTPS-only third-party** → avoid mixed content → confirm all external assets use HTTPS → HTML templates → Verify: Console (no mixed-content warnings).

- **Remove deprecated JS patterns** → avoid console warnings → audit `script.js` for deprecated APIs → Verify: Console clean.

7D) SEO Improvements (baseline 92)
- **Unique `<title>` + `<meta name="description">` per page** → CTR + indexing → confirm per HTML file → `<head>` → Verify: View Source + Lighthouse SEO.
- **Canonical URLs** → avoid duplicates → ensure canonical on every page (add to `styleguide-top-tier-electrical.html`) → HTML templates →
```
<link rel="canonical" href="https://www.top-tierelectrical.com/<page>">
```
→ Verify: View Source.

- **Open Graph + Twitter metadata** → social previews → add per page → HTML head → Verify: View Source + OG validators.
- **JSON-LD structured data** → rich results → add `LocalBusiness` + `Service` templates with placeholders → HTML head/layout partial →
```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "<Business Name>",
  "url": "<Canonical URL>",
  "telephone": "<Phone>",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<Street>",
    "addressLocality": "<City>",
    "addressRegion": "<State>",
    "postalCode": "<ZIP>",
    "addressCountry": "US"
  }
}
</script>
```
→ Verify: Rich Results Test + Lighthouse SEO.

- **Robots/sitemap** → crawlability → ensure `robots.txt` and `sitemap.xml` are deployed and referenced → repo root → Verify: `https://site/robots.txt` + `https://site/sitemap.xml`.

7E) Netlify Deployment Hygiene
- **Production minification** → faster loads → ensure build tool minifies assets → build config/package.json → Verify: view source (minified) + Lighthouse.
- **Disable source maps in production** → security → build config → Verify: no `*.map` in Network.
- **Suppress dev-only logs** → cleanliness → env vars in Netlify UI → Verify: Console clean.
- **Validate redirects/headers** → ensure `_headers` or `netlify.toml` applied → deploy preview + production → Verify: headers present in Network tab.
- **Confirm caching headers** → align with audit → verify cache headers on static assets → Network tab (tie to §2 table when provided).

8) Continuous Verification + Excel Tracking (Windows 11 workflow)
- **Repeatable deploy checklist:**
  - Run Lighthouse on Home, Services, Contact, and one service detail page.
  - Record Performance/Accessibility/Best Practices/SEO in Excel.
  - Regression checks: WEBP served; cache headers present; no console errors; keyboard navigation; metadata exists.
- **Excel tracking format (simple):**
  - Columns: Date | Page | Performance | Accessibility | Best Practices | SEO | Notes.
- **Edge DevTools validation steps:**
  - Network tab: filter by Images/CSS/JS; confirm cache headers.
  - Lighthouse tab: re-run after deploy.
  - Console: no errors or mixed content.
  - Accessibility tree: headings, landmarks, alt text.


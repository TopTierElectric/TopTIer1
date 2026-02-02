# Top Tier Electrical — Audit, Brand System, and Cloudflare Implementation Plan

## 1) Executive summary (prioritized, ≤12 bullets)
1. Align site colors with the **logo-derived gold** and premium black/white palette; replace the current orange secondary color to restore brand consistency across all pages.
2. Simplify the CTA hierarchy: **primary = Call/Book**, **secondary = Request Estimate**, and remove redundant CTAs competing above the fold.
3. Replace placeholder form endpoints on every lead form to prevent silent lead loss; wire to a Cloudflare Worker, CRM, or form provider.
4. Add **visible trust proof above the fold** (MI License #631210, Licensed & Insured, 2‑Year Warranty) on all hero sections.
5. Standardize imagery: **16:9 hero** and **4:3 gallery/service** crops; introduce responsive `srcset` and lazy-loading to improve LCP.
6. Upgrade header/nav conversion behavior: reduce clutter, add a persistent “Call” and “Book” CTA, and surface phone for mobile.
7. Apply **accessibility-first color and contrast rules** for gold usage; define focus states and tap-target sizing globally.
8. Add a premium typography pairing for headings + body to elevate perceived quality while maintaining readability.
9. Implement Cloudflare-ready cache rules, CSP, and security headers with safe allowlists for analytics/maps/forms.
10. Add structured data upgrades on service detail pages to improve service-level SEO relevance.

---

## 2) Audit findings by page (Issues → Fix → Copy/paste spec)

### Top 10 conversion changes (minimal dev time, highest lift)
1. Replace **all placeholder form endpoints** with a real destination (Worker or CRM). 
2. Add **hero CTA row**: Call + Book above the fold on every primary page.
3. Add **MI License #631210 + warranty** line directly under hero headline.
4. Standardize **CTA copy**: “Book Walkthrough” (primary), “Request Estimate” (secondary), “Call Now” for emergency.
5. Add **phone tap-to-call** button in header for mobile and sticky bar on every page.
6. Reduce nav links on desktop to top 5–7 items and move secondary links to footer.
7. Replace emoji icons with **consistent outline icons**; premium perception boost.
8. Implement **responsive images** on hero + gallery and lazy-load below the fold.
9. Add a **“What happens next”** panel after every form to reduce abandonment.
10. Add **real testimonials or verified review embed**; currently no proof content on testimonials page.

---

### Home (index.html)
**Issues**
- Competing CTA paths: hero form + quick action bar + sticky bar offer multiple actions at once.
- Trust proof is below the fold; emoji-based badges feel less premium.
- Placeholder form endpoint risks lost leads.

**Fix**
- Keep hero CTAs to **Call / Book**; move the short form below with “Request Estimate.”
- Add hero trust line with license + warranty.
- Replace emoji icons with outline icon set.

**Copy/paste spec (layout + tokens)**
- Add hero CTA row:
  - Primary: `Book Walkthrough` (`btn-primary`, Gold 600 background, Ink 900 text)
  - Secondary: `Call Now` (`btn-secondary`, Gold 600 border, Ink 900 text)
- Add trust line:
  - `<div class="hero-trust">MI License #631210 • Licensed & Insured • 2-Year Warranty • West Michigan</div>`
- Form note:
  - `<p class="form-reassurance">We reply within 1 business day.</p>`

**Why it matters**
- Removing CTA competition and placing trust proof above the fold reduces friction and increases lead completion.

**Effort**: S | **Impact**: High

---

### Services (services.html)
**Issues**
- No CTA above the fold; booking is only after the service list.
- Service list lacks visual hierarchy for a premium presentation.

**Fix**
- Add hero CTA row (Book Walkthrough / Request Estimate).
- Convert service list to card-based layout with icon + scope bullets.

**Copy/paste spec**
- Add `.hero-cta-row` with primary/secondary CTAs.
- Service card tokens: `background: --neutral-0`, `border: 1px solid --neutral-200`, `box-shadow: 0 12px 30px rgba(4,23,42,0.08)`.

**Effort**: M | **Impact**: High

---

### Service detail pages (panel-upgrades.html, ev-chargers.html, lighting.html, generators.html, energy-solutions.html, energy-consulting.html, electrical-repairs.html)
**Issues**
- CTAs are inconsistent across pages; some rely on generic “Schedule Service.”
- Limited service-specific proof (scope guarantees, safety checks, permit handling).

**Fix**
- Standardize CTA hierarchy: **Book Walkthrough** (primary), **Request Estimate** (secondary), **Call Now** (tertiary).
- Add 3 proof bullets (permit handling, clean jobsite, code-aware).

**Copy/paste spec**
- Add a `.service-proof` list:
  - “Permits + inspection coordination”
  - “Clean, organized jobsite”
  - “Code-aware workmanship”

**Effort**: S | **Impact**: High

---

### Service Areas (service-areas.html)
**Issues**
- CTA “Check My Area” is generic and not tied to travel/coverage rules.
- Map embed is not paired with scheduling expectations.

**Fix**
- Add coverage rules section and CTA copy that clarifies scope.

**Copy/paste spec**
- CTA row:
  - `<a class="btn-primary" href="tel:+16163347159">Call to Confirm Availability</a>`
  - `<a class="btn-secondary" href="contact.html">Request Scope Review</a>`
- Coverage note:
  - “Typical response window: 1–3 business days. Travel fees may apply outside listed areas.”

**Effort**: S | **Impact**: Medium

---

### Contact (contact.html)
**Issues**
- Placeholder form endpoint; lead loss risk.
- No reassurance about response time.

**Fix**
- Wire to Worker/CRM and add reassurance line.

**Copy/paste spec**
- `<p class="form-reassurance">We reply within 1 business day.</p>`

**Effort**: S | **Impact**: High

---

### Booking (booking.html)
**Issues**
- Long form with no visible “what happens next” confirmation.

**Fix**
- Add confirmation panel and short scope note.

**Copy/paste spec**
- “After you submit, we’ll confirm a time window within 1 business day and clarify scope by phone or email.”

**Effort**: S | **Impact**: Medium

---

### Testimonials (testimonials.html)
**Issues**
- Page is a guideline list without actual reviews.

**Fix**
- Add 3–5 testimonials or embed verified review feed.

**Copy/paste spec**
- Add `.testimonial-card` with name, location, service type, star rating, 2–3 sentence quote.

**Effort**: M | **Impact**: High

---

### Financing (financing.html)
**Issues**
- CTA is not tied to qualifying steps or rate transparency (trust gap).

**Fix**
- Add “Check eligibility” CTA and clarify “soft pull / no impact” if applicable.

**Copy/paste spec**
- `<a class="btn-primary" href="contact.html">Request Financing Options</a>`

**Effort**: S | **Impact**: Medium

---

### Emergency (emergency.html)
**Issues**
- No availability statement or response-time expectation.

**Fix**
- Add availability note and fallback response commitment.

**Copy/paste spec**
- “If lines are busy, leave a voicemail—we return urgent calls within 30 minutes.”

**Effort**: S | **Impact**: Medium

---

### Gallery (gallery.html)
**Issues**
- Mixed aspect ratios and no `srcset` for images; slow and inconsistent.

**Fix**
- Enforce 4:3 crops and add responsive `srcset` + `loading="lazy"`.

**Copy/paste spec**
- `<img src="...-800.webp" srcset="...-600.webp 600w, ...-800.webp 800w, ...-1200.webp 1200w" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" decoding="async">`

**Effort**: M | **Impact**: Medium

---

### FAQ (faq.html)
**Issues**
- FAQ content lacks strong routing to services or next steps.

**Fix**
- Add service links and CTA “Request Scope Review.”

**Copy/paste spec**
- `<a class="btn-secondary" href="contact.html">Request Scope Review</a>`

**Effort**: S | **Impact**: Medium

---

### Blog (blog.html + blog-*.html)
**Issues**
- Blog cards lack category and reading time; hero images vary in aspect ratio.

**Fix**
- Add category labels + reading time; standardize hero image to 16:9.

**Copy/paste spec**
- `<span class="blog-meta">Safety • 6 min read</span>`

**Effort**: M | **Impact**: Low/Medium

---

### 404 (404.html)
**Issues**
- No CTA beyond navigation; missed recovery opportunity.

**Fix**
- Add “Call Now” + “Book Service” CTA.

**Effort**: S | **Impact**: Medium

---

### About page (missing)
**Issues**
- No About page exists, which is a high-trust expectation for premium residential clients.

**Fix**
- Create `about.html` with company story, licensing, and process.

**Effort**: M | **Impact**: High

---

## 3) New design system (tokens + rules)

### A) Color system (derived from logo)
**Primary gold extraction**
- Logo gold sampled from `TopTierElectrical_logo_gold_qb_transparent.png`: **Gold 600 = #D2AF37** (RGB 210,175,55).

**Gold scale (50–900)**
- 50: #FBF6E5
- 100: #F7ECC6
- 200: #F0DA8E
- 300: #E7C85F
- 400: #DAB544
- 500: #D2AF37
- 600: #B08D2A
- 700: #8C6E20
- 800: #685016
- 900: #46360E

**Neutral scale (warm)**
- 50: #FAF8F4
- 100: #F3EFE8
- 200: #E2DDD4
- 300: #CFC8BC
- 400: #B5AC9D
- 500: #9A9080
- 600: #756C5F
- 700: #5B5348
- 800: #3E3830
- 900: #221E19

**Neutral scale (cool/ink)**
- Ink 900: #0E1A24
- Ink 800: #1A2A3A
- Ink 700: #24384E
- Ink 600: #2E4762
- Ink 500: #3B5A78

**Functional colors (complementary, non-clashing)**
- Success: #2F7D4E
- Warning: #C07A00
- Error: #B23A2B
- Info: #2B5F8A

**Contrast-safe guidance (WCAG)**
- Approved text on white: Ink 900, Ink 800, Neutral 800.
- Approved text on dark: White or Gold 100.
- Button text rules: **Use Ink 900 on Gold 500/600** (avoid white text on gold).

**Do / Don’t examples**
- ✅ Do: Gold 600 button with Ink 900 text.
- ❌ Don’t: Gold 500 button with white body-size text.

---

### B) Typography system (premium + readable)
**Pairing 1 (recommended)**
- Headings: `Playfair Display` (700)
- Body: `Inter` (400/500/600)

**Pairing 2 (alternate)**
- Headings: `DM Serif Display` (400)
- Body: `Manrope` (400/500/600)

**Type scale (desktop)**
- H1: 52/60
- H2: 40/48
- H3: 32/40
- H4: 24/32
- H5: 20/28
- H6: 18/26
- Body: 18/30
- Small: 14/22
- Button: 16/20, 600 weight
- Overline: 12/16, 600 weight, letter-spacing: 0.12em

**Type scale (mobile)**
- H1: 36/44
- H2: 28/36
- H3: 24/32
- H4: 20/28
- Body: 16/26

---

### C) Graphic language
**Logo usage rules (attached marks only)**
- Use **only** provided marks: gold, black, white.
- Do not redraw, rotate, or alter proportions.
- Clear space: 1× the height of the “T” around the mark.
- Minimum sizes: 120px wide (desktop), 96px wide (mobile).
- Backgrounds:
  - Gold mark on white or dark ink backgrounds only.
  - Black mark on white/neutral only.
  - White mark on dark ink only.

**Icon style**
- Outline icons, 1.75px stroke, rounded caps, 2px radius.
- Use Ink 800 for default and Gold 600 for emphasis.

**Shapes**
- Badge motifs: 8px radius for cards, 999px for pills.

**Patterns**
- Subtle dot grid using Gold 100 at 6–8% opacity.

**Photo direction (20-shot list)**
1. Master electrician reviewing panel with homeowner (horizontal, shallow depth).
2. Clean breaker labeling detail (gold-accented label tape).
3. EV charger install in finished garage with warm ambient light.
4. Under-cabinet lighting close-up with warm color temp.
5. Exterior soffit lighting at dusk.
6. Whole-home panel upgrade before/after (neutral background).
7. Crew in clean uniforms, boots, safety glasses on site.
8. Custom home mechanical room overview.
9. Conduit runs in commercial kitchen.
10. Generator pad with clean conduit sweep.
11. Electrician inspecting GFCI with homeowner visible.
12. Lighting layout meeting at kitchen island (plans visible).
13. Smart switch installation close-up.
14. Exterior service entrance mast with clean alignment.
15. EV charger load calculation sheet on clipboard.
16. Electrical walk-through at custom build (hard hats, clean site).
17. Finished panel with clear labeling + torque verification tag.
18. Outdoor patio lighting at night (warm temperature).
19. Dedicated circuit for workshop tools.
20. “Before/after” with clean drywall patching around fixtures.

**Component styling rules**
- Border radius: 12px for cards, 20px for hero CTAs.
- Shadow: `0 20px 40px rgba(14,26,36,0.12)`.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Section padding: 80px desktop / 56px mobile.

---

## 4) Cloudflare implementation pack

### Cache/header matrix by file type
| File type | Cache-Control | TTL | Notes |
| --- | --- | --- | --- |
| HTML | `max-age=0, must-revalidate` | 0 | Always revalidate | 
| CSS/JS | `max-age=31536000, immutable` | 1 year | Use versioned file names | 
| Images | `max-age=31536000, immutable` | 1 year | AVIF/WebP | 
| Fonts | `max-age=31536000, immutable` | 1 year | Self-hosted WOFF2 | 

### Redirect rules outline
- Force **apex or www** (choose one):
  - `www.toptier-electrical.com/* → toptier-electrical.com/$1` (301)
- Enforce **HTTPS** at edge.
- Normalize **trailing slashes** (choose one standard).
- Keep existing `/home → /` and legacy redirects in `_redirects`.

### Recommended Cloudflare toggles (use/avoid)
- **Enable**: Brotli, HTTP/3, Early Hints.
- **Enable (if available)**: Polish (quality 75–85), Mirage for image-heavy pages.
- **Avoid**: Rocket Loader unless JS is tested and minimal.

### Asset strategy (Cloudflare-aware)
- Images: AVIF primary with WebP fallback.
- Fonts: self-host WOFF2; preload only heading + body fonts.
- CSS/JS: inline critical hero CSS; defer non-critical JS.

### Security & trust headers
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; frame-src https://www.google.com https://maps.google.com; connect-src 'self' https://cloudflareinsights.com; base-uri 'self'; form-action 'self' https://formsubmit.co
Permissions-Policy: geolocation=(), camera=(), microphone=()
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### SEO + deliverability
- Maintain canonical tags site-wide.
- Add `Service` schema per service page; FAQ schema for FAQ sections.
- Ensure HTML is revalidated so meta updates are not cached incorrectly.

### Observability
- Lighthouse plan: desktop + mobile runs after image + CSS updates.
- Cloudflare Web Analytics: enable privacy-friendly beacons.
- Optional RUM: `web-vitals` to a Worker endpoint.

---

## 5) Final checklists

### 90-minute quick win checklist
- Replace placeholder form endpoints with real destinations.
- Add hero CTA row on all primary pages.
- Add license + warranty line above the fold.
- Add form reassurance line (response time).
- Replace emoji icons with outline icon set.

### 2-week upgrade checklist
- Implement full brand palette + typography updates in CSS.
- Re-export all hero and gallery images to standard aspect ratios.
- Add responsive `srcset` images and lazy loading.
- Add Service + FAQ schema on detail pages.
- Create About page + add real testimonials.

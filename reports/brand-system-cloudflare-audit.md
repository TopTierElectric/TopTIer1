# Top Tier Electrical — Audit, Brand System, and Cloudflare Implementation Plan

## 1) Executive summary (prioritized)

1. **Unify brand palette to the logo gold + premium black/white** and replace the current orange secondary color so the UI matches the logo marks across pages and components. (Logo file is `assets/images/TopTierElectrical_logo_gold_qb_transparent.png`; current palette uses `--secondary: #f47037`.)
2. **Clarify above-the-fold CTA hierarchy**: hero form + booking CTA compete; standardize “Call / Book / Estimate” order and emphasize phone for mobile. (Home hero + quick action bar + sticky bar currently compete.)
3. **Replace placeholder form endpoints** (`formsubmit.co/your-email@example.com`) with a real submission target (Cloudflare Workers, Forms, or CRM) to avoid lead-loss risk on all lead-capture pages.
4. **Strengthen trust proof placement**: surface MI license + warranty near the hero and repeat once in the CTA block (not only in trust strips) to reinforce credibility before the user scrolls.
5. **Create a premium photo direction** and gallery curation rules (consistent 16:9 heroes, 4:3 gallery) to match high-end residential expectations; current gallery mix is inconsistent.
6. **Improve accessibility contrast for gold-on-white and gold-on-light backgrounds** via a defined gold scale and alternative text colors; define focus states globally (currently absent).
7. **Update header/nav behavior for conversion**: add a sticky CTA button in header on desktop and simplify nav choices to reduce cognitive load. (Current nav has 12+ items.)
8. **Optimize Cloudflare cache and asset strategy**: keep HTML short-ttl, immutable assets long-ttl (already set), add rules for fonts and images, and ensure CSP covers analytics + form endpoints.
9. **Map page-specific CTAs to user intent** (Emergency/Booking/Service detail) with consistent copy and benefit cues, not only “Schedule Service.”
10. **Add structured data upgrades** for services + FAQs on service detail pages and local business contact enhancements to improve SERP trust elements and service relevance.

---

## 2) Audit findings by page (Issues → Fix → Copy/paste spec)

### Home (index.html)

**Issues**

- Hero form and quick action bar compete; the hero CTA is form-only while the quick actions and sticky bar offer call/book/emergency options, creating multiple competing paths.
- No visible license number or warranty above the fold; trust badges are lower and use emoji-only icons (less premium).
- Form action uses placeholder endpoint, risking lost leads.

**Fix**

- Make primary CTA “Call or Book” with a secondary “Request Estimate” form below the hero. Make the form optional and reduce fields to name + phone/email.
- Add a compact trust bar under the hero headline with “MI License #6220430 • Licensed & Insured • 2-Year Warranty.”
- Replace emoji-based icons with a consistent stroke icon set.

**Copy/paste spec (layout + tokens)**

- Hero CTA layout:
  - `.hero-cta-primary` = Primary button (Gold 600 bg, Ink text)
  - `.hero-cta-secondary` = Outline button (Gold 600 border, Ink text)
  - `.hero-form` = vertical stack with 16px gap, label text 12px uppercase
- Trust bar (new):
  - `<div class="hero-trust">MI License #6220430 • Licensed & Insured • 2-Year Warranty • Local West Michigan</div>`
  - Background: `--neutral-50`, text: `--ink-900`

**Why it matters**

- Reducing competing CTA paths increases conversion by reducing decision friction and clarifying the next action.

**Effort**: S
**Impact**: High

---

### Services (services.html)

**Issues**

- Primary CTA is “Book service” at the end; hero lacks immediate action. Users must scroll for a booking path.
- Service list uses plain text without visual hierarchy (no cards or icons) for premium positioning.

**Fix**

- Add CTA buttons in hero (“Book Walkthrough”, “Request Estimate”).
- Convert service list to card-based layout with icon + spec callouts.

**Copy/paste spec**

- Add `.hero-cta-row` in hero:
  - Primary: `Book Walkthrough`
  - Secondary: `Request Estimate`
- Service card tokens:
  - Background: `--neutral-0`
  - Border: `1px solid --neutral-200`
  - Shadow: `0 12px 30px rgba(4,23,42,0.08)`

**Why it matters**

- Service overview pages convert better when scannable and clearly mapped to action.

**Effort**: M
**Impact**: High

---

### Service Areas (service-areas.html)

**Issues**

- Map is embedded but not paired with a trust/coverage checklist; CTA “Check My Area” is generic and not anchored to scope clarifications.

**Fix**

- Add “Coverage rules” section (radius, response times, trip fee info) and CTA copy “Confirm Availability” with phone + form options.

**Copy/paste spec**

- CTA row:
  - `<a class="btn-primary" href="tel:+16163347159">Call to Confirm Availability</a>`
  - `<a class="btn-secondary" href="contact.html">Request Scope Review</a>`

**Effort**: S
**Impact**: Medium

---

### Contact (contact.html)

**Issues**

- Form action placeholder is not a real endpoint; conversion risk.
- Form button text is generic (“Request a Quote”) without any reassurance line about response time.

**Fix**

- Implement real endpoint (Cloudflare Worker or CRM) and add reassurance line (“We reply within 1 business day”).

**Copy/paste spec**

- Add `<p class="form-reassurance">We reply within 1 business day.</p>` above the submit button.

**Effort**: S
**Impact**: High

---

### Booking (booking.html)

**Issues**

- Booking form is long without any explanation of next steps; users may abandon after inputting date/time without confirmation on what happens next.

**Fix**

- Add a “What happens next” panel and a confirmation message after submit.

**Copy/paste spec**

- `"After you submit, we’ll confirm a time window within 1 business day and clarify scope by phone or email."`

**Effort**: S
**Impact**: Medium

---

### Testimonials (testimonials.html)

**Issues**

- The page is a guidelines page without actual testimonials; it doesn’t deliver proof or social validation.

**Fix**

- Add at least 3 real testimonials, or embed a Google review summary widget. If unavailable, move this page to a hidden “feedback guidelines” page.

**Copy/paste spec**

- Add `.testimonial-card` with photo, name, location, service type, and star rating.

**Effort**: M
**Impact**: High

---

### Emergency (emergency.html)

**Issues**

- Emergency page uses “Call now” but lacks the expected “availability” statement or disclaimer about hours and response timeline.

**Fix**

- Add a short availability line and a fallback plan: “If unavailable, we will return your call within X minutes.”

**Effort**: S
**Impact**: Medium

---

### Gallery (gallery.html)

**Issues**

- Gallery is image-heavy with inconsistent aspect ratios and missing srcset; impacts premium feel and performance.

**Fix**

- Enforce 4:3 crop, add `srcset`, and implement lazy-loading below the fold.

**Effort**: M
**Impact**: Medium

---

### FAQ (faq.html)

**Issues**

- FAQ answers are general; no service detail links or CTA follow-through. (CTA needed at the end of FAQ.)

**Fix**

- Add CTA links and anchor to “Request Scope Review.”

**Effort**: S
**Impact**: Medium

---

### Blog (blog.html + blog detail pages)

**Issues**

- Blog cards lack category and reading time; hero imagery is inconsistent across posts (per audit).

**Fix**

- Add consistent category labels, reading time, and upgrade imagery standards.

**Effort**: M
**Impact**: Low/Medium

---

## 3) New design system (tokens + rules)

### A) Color system (derived from logo)

**Primary gold extraction**

- Sampled from `TopTierElectrical_logo_gold_qb_transparent.png`: **Gold 600 = #D2AF37** (RGB 210,175,55).

**Gold scale (50–900)**

- 50: #FBF6E5
- 100: #F7ECC6
- 200: #F0DA8E
- 300: #E7C85F
- 400: #DAB544
- 500: #D2AF37 (primary)
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

- Approved text on white: Ink 900 (#0E1A24), Ink 800, Neutral 800.
- Approved text on dark: White (#FFFFFF) or Gold 100.
- Avoid white text on Gold 500+ for body copy; use Ink 900 for button text on Gold 500/600.

**Do / Don’t examples**

- ✅ Do: `Gold 600` button with `Ink 900` text.
- ❌ Don’t: `Gold 500` button with white text for body-size labels (contrast risk).

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

**Icon style**

- Outline icons, 1.75px stroke, rounded caps, 2px radius.
- Use Ink 800 for default and Gold 600 for emphasis.

**Shapes**

- Badge motifs referencing logo circle: 8px corner radius for cards, 999px for badges.

**Patterns**

- Subtle dot grid using Gold 100 at 6–8% opacity; avoid loud gradients.

**Photo direction (20-shot list)**

1. Master electrician reviewing panel with homeowner (horizontal, shallow depth).
2. Detail of clean breaker labeling with gold-accented label tape.
3. EV charger install in finished garage with warm ambient light.
4. Under-cabinet lighting close-up with warm color temp.
5. Exterior soffit lighting at dusk (soft glow).
6. Whole-home panel upgrade before/after with neutral background.
7. Crew in clean uniforms, boots, and safety glasses on site.
8. Custom home mechanical room overview (high-end finishes).
9. Detail of conduit runs in a commercial kitchen.
10. Generator pad with clean conduit sweep.
11. Electrician inspecting GFCI outlet with homeowner visible.
12. Lighting layout meeting at kitchen island (plans visible).
13. Smart switch installation close-up.
14. Exterior service entrance mast with clean alignment.
15. EV charger load calculation sheet on clipboard.
16. Electrical walk-through at custom build (hard hats, clean site).
17. Finished panel with clear labeling and torque verification tag.
18. Outdoor patio lighting at night (warm temperature).
19. Dedicated circuit for workshop tools (clean wiring).
20. “Before/after” with clean drywall patching around new fixtures.

**Component styling rules**

- Border radius: 12px for cards, 20px for hero CTAs.
- Shadow: `0 20px 40px rgba(14,26,36,0.12)`.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Section padding: 80px desktop / 56px mobile.

---

## 4) Cloudflare implementation pack (drop-in spec)

### 4.1 Asset strategy

**Images**

- Use AVIF primary + WebP fallback; JPEG only for legacy.
- Hero: 1920/1280/768 widths; gallery: 1200/800/600.
- `loading="lazy"` below-the-fold and `fetchpriority="high"` for hero.

**Fonts**

- Prefer self-hosted WOFF2 (Cloudflare cacheable). Preload only the heading + body families.

**CSS/JS**

- Critical CSS inline for hero layout; load `styles.css` as non-blocking.

---

### 4.2 Cloudflare configuration

**Cache policy matrix**
| Asset | Cache-Control | TTL | Notes |
| --- | --- | --- | --- |
| HTML | `max-age=0, must-revalidate` | 0 | Always revalidate |
| CSS/JS | `max-age=31536000, immutable` | 1 year | versioned file names |
| Images | `max-age=31536000, immutable` | 1 year | AVIF/WebP |
| Fonts | `max-age=31536000, immutable` | 1 year | self-hosted WOFF2 |

**Cloudflare toggles**

- **Brotli**: enable.
- **HTTP/3**: enable.
- **Early Hints**: enable (preload hero + fonts).
- **Rocket Loader**: avoid unless JS is minimal and validated.
- **Polish/Mirage** (if available): enable with lossless/lossy tuning (quality 75–85).

---

### 4.3 Security & trust headers

**Baseline CSP (compatible with current assets)**

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; frame-src https://www.google.com https://maps.google.com; connect-src 'self' https://cloudflareinsights.com; base-uri 'self'; form-action 'self' https://formsubmit.co
```

(Ensure `form-action` matches the final form endpoint.)

**Additional headers**

- `Permissions-Policy: geolocation=(), camera=(), microphone=()`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (or CSP `frame-ancestors` if needed)
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` (only after HTTPS is stable)

---

### 4.4 SEO + deliverability

- Canonicals already present; ensure they remain consistent after any path changes.
- Update structured data for service pages with `Service` type per service detail page.
- Use Cloudflare redirects for `www ↔ apex` and legacy paths (keep in `_redirects`).
- Ensure HTML cache TTL remains 0 so meta updates propagate quickly.

---

### 4.5 Observability

- Lighthouse plan: run desktop + mobile after image + CSS updates; track LCP, CLS, TBT.
- Cloudflare Web Analytics: enable privacy-first metrics; use `beacon.min.js` with real token (currently placeholder).
- Optional RUM: integrate `web-vitals` with a Cloudflare Worker endpoint.

---

## 5) Page-by-page change list (Issues → Fix → Copy/paste spec)

### Home

- **Issue:** CTA competition between hero form, quick actions, sticky bar.
- **Fix:** Restrict to 2 primary CTAs in hero and make sticky bar the only persistent CTA after scroll.
- **Spec:** `.hero-cta-row` with `btn-primary` (Gold 600) and `btn-secondary` (outline) + `.hero-trust` badge row.
- **Impact:** High | **Effort:** S

### Services

- **Issue:** No CTA above the fold.
- **Fix:** Add `Book Walkthrough` and `Request Estimate` buttons under hero summary.
- **Spec:** add `.hero-cta-row` and `btn-primary` + `btn-secondary`.
- **Impact:** High | **Effort:** S

### Service Areas

- **Issue:** CTA copy doesn’t reinforce scope/travel rules.
- **Fix:** Replace with “Confirm Availability” and add radius/travel notes.
- **Impact:** Medium | **Effort:** S

### Contact

- **Issue:** Placeholder form endpoint.
- **Fix:** Wire to Cloudflare Worker or CRM + add response time reassurance.
- **Impact:** High | **Effort:** S

### Booking

- **Issue:** No visible confirmation of next steps.
- **Fix:** Add “What happens next” section.
- **Impact:** Medium | **Effort:** S

### Testimonials

- **Issue:** No proof content; only guidelines.
- **Fix:** Add real testimonials or embed reviews.
- **Impact:** High | **Effort:** M

### Emergency

- **Issue:** No response-time language.
- **Fix:** Add availability note + reassurance.
- **Impact:** Medium | **Effort:** S

---

## 6) 90-minute quick win checklist

- Replace form endpoints with real submission target (Worker or CRM).
- Add hero CTA row on Services and Service Areas.
- Insert “MI License #6220430” in hero trust line on Home and Services.
- Add reassurance line to Contact and Booking forms.
- Replace emoji trust icons with a consistent outline icon set.

## 7) 2-week upgrade checklist

- Implement full brand palette + typography update across CSS.
- Re-export gallery images to 4:3 and add responsive `srcset`.
- Add Service schema and FAQs on service detail pages.
- Implement Cloudflare Image Optimization and confirm caching headers in production.
- Add real testimonials + photos and update testimonials page structure.

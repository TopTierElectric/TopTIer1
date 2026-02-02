# Sprint Plan (Phase 0)

## Sprint 1 — P0: Stop the bleeding (Conversion + Compliance)
**Goal:** Fix hard failures, simplify CTA hierarchy, remove unverifiable claims, implement safe form handling, and instrument analytics.

**Tasks**
- Fix broken internal links/5xx from baseline linkcheck.
- Remove or reword unverifiable trust claims; ensure proof objects are on-page.
- Simplify CTA hierarchy to one primary + one secondary per money page.
- Simplify header nav to five items + primary CTA button.
- Implement Cloudflare-compatible form handling + Turnstile validation.
- Add reviews engine scaffold with data-driven rendering only.
- Instrument GA4 events: call_click, text_click, book_submit, estimate_submit, email_click.
- Implement Cloudflare headers/redirects in-repo (Pages) or dashboard doc fallback.

**Gate (must pass before Sprint 2):**
- Zero internal 4xx/5xx.
- Forms confirmed functional with deterministic confirmation.
- CTA hierarchy simplified and consistent.
- Analytics events firing in GA4 DebugView.

---

## Sprint 2 — Service architecture rebuild (SEO + Conversion)
**Goal:** Dedicated converting pages for every high-value service + internal linking rules.

**Tasks**
- Ensure service pages exist for required services and follow the template blocks.
- Rebuild services hub with segmented tiles and links to all service pages.
- Enforce SEO basics (unique titles/metas, canonicals, robots).
- Update sitemap.xml and robots.txt if missing or incomplete.
- Apply internal linking rules between services, blog, and booking.

**Gate:**
- Crawl shows unique titles/metas + canonicals.
- Services hub links to all service pages.

---

## Sprint 3 — Proof content system (Case studies + Local relevance)
**Goal:** Add proof content that improves trust and local relevance without thin pages.

**Tasks**
- Publish 3 case studies with real photos and structured outcomes.
- Convert gallery into project cards linking to case studies.
- Improve service areas hub with unique blurbs + proof blocks.
- Add review engine SOP (`/docs/REVIEW_ENGINE_SOP.md`).

**Gate:**
- Three case studies live and linked from gallery.
- Linkcheck + Lighthouse run for gallery + one case study.

---

## Sprint 4 — Performance + Accessibility + Security hardening
**Goal:** Hit Lighthouse targets and finalize production hardening.

**Tasks**
- Optimize images, add dimensions, lazy-load below fold assets.
- Reduce CLS; minimize CSS/JS payloads.
- Add accessibility improvements (labels, focus, keyboard, skip link).
- Apply security headers + caching strategy (Cloudflare-aware).
- Run final Lighthouse + linkcheck + URL inventory.

**Gate:**
- Lighthouse Mobile Performance >= 90 on baseline pages.
- CLS < 0.1 (lab).
- Best Practices >= 95.
- A11y >= 95.
- Security headers confirmed.

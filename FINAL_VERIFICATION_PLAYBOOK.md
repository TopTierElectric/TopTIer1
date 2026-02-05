# Final Verification Playbook

## 1) Metadata Uniqueness

- Confirm unique titles and meta descriptions across pages.
- Commands:
  - `rg "<title>" *.html`
  - `rg "meta name=\"description\"" *.html`

## 2) Indexability and Canonicals

- Confirm index,follow and self-referencing canonicals on indexable pages.
- Commands:
  - `rg "meta name=\"robots\"" *.html`
  - `rg "canonical" *.html`

## 3) Internal Link Checks

- Verify services hub links to each service page and blog hub links to posts.
- Manual checklist:
  - Click each service card on `/services.html`.
  - Click each blog card on `/blog.html`.
  - Confirm related service links appear on blog cards.

## 4) Schema Validation

- Ensure LocalBusiness appears on all indexable pages.
- Confirm Service schema on service pages and FAQPage schema where FAQs are visible.
- Commands:
  - `rg "LocalBusiness" *.html`
  - `rg "\"@type\": \"Service\"" *.html`
  - `rg "FAQPage" *.html`

## 5) Content Quality and Duplication

- Verify no thin or duplicated location spam.
- Manual checklist:
  - Review service areas blurbs for uniqueness.
  - Confirm each service page has unique H1 and content.

## 6) Blog-to-Service Support

- Confirm each blog post links to exactly one primary and one secondary service page (max).
- Manual checklist:
  - Review each blog post for service links.

## 7) Navigation and CTA Checks

- Confirm booking and contact CTAs remain visible across pages.
- Manual checklist:
  - Check CTA sections on service pages and blog posts.

## 8) Sitemap Updates

- Confirm sitemap includes new service pages.
- Commands:
  - `rg "electrical-repairs|generators|energy-solutions|energy-consulting" sitemap.xml`

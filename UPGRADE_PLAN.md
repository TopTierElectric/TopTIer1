# Cloudflare Pages Upgrade Plan

## Checklist

- [x] Consolidate head meta/canonical/OG + schema across HTML pages.
- [x] Consolidate header/nav/footer markup with consistent CTA buttons.
- [x] Normalize forms with labels, honeypot, and non-placeholder endpoints.
- [x] Add design tokens + components styles and inject globally.
- [x] Add asset pipeline for logos + hero AVIF/WEBP outputs.
- [x] Update Cloudflare Pages `_redirects` + `_headers` for canonical + caching.
- [x] Add QA toolchain + CI workflow with report uploads.

## Acceptance criteria

- All HTML pages load `css/design-tokens.css` and `css/components.css` before `styles.css`.
- Header/footer markup and CTA buttons are consistent across pages.
- No placeholder tokens remain (`YOUR_CLOUDFLARE_ANALYTICS_TOKEN`, `your-email@example.com`, etc.).
- Forms submit to the real endpoint and include a honeypot field.
- `node scripts/optimize-assets.mjs` produces AVIF/WEBP outputs without errors.
- `npm run qa` completes, producing a Lighthouse report in `reports/lighthouse.html`.
- Cloudflare `_redirects` enforce apex HTTPS canonical without loops.

## Rollback plan

- Revert to previous commit: `git revert <commit_sha>`.
- Restore prior `_redirects` and `_headers` from git history if redirect behavior changes.
- Remove `css/design-tokens.css` and `css/components.css` links and reintroduce the original `:root` block in `styles.css`.
- Remove optimized assets and restore original hero image references if necessary.

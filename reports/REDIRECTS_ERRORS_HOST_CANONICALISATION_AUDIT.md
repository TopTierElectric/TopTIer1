# Redirects, Error Handling, and Host Canonicalisation Audit

## Scope Checked

- `_redirects` rule order and behavior.
- `robots.txt` sitemap host consistency.
- Existing URL patterns that can trigger avoidable 404s (logo path aliases).

## Implemented Advancements

1. **Forced canonical protocol + host**
   - Added explicit 301 redirect rules to force all variants to `https://toptier-electrical.com/*`:
     - `http://toptier-electrical.com/*`
     - `http://www.toptier-electrical.com/*`
     - `https://www.toptier-electrical.com/*`
   - This removes duplicate-host indexation risk and consolidates link equity to one canonical origin.

2. **Reduced recurring asset 404s from legacy logo paths**
   - Added redirects from legacy logo aliases to the live logo asset:
     - `/images/logos/TopTierElectrical_Primary_FlatGold_512.png`
     - `/images/logos/TopTierElectrical_Primary_FlatGold_512.webp`
   - This prevents error-page responses caused by repeated header/footer references still using `/images/logos/...` paths.

3. **Aligned sitemap host with canonical host**
   - Updated `robots.txt` sitemap directive from `https://www...` to `https://toptier-electrical.com/...`.
   - Avoids mixed canonical signals between sitemap host and page canonical tags.

## Current Rule Strategy (Post-Update)

- **Priority 1**: Host + protocol canonicalisation rules.
- **Priority 2**: Legacy asset rescue aliases.
- **Priority 3**: Human-friendly clean URLs redirected to `.html` files.
- **Priority 4**: Legacy page aliases (`/home`, `/about`, `/pricing`).
- **Priority 5**: Catch-all 404 fallback.

## Remaining Advancements Recommended (Next Pass)

1. **Replace legacy logo references directly in HTML templates**
   - Redirect aliases are safe, but direct path cleanup will reduce redirect hops and improve performance.

2. **Add automated redirect regression checks in CI**
   - Add a script that validates all critical routes return expected status and final canonical URL.

3. **Evaluate slash-normalization policy**
   - Confirm behavior for `.html/` and mixed trailing-slash variants and add rules if needed.

4. **Monitor 404 logs after deploy**
   - Verify no additional frequent missing paths remain (images/scripts/favicon variants).

## Deployment Verification Commands

Run these from a shell after deployment:

```bash
curl -I http://www.toptier-electrical.com/
curl -I https://www.toptier-electrical.com/services
curl -I http://toptier-electrical.com/contact
curl -I https://toptier-electrical.com/images/logos/TopTierElectrical_Primary_FlatGold_512.png
curl -I https://toptier-electrical.com/this-page-does-not-exist
```

Expected outcomes:

- Host/protocol variants should 301 to `https://toptier-electrical.com/...`.
- Legacy logo path should 301 to `/TopTierElectrical_Primary_FlatGold_512.png`.
- Unknown pages should return `404` with `404.html` content.

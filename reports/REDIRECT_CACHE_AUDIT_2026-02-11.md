# Redirect + Cache Mismatch Audit — 2026-02-11

## Scope

Validated redirect behavior, extensionless canonical routing, and cache/header consistency for Cloudflare Pages static deployment.

## Byte-level config inventory

- `_redirects`
  - bytes: `449`
  - sha256: `8c0f7d87c4854af4c01074a403dddb7d8f144f5e239ffe23e63b3b9df33d7655`
- `_headers`
  - bytes: `1781`
  - sha256: `bd1b4e9783b5df1c4355bb92711bcbb09a4be84ff98bffea03747a29c41bab1e`
- `wrangler.toml`
  - bytes: `91`
  - sha256: `b9c0ae947474a696c1ad798123b3be528e18b5438a9cb16ca6f3f46dfe12b07a`

## Automated checks executed

1. `npm run check:redirects-cloudflare`
   - Result: PASS (`[redirects] OK`)
2. `npm run check:origin-redirects`
   - Result: PASS (no origin-level host/protocol redirect conflicts)
3. `npm run check:extensionless-links`
   - Result: PASS (40 HTML files scanned)
4. `npm run check:extensionless-collisions`
   - Result: PASS (no .html collisions)
5. `npm run check:navigation-sim`
   - Result: PASS (`74 routes checked from 39 seeds`)

## Manual header probe (local Wrangler)

Validated representative routes with `curl -I` against `http://127.0.0.1:8788`:

- Content routes (`/`, `/services`) return `200` with `Cache-Control: public, max-age=0, must-revalidate`.
- Extensionless normalization (`/services.html`) returns `308` to `/services`.
- Legacy routes (`/financing`, `/financing.html`, `/index`, `/index.html`, `/home`) return expected `301` destinations.
- Static assets (`/assets/images/logo.svg`, `/styles.css`) return long-lived immutable cache headers.

## Finding + fix applied

### Finding

Legacy semantic redirects (`/financing`, `/index`, `/home`, `/pricing`) relied on generic redirect defaults for cache behavior, which could be interpreted inconsistently across environments.

### Fix

Added explicit `Cache-Control: public, max-age=0, must-revalidate` header rules in `_headers` for:

- `/index`
- `/home`
- `/financing`
- `/pricing`

## Post-fix validation

- Re-ran redirect parser + route simulation checks; both passed.
- No redirect loops/chains introduced.
- Canonical extensionless routes remain stable.

## Accuracy statement

All redirect rules and cache directives in repository-managed edge config were revalidated after the header update. Within repository scope, no unresolved redirect/caching mismatch remains.

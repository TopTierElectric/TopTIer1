# Redirect & Middleware Code Audit

## Scope

- Searched application code (excluding `node_modules`) for:
  - `redirect(` calls
  - `response.redirect(` calls
  - middleware definitions/usages (`middleware`, `middleware.js`, `middleware.ts`)

## Findings

- No `redirect(` function calls found in the repository source files.
- No `response.redirect(` calls found in the repository source files.
- No middleware file or middleware redirect logic found.

## Redirect Mechanism Present

- Redirect behavior in this project is configured via the static Netlify-style `_redirects` file.
- `_redirects` contains path aliases and legacy URL redirects (301), plus a 404 fallback.
- The file explicitly notes protocol/host canonicalization is handled at Cloudflare edge, not origin.

## Recommendation: Should these redirects be removed?

- **Do not remove all redirects.** Keep the path/legacy redirects in `_redirects` unless the _same path rules_ are migrated to Cloudflare Redirect Rules/Bulk Redirects.
- **Do not duplicate canonical host/protocol redirects at origin.** Those should remain at Cloudflare edge (as already documented in `_redirects`) to avoid redirect loops or conflicting behavior.
- If you move path redirects to Cloudflare, remove duplicates from `_redirects` so each redirect is owned in exactly one layer.

## Commands Used

```bash
rg -n --glob '!node_modules/**' --glob '!reports/**' "\bredirect\s*\(" . || true
rg -n --glob '!node_modules/**' --glob '!reports/**' "response\.redirect\s*\(" . || true
rg -n --glob '!node_modules/**' --glob '!reports/**' "\bmiddleware\b|middleware\.(js|ts)" . || true
```

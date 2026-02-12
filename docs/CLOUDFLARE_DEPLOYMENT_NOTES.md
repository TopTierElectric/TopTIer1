# Cloudflare Deployment Notes

## Hosting mode detection (Phase 0)

**Indicators checked:**

- `wrangler.toml` at repo root: **present**
- `wrangler.jsonc` at repo root: **present**
- `/functions/` directory: **not found**
- Build output directories (dist/, build/, public/): **not found**
- `_headers` / `_redirects` files in repo root: **present**
- README notes Cloudflare Pages compatibility: **present**

**Conclusion:** This repository appears to be a **static HTML site intended for Cloudflare Pages**, with `_headers` and `_redirects` already at the repo root. There is no evidence of Pages Functions or Workers in the codebase.

## Implications

- If deployed to **Cloudflare Pages**, the root `_headers` and `_redirects` files will be applied automatically.
- If deployed to a **non-Pages origin** behind Cloudflare, equivalent rules must be configured in the Cloudflare dashboard (Redirect Rules and Response Header Modification Rules).

## Forms handling

- Current forms post to a placeholder Formsubmit endpoint (`https://formsubmit.co/your-email@example.com`).
- If this is Cloudflare Pages, recommend using Pages Functions for form handling + Turnstile validation in Sprint 1.
- If non-Pages, recommend a Worker or third-party form service, documented in Cloudflare dashboard rules.

## Local run commands

- `npm run dev` (uses `npx http-server -p 8888`)
- `npm run build` (no-op; static)

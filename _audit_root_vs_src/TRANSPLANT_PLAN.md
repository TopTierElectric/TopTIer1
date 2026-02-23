# TRANSPLANT_PLAN

| source_file(s) | destination_file(s) | rationale | evidence_references | test_gates |
|---|---|---|---|---|
| `.github/workflows/deploy-prod.yml` | `.github/workflows/deploy-prod.yml` | PORT_WITH_ADAPTATION: transplant to improve SRC parity. | needs manual confirmation | Run workflow lint + trigger dry-run on feature branch. |
| `.github/workflows/deploy-cloudflare-pages.yml` | `.github/workflows/deploy-cloudflare-pages.yml` | PORT_WITH_ADAPTATION: transplant to improve SRC parity. | needs manual confirmation | Run workflow lint + trigger dry-run on feature branch. |
| `.github/workflows/quality-gates.yml` | `.github/workflows/quality-gates.yml` | PORT_WITH_ADAPTATION: transplant to improve SRC parity. | needs manual confirmation | Run workflow lint + trigger dry-run on feature branch. |
| `wrangler.toml` | `wrangler.toml` | PORT_AS_IS: transplant to improve SRC parity. | needs manual confirmation | Validate deploy + route/header behavior in preview. |
| `wrangler.jsonc` | `wrangler.jsonc` | PORT_AS_IS: transplant to improve SRC parity. | needs manual confirmation | Validate deploy + route/header behavior in preview. |
| `_headers` | `_headers` | PORT_AS_IS: transplant to improve SRC parity. | needs manual confirmation | Validate deploy + route/header behavior in preview. |
| `_redirects` | `_redirects` | PORT_AS_IS: transplant to improve SRC parity. | needs manual confirmation | Validate deploy + route/header behavior in preview. |
| `.well-known/security.txt` | `.well-known/security.txt` | PORT_AS_IS: transplant to improve SRC parity. | needs manual confirmation | Validate deploy + route/header behavior in preview. |
| `app/api/leads/route.ts` | `api/leads/route.ts` | PORT_WITH_ADAPTATION: transplant to improve SRC parity. | needs manual confirmation | Run API contract tests and end-to-end form submission checks. |
| `scripts/seo-quality-gates.mjs` | `scripts/seo-quality-gates.mjs` | PORT_AS_IS: transplant to improve SRC parity. | needs manual confirmation | Execute script and verify non-zero exit on failing fixtures. |

## Fuzzy-backed transplant items
- `testimonials.html` → `pages/testimonials.html` | score=0.8092 | evidence: `fuzzy_diffs/testimonials.html__TO__pages_testimonials.html.diff`, `fuzzy_byte_diffs/testimonials.html__TO__pages_testimonials.html.cmp.txt` | test gates: page render diff + link checks + SEO metadata checks.

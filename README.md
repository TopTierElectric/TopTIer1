# Top Tier Electrical — Codex Drag-and-Drop Pack

## What this contains

- PROMPT_BLOG_SITE_IMPLEMENTATION.md -> paste into Codex with your repo loaded
- seo/SEO_Pack_and_Checklist.md -> keyword pack + implementation checklist
- blog/ (6 files) -> blog source content (meta + article + FAQs + CTA)
- facebook/ (6 files) -> ready-to-post Facebook micro-articles
- PROMPT_FACEBOOK_POSTS.md -> optional prompt if you want Codex to adapt/format posts

## How to use with Codex

1. Drag-and-drop this ZIP into Codex.
2. Open PROMPT_BLOG_SITE_IMPLEMENTATION.md and paste it as your instruction.
3. Tell Codex: "Use the blog content files in /blog/ as source-of-truth and implement them in the repo. Use /seo/ checklist."
4. After implementation, make Codex output:
   - file-by-file change list
   - new blog URLs
   - exact verification steps (local build + link checks)

## Clean repository export

If you want to spin up a new lean repository with only actively used site files and assets:

```bash
npm run repo:clean-export -- --out dist/clean-repo --init-git
```

Full guide: `docs/CLEAN_REPO_EXPORT.md`

Then push `dist/clean-repo` to a new GitHub repo (see `docs/CLEAN_REPO_EXPORT.md`).

## Repository hygiene

Legacy planning documents that are no longer used have been removed to keep the root and docs folders focused on active implementation and verification artifacts.

## Cloudflare Pages via Wrangler

This repository now includes reusable Wrangler deployment wiring:

- `wrangler.jsonc` for local/project config
- `cf:*` npm scripts in `package.json`
- `.github/workflows/deploy-cloudflare-pages.yml` for CI deploys on `main`

### Required GitHub Secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### One-time local setup

```bash
npm install
npx wrangler login
npm run cf:whoami
npm run cf:deploy
```

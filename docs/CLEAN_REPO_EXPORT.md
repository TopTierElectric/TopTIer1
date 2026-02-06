# Clean Repo Export (code + assets only)

Use this to create a fresh repository containing only production files actually used by the site (plus deployment config), without audit/report clutter.

## What it does

`npm run repo:clean-export -- --out <target-folder>`:

- Crawls all HTML files and follows local `href/src` dependencies.
- Follows referenced CSS/JS dependencies (`url(...)`, `@import`, etc.).
- Keeps deployment essentials (`_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, package metadata).
- Excludes known non-production artifacts (audit reports, plans, changelogs, branch logs, etc.).
- Optionally removes exact duplicate files with SHA-256 comparison (`--dedupe`).
- Writes `clean-repo-manifest.json` with export metadata.

## Usage

```bash
npm run repo:clean-export -- --out dist/clean-repo
```

Optional flags:

- `--dry-run` → show counts only, do not copy files.
- `--include-docs` → include `docs/` content in the export.
- `--dedupe` → remove byte-identical duplicates in export output.
- `--init-git` → initialize git in the output folder and create an initial commit.
- `--remote <url>` → when used with `--init-git`, configure `origin` to your new repo URL.

## Export into a new GitHub repo

1. Generate the clean export:

```bash
npm run repo:clean-export -- --out dist/clean-repo --init-git --remote <YOUR_NEW_REPO_URL>
```

2. Create an empty repo on GitHub (no README/license).

3. Push the exported folder:

```bash
cd dist/clean-repo
git push -u origin main
```

4. Verify locally from the exported repo:

```bash
npm install
npm run validate:html
npm run dev
```

## Recommended safety note

Use `--dedupe` only after you confirm duplicate files are truly interchangeable for your use case. By default dedupe is OFF to avoid changing file paths that may be intentionally separate.

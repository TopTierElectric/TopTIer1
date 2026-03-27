# Astrowind Migration and Transfer Workflow

This repository now includes a byte-verified export path for transferring the canonical site content into an Astrowind repository.

## Source of truth

- Treat `src/` as the canonical source for all runtime pages, blog content, structured metadata, and site configuration.
- Do **not** transfer from legacy root duplicates first when `src/` already contains the active version.

## Export commands

From the repository root:

```bash
npm run export:astrowind
npm run export:astrowind:watch
npm run verify:astrowind-export
```

The export writes an Astrowind-oriented transfer bundle to:

```text
dist/astrowind-transfer/
```

Use `npm run export:astrowind:watch` when you want the transfer to run continuously while editing the canonical source files under `src/`.

## What gets exported

- `src/pages/**/*.html` → `dist/astrowind-transfer/src/content/pages/*.mdx`
- `src/pages/blog/**/*.html` → `dist/astrowind-transfer/src/content/blog/*.mdx`
- exact parsed route metadata JSON → `dist/astrowind-transfer/reference/routes/*/meta.json`
- exact parsed route HTML bodies → `dist/astrowind-transfer/reference/routes/*/content.html`
- `src/data/site.json` copied byte-for-byte → `dist/astrowind-transfer/src/data/site.json`
- navigation extracted from `site.json` → `dist/astrowind-transfer/src/data/navigation.json`
- redirects extracted from `site.json` → `dist/astrowind-transfer/src/data/redirects.json`
- `src/partials/**/*.html` copied byte-for-byte → `dist/astrowind-transfer/reference/partials/**`
- full canonical `src/**` snapshot copied byte-for-byte → `dist/astrowind-transfer/hard-transfer/src/**`
- full repository snapshot copied byte-for-byte (excluding `.git`, `node_modules`, `dist`, `_audit_root_vs_src`, `.wrangler`) → `dist/astrowind-transfer/hard-transfer/repo/**`
- `src/assets/**` copied byte-for-byte → `dist/astrowind-transfer/public/assets/**`
- route and manifest indexes → `dist/astrowind-transfer/manifest.json` and `dist/astrowind-transfer/route-index.json`

## Verification goals

The verification step confirms:

- the exported route count matches the source route count
- blog and non-blog counts match the manifest
- exact parsed route metadata bytes match the source
- exact parsed route HTML body bytes match the source
- `src/data/site.json` bytes match the source
- copied partials and assets match the source byte-for-byte
- full `hard-transfer/src/**` snapshot matches source bytes for every file
- full `hard-transfer/repo/**` snapshot matches source bytes for every copied file
- site, navigation, and redirects data are populated

## Continuous transfer mode

The watch mode continuously re-runs the export whenever any of these change:

- `src/pages/**/*.html`
- `src/partials/**/*.html`
- `src/data/site.json`
- `src/assets/**`

This is useful when you are actively rebuilding the site in an Astrowind repository and want the transfer bundle to stay current while source content evolves.

## How to use in an Astrowind repo

1. Copy `dist/astrowind-transfer/hard-transfer/repo/**` into your destination Astrowind repo to perform a full hard transfer payload.
2. Copy `dist/astrowind-transfer/hard-transfer/src/**` into your destination repo first when you only need canonical source files.
3. Copy `dist/astrowind-transfer/src/content/**` into your Astrowind content area.
4. Copy `dist/astrowind-transfer/src/data/**` into your Astrowind data/config layer.
5. Copy `dist/astrowind-transfer/public/assets/**` into your Astrowind `public/assets/**`.
6. Use `reference/routes/**` when you need the exact original metadata JSON and exact original HTML body bytes during Astro component rebuilds.
7. Recreate redirects, schema, and forms using the exported `manifest.json`, `route-index.json`, and source business configuration.
8. Preserve existing production slugs or add redirects before cutover.

## Important note

This export is designed to transfer **critical content and structured site data** into Astrowind safely, with byte-level verification for the canonical route payloads, `site.json`, copied partials, and copied assets. Dynamic framework-specific code such as Next.js routes, React client-side behavior, or custom verification scripts still needs an implementation pass inside the destination Astrowind repo.

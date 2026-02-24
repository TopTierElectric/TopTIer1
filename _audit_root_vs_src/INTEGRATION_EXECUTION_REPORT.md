# INTEGRATION_EXECUTION_REPORT

## Phase 0/1 Baseline
- Branch: `integration/root-into-src-top-tier`.
- Tool checks: `python3 git rsync cmp` found.
- Baseline exact counts:

```
EXTRA_IN_SRC 70
MISSING_IN_SRC 387
```
- Baseline fuzzy rows (`wc -l fuzzy_pairing.tsv`): 24 _audit_root_vs_src/fuzzy_pairing.tsv
- Baseline fuzzy diff count: 23
- Baseline fuzzy cmp count: 23

## Phase 2 Advanced ROOT port
- Script: `tools/port_advanced_root_into_src.py`.
- Ported files: **47** (byte-verified sha256 + size).
- Logs:
  - `_audit_root_vs_src/_port_logs/ported.tsv`
  - `_audit_root_vs_src/_port_logs/skipped_existing.tsv`
  - `_audit_root_vs_src/_port_logs/missing_on_disk.tsv`

## Phase 3 Fuzzy correspondence handling (top 23)
- Merged: **23**
- Blocked: **0**

### Merged pairs (already byte-identical after port)
1. `.env.example` → `.env.example` | evidence: `fuzzy_diffs/.env.example__TO__.env.example.diff`, `fuzzy_byte_diffs/.env.example__TO__.env.example.cmp.txt`
2. `.well-known/security.txt` → `.well-known/security.txt` | evidence: `fuzzy_diffs/.well-known_security.txt__TO__.well-known_security.txt.diff`, `fuzzy_byte_diffs/.well-known_security.txt__TO__.well-known_security.txt.cmp.txt`
3. `_headers` → `_headers` | evidence: `fuzzy_diffs/_headers__TO___headers.diff`, `fuzzy_byte_diffs/_headers__TO___headers.cmp.txt`
4. `_redirects` → `_redirects` | evidence: `fuzzy_diffs/_redirects__TO___redirects.diff`, `fuzzy_byte_diffs/_redirects__TO___redirects.cmp.txt`
5. `app/api/leads/route.ts` → `app/api/leads/route.ts` | evidence: `fuzzy_diffs/app_api_leads_route.ts__TO__app_api_leads_route.ts.diff`, `fuzzy_byte_diffs/app_api_leads_route.ts__TO__app_api_leads_route.ts.cmp.txt`
6. `scripts/audit-image-text-references.js` → `scripts/audit-image-text-references.js` | evidence: `fuzzy_diffs/scripts_audit-image-text-references.js__TO__scripts_audit-image-text-references.js.diff`, `fuzzy_byte_diffs/scripts_audit-image-text-references.js__TO__scripts_audit-image-text-references.js.cmp.txt`
7. `scripts/audit-images.mjs` → `scripts/audit-images.mjs` | evidence: `fuzzy_diffs/scripts_audit-images.mjs__TO__scripts_audit-images.mjs.diff`, `fuzzy_byte_diffs/scripts_audit-images.mjs__TO__scripts_audit-images.mjs.cmp.txt`
8. `scripts/audit-links-cloudflare.mjs` → `scripts/audit-links-cloudflare.mjs` | evidence: `fuzzy_diffs/scripts_audit-links-cloudflare.mjs__TO__scripts_audit-links-cloudflare.mjs.diff`, `fuzzy_byte_diffs/scripts_audit-links-cloudflare.mjs__TO__scripts_audit-links-cloudflare.mjs.cmp.txt`
9. `scripts/build.mjs` → `scripts/build.mjs` | evidence: `fuzzy_diffs/scripts_build.mjs__TO__scripts_build.mjs.diff`, `fuzzy_byte_diffs/scripts_build.mjs__TO__scripts_build.mjs.cmp.txt`
10. `scripts/check-content-mapping.js` → `scripts/check-content-mapping.js` | evidence: `fuzzy_diffs/scripts_check-content-mapping.js__TO__scripts_check-content-mapping.js.diff`, `fuzzy_byte_diffs/scripts_check-content-mapping.js__TO__scripts_check-content-mapping.js.cmp.txt`
11. `scripts/check-extensionless-collisions.mjs` → `scripts/check-extensionless-collisions.mjs` | evidence: `fuzzy_diffs/scripts_check-extensionless-collisions.mjs__TO__scripts_check-extensionless-collisions.mjs.diff`, `fuzzy_byte_diffs/scripts_check-extensionless-collisions.mjs__TO__scripts_check-extensionless-collisions.mjs.cmp.txt`
12. `scripts/check-extensionless-links.mjs` → `scripts/check-extensionless-links.mjs` | evidence: `fuzzy_diffs/scripts_check-extensionless-links.mjs__TO__scripts_check-extensionless-links.mjs.diff`, `fuzzy_byte_diffs/scripts_check-extensionless-links.mjs__TO__scripts_check-extensionless-links.mjs.cmp.txt`
13. `scripts/check-image-sources.js` → `scripts/check-image-sources.js` | evidence: `fuzzy_diffs/scripts_check-image-sources.js__TO__scripts_check-image-sources.js.diff`, `fuzzy_byte_diffs/scripts_check-image-sources.js__TO__scripts_check-image-sources.js.cmp.txt`
14. `scripts/check-navigation-sim.mjs` → `scripts/check-navigation-sim.mjs` | evidence: `fuzzy_diffs/scripts_check-navigation-sim.mjs__TO__scripts_check-navigation-sim.mjs.diff`, `fuzzy_byte_diffs/scripts_check-navigation-sim.mjs__TO__scripts_check-navigation-sim.mjs.cmp.txt`
15. `scripts/check-navigation-simulation.js` → `scripts/check-navigation-simulation.js` | evidence: `fuzzy_diffs/scripts_check-navigation-simulation.js__TO__scripts_check-navigation-simulation.js.diff`, `fuzzy_byte_diffs/scripts_check-navigation-simulation.js__TO__scripts_check-navigation-simulation.js.cmp.txt`
16. `scripts/check-no-binary-files.sh` → `scripts/check-no-binary-files.sh` | evidence: `fuzzy_diffs/scripts_check-no-binary-files.sh__TO__scripts_check-no-binary-files.sh.diff`, `fuzzy_byte_diffs/scripts_check-no-binary-files.sh__TO__scripts_check-no-binary-files.sh.cmp.txt`
17. `scripts/check-origin-redirects.js` → `scripts/check-origin-redirects.js` | evidence: `fuzzy_diffs/scripts_check-origin-redirects.js__TO__scripts_check-origin-redirects.js.diff`, `fuzzy_byte_diffs/scripts_check-origin-redirects.js__TO__scripts_check-origin-redirects.js.cmp.txt`
18. `scripts/check-origin-redirects.mjs` → `scripts/check-origin-redirects.mjs` | evidence: `fuzzy_diffs/scripts_check-origin-redirects.mjs__TO__scripts_check-origin-redirects.mjs.diff`, `fuzzy_byte_diffs/scripts_check-origin-redirects.mjs__TO__scripts_check-origin-redirects.mjs.cmp.txt`
19. `scripts/check-placeholders.js` → `scripts/check-placeholders.js` | evidence: `fuzzy_diffs/scripts_check-placeholders.js__TO__scripts_check-placeholders.js.diff`, `fuzzy_byte_diffs/scripts_check-placeholders.js__TO__scripts_check-placeholders.js.cmp.txt`
20. `scripts/check-placeholders.mjs` → `scripts/check-placeholders.mjs` | evidence: `fuzzy_diffs/scripts_check-placeholders.mjs__TO__scripts_check-placeholders.mjs.diff`, `fuzzy_byte_diffs/scripts_check-placeholders.mjs__TO__scripts_check-placeholders.mjs.cmp.txt`
21. `scripts/check-redirects-cloudflare.mjs` → `scripts/check-redirects-cloudflare.mjs` | evidence: `fuzzy_diffs/scripts_check-redirects-cloudflare.mjs__TO__scripts_check-redirects-cloudflare.mjs.diff`, `fuzzy_byte_diffs/scripts_check-redirects-cloudflare.mjs__TO__scripts_check-redirects-cloudflare.mjs.cmp.txt`
22. `scripts/check-workflow-location.js` → `scripts/check-workflow-location.js` | evidence: `fuzzy_diffs/scripts_check-workflow-location.js__TO__scripts_check-workflow-location.js.diff`, `fuzzy_byte_diffs/scripts_check-workflow-location.js__TO__scripts_check-workflow-location.js.cmp.txt`
23. `scripts/check-workflow-yaml.mjs` → `scripts/check-workflow-yaml.mjs` | evidence: `fuzzy_diffs/scripts_check-workflow-yaml.mjs__TO__scripts_check-workflow-yaml.mjs.diff`, `fuzzy_byte_diffs/scripts_check-workflow-yaml.mjs__TO__scripts_check-workflow-yaml.mjs.cmp.txt`

## Phase 4 Finalization
- Re-ran `tools/root_src_audit_v2.sh` and `tools/generate_root_src_reports.py`.
- Coverage check: `_audit_root_vs_src/REPORT_COVERAGE_CHECK.md` now reports **none missing** for top 23 fuzzy correspondences.
- Final exact counts:

```
EXTRA_IN_SRC 70
IDENTICAL 47
MISSING_IN_SRC 341
```

## Check results
- `python3 -m py_compile tools/generate_root_src_reports.py tools/fuzzy_pair.py tools/port_advanced_root_into_src.py` passed.
- `npm run lint` passed.
- `npm run build` passed.

## Branch commits (latest 50)

```
f0d533a (HEAD -> integration/root-into-src-top-tier) Port advanced ROOT operational assets into src (byte-verified)
d4bf141 (work) audit: add fuzzy evidence digest and deliverable coverage checks
31a5790 Merge pull request #218 from TopTierElectric/codex/investigate-site-layout-differences-0oeilk
c6e3abb Merge pull request #217 from TopTierElectric/codex/investigate-site-layout-differences
ddff4b4 fix(content): align energy solutions image descriptions with visuals
0311d07 fix(content): align energy solutions image descriptions with visuals
b68d970 fix(qa): reverify and harden content routing/mapping checks
f1da9cf fix(content): align blog wording and strengthen blog mapping checks
3a8f080 fix(content): remap commercial proof and add mapping regression gate
a2a23b2 fix(content): correct production image mapping and misplaced copy
27870ce fix(images): correct default OG image mapping in build head
98df2da fix(build): remove duplicate Past_work_webp copier and add byte-level audit report
9d0ea45 fix(audit): resolve relative image refs with cleaned path
57ea01c Merge pull request #216 from TopTierElectric/codex/apply-patch-for-past_work_webp-seo-updates
ad450e8 Merge branch 'main' into codex/apply-patch-for-past_work_webp-seo-updates
ccfbd0e Merge pull request #215 from TopTierElectric/codex/assess-audit-and-remediation-report-findings
6170e3c feat(images): Past_work_webp canonical + SEO metadata
4fc28ef fix(ui): rotate homepage panel hero in preview
4beb868 fix(images): correct homepage panel hero orientation
25ed61d fix(remediation): verify byte-exact webp copy and remove duplicate corridor image
ca446fb Merge pull request #212 from TopTierElectric/TopTierElectric-patch-2
1b73e10 Create Codex.patch
de9f6ed Merge pull request #209 from TopTierElectric/codex/fix-blog-visibility-on-live-webpage
6d3a6fe Fix fallback deploy target and restore canonical blog redirects
d616182 Add explicit live blog URL redirects
f5c2e13 Merge pull request #208 from TopTierElectric/codex/fix-deployment-pages-for-blog
17a73f9 Stabilize image audit by skipping legacy Past_work_webp archive
f077a75 Fix blog metadata service enums for analytics contract
7738d5c Polish blog deployment pages and run deep verification
b020540 Fix blog page deployment routes and legacy redirects
d0e0f3f Add files via upload
a48b78d chore: format code with Prettier
d8a5493 Add files via upload
a9b0da5 Add files via upload
5c1468c Merge pull request #207 from TopTierElectric/codex/fix-deployment-issues-for-production
0551d34 fix: add production legacy redirects for deployment
c0b4f8c Merge pull request #206 from TopTierElectric/codex/execute-script-to-standardize-contact-forms
ae8d6a5 Align Cloudflare Pages build config with dist output
f9fa26e Fix CI site check and include homepage form in Formspree verification
a902d7f Fix CI gates for Formspree verification and form accessibility
ec00bfa Add dependency-free Formspree verification script
4694b37 chore: format code with Prettier
04aedbc Merge pull request #205 from TopTierElectric/codex/standardize-license-number-format
7e878e0 Refine professional standards reviews markup and formatting
b36e9b6 Merge pull request #204 from TopTierElectric/codex/standardize-navigation-header-across-pages
486d109 Standardize primary navigation across site pages
bf69acb Merge pull request #201 from TopTierElectric/codex/implement-robots-and-sitemap-for-next.js
12ccd35 Merge branch 'main' into codex/implement-robots-and-sitemap-for-next.js
57a8547 Fix dev server handling for robots/sitemap and normalize script formatting
9c01193 Merge pull request #203 from TopTierElectric/codex/add-tsx,-cheerio,-and-zod-dependencies

```

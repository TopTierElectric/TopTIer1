#!/usr/bin/env python3
import csv, json
from pathlib import Path

OUT = Path('_audit_root_vs_src')

pairing_fp = OUT / 'pairing.tsv'
root_manifest_fp = OUT / 'root_manifest.tsv'
src_manifest_fp = OUT / 'src_manifest.tsv'
fuzzy_fp = OUT / 'fuzzy_pairing.tsv'

def load_manifest(fp):
    m = {}
    if not fp.exists():
        return m
    with fp.open(newline='') as f:
        for sha,size,rel in csv.reader(f, delimiter='\t'):
            m[rel] = {'sha': sha, 'size': int(size)}
    return m

def classify_missing(path):
    p = path
    name = Path(p).name
    if p.startswith('.github/workflows/'):
        return ('PORT_WITH_ADAPTATION', f'.github/workflows/{name}', 'Run workflow lint + trigger dry-run on feature branch.')
    if p in {'wrangler.toml','wrangler.jsonc','_headers','_redirects','.well-known/security.txt'}:
        return ('PORT_AS_IS', p, 'Validate deploy + route/header behavior in preview.')
    if p.startswith('app/api/'):
        return ('PORT_WITH_ADAPTATION', p.replace('app/','',1), 'Run API contract tests and end-to-end form submission checks.')
    if p.startswith('scripts/'):
        return ('PORT_AS_IS', p, 'Execute script and verify non-zero exit on failing fixtures.')
    if p.startswith('docs/') or p.endswith('.md'):
        return ('REPLACE_WITH_EQUIVALENT', p, 'Confirm equivalent documentation section exists and links resolve.')
    if p.startswith('reports/') or p.startswith('artifacts/'):
        return ('INTENTIONALLY_OMIT', '(none; generated artifact)', 'No runtime verification needed; regenerate on demand.')
    if p.startswith('Past_work_webp/') or p.lower().endswith(('.jpg','.jpeg','.png','.webp','.gif')):
        return ('PORT_WITH_ADAPTATION', f'assets/images/{name}', 'Check image references, responsive loading, and Lighthouse performance.')
    if p.startswith('assets/'):
        return ('PORT_WITH_ADAPTATION', p, 'Run build and verify static assets resolve with no 404s.')
    return ('REPLACE_WITH_EQUIVALENT', p, 'Manual review to map capability into SRC architecture.')

def classify_extra(path):
    if path.startswith(('components/','lib/','config/','pages/','partials/','local-seo/','data/')):
        return 'SRC source architecture (expected alternate-root structure).'
    if path.startswith('assets/'):
        return 'SRC static asset pipeline divergence (expected in source-oriented tree).'
    return 'Potential SRC-only capability; confirm whether ROOT has equivalent behavior.'

root_manifest = load_manifest(root_manifest_fp)
src_manifest = load_manifest(src_manifest_fp)

rows = []
counts = {}
with pairing_fp.open(newline='') as f:
    for r in csv.reader(f, delimiter='\t'):
        if not r:
            continue
        rec = {'status': r[0], 'relpath': r[1], 'root_sha': r[2], 'src_sha': r[3], 'root_size': r[4], 'src_size': r[5]}
        rows.append(rec)
        counts[rec['status']] = counts.get(rec['status'], 0) + 1
rows.sort(key=lambda x: x['relpath'])

fuzzy = []
if fuzzy_fp.exists():
    with fuzzy_fp.open(newline='') as f:
        rr = csv.DictReader(f, delimiter='\t')
        for r in rr:
            r['score_float'] = float(r['score'])
            fuzzy.append(r)
fuzzy.sort(key=lambda x: x['score_float'], reverse=True)

# top impact list
priority = [
'.github/workflows/deploy-prod.yml','.github/workflows/deploy-cloudflare-pages.yml','.github/workflows/quality-gates.yml',
'wrangler.toml','wrangler.jsonc','_headers','_redirects','.well-known/security.txt','app/api/leads/route.ts','scripts/seo-quality-gates.mjs'
]
missing_paths = {r['relpath'] for r in rows if r['status']=='MISSING_IN_SRC'}
top10 = [p for p in priority if p in missing_paths][:10]
if len(top10) < 10:
    for p in sorted(missing_paths):
        if p not in top10:
            top10.append(p)
            if len(top10) == 10:
                break

# Report
report = []
report += ['# ROOT_VS_SRC_AUDIT_REPORT', '', '## A. Executive summary', '']
report += [f"- Exact layer counts from `pairing.tsv`: IDENTICAL={counts.get('IDENTICAL',0)}, CHANGED={counts.get('CHANGED',0)}, MISSING_IN_SRC={counts.get('MISSING_IN_SRC',0)}, EXTRA_IN_SRC={counts.get('EXTRA_IN_SRC',0)}."]
report += [f"- Heuristic layer counts from `fuzzy_pairing.tsv`: total_candidates={len(fuzzy)}."]
report += ['', 'Top 10 highest-score fuzzy candidates (or fewer if unavailable):']
for i, cand in enumerate(fuzzy[:10], 1):
    safe = (cand['root_relpath'] + '__TO__' + cand['src_relpath']).replace('/', '_').replace(' ', '_')
    report.append(f"{i}. `{cand['root_relpath']}` → `{cand['src_relpath']}` | score={cand['score']} | evidence: `fuzzy_diffs/{safe}.diff`, `fuzzy_byte_diffs/{safe}.cmp.txt`.")
if not fuzzy:
    report.append('- None.')
report += ['', 'Highest-impact ROOT→SRC transplant items (top 10):']
for i,p in enumerate(top10,1):
    ev = 'needs manual confirmation'
    if p in [c['root_relpath'] for c in fuzzy]:
        c = next(c for c in fuzzy if c['root_relpath']==p)
        safe = (c['root_relpath'] + '__TO__' + c['src_relpath']).replace('/', '_').replace(' ', '_')
        ev = f"`fuzzy_diffs/{safe}.diff`, `fuzzy_byte_diffs/{safe}.cmp.txt`"
    report.append(f"{i}. `{p}` — evidence: {ev}.")

report += ['', '## B. File-by-file audit (sorted)', '', '### B.1 Exact per-relpath verification record',
"`pairing.tsv` is the canonical truth source for exact-path pairing.",
"Column interpretation: `status | relpath | root_sha | src_sha | root_size | src_size`.", '',
'| status | relpath | root_sha | src_sha | root_size | src_size |', '|---|---|---|---|---:|---:|']
for r in rows:
    report.append(f"| {r['status']} | `{r['relpath']}` | `{r['root_sha'] or '—'}` | `{r['src_sha'] or '—'}` | {r['root_size'] or '—'} | {r['src_size'] or '—'} |")

report += ['', '### B.2 Root-only / Src-only decisions', '', '#### MISSING_IN_SRC decisions (exhaustive)', '',
'| relpath | decision | proposed_target_in_SRC | verification_steps |', '|---|---|---|---|']
for r in [x for x in rows if x['status']=='MISSING_IN_SRC']:
    d,t,v = classify_missing(r['relpath'])
    report.append(f"| `{r['relpath']}` | {d} | `{t}` | {v} |")

report += ['', '#### EXTRA_IN_SRC decisions (exhaustive)', '', '| relpath | explanation |', '|---|---|']
for r in [x for x in rows if x['status']=='EXTRA_IN_SRC']:
    report.append(f"| `{r['relpath']}` | {classify_extra(r['relpath'])} |")

report += ['', '### B.3 Heuristic correspondence section (mandatory due CHANGED=0)', '',
'#### Mapping Table (TOP 50 fuzzy correspondences)', '',
'| root_relpath | src_relpath | score | decision | evidence_filenames |', '|---|---|---:|---|---|']
for cand in fuzzy[:50]:
    safe = (cand['root_relpath'] + '__TO__' + cand['src_relpath']).replace('/', '_').replace(' ', '_')
    decision = 'PORT_WITH_ADAPTATION'
    report.append(f"| `{cand['root_relpath']}` | `{cand['src_relpath']}` | {cand['score']} | {decision} | `fuzzy_diffs/{safe}.diff`; `fuzzy_byte_diffs/{safe}.cmp.txt` |")
if not fuzzy:
    report.append('| (none) | (none) | 0 | needs manual confirmation | none |')

report += ['', '#### Top correspondences transplant detail']
for cand in fuzzy[:10]:
    safe = (cand['root_relpath'] + '__TO__' + cand['src_relpath']).replace('/', '_').replace(' ', '_')
    report += [f"- `{cand['root_relpath']}` → `{cand['src_relpath']}` (score {cand['score']})",
               f"  - Transplant exactly: page metadata blocks, testimonial content sections, CTA/link destinations, and any structured data blocks present in root page.",
               f"  - Behavior change: align SRC rendered page content/SEO with ROOT artifact.",
               f"  - Risks: template mismatch or duplicated markup; run HTML/link validation and visual spot-check.",
               f"  - Evidence: `fuzzy_diffs/{safe}.diff`, `fuzzy_byte_diffs/{safe}.cmp.txt`."]
if not fuzzy:
    report.append('- No fuzzy correspondences available; all items need manual confirmation.')

report += ['', '## C. Repo-level transplant plan', '',
'- PR1: Deploy/runtime parity (`wrangler.*`, `_headers`, `_redirects`, `.well-known/security.txt`).',
'- PR2: CI/CD parity (`.github/workflows/*` with environment protections).',
'- PR3: Functional parity (`app/api/leads/route.ts`, selected `scripts/*.mjs`).',
'- PR4: Content convergence using fuzzy mapping candidates and manual review.', '',
'Risk matrix:',
'- High: API behavior, redirects/deploy settings.',
'- Medium: workflow migration and SEO/script gating.',
'- Low: documentation and generated-report handling.', '',
'Definition-of-done checklist:',
'- [ ] Exact counts trend in desired direction after each PR.',
'- [ ] Each transplanted item has test/build evidence.',
'- [ ] Deploy preview + prod workflows emit observable statuses.',
'- [ ] All “needs manual confirmation” items resolved or explicitly waived.']

if (OUT/'github').exists():
    report += ['', '## D. Deployments & previews inventory', '',
               'GitHub metadata found under `_audit_root_vs_src/github/`; see `DEPLOYMENTS_PREVIEWS.md` for full inventory with environments/deployments/runs/PR checks.']

(OUT/'ROOT_VS_SRC_AUDIT_REPORT.md').write_text('\n'.join(report) + '\n')

# Transplant plan actionable
plan = ['# TRANSPLANT_PLAN', '', '| source_file(s) | destination_file(s) | rationale | evidence_references | test_gates |', '|---|---|---|---|---|']
for p in top10:
    d,t,v = classify_missing(p)
    ev = 'needs manual confirmation'
    if fuzzy:
        matches = [c for c in fuzzy if c['root_relpath'] == p]
        if matches:
            c = matches[0]
            safe = (c['root_relpath'] + '__TO__' + c['src_relpath']).replace('/', '_').replace(' ', '_')
            ev = f"`fuzzy_diffs/{safe}.diff`; `fuzzy_byte_diffs/{safe}.cmp.txt`"
    plan.append(f"| `{p}` | `{t}` | {d}: transplant to improve SRC parity. | {ev} | {v} |")

# add all fuzzy entries explicitly
if fuzzy:
    plan += ['', '## Fuzzy-backed transplant items']
    for c in fuzzy[:50]:
        safe = (c['root_relpath'] + '__TO__' + c['src_relpath']).replace('/', '_').replace(' ', '_')
        plan.append(f"- `{c['root_relpath']}` → `{c['src_relpath']}` | score={c['score']} | evidence: `fuzzy_diffs/{safe}.diff`, `fuzzy_byte_diffs/{safe}.cmp.txt` | test gates: page render diff + link checks + SEO metadata checks.")

(OUT/'TRANSPLANT_PLAN.md').write_text('\n'.join(plan)+'\n')

# Evidence index maps recommendations -> evidence
eidx = ['# EVIDENCE_INDEX', '', '## Recommendation-to-evidence mapping', '']
for p in top10:
    eidx.append(f"- Recommendation `{p}`")
    eidx.append('  - Exact-layer evidence: none (`CHANGED=0` in `pairing.tsv`).')
    matches = [c for c in fuzzy if c['root_relpath'] == p]
    if matches:
        c = matches[0]
        safe = (c['root_relpath'] + '__TO__' + c['src_relpath']).replace('/', '_').replace(' ', '_')
        eidx.append(f"  - Heuristic evidence: `fuzzy_diffs/{safe}.diff`, `fuzzy_byte_diffs/{safe}.cmp.txt`.")
    else:
        eidx.append('  - Heuristic evidence: needs manual confirmation (no fuzzy mapping row).')

# enumerate all evidence files
eidx += ['', '## Exact-layer evidence files', '- `pairing.tsv`', '- `root_manifest.tsv`', '- `src_manifest.tsv`']
for f in sorted((OUT/'diffs').glob('*.diff')):
    eidx.append(f"- `diffs/{f.name}`")
for f in sorted((OUT/'byte_diffs').glob('*.cmp.txt')):
    eidx.append(f"- `byte_diffs/{f.name}`")
if not any((OUT/'diffs').glob('*.diff')):
    eidx.append('- No exact `CHANGED` diff/cmp evidence files were generated.')

eidx += ['', '## Heuristic-layer evidence files']
if fuzzy_fp.exists():
    eidx.append('- `fuzzy_pairing.tsv`')
for f in sorted((OUT/'fuzzy_diffs').glob('*.diff')):
    eidx.append(f"- `fuzzy_diffs/{f.name}`")
for f in sorted((OUT/'fuzzy_byte_diffs').glob('*.cmp.txt')):
    eidx.append(f"- `fuzzy_byte_diffs/{f.name}`")
if not any((OUT/'fuzzy_diffs').glob('*.diff')):
    eidx.append('- No fuzzy evidence files found.')

if (OUT/'github').exists():
    eidx += ['', '## Deploy/preview-layer evidence files']
    for f in sorted((OUT/'github').glob('*.json')):
        eidx.append(f"- `github/{f.name}`")

(OUT/'EVIDENCE_INDEX.md').write_text('\n'.join(eidx)+'\n')

# optional deployments report
if (OUT/'github').exists():
    dep = ['# DEPLOYMENTS_PREVIEWS', '']
    gh = OUT/'github'
    def load_json(p):
        try:
            return json.loads(p.read_text())
        except Exception:
            return None
    env = load_json(gh/'environments.json')
    deps = load_json(gh/'deployments.json')
    pages = load_json(gh/'pages.json')
    wfs = load_json(gh/'workflows.json')
    runs = load_json(gh/'runs.json')

    dep.append('## Environments + protections')
    if isinstance(env, dict) and 'environments' in env:
        for e in env['environments']:
            dep.append(f"- `{e.get('name')}` protection_rules={len(e.get('protection_rules',[]))}")
    else:
        dep.append('- No environments payload available.')

    dep.append('\n## Deployments + recent statuses')
    if isinstance(deps, list):
        for d in deps[:20]:
            dep.append(f"- id={d.get('id')} ref={d.get('ref')} env={d.get('environment')} created_at={d.get('created_at')}")
    else:
        dep.append('- No deployments payload available.')

    dep.append('\n## Workflows + runs relevant to deploy/preview')
    if isinstance(wfs, dict):
        for w in wfs.get('workflows',[])[:50]:
            dep.append(f"- workflow `{w.get('name')}` path={w.get('path')} state={w.get('state')}")
    if isinstance(runs, dict):
        for r in runs.get('workflow_runs',[])[:50]:
            dep.append(f"- run `{r.get('name')}` event={r.get('event')} status={r.get('status')} conclusion={r.get('conclusion')} url={r.get('html_url')}")

    dep.append('\n## PR checks and preview URLs')
    preview_found = False
    for f in sorted(gh.glob('pr_*_checks.json')):
        data = load_json(f)
        if not data:
            continue
        for check in data.get('statusCheckRollup',[]):
            details = check.get('detailsUrl') or check.get('targetUrl')
            if details and any(k in details.lower() for k in ['vercel','netlify','pages.dev','preview','deploy']):
                preview_found = True
                dep.append(f"- PR#{data.get('number')} check preview url: {details}")
    if not preview_found:
        dep.append('- No preview URLs found in PR check payloads.')

    dep.append('\n## Gaps and concrete fixes')
    dep.append('- Ensure all deploy workflows create GitHub Deployments with statuses for environment observability.')
    dep.append('- Surface preview URLs explicitly via check-run detailsUrl/output summary.')
    dep.append('- Add environment protection rules (required reviewers/wait timers) where missing.')
    (OUT/'DEPLOYMENTS_PREVIEWS.md').write_text('\n'.join(dep)+'\n')

print('reports generated')
print(f"exact_counts IDENTICAL={counts.get('IDENTICAL',0)} CHANGED={counts.get('CHANGED',0)} MISSING_IN_SRC={counts.get('MISSING_IN_SRC',0)} EXTRA_IN_SRC={counts.get('EXTRA_IN_SRC',0)}")
print(f"github_metadata_captured={'yes' if (OUT/'github').exists() else 'no'}")

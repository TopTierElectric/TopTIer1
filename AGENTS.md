# Repository Agent Instructions

## Canonical Source

- Treat `src/` as the canonical source for runtime site artifacts.

## Audit Artifact Hygiene

- Never commit generated audit outputs under `_audit_root_vs_src/**`.
- Before finalizing any work, fail immediately if `_audit_root_vs_src/**` is staged.

## Required Validation Stack

Before any final commit or PR-ready state, always run the full stack from repo root:

```bash
npm ci --no-audit --no-fund
npm run build
npm run verify
npm run qa
npm run localseo:ci
npm run check:workflows
npm run check:navigation-sim
python3 -m py_compile tools/generate_root_src_reports.py tools/fuzzy_pair.py tools/port_advanced_root_into_src.py
bash tools/root_src_audit_v2.sh . src /tmp/root_src_audit "" 1 1 0
bash tools/root_src_audit.sh . src /tmp/root_src_audit_legacy
```

## Reporting Expectations

- Include exact commands run in your summary.
- Include final root↔src audit counts in your summary.

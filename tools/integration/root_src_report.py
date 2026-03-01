#!/usr/bin/env python3
import csv
from collections import Counter
from pathlib import Path

PAIRING = Path('/tmp/root_src_audit/pairing.tsv') if Path('/tmp/root_src_audit/pairing.tsv').exists() else Path('_audit_root_vs_src/pairing.tsv')
REPORT = Path('reports/root_src_audit_summary.md')
CSV_OUT = Path('artifacts/root_src/pairing_summary.csv')

INFRA_PREFIXES = (
    '.github/',
    'e2e/',
    'tools/integration/',
)
INFRA_EXACT = {
    '.github/dependabot.yml',
    'AGENTS.md',
    '.lighthouserc.json',
    'playwright.config.mjs',
    'scripts/check-site-json.mjs',
}


def is_infra_only(path: str) -> bool:
    return path.startswith(INFRA_PREFIXES) or path in INFRA_EXACT


rows = []
with PAIRING.open(newline='') as f:
    for row in csv.reader(f, delimiter='\t'):
        if row:
            rows.append(row)

counts = Counter(r[0] for r in rows)
infra_only_root_files = sum(1 for r in rows if r[0] == 'MISSING_IN_SRC' and is_infra_only(r[1]))
runtime_missing_in_src = counts.get('MISSING_IN_SRC', 0) - infra_only_root_files

REPORT.parent.mkdir(parents=True, exist_ok=True)
CSV_OUT.parent.mkdir(parents=True, exist_ok=True)

with CSV_OUT.open('w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['status', 'count'])
    w.writerow(['IDENTICAL', counts.get('IDENTICAL', 0)])
    w.writerow(['CHANGED', counts.get('CHANGED', 0)])
    w.writerow(['runtime_missing_in_src', runtime_missing_in_src])
    w.writerow(['infra_only_root_files', infra_only_root_files])
    w.writerow(['EXTRA_IN_SRC', counts.get('EXTRA_IN_SRC', 0)])

lines = [
    '# Root ↔ Src Audit Summary',
    '',
    f'- Source pairing file: `{PAIRING}`',
    f'- IDENTICAL: {counts.get("IDENTICAL", 0)}',
    f'- CHANGED: {counts.get("CHANGED", 0)}',
    f'- runtime_missing_in_src: {runtime_missing_in_src}',
    f'- infra_only_root_files: {infra_only_root_files}',
    f'- EXTRA_IN_SRC: {counts.get("EXTRA_IN_SRC", 0)}',
]
REPORT.write_text('\n'.join(lines) + '\n')
print('\n'.join(lines))

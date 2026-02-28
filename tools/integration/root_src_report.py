#!/usr/bin/env python3
import csv
from collections import Counter
from pathlib import Path

PAIRING = Path('/tmp/root_src_audit/pairing.tsv') if Path('/tmp/root_src_audit/pairing.tsv').exists() else Path('_audit_root_vs_src/pairing.tsv')
REPORT = Path('reports/root_src_audit_summary.md')
CSV_OUT = Path('artifacts/root_src/pairing_summary.csv')

rows = []
with PAIRING.open(newline='') as f:
    for row in csv.reader(f, delimiter='\t'):
        if row:
            rows.append(row)

counts = Counter(r[0] for r in rows)

REPORT.parent.mkdir(parents=True, exist_ok=True)
CSV_OUT.parent.mkdir(parents=True, exist_ok=True)

with CSV_OUT.open('w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['status', 'count'])
    for status in ['IDENTICAL', 'CHANGED', 'MISSING_IN_SRC', 'EXTRA_IN_SRC']:
        w.writerow([status, counts.get(status, 0)])

lines = [
    '# Root ↔ Src Audit Summary',
    '',
    f'- Source pairing file: `{PAIRING}`',
    f'- IDENTICAL: {counts.get("IDENTICAL", 0)}',
    f'- CHANGED: {counts.get("CHANGED", 0)}',
    f'- MISSING_IN_SRC: {counts.get("MISSING_IN_SRC", 0)}',
    f'- EXTRA_IN_SRC: {counts.get("EXTRA_IN_SRC", 0)}',
]
REPORT.write_text('\n'.join(lines) + '\n')
print('\n'.join(lines))

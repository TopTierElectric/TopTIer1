#!/usr/bin/env python3
import argparse
import csv
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--pairing', default='/tmp/root_src_audit/pairing.tsv')
parser.add_argument('--batch-size', type=int, default=10)
parser.add_argument('--allow-binary', action='store_true')
args = parser.parse_args()

binary_ext = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.pdf', '.zip'}
preferred_ext = {'.md', '.txt', '.json', '.yml', '.yaml', '.mjs', '.js', '.ts', '.tsx', '.css', '.html', '.sh', '.py'}

rows = []
with Path(args.pairing).open(newline='') as f:
    for row in csv.reader(f, delimiter='\t'):
        if row and row[0] == 'MISSING_IN_SRC':
            rows.append(row[1])

rows.sort(key=lambda p: (Path(p).suffix not in preferred_ext, p))
selected = []
for path in rows:
    ext = Path(path).suffix.lower()
    if ext in binary_ext and not args.allow_binary:
        continue
    selected.append(path)
    if len(selected) >= args.batch_size:
        break

print('Suggested transplant batch:')
for item in selected:
    print(f'- {item}')

print('\nNext commands:')
print('  git checkout -b transplant/root-src-batch-1')
for item in selected:
    print(f'  cp "{item}" "src/{item}"')
print('  npm run build && npm run verify')
print('  git add -A && git commit -m "transplant: root->src batch 1"')

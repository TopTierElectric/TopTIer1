# Extensive Verification Report

## Environment

- Node.js: `v20.19.6`
- npm: `11.4.2`
- Python: `3.12.12`

## Checks Executed

1. `npm run lint`
2. `npm run build`
3. `npm run verify`
4. `npm run qa`
5. `python3 -m py_compile tools/*.py`
6. `./tools/root_src_audit_v2.sh . src _audit_root_vs_src "" 1 1 0`
7. `python3 tools/generate_root_src_reports.py`
8. `python3 tools/port_advanced_root_into_src.py`
9. `awk -F'\t' '{c[$1]++} END {for (k in c) print k,c[k]}' _audit_root_vs_src/pairing.tsv | sort`
10. `wc -l _audit_root_vs_src/fuzzy_pairing.tsv`
11. `find _audit_root_vs_src/fuzzy_diffs -type f | wc -l`
12. `find _audit_root_vs_src/fuzzy_byte_diffs -type f | wc -l`

## Results

- Lint/build/verify/qa all completed successfully.
- Python tooling compile checks passed.
- ROOT↔SRC audit rerun completed successfully.
- Port tool completed with no writes in this verification rerun: `ported=0 skipped_existing=0 missing_on_disk=0 force=0`.
- Exact layer counts after rerun:
  - `EXTRA_IN_SRC 70`
  - `IDENTICAL 47`
  - `MISSING_IN_SRC 349`
- Fuzzy evidence inventory after rerun:
  - `fuzzy_pairing.tsv` lines: `75`
  - `fuzzy_diffs` files: `74`
  - `fuzzy_byte_diffs` files: `74`

## Notes

- `npm` emitted a non-blocking warning about unknown env config `http-proxy`.
- `cmp: EOF ...` lines during fuzzy evidence generation are expected when compared files differ in length; audit completed normally.

#!/usr/bin/env bash
set -euo pipefail

MAX_ATTEMPTS="${MAX_ATTEMPTS:-5}"
ATTEMPT=1
LOG_DIR="${LOG_DIR:-_codex_logs}"
mkdir -p "$LOG_DIR"

run_gate_stack() {
  npm ci --no-audit --no-fund
  npm run build
  npm run verify
  npm run qa
  npm run localseo:ci
  npm run check:workflows
  npm run check:navigation-sim
  python3 -m py_compile tools/generate_root_src_reports.py tools/fuzzy_pair.py tools/port_advanced_root_into_src.py
  rm -rf /tmp/root_src_audit /tmp/root_src_audit_legacy
  bash tools/root_src_audit_v2.sh . src /tmp/root_src_audit "" 1 1 0
  awk -F'\t' '{c[$1]++} END {for (k in c) print k, c[k]}' /tmp/root_src_audit/pairing.tsv | sort
  awk -F'\t' '$1=="CHANGED"{print $2}' /tmp/root_src_audit/pairing.tsv
  bash tools/root_src_audit.sh . src /tmp/root_src_audit_legacy
}

check_staging_safety() {
  if git diff --cached --name-only | grep -E '^_audit_root_vs_src/' >/dev/null; then
    echo "ERROR: staged files found under _audit_root_vs_src/." >&2
    return 1
  fi
}

print_final_counts() {
  python3 - <<'PY'
import csv
infra_prefixes = ('.github/', 'e2e/', 'tools/integration/')
infra_exact = {'.github/dependabot.yml', 'AGENTS.md', '.lighthouserc.json', 'playwright.config.mjs', 'scripts/check-site-json.mjs'}
rows = []
with open('/tmp/root_src_audit/pairing.tsv', newline='') as f:
    for row in csv.reader(f, delimiter='\t'):
        if row:
            rows.append(row)
counts = {}
for row in rows:
    counts[row[0]] = counts.get(row[0], 0) + 1
infra = sum(1 for row in rows if row[0] == 'MISSING_IN_SRC' and (row[1].startswith(infra_prefixes) or row[1] in infra_exact))
runtime = counts.get('MISSING_IN_SRC', 0) - infra
print(f"IDENTICAL={counts.get('IDENTICAL', 0)}")
print(f"CHANGED={counts.get('CHANGED', 0)}")
print(f"runtime_missing_in_src={runtime}")
print(f"infra_only_root_files={infra}")
print(f"EXTRA_IN_SRC={counts.get('EXTRA_IN_SRC', 0)}")
PY
}

while true; do
  LOG_FILE="$LOG_DIR/run_until_green_attempt_${ATTEMPT}.log"
  echo "[run_until_green] attempt=${ATTEMPT} log=${LOG_FILE}"
  if { run_gate_stack && check_staging_safety; } >"$LOG_FILE" 2>&1; then
    echo "[run_until_green] GREEN on attempt ${ATTEMPT}"
    print_final_counts
    exit 0
  fi

  echo "[run_until_green] attempt ${ATTEMPT} failed; see ${LOG_FILE}" >&2
  if [[ "$MAX_ATTEMPTS" != "0" && "$ATTEMPT" -ge "$MAX_ATTEMPTS" ]]; then
    echo "[run_until_green] exhausted attempts (${MAX_ATTEMPTS})" >&2
    exit 1
  fi

  ATTEMPT=$((ATTEMPT + 1))
  sleep 2
done

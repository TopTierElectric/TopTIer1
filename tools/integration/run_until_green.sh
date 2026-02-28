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

while true; do
  LOG_FILE="$LOG_DIR/run_until_green_attempt_${ATTEMPT}.log"
  echo "[run_until_green] attempt=${ATTEMPT} log=${LOG_FILE}"
  if { run_gate_stack && check_staging_safety; } >"$LOG_FILE" 2>&1; then
    echo "[run_until_green] GREEN on attempt ${ATTEMPT}"
    awk -F'\t' '{c[$1]++} END {printf("IDENTICAL=%d\nCHANGED=%d\nMISSING_IN_SRC=%d\nEXTRA_IN_SRC=%d\n",c["IDENTICAL"],c["CHANGED"],c["MISSING_IN_SRC"],c["EXTRA_IN_SRC"])}' /tmp/root_src_audit/pairing.tsv
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

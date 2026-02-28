#!/usr/bin/env python3
import os
import subprocess
import time
from pathlib import Path

retries = int(os.getenv('WATCHDOG_RETRIES', '3'))
retry_sleep = int(os.getenv('WATCHDOG_RETRY_SLEEP', '15'))
issue_file = Path('artifacts/root_src/watchdog_escalation.txt')
report_file = Path('artifacts/root_src/watchdog_report.md')

cmd = ['bash', 'tools/integration/run_until_green.sh']

last_error = ''
for attempt in range(1, retries + 1):
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode == 0:
        report_file.parent.mkdir(parents=True, exist_ok=True)
        report_file.write_text(f"# Watchdog Report\n\nstatus: GREEN\nattempt: {attempt}\n\n```\n{proc.stdout}\n```\n")
        print(report_file.read_text())
        raise SystemExit(0)
    last_error = f"attempt={attempt}\nstdout:\n{proc.stdout}\nstderr:\n{proc.stderr}"
    if attempt < retries:
        time.sleep(retry_sleep)

report_file.parent.mkdir(parents=True, exist_ok=True)
report_file.write_text(f"# Watchdog Report\n\nstatus: RED\nretries: {retries}\n\n```\n{last_error}\n```\n")
issue_file.write_text(
    'Repository remains red after watchdog retries.\n'
    'Suggested escalation:\n'
    '- Open/Update issue: "Integration watchdog red"\n'
    '- Attach artifacts/root_src/watchdog_report.md and _codex_logs/run_until_green_attempt_*.log\n'
)
print(report_file.read_text())
raise SystemExit(1)

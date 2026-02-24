#!/usr/bin/env python3
import csv
import hashlib
import os
import shutil
from pathlib import Path

PAIRING = Path("_audit_root_vs_src/pairing.tsv")
SRC_ROOT = Path("src")
LOG_DIR = Path("_audit_root_vs_src/_port_logs")
FORCE = os.getenv("FORCE_PORT_OVERWRITE", "0") == "1"

ALLOW_EXACT = {
    "wrangler.toml",
    "wrangler.jsonc",
    "_headers",
    "_redirects",
    ".well-known/security.txt",
    ".env.example",
}
ALLOW_PREFIXES = (
    "scripts/",
    "app/api/",
)


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def size(path: Path) -> int:
    return path.stat().st_size


def eligible(rel: str) -> bool:
    if rel in ALLOW_EXACT:
        return True
    return any(rel.startswith(prefix) for prefix in ALLOW_PREFIXES)


def main() -> int:
    if not PAIRING.exists():
        raise SystemExit(f"Missing {PAIRING}")
    if not SRC_ROOT.is_dir():
        raise SystemExit(f"Missing {SRC_ROOT}/")

    LOG_DIR.mkdir(parents=True, exist_ok=True)
    ported_log = LOG_DIR / "ported.tsv"
    skipped_log = LOG_DIR / "skipped_existing.tsv"
    missing_log = LOG_DIR / "missing_on_disk.tsv"

    ported = []
    skipped = []
    missing = []

    with PAIRING.open(newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.reader(f, delimiter="\t")
        for row in reader:
            if len(row) < 2:
                continue
            status, rel = row[0], row[1]
            if status != "MISSING_IN_SRC":
                continue
            if not eligible(rel):
                continue

            src = SRC_ROOT / rel
            root = Path(rel)

            if not root.exists() or not root.is_file():
                missing.append((rel, str(root)))
                continue

            if src.exists() and not FORCE:
                skipped.append((rel, str(src), "exists"))
                continue

            src.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(root, src)

            rsha, ssha = sha256(root), sha256(src)
            rsz, ssz = size(root), size(src)
            if rsha != ssha or rsz != ssz:
                raise SystemExit(
                    f"Verification failed for {rel}: root({rsha},{rsz}) != src({ssha},{ssz})"
                )
            ported.append((rel, str(src), rsha, str(rsz)))

    ported_log.write_text("\n".join("\t".join(r) for r in ported) + ("\n" if ported else ""), encoding="utf-8")
    skipped_log.write_text("\n".join("\t".join(r) for r in skipped) + ("\n" if skipped else ""), encoding="utf-8")
    missing_log.write_text("\n".join("\t".join(r) for r in missing) + ("\n" if missing else ""), encoding="utf-8")

    print(f"ported={len(ported)} skipped_existing={len(skipped)} missing_on_disk={len(missing)} force={int(FORCE)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
import argparse, csv, os, re
from difflib import SequenceMatcher

TEXT_EXT = {
  ".ts",".tsx",".js",".mjs",".cjs",".jsx",
  ".json",".jsonc",".yaml",".yml",".toml",
  ".md",".txt",".html",".css",".scss",
  ".env",".example",".ini",".conf",
  ".svg",".xml",".graphql",".gql"
}

def is_probably_text(path: str) -> bool:
  _, ext = os.path.splitext(path.lower())
  return ext in TEXT_EXT or os.path.basename(path).startswith(".")

def read_head(path: str, limit: int) -> str:
  with open(path, "rb") as f:
    b = f.read(limit)
  return b.decode("utf-8", errors="replace")

def norm_name(p: str) -> str:
  base = os.path.basename(p).lower()
  base = re.sub(r'[\W_]+', '-', base)
  return base.strip("-")

def score_text(a: str, b: str) -> float:
  return SequenceMatcher(None, a, b).ratio()

def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("--root-snap", required=True)
  ap.add_argument("--src-snap", required=True)
  ap.add_argument("--root-manifest", required=True)
  ap.add_argument("--src-manifest", required=True)
  ap.add_argument("--out", required=True)
  ap.add_argument("--max-candidates", type=int, default=5)
  ap.add_argument("--read-bytes", type=int, default=200_000)
  ap.add_argument("--min-score", type=float, default=0.55)
  args = ap.parse_args()

  def load_manifest(fp):
    m = {}
    with open(fp, newline="") as f:
      for sha, size, rel in csv.reader(f, delimiter="\t"):
        m[rel] = (sha, int(size))
    return m

  root = load_manifest(args.root_manifest)
  src  = load_manifest(args.src_manifest)

  src_by_base = {}
  src_by_ext = {}
  for rel in src.keys():
    base = os.path.basename(rel).lower()
    ext = os.path.splitext(base)[1]
    src_by_base.setdefault(base, []).append(rel)
    src_by_ext.setdefault(ext, []).append(rel)

  rows = []
  for rrel, (rsha, rsize) in root.items():
    rbase = os.path.basename(rrel).lower()
    rext = os.path.splitext(rbase)[1]
    candidates = []

    candidates.extend(src_by_base.get(rbase, []))
    if not candidates and rext:
      candidates.extend(src_by_ext.get(rext, [])[:250])

    if not candidates:
      continue

    rpath = os.path.join(args.root_snap, rrel)
    if not os.path.isfile(rpath):
      continue

    rtxt = read_head(rpath, args.read_bytes) if is_probably_text(rrel) else None
    ranked = []

    for srel in candidates:
      spath = os.path.join(args.src_snap, srel)
      if not os.path.isfile(spath):
        continue

      name_bonus = 0.10 if os.path.basename(srel).lower() == rbase else 0.0

      if rtxt is not None and is_probably_text(srel):
        stxt = read_head(spath, args.read_bytes)
        sim = score_text(rtxt, stxt) + name_bonus
      else:
        size_sim = 1.0 - min(1.0, abs(rsize - src[srel][1]) / max(rsize, src[srel][1], 1))
        name_sim = score_text(norm_name(rrel), norm_name(srel))
        sim = 0.60*size_sim + 0.40*name_sim + name_bonus

      ranked.append((sim, srel))

    ranked.sort(reverse=True, key=lambda t: t[0])
    top = [(sim, srel) for sim, srel in ranked[:args.max_candidates] if sim >= args.min_score]
    for sim, srel in top:
      ssha, ssize = src[srel]
      rows.append({
        "root_relpath": rrel,
        "src_relpath": srel,
        "score": f"{sim:.4f}",
        "root_sha256": rsha,
        "src_sha256": ssha,
        "root_size": str(rsize),
        "src_size": str(ssize),
      })

  with open(args.out, "w", newline="") as f:
    w = csv.DictWriter(
      f,
      fieldnames=["root_relpath","src_relpath","score","root_sha256","src_sha256","root_size","src_size"],
      delimiter="\t"
    )
    w.writeheader()
    for r in rows:
      w.writerow(r)

if __name__ == "__main__":
  main()

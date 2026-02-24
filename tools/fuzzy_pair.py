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

def strip_html(s: str) -> str:
  # Remove scripts/styles/comments then tags
  s = re.sub(r"(?is)<!--.*?-->", " ", s)
  s = re.sub(r"(?is)<script.*?>.*?</script>", " ", s)
  s = re.sub(r"(?is)<style.*?>.*?</style>", " ", s)
  s = re.sub(r"(?is)<noscript.*?>.*?</noscript>", " ", s)
  s = re.sub(r"(?is)<[^>]+>", " ", s)
  return s

def normalize_text(rel: str, s: str) -> str:
  ext = os.path.splitext(rel.lower())[1]
  if ext in (".html", ".htm"):
    s = strip_html(s)
  # Drop urls + collapse whitespace
  s = re.sub(r"https?://\S+", " ", s)
  s = re.sub(r"\s+", " ", s).strip().lower()
  return s

def tokens(s: str):
  # keep moderately-informative tokens
  return set(re.findall(r"[a-z0-9]{3,}", s.lower()))

def jaccard(a: set, b: set) -> float:
  if not a and not b:
    return 1.0
  u = len(a | b)
  if u == 0:
    return 0.0
  return len(a & b) / u

def score_text(a: str, b: str) -> float:
  # Hybrid: order-sensitive + bag-of-words
  sm = SequenceMatcher(None, a, b).ratio()
  ja = jaccard(tokens(a), tokens(b))
  return 0.65 * sm + 0.35 * ja

def stem(rel: str) -> str:
  return os.path.splitext(os.path.basename(rel))[0].lower()

def route_key(rel: str) -> str:
  # route-ish key: drop extension, normalize separators, drop common framework prefixes
  r = rel.replace("\\", "/")
  r = re.sub(r"\.[^./]+$", "", r)  # drop ext
  for prefix in ("pages/", "page/", "app/", "routes/", "src/"):
    if r.lower().startswith(prefix):
      r = r[len(prefix):]
      break
  # normalize /index -> folder route
  if r.lower().endswith("/index"):
    r = r[:-len("/index")]
  return r.strip("/").lower()

def norm_name(p: str) -> str:
  p = p.lower().replace("\\", "/")
  p = re.sub(r"\.[^./]+$", "", p)
  p = re.sub(r"[\W_]+", "-", p)
  return p.strip("-")

def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("--root-snap", required=True)
  ap.add_argument("--src-snap", required=True)
  ap.add_argument("--root-manifest", required=True)
  ap.add_argument("--src-manifest", required=True)
  ap.add_argument("--out", required=True)
  ap.add_argument("--max-candidates", type=int, default=10)
  ap.add_argument("--read-bytes", type=int, default=400_000)
  ap.add_argument("--min-score", type=float, default=0.35)
  args = ap.parse_args()

  def load_manifest(fp):
    m = {}
    with open(fp, newline="") as f:
      for sha, size, rel in csv.reader(f, delimiter="\t"):
        m[rel] = (sha, int(size))
    return m

  root = load_manifest(args.root_manifest)
  src  = load_manifest(args.src_manifest)

  # Index SRC multiple ways
  src_by_base = {}
  src_by_ext = {}
  src_by_stem = {}
  src_by_route = {}
  src_by_norm = {}

  for rel in src.keys():
    base = os.path.basename(rel).lower()
    ext = os.path.splitext(base)[1]
    src_by_base.setdefault(base, []).append(rel)
    if ext:
      src_by_ext.setdefault(ext, []).append(rel)

    st = stem(rel)
    src_by_stem.setdefault(st, []).append(rel)

    rk = route_key(rel)
    src_by_route.setdefault(rk, []).append(rel)

    nn = norm_name(rel)
    src_by_norm.setdefault(nn, []).append(rel)

  rows = []
  for rrel, (rsha, rsize) in root.items():
    rbase = os.path.basename(rrel).lower()
    rext = os.path.splitext(rbase)[1]
    rst = stem(rrel)
    rrk = route_key(rrel)
    rnn = norm_name(rrel)

    candidates = []

    # 1) Same basename
    candidates.extend(src_by_base.get(rbase, []))

    # 2) Same stem (cross-extension mapping)
    candidates.extend(src_by_stem.get(rst, []))

    # 3) Same route key (pages/app routing)
    candidates.extend(src_by_route.get(rrk, []))

    # 4) Norm-name match (handles dashes/underscores/index)
    candidates.extend(src_by_norm.get(rnn, []))

    # 5) Fallback: same extension (cap)
    if not candidates and rext:
      candidates.extend(src_by_ext.get(rext, [])[:300])

    # De-dupe while preserving order
    seen = set()
    candidates2 = []
    for c in candidates:
      if c not in seen:
        seen.add(c)
        candidates2.append(c)
    candidates = candidates2

    if not candidates:
      continue

    rpath = os.path.join(args.root_snap, rrel)
    if not os.path.isfile(rpath):
      continue

    rtxt = read_head(rpath, args.read_bytes) if is_probably_text(rrel) else None
    if rtxt is not None:
      rtxt = normalize_text(rrel, rtxt)

    ranked = []
    for srel in candidates:
      spath = os.path.join(args.src_snap, srel)
      if not os.path.isfile(spath):
        continue

      bonus = 0.0
      if os.path.basename(srel).lower() == rbase: bonus += 0.10
      if stem(srel) == rst: bonus += 0.10
      if route_key(srel) == rrk: bonus += 0.15

      if rtxt is not None and is_probably_text(srel):
        stxt = normalize_text(srel, read_head(spath, args.read_bytes))
        sim = score_text(rtxt, stxt) + bonus
      else:
        # binary-ish fallback: size proximity + name similarity
        ssha, ssize = src[srel]
        size_sim = 1.0 - min(1.0, abs(rsize - ssize) / max(rsize, ssize, 1))
        name_sim = SequenceMatcher(None, norm_name(rrel), norm_name(srel)).ratio()
        sim = 0.60 * size_sim + 0.40 * name_sim + bonus

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

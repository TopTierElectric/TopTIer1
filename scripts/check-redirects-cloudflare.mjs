import fs from "node:fs";

const path = "dist/_redirects";
if (!fs.existsSync(path)) process.exit(0);

const content = fs.readFileSync(path, "utf8");

// Cloudflare expects numeric code tokens; `301!` will not match format.
const bad = content.match(/\b\d{3}!\b/g);
if (bad) {
  console.error(`Invalid Cloudflare Pages _redirects status token(s): ${[...new Set(bad)].join(", ")}`);
  console.error("Fix: replace 301! -> 301 (Cloudflare _redirects uses numeric codes only).");
  process.exit(1);
}

process.exit(0);

import fs from "node:fs";
import path from "node:path";

const disallowed = [
  "YOUR_CLOUDFLARE_ANALYTICS_TOKEN",
  "your-email@example.com",
  "REPLACE_WITH_REAL_TOKEN",
  "YOUR_ID_HERE",
  "__PASTE_GOOGLE_REVIEW_LINK__"
];

const root = process.cwd();
const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
const hits = [];

for (const file of htmlFiles) {
  const contents = fs.readFileSync(path.join(root, file), "utf8");
  for (const token of disallowed) {
    if (contents.includes(token)) hits.push({ file, token });
  }
}

if (hits.length) {
  console.error("Placeholder tokens detected:");
  for (const hit of hits) console.error(`- ${hit.file}: ${hit.token}`);
  process.exit(1);
}

console.log(`✅ Placeholder check passed (${htmlFiles.length} HTML files scanned).`);

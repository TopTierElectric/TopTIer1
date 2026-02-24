import fs from "node:fs";

const redirectsFile = "_redirects";
if (!fs.existsSync(redirectsFile)) {
  console.error("❌ Missing root _redirects file");
  process.exit(1);
}

const body = fs.readFileSync(redirectsFile, "utf8");
if (!body.trim()) {
  console.error("❌ _redirects is empty");
  process.exit(1);
}

console.log("✅ Origin redirects check passed.");

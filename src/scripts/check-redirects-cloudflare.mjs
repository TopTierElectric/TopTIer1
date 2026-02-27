#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const outputDir = process.env.PAGES_OUTPUT_DIR || ".";
const redirectsPath = path.join(process.cwd(), outputDir, "_redirects");
const supportedStatusCodes = new Set([
  "200",
  "301",
  "302",
  "303",
  "307",
  "308",
]);

if (!fs.existsSync(redirectsPath)) {
  console.log(`[redirects] no ${redirectsPath} found (skipping).`);
  process.exit(0);
}

const content = fs.readFileSync(redirectsPath, "utf8");
const invalidBangTokens = content.match(/\b\d{3}!\b/g);
if (invalidBangTokens?.length) {
  console.error(
    `[redirects] invalid status token(s): ${[...new Set(invalidBangTokens)].join(", ")}`,
  );
  process.exit(1);
}

let failed = false;
const lines = content.split(/\r?\n/);
const extensionlessToHtml =
  /^\/(?!$)([^\s./][^\s]*)\s+\/\1\.html(?:\s+(?:301|302|303|307|308))?$/;
for (let index = 0; index < lines.length; index += 1) {
  const line = lines[index].trim();
  if (!line || line.startsWith("#")) continue;

  if (extensionlessToHtml.test(line)) {
    console.error(
      `[redirects] line ${index + 1} must not redirect extensionless paths to .html: "${lines[index]}"`,
    );
    failed = true;
    continue;
  }

  const parts = line.split(/\s+/);
  if (parts.length < 2 || parts.length > 3) {
    console.error(
      `[redirects] line ${index + 1} has invalid token count: "${lines[index]}"`,
    );
    failed = true;
    continue;
  }

  const [source, destination] = parts;
  if (/^https?:\/\//i.test(source)) {
    console.error(
      `[redirects] line ${index + 1} uses absolute source URL; Cloudflare Pages _redirects supports path-only sources: "${lines[index]}"`,
    );
    failed = true;
  }

  if (!source.startsWith("/")) {
    console.error(
      `[redirects] line ${index + 1} source must start with '/': "${lines[index]}"`,
    );
    failed = true;
  }

  if (!(destination.startsWith("/") || /^https?:\/\//i.test(destination))) {
    console.error(
      `[redirects] line ${index + 1} destination must be relative path or absolute URL: "${lines[index]}"`,
    );
    failed = true;
  }

  if (parts.length === 3) {
    const status = parts[2];

    if (!/^\d{3}$/.test(status)) {
      console.error(
        `[redirects] line ${index + 1} has invalid status format (must be 3 digits): "${lines[index]}"`,
      );
      failed = true;
      continue;
    }

    if (!supportedStatusCodes.has(status)) {
      console.error(
        `[redirects] line ${index + 1} uses unsupported status ${status}: "${lines[index]}". Supported: ${[...supportedStatusCodes].join(", ")}`,
      );
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("[redirects] OK");

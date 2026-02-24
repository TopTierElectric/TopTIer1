#!/usr/bin/env node

import fs from "node:fs";
import { execSync } from "node:child_process";

function run(cmd) {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .trim()
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function resolveBaseRef() {
  const upstreamCandidates = ["origin/main", "origin/master", "main", "master"];

  for (const ref of upstreamCandidates) {
    const exists = run(`git rev-parse --verify ${ref}`).length > 0;
    if (!exists) continue;

    const base = run(`git merge-base HEAD ${ref}`)[0];
    if (base) return base;
  }

  const reflogStart = run("git reflog --format='%H' HEAD | tail -n 1")[0];
  if (reflogStart) return reflogStart;

  const prev = run("git rev-parse --verify HEAD~1")[0];
  return prev || null;
}

function parseEntries(markdown) {
  const sections = markdown.split("\n- Local file: ").slice(1);
  const entries = new Map();

  for (const section of sections) {
    const lines = section.split("\n");
    const localFile = lines[0].trim();
    const body = `- Local file: ${section}`;
    entries.set(localFile, body);
  }

  return entries;
}

function missingFields(entryBody) {
  const required = [
    "- Source page:",
    "- Direct download:",
    "- Author:",
    "- License:",
    "- Download date:",
  ];

  return required.filter((field) => !entryBody.includes(field));
}

const imageExt = /\.(avif|gif|jpe?g|png|svg|webp)$/i;
const baseRef = resolveBaseRef();
const changedFromBase = baseRef
  ? run(
      `git diff --name-only --diff-filter=A ${baseRef}..HEAD -- assets/images`,
    )
  : [];
const staged = run(
  "git diff --cached --name-only --diff-filter=A -- assets/images",
);
const unstaged = run("git diff --name-only --diff-filter=A -- assets/images");
const untracked = run(
  "git ls-files --others --exclude-standard -- assets/images",
);

const addedImages = [
  ...new Set([...changedFromBase, ...staged, ...unstaged, ...untracked]),
]
  .filter((p) => imageExt.test(p))
  .sort();

if (addedImages.length === 0) {
  console.log("No newly added image files detected under assets/images.");
  process.exit(0);
}

const sourcesPath = "docs/IMAGE-SOURCES.md";
const sources = fs.existsSync(sourcesPath)
  ? fs.readFileSync(sourcesPath, "utf8")
  : "";
const entries = parseEntries(sources);

const missingEntries = [];
const incompleteEntries = [];

for (const imagePath of addedImages) {
  const entryBody = entries.get(imagePath);
  if (!entryBody) {
    missingEntries.push(imagePath);
    continue;
  }

  const missing = missingFields(entryBody);
  if (missing.length > 0) {
    incompleteEntries.push({ imagePath, missing });
  }
}

if (missingEntries.length > 0 || incompleteEntries.length > 0) {
  if (missingEntries.length > 0) {
    console.error("Missing IMAGE-SOURCES entries for new image file(s):");
    missingEntries.forEach((m) => console.error(`- ${m}`));
  }

  if (incompleteEntries.length > 0) {
    console.error("\nIncomplete IMAGE-SOURCES metadata for new image file(s):");
    for (const item of incompleteEntries) {
      console.error(`- ${item.imagePath}`);
      item.missing.forEach((field) =>
        console.error(`  - missing field ${field}`),
      );
    }
  }

  console.error(
    "\nUpdate docs/IMAGE-SOURCES.md using the Appendix A template fields.",
  );
  process.exit(1);
}

console.log(
  `IMAGE-SOURCES check passed for ${addedImages.length} new image file(s).`,
);

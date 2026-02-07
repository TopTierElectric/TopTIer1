#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const validDir = path.join(root, ".github", "workflows");
const invalidDir = path.join(root, "github", "workflows");

const hasYml = (dir) =>
  fs.existsSync(dir) &&
  fs
    .readdirSync(dir)
    .some((name) => name.endsWith(".yml") || name.endsWith(".yaml"));

const errors = [];

if (!fs.existsSync(validDir)) {
  errors.push("Missing required workflow directory: .github/workflows");
}

if (hasYml(invalidDir)) {
  const files = fs
    .readdirSync(invalidDir)
    .filter((name) => name.endsWith(".yml") || name.endsWith(".yaml"))
    .join(", ");
  errors.push(
    `Invalid workflow location detected under github/workflows: ${files}. Move these files to .github/workflows.`,
  );
}

if (errors.length > 0) {
  console.error("❌ Workflow location check failed:");
  errors.forEach((err) => console.error(`- ${err}`));
  process.exit(1);
}

console.log(
  "✅ Workflow location check passed (.github/workflows is authoritative).",
);

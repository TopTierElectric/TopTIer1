#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

console.warn(
  "[DEPRECATED] scripts/check-navigation-simulation.js is deprecated. Use scripts/check-navigation-sim.mjs instead.",
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = path.join(__dirname, "check-navigation-sim.mjs");
const result = spawnSync(
  process.execPath,
  [scriptPath, ...process.argv.slice(2)],
  { stdio: "inherit" },
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);

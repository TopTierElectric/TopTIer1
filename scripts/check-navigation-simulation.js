#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const path = require("node:path");

console.warn(
  "[DEPRECATED] scripts/check-navigation-simulation.js is deprecated. Use scripts/check-navigation-sim.mjs instead.",
);

const scriptPath = path.join(__dirname, "check-navigation-sim.mjs");
const result = spawnSync(process.execPath, [scriptPath], { stdio: "inherit" });

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);

#!/usr/bin/env node
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const baseUrl = "http://127.0.0.1:8788/";
const WRANGLER_CMD = process.platform === "win32" ? "wrangler.cmd" : "wrangler";

function resolveWranglerCommand() {
  const localBin = path.resolve("node_modules", ".bin", WRANGLER_CMD);
  if (fs.existsSync(localBin)) {
    return { command: localBin, args: ["pages", "dev"] };
  }

  return {
    command: "npx",
    args: ["--yes", "wrangler@4.64.0", "pages", "dev"],
  };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer(maxAttempts = 120) {
  for (let i = 0; i < maxAttempts; i += 1) {
    try {
      const res = await fetch(baseUrl, { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      // wait and retry
    }
    await sleep(1000);
  }
  throw new Error("wrangler pages dev did not become ready in time");
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else
        reject(
          new Error(
            `${command} ${args.join(" ")} failed with exit code ${code}`,
          ),
        );
    });
  });
}

async function main() {
  const shouldStartServer = process.env.SKIP_WRANGLER_PAGES_DEV !== "1";
  const wranglerExec = resolveWranglerCommand();
  const server = shouldStartServer
    ? spawn(
        wranglerExec.command,
        [...wranglerExec.args, ".", "--port", "8788"],
        { stdio: "inherit" },
      )
    : null;

  try {
    await waitForServer();
    await run("node", ["scripts/crawl.js", baseUrl, "reports"]);

    const crawl = JSON.parse(fs.readFileSync("reports/crawl_raw.json", "utf8"));
    const broken = crawl.pages.filter((p) => p.status !== 200);

    if (broken.length > 0) {
      console.error("Broken pages:", broken.map((p) => p.url).join(", "));
      process.exit(1);
    }

    if (crawl.orphans.length > 0) {
      console.error("Orphan pages:", crawl.orphans.join(", "));
      process.exit(1);
    }

    console.log(`Internal crawl passed: ${crawl.pages.length} pages`);
  } finally {
    if (server) server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const PORT = Number(process.env.PAGES_DEV_PORT || 8788);
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;
const OUTPUT_DIR = path.resolve(process.env.PAGES_OUTPUT_DIR || ".");
const MAX_REDIRECTS = 10;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ensureOutputDir = () => {
  if (!fs.existsSync(OUTPUT_DIR) || !fs.statSync(OUTPUT_DIR).isDirectory()) {
    throw new Error(`PAGES_OUTPUT_DIR does not exist or is not a directory: ${OUTPUT_DIR}`);
  }
};

const buildSeedRoutes = () => {
  const configured = process.env.NAV_SIM_SEED_ROUTES
    ? process.env.NAV_SIM_SEED_ROUTES.split(",").map((route) => route.trim()).filter(Boolean)
    : [];

  if (configured.length) {
    return [...new Set(configured.map((route) => (route.startsWith("/") ? route : `/${route}`)))];
  }

  return ["/"];
};

const extractInternalLinks = (html, sourcePath) => {
  const links = new Set();
  const hrefRegex = /href\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;

  for (const match of html.matchAll(hrefRegex)) {
    const rawHref = (match[1] || match[2] || match[3] || "").trim();
    if (!rawHref) continue;
    if (rawHref.startsWith("#")) continue;
    if (/^(mailto:|tel:|javascript:)/i.test(rawHref)) continue;

    let candidate;
    try {
      candidate = new URL(rawHref, `${BASE_URL}${sourcePath}`);
    } catch {
      continue;
    }

    if (candidate.hostname !== HOST || candidate.port !== String(PORT)) continue;
    candidate.hash = "";
    links.add(`${candidate.pathname}${candidate.search}`);
  }

  return links;
};

const waitForServer = async () => {
  const timeoutMs = 30_000;
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const res = await fetch(`${BASE_URL}/`, { redirect: "manual" });
      if (res.status >= 200 && res.status < 600) {
        return;
      }
    } catch {
      // Retry until timeout.
    }
    await sleep(300);
  }

  throw new Error(`Timed out waiting for wrangler pages dev at ${BASE_URL}`);
};

const fetchFinal = async (route) => {
  let current = route;
  const visited = new Set();
  const chain = [];

  for (let i = 0; i < MAX_REDIRECTS; i += 1) {
    if (visited.has(current)) {
      return { finalPath: current, status: 0, chain, body: "", note: "redirect-loop" };
    }
    visited.add(current);

    const response = await fetch(`${BASE_URL}${current}`, { redirect: "manual" });
    chain.push(`${current} [${response.status}]`);

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) {
        return { finalPath: current, status: response.status, chain, body: "" };
      }

      const next = new URL(location, `${BASE_URL}${current}`);
      if (next.hostname !== HOST || next.port !== String(PORT)) {
        return { finalPath: `${next.pathname}${next.search}`, status: response.status, chain, body: "" };
      }
      current = `${next.pathname}${next.search}`;
      continue;
    }

    const body = response.headers.get("content-type")?.includes("text/html")
      ? await response.text()
      : "";

    return { finalPath: current, status: response.status, chain, body };
  }

  return { finalPath: current, status: 0, chain, body: "", note: "redirect-limit" };
};

const stopWrangler = async (wrangler) => {
  if (wrangler.killed || wrangler.exitCode !== null) return;

  wrangler.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => wrangler.once("exit", resolve)),
    sleep(2_000),
  ]);

  if (wrangler.exitCode === null) {
    wrangler.kill("SIGKILL");
  }
};

const run = async () => {
  ensureOutputDir();
  const seedRoutes = buildSeedRoutes();

  const wrangler = spawn(
    "npx",
    ["wrangler", "pages", "dev", OUTPUT_DIR, "--port", String(PORT)],
    { stdio: ["ignore", "pipe", "pipe"] },
  );

  wrangler.stdout.on("data", (chunk) => process.stdout.write(`[wrangler] ${chunk}`));
  wrangler.stderr.on("data", (chunk) => process.stderr.write(`[wrangler] ${chunk}`));

  const queue = [...seedRoutes];
  const seen = new Set();
  const failures = [];
  const warnings = [];
  let checked = 0;

  try {
    await waitForServer();

    while (queue.length) {
      const route = queue.shift();
      if (!route || seen.has(route)) continue;
      seen.add(route);

      const result = await fetchFinal(route);
      checked += 1;

      if (result.status >= 400) {
        failures.push(`${route} -> ${result.finalPath} returned ${result.status} (${result.chain.join(" -> ")})`);
        continue;
      }

      if (result.note) {
        warnings.push(`${route} ended with ${result.note} (${result.chain.join(" -> ")})`);
        continue;
      }

      if (!result.body) continue;
      for (const link of extractInternalLinks(result.body, result.finalPath)) {
        if (!seen.has(link)) queue.push(link);
      }
    }
  } finally {
    await stopWrangler(wrangler);
  }

  if (warnings.length) {
    console.warn("⚠️ Wrangler navigation simulation warnings:");
    for (const warning of warnings) console.warn(`- ${warning}`);
  }

  if (failures.length) {
    console.error("❌ Wrangler navigation simulation failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`✅ Wrangler navigation simulation passed (${checked} routes checked from ${seedRoutes.length} seeds).`);
};

run().catch((error) => {
  console.error(`❌ ${error.message}`);
  process.exit(1);
});

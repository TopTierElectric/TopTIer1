#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const PORT = Number(process.env.PAGES_DEV_PORT || 8788);
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;
const DEFAULT_OUTPUT_DIR = fs.existsSync("dist") ? "dist" : ".";
const OUTPUT_DIR = path.resolve(process.env.PAGES_OUTPUT_DIR || DEFAULT_OUTPUT_DIR);
const MAX_REDIRECTS = 10;
const WRANGLER_CMD = process.platform === "win32" ? "wrangler.cmd" : "wrangler";

const resolveWranglerCommand = () => {
  const localBin = path.resolve("node_modules", ".bin", WRANGLER_CMD);
  if (fs.existsSync(localBin)) {
    return { command: localBin, args: ["pages", "dev"] };
  }

  return {
    command: "npx",
    args: ["--yes", "wrangler@4.64.0", "pages", "dev"],
  };
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ensureOutputDir = () => {
  if (!fs.existsSync(OUTPUT_DIR) || !fs.statSync(OUTPUT_DIR).isDirectory()) {
    throw new Error(`PAGES_OUTPUT_DIR does not exist or is not a directory: ${OUTPUT_DIR}`);
  }
};

const DEFAULT_IGNORED_DIRS = new Set(["node_modules", ".git", ".wrangler", "src", "reports", "implementation_packets"]);

const discoverSeedRoutes = (dir, rootDir = dir) => {
  const seeds = new Set();
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (DEFAULT_IGNORED_DIRS.has(entry.name)) continue;
      for (const route of discoverSeedRoutes(path.join(dir, entry.name), rootDir)) seeds.add(route);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;

    const absPath = path.join(dir, entry.name);
    const relPath = path.relative(rootDir, absPath).replace(/\\/g, "/");

    if (relPath === "404.html") continue;
    if (relPath === "index.html") {
      seeds.add("/");
      continue;
    }

    if (relPath.endsWith("/index.html")) {
      seeds.add(`/${relPath.slice(0, -"/index.html".length)}`);
      continue;
    }

    seeds.add(`/${relPath}`);
  }

  return seeds;
};

const buildSeedRoutes = () => {
  const configured = process.env.NAV_SIM_SEED_ROUTES
    ? process.env.NAV_SIM_SEED_ROUTES.split(",").map((route) => route.trim()).filter(Boolean)
    : [];

  if (configured.length) {
    return [...new Set(configured.map((route) => (route.startsWith("/") ? route : `/${route}`)))];
  }

  return [...discoverSeedRoutes(OUTPUT_DIR)];
};

const extractInternalLinks = (html, sourcePath) => {
  const links = new Set();
  const anchorHrefRegex = /<a\b[^>]*\bhref\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;

  for (const match of html.matchAll(anchorHrefRegex)) {
    const rawHref = (match[1] || match[2] || match[3] || "").trim();
    if (!rawHref || rawHref.startsWith("#")) continue;
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

const waitForServer = async (wrangler) => {
  const timeoutMs = 60_000;
  const startedAt = Date.now();
  let startupFailure;

  wrangler.once("exit", (code, signal) => {
    startupFailure = {
      reason: signal ? `signal ${signal}` : `code ${code}`,
      type: "exit",
    };
  });

  wrangler.once("error", (error) => {
    startupFailure = {
      reason: error.message,
      type: "error",
    };
  });

  while (Date.now() - startedAt < timeoutMs) {
    if (startupFailure) {
      const context = startupFailure.type === "error"
        ? `failed to start (${startupFailure.reason})`
        : `exited before startup (${startupFailure.reason})`;
      throw new Error(`wrangler pages dev ${context}`);
    }

    try {
      const res = await fetch(`${BASE_URL}/`, { redirect: "manual" });
      if (res.status >= 200 && res.status < 600) return;
    } catch {
      // keep waiting
    }

    await sleep(300);
  }

  throw new Error(`Timed out waiting for wrangler pages dev at ${BASE_URL}`);
};


const expectedCanonicalForHtmlRoute = (route) => {
  const parsed = new URL(route, BASE_URL);
  const pathname = parsed.pathname;

  if (!pathname.endsWith('.html')) return null;

  let canonicalPath;
  if (pathname === '/index.html') {
    canonicalPath = '/';
  } else if (pathname.endsWith('/index.html')) {
    canonicalPath = pathname.slice(0, -'index.html'.length);
  } else {
    canonicalPath = pathname.slice(0, -'.html'.length);
  }

  return `${canonicalPath}${parsed.search}`;
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
      if (!location) return { finalPath: current, status: response.status, chain, body: "" };

      const next = new URL(location, `${BASE_URL}${current}`);
      if (next.hostname !== HOST || next.port !== String(PORT)) {
        return { finalPath: `${next.pathname}${next.search}`, status: response.status, chain, body: "" };
      }

      current = `${next.pathname}${next.search}`;
      continue;
    }

    const isHtml = response.headers.get("content-type")?.includes("text/html");
    const body = isHtml ? await response.text() : "";
    return { finalPath: current, status: response.status, chain, body };
  }

  return { finalPath: current, status: 0, chain, body: "", note: "redirect-limit" };
};

const stopWrangler = async (wrangler) => {
  if (wrangler.exitCode !== null) return;

  try {
    process.kill(-wrangler.pid, "SIGTERM");
  } catch {
    wrangler.kill("SIGTERM");
  }

  await Promise.race([new Promise((resolve) => wrangler.once("exit", resolve)), sleep(2_000)]);

  if (wrangler.exitCode === null) {
    try {
      process.kill(-wrangler.pid, "SIGKILL");
    } catch {
      wrangler.kill("SIGKILL");
    }
  }
};

const run = async () => {
  ensureOutputDir();
  const seedRoutes = buildSeedRoutes();

  if (!seedRoutes.length) {
    throw new Error(`No seed routes discovered in output directory: ${OUTPUT_DIR}`);
  }

  const wranglerExec = resolveWranglerCommand();
  const wrangler = spawn(
    wranglerExec.command,
    [...wranglerExec.args, OUTPUT_DIR, "--port", String(PORT)],
    { stdio: ["ignore", "pipe", "pipe"], detached: true },
  );

  wrangler.stdout.on("data", (chunk) => process.stdout.write(`[wrangler] ${chunk}`));
  wrangler.stderr.on("data", (chunk) => process.stderr.write(`[wrangler] ${chunk}`));

  const queue = [...seedRoutes];
  const seen = new Set();
  const failures = [];

  try {
    await waitForServer(wrangler);

    while (queue.length) {
      const route = queue.shift();
      if (!route || seen.has(route)) continue;

      seen.add(route);
      const result = await fetchFinal(route);

      if (result.status >= 400) {
        failures.push(`${route} -> ${result.finalPath} returned ${result.status} (${result.chain.join(" -> ")})`);
        continue;
      }

      if (result.note) {
        failures.push(`${route} ended with ${result.note} (${result.chain.join(" -> ")})`);
        continue;
      }

      const expectedCanonical = expectedCanonicalForHtmlRoute(route);
      if (expectedCanonical && result.finalPath !== expectedCanonical) {
        failures.push(
          `${route} canonicalized to unexpected destination ${result.finalPath} (expected ${expectedCanonical}; chain: ${result.chain.join(" -> ")})`,
        );
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

  if (failures.length) {
    console.error("❌ Wrangler navigation simulation failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`✅ Wrangler navigation simulation passed (${seen.size} routes checked from ${seedRoutes.length} seeds).`);
};

run().catch((error) => {
  console.error(`❌ ${error.message}`);
  process.exit(1);
});

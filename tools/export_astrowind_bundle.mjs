#!/usr/bin/env node
import chokidar from "chokidar";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");
const SRC_PAGES_DIR = path.join(SRC_DIR, "pages");
const SRC_PARTIALS_DIR = path.join(SRC_DIR, "partials");
const SRC_DATA_DIR = path.join(SRC_DIR, "data");
const SRC_ASSETS_DIR = path.join(SRC_DIR, "assets");
const DEFAULT_OUT_DIR = path.join(ROOT, "dist/astrowind-transfer");

const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
const WATCH_MODE = args.includes("--watch");
const OUT_DIR =
  outIndex >= 0 && args[outIndex + 1]
    ? path.resolve(ROOT, args[outIndex + 1])
    : DEFAULT_OUT_DIR;

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function emptyDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await ensureDir(dir);
}

async function walkFiles(dir, predicate = () => true) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(full, predicate)));
    } else if (entry.isFile() && predicate(full)) {
      files.push(full);
    }
  }
  return files.sort();
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function fileToRoute(fullPath) {
  const rel = path.relative(SRC_PAGES_DIR, fullPath).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) {
    return `/${rel.slice(0, -"/index.html".length)}`;
  }
  return `/${rel.slice(0, -".html".length)}`;
}

function classifyRoute(route) {
  if (route === "/blog") return "blog-index";
  if (route.startsWith("/blog/")) return "blog";
  return "page";
}

function slugFromRoute(route) {
  if (route === "/") return "home";
  return route.replace(/^\//, "").replace(/\//g, "__");
}

function extractSourcePayload(rawHtml, fileLabel = "page") {
  const match = rawHtml.match(/<!--\s*@meta\s*([\s\S]*?)-->/m);
  if (!match) {
    throw new Error(`${fileLabel}: missing required @meta block`);
  }
  const metaRaw = match[1].trim();
  let meta;
  try {
    meta = JSON.parse(metaRaw);
  } catch (error) {
    throw new Error(`${fileLabel}: @meta JSON parse error: ${error.message}`);
  }
  const contentRaw = rawHtml.replace(match[0], "").trimStart();
  return { meta, metaRaw, contentRaw };
}

function yamlScalar(value) {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  if (value === null) return "null";
  return null;
}

function yamlBlock(value, indent = 0) {
  const pad = " ".repeat(indent);
  const scalar = yamlScalar(value);
  if (scalar !== null) return scalar;

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `\n${value
      .map((item) => {
        const rendered = yamlBlock(item, indent + 2);
        if (rendered.startsWith("\n")) {
          return `${pad}-${rendered}`;
        }
        return `${pad}- ${rendered}`;
      })
      .join("\n")}`;
  }

  const entries = Object.entries(value || {});
  if (entries.length === 0) return "{}";
  return `\n${entries
    .map(([key, inner]) => {
      const rendered = yamlBlock(inner, indent + 2);
      if (rendered.startsWith("\n")) {
        return `${pad}${key}:${rendered}`;
      }
      return `${pad}${key}: ${rendered}`;
    })
    .join("\n")}`;
}

function buildMdx(meta, route, contentRaw) {
  const payload = {
    ...meta,
    route,
    sourceFormat: "html",
  };
  const frontmatter = [
    "---",
    ...Object.entries(payload).map(
      ([key, value]) => `${key}: ${yamlBlock(value, 2)}`,
    ),
    "---",
    "",
  ].join("\n");
  return `${frontmatter}${contentRaw}${contentRaw.endsWith("\n") ? "" : "\n"}`;
}

async function writeJson(filePath, data) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function copyExactFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fs.copyFile(src, dest);
  const buffer = await fs.readFile(dest);
  return {
    path: path.relative(ROOT, dest).replace(/\\/g, "/"),
    sha256: sha256(buffer),
    size: buffer.length,
  };
}

async function runExport() {
  await emptyDir(OUT_DIR);

  const pageFiles = await walkFiles(SRC_PAGES_DIR, (file) =>
    file.endsWith(".html"),
  );
  const partialFiles = await walkFiles(SRC_PARTIALS_DIR, (file) =>
    file.endsWith(".html"),
  );
  const srcFiles = await walkFiles(SRC_DIR);
  const assetFiles = await walkFiles(SRC_ASSETS_DIR);
  const siteJsonPath = path.join(SRC_DATA_DIR, "site.json");
  const siteRaw = await fs.readFile(siteJsonPath);
  const site = JSON.parse(siteRaw.toString("utf8"));

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceRoot: "src",
    outDir: path.relative(ROOT, OUT_DIR) || ".",
    totals: {
      pages: 0,
      blogs: 0,
      standardPages: 0,
      partials: partialFiles.length,
      srcFiles: srcFiles.length,
      assets: assetFiles.length,
    },
    site: {
      sourceFile: "src/data/site.json",
      exportedFile: "dist/astrowind-transfer/src/data/site.json",
      sha256: sha256(siteRaw),
      size: siteRaw.length,
    },
    routes: [],
    partials: [],
    sourceSnapshot: [],
    assets: [],
  };

  const routeIndex = [];
  const astroCollections = {
    pages: [],
    blog: [],
  };

  for (const fullPath of pageFiles) {
    const raw = await fs.readFile(fullPath, "utf8");
    const route = fileToRoute(fullPath);
    const category = classifyRoute(route);
    const slug = slugFromRoute(route);
    const sourceFile = path.relative(ROOT, fullPath).replace(/\\/g, "/");
    const { meta, metaRaw, contentRaw } = extractSourcePayload(raw, sourceFile);
    const targetCollection = category === "blog" ? "blog" : "pages";

    const mdxPath = path.join(
      OUT_DIR,
      "src/content",
      targetCollection,
      `${slug}.mdx`,
    );
    const byteBase = path.join(OUT_DIR, "reference/routes", slug);
    const metaPath = path.join(byteBase, "meta.json");
    const contentPath = path.join(byteBase, "content.html");
    const mdx = buildMdx(meta, route, contentRaw);

    await ensureDir(path.dirname(mdxPath));
    await ensureDir(byteBase);
    await fs.writeFile(mdxPath, mdx, "utf8");
    await fs.writeFile(metaPath, metaRaw, "utf8");
    await fs.writeFile(contentPath, contentRaw, "utf8");

    const metaBuffer = Buffer.from(metaRaw, "utf8");
    const contentBuffer = Buffer.from(contentRaw, "utf8");
    const mdxBuffer = Buffer.from(mdx, "utf8");

    const record = {
      route,
      category,
      slug,
      sourceFile,
      mdxFile: path.relative(ROOT, mdxPath).replace(/\\/g, "/"),
      metaFile: path.relative(ROOT, metaPath).replace(/\\/g, "/"),
      contentFile: path.relative(ROOT, contentPath).replace(/\\/g, "/"),
      title: meta.title,
      description: meta.description,
      hashes: {
        metaSha256: sha256(metaBuffer),
        contentSha256: sha256(contentBuffer),
        mdxSha256: sha256(mdxBuffer),
      },
      sizes: {
        metaBytes: metaBuffer.length,
        contentBytes: contentBuffer.length,
        mdxBytes: mdxBuffer.length,
      },
    };

    routeIndex.push(record);
    manifest.routes.push(record);
    manifest.totals.pages += 1;
    if (category === "blog") {
      manifest.totals.blogs += 1;
      astroCollections.blog.push(record);
    } else {
      manifest.totals.standardPages += 1;
      astroCollections.pages.push(record);
    }
  }

  const astrowindDataDir = path.join(OUT_DIR, "src/data");
  await ensureDir(astrowindDataDir);
  await fs.writeFile(path.join(astrowindDataDir, "site.json"), siteRaw);
  await writeJson(path.join(astrowindDataDir, "navigation.json"), {
    primary: site.nav_primary || [],
    footer: site.nav_footer || [],
  });
  await writeJson(
    path.join(astrowindDataDir, "redirects.json"),
    site.redirects || [],
  );
  await writeJson(path.join(OUT_DIR, "route-index.json"), routeIndex);
  await writeJson(path.join(OUT_DIR, "manifest.json"), manifest);
  await writeJson(
    path.join(OUT_DIR, "src/content/pages/_index.json"),
    astroCollections.pages,
  );
  await writeJson(
    path.join(OUT_DIR, "src/content/blog/_index.json"),
    astroCollections.blog,
  );

  for (const fullPath of partialFiles) {
    const rel = path.relative(SRC_PARTIALS_DIR, fullPath).replace(/\\/g, "/");
    const dest = path.join(OUT_DIR, "reference/partials", rel);
    const copied = await copyExactFile(fullPath, dest);
    manifest.partials.push({
      sourceFile: `src/partials/${rel}`,
      exportedFile: copied.path,
      sha256: copied.sha256,
      size: copied.size,
    });
  }

  for (const fullPath of srcFiles) {
    const rel = path.relative(SRC_DIR, fullPath).replace(/\\/g, "/");
    const dest = path.join(OUT_DIR, "hard-transfer/src", rel);
    const copied = await copyExactFile(fullPath, dest);
    manifest.sourceSnapshot.push({
      sourceFile: `src/${rel}`,
      exportedFile: copied.path,
      sha256: copied.sha256,
      size: copied.size,
    });
  }

  for (const fullPath of assetFiles) {
    const rel = path.relative(SRC_ASSETS_DIR, fullPath).replace(/\\/g, "/");
    const dest = path.join(OUT_DIR, "public/assets", rel);
    const copied = await copyExactFile(fullPath, dest);
    manifest.assets.push({
      sourceFile: `src/assets/${rel}`,
      exportedFile: copied.path,
      sha256: copied.sha256,
      size: copied.size,
    });
  }

  await writeJson(path.join(OUT_DIR, "manifest.json"), manifest);

  const readme = [
    "# Astrowind Transfer Bundle",
    "",
    "This folder is a byte-verified export of the canonical `src/` site content into an Astrowind-friendly shape.",
    "",
    "## Included",
    "",
    `- Standard pages: ${manifest.totals.standardPages}`,
    `- Blog pages: ${manifest.totals.blogs}`,
    `- Total routes: ${manifest.totals.pages}`,
    `- Partials copied exactly: ${manifest.totals.partials}`,
    `- Full src snapshot files copied exactly: ${manifest.totals.srcFiles}`,
    `- Asset files copied exactly: ${manifest.totals.assets}`,
    "- Site data copied byte-for-byte to `src/data/site.json`",
    "- Byte-verification references under `reference/routes/**` and `reference/partials/**`",
    "",
    "## Import guidance",
    "",
    "1. Copy `src/content/**` into your Astrowind repo.",
    "2. Copy `src/data/**` into your Astrowind data layer.",
    "3. Copy `public/assets/**` into your Astrowind `public/assets/**`.",
    "4. Copy `hard-transfer/src/**` when you need an exact full-source snapshot without pulling from this repo.",
    "5. Use `reference/routes/**` when you need the exact original metadata JSON and exact HTML body bytes.",
    "6. Preserve existing production slugs or add redirects before cutover.",
    "",
  ].join("\n");
  await fs.writeFile(path.join(OUT_DIR, "README.md"), readme, "utf8");

  console.log(
    JSON.stringify(
      {
        generatedAt: manifest.generatedAt,
        outDir: manifest.outDir,
        totals: manifest.totals,
        site: manifest.site,
      },
      null,
      2,
    ),
  );
}

async function main() {
  if (!WATCH_MODE) {
    await runExport();
    return;
  }

  let running = false;
  let queued = false;

  const execute = async (reason = "initial") => {
    if (running) {
      queued = true;
      return;
    }
    running = true;
    try {
      console.error(`[astrowind-export] sync start: ${reason}`);
      await runExport();
      console.error(`[astrowind-export] sync complete: ${reason}`);
    } finally {
      running = false;
      if (queued) {
        queued = false;
        await execute("queued-change");
      }
    }
  };

  await execute("initial");

  const watcher = chokidar.watch(
    [
      path.join(SRC_PAGES_DIR, "**/*.html"),
      path.join(SRC_PARTIALS_DIR, "**/*.html"),
      path.join(SRC_ASSETS_DIR, "**/*"),
      path.join(SRC_DATA_DIR, "site.json"),
    ],
    {
      ignoreInitial: true,
    },
  );

  const onChange = (event, changedPath) => {
    const rel = path.relative(ROOT, changedPath).replace(/\\/g, "/");
    void execute(`${event}:${rel}`);
  };

  watcher.on("add", (changedPath) => onChange("add", changedPath));
  watcher.on("change", (changedPath) => onChange("change", changedPath));
  watcher.on("unlink", (changedPath) => onChange("unlink", changedPath));
  watcher.on("addDir", (changedPath) => onChange("addDir", changedPath));
  watcher.on("unlinkDir", (changedPath) => onChange("unlinkDir", changedPath));
  watcher.on("error", (error) => {
    console.error("[astrowind-export] watcher error", error);
    process.exitCode = 1;
  });

  process.on("SIGINT", async () => {
    await watcher.close();
    process.exit(0);
  });
  process.on("SIGTERM", async () => {
    await watcher.close();
    process.exit(0);
  });

  console.error("[astrowind-export] watch mode enabled");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

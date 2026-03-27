#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const SRC_PAGES_DIR = path.join(SRC_DIR, "pages");
const SRC_PARTIALS_DIR = path.join(SRC_DIR, "partials");
const SRC_ASSETS_DIR = path.join(SRC_DIR, "assets");
const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
const OUT_DIR =
  outIndex >= 0 && args[outIndex + 1]
    ? path.resolve(ROOT, args[outIndex + 1])
    : path.join(ROOT, "dist/astrowind-transfer");

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function extractSourcePayload(rawHtml, fileLabel = "page") {
  const match = rawHtml.match(/<!--\s*@meta\s*([\s\S]*?)-->/m);
  if (!match) {
    throw new Error(`${fileLabel}: missing required @meta block`);
  }
  return {
    metaRaw: match[1].trim(),
    contentRaw: rawHtml.replace(match[0], "").trimStart(),
  };
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

async function readBuffer(file) {
  return fs.readFile(file);
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function assertBufferEquality(label, leftPath, rightPath) {
  const [left, right] = await Promise.all([
    readBuffer(leftPath),
    readBuffer(rightPath),
  ]);
  if (!left.equals(right)) {
    throw new Error(
      `${label}: byte mismatch between ${leftPath} and ${rightPath}`,
    );
  }
  return {
    bytes: left.length,
    sha256: sha256(left),
  };
}

async function main() {
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  if (!(await exists(manifestPath))) {
    throw new Error(`Missing manifest: ${manifestPath}`);
  }

  const manifest = await readJson(manifestPath);
  const routeIndex = await readJson(path.join(OUT_DIR, "route-index.json"));
  const redirects = await readJson(
    path.join(OUT_DIR, "src/data/redirects.json"),
  );
  const navigation = await readJson(
    path.join(OUT_DIR, "src/data/navigation.json"),
  );
  const exportedSitePath = path.join(OUT_DIR, "src/data/site.json");

  if (manifest.totals.pages !== routeIndex.length) {
    throw new Error(
      `Manifest total pages ${manifest.totals.pages} does not match route index length ${routeIndex.length}`,
    );
  }

  const blogCount = routeIndex.filter(
    (route) => route.category === "blog",
  ).length;
  const standardPages = routeIndex.filter(
    (route) => route.category !== "blog",
  ).length;

  if (manifest.totals.blogs !== blogCount) {
    throw new Error(
      `Manifest blog total ${manifest.totals.blogs} does not match indexed blogs ${blogCount}`,
    );
  }
  if (manifest.totals.standardPages !== standardPages) {
    throw new Error(
      `Manifest standard page total ${manifest.totals.standardPages} does not match indexed standard pages ${standardPages}`,
    );
  }

  let routeMetaBytes = 0;
  let routeContentBytes = 0;
  for (const route of routeIndex) {
    const sourcePath = path.join(ROOT, route.sourceFile);
    const sourceRaw = await fs.readFile(sourcePath, "utf8");
    const { metaRaw, contentRaw } = extractSourcePayload(
      sourceRaw,
      route.sourceFile,
    );

    const exportedMetaPath = path.join(ROOT, route.metaFile);
    const exportedContentPath = path.join(ROOT, route.contentFile);
    const exportedMdxPath = path.join(ROOT, route.mdxFile);

    if (!(await exists(exportedMdxPath))) {
      throw new Error(
        `Missing exported MDX file for route ${route.route}: ${route.mdxFile}`,
      );
    }

    const metaBuffer = Buffer.from(metaRaw, "utf8");
    const exportedMetaBuffer = await readBuffer(exportedMetaPath);
    if (!metaBuffer.equals(exportedMetaBuffer)) {
      throw new Error(
        `route meta ${route.route}: byte mismatch between parsed source meta and ${route.metaFile}`,
      );
    }
    const metaCompare = {
      bytes: metaBuffer.length,
      sha256: sha256(metaBuffer),
    };
    const contentBuffer = Buffer.from(contentRaw, "utf8");
    const exportedContentBuffer = await readBuffer(exportedContentPath);
    if (!contentBuffer.equals(exportedContentBuffer)) {
      throw new Error(
        `route content ${route.route}: byte mismatch between source content and ${route.contentFile}`,
      );
    }

    routeMetaBytes += metaCompare.bytes;
    routeContentBytes += exportedContentBuffer.length;

    if (route.hashes.metaSha256 !== metaCompare.sha256) {
      throw new Error(`route meta hash mismatch for ${route.route}`);
    }
    if (route.hashes.contentSha256 !== sha256(contentBuffer)) {
      throw new Error(`route content hash mismatch for ${route.route}`);
    }
  }

  const siteCompare = await assertBufferEquality(
    "site.json",
    path.join(SRC_DIR, "data/site.json"),
    exportedSitePath,
  );

  let partialBytes = 0;
  for (const partial of manifest.partials) {
    const compare = await assertBufferEquality(
      `partial ${partial.sourceFile}`,
      path.join(ROOT, partial.sourceFile),
      path.join(ROOT, partial.exportedFile),
    );
    partialBytes += compare.bytes;
  }

  let sourceSnapshotBytes = 0;
  for (const sourceFile of manifest.sourceSnapshot || []) {
    const compare = await assertBufferEquality(
      `source snapshot ${sourceFile.sourceFile}`,
      path.join(ROOT, sourceFile.sourceFile),
      path.join(ROOT, sourceFile.exportedFile),
    );
    sourceSnapshotBytes += compare.bytes;
  }

  if ((manifest.sourceSnapshot || []).length !== manifest.totals.srcFiles) {
    throw new Error(
      `Source snapshot count mismatch: manifest list ${(manifest.sourceSnapshot || []).length} vs totals.srcFiles ${manifest.totals.srcFiles}`,
    );
  }

  let repoSnapshotBytes = 0;
  for (const sourceFile of manifest.repoSnapshot || []) {
    const compare = await assertBufferEquality(
      `repo snapshot ${sourceFile.sourceFile}`,
      path.join(ROOT, sourceFile.sourceFile),
      path.join(ROOT, sourceFile.exportedFile),
    );
    repoSnapshotBytes += compare.bytes;
  }

  if ((manifest.repoSnapshot || []).length !== manifest.totals.repoFiles) {
    throw new Error(
      `Repo snapshot count mismatch: manifest list ${(manifest.repoSnapshot || []).length} vs totals.repoFiles ${manifest.totals.repoFiles}`,
    );
  }

  let assetBytes = 0;
  for (const asset of manifest.assets) {
    const compare = await assertBufferEquality(
      `asset ${asset.sourceFile}`,
      path.join(ROOT, asset.sourceFile),
      path.join(ROOT, asset.exportedFile),
    );
    assetBytes += compare.bytes;
  }

  if (!Array.isArray(redirects) || redirects.length === 0) {
    throw new Error("Redirect export is empty");
  }
  if (!Array.isArray(navigation.primary) || !Array.isArray(navigation.footer)) {
    throw new Error("Navigation export is malformed");
  }

  console.log(
    JSON.stringify(
      {
        outDir: path.relative(ROOT, OUT_DIR) || ".",
        totals: manifest.totals,
        byteVerification: {
          routeMetaBytes,
          routeContentBytes,
          siteBytes: siteCompare.bytes,
          partialBytes,
          sourceSnapshotBytes,
          repoSnapshotBytes,
          assetBytes,
        },
        redirects: redirects.length,
        navigationPrimary: navigation.primary.length,
        navigationFooter: navigation.footer.length,
        siteSha256: siteCompare.sha256,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

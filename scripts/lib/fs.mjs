import fs from "fs/promises";
import path from "path";
export async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}
export async function emptyDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}
export async function readText(filePath) {
  return fs.readFile(filePath, "utf8");
}
export async function writeText(filePath, text) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, text, "utf8");
}
export async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fs.copyFile(src, dest);
}
export async function copyDir(srcDir, destDir) {
  await ensureDir(destDir);
  for (const e of await fs.readdir(srcDir, { withFileTypes: true })) {
    const from = path.join(srcDir, e.name),
      to = path.join(destDir, e.name);
    if (e.isDirectory()) await copyDir(from, to);
    else if (e.isFile()) await copyFile(from, to);
  }
}
export async function walkFiles(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkFiles(full)));
    else if (e.isFile()) out.push(full);
  }
  return out;
}
export async function exists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

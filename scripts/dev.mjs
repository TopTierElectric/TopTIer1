import { spawn } from "child_process";
import chokidar from "chokidar";
import http from "http";
import path from "path";
import fs from "fs/promises";

const DIST = path.resolve("dist");
const PORT = 3000;

function runBuild() {
  return new Promise((resolve, reject) => {
    const p = spawn("node", ["scripts/build.mjs"], {
      stdio: "inherit",
      env: { ...process.env, NODE_ENV: "development" },
    });

    p.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`build failed: ${code}`)),
    );
  });
}

function contentType(p) {
  if (p.endsWith(".css")) return "text/css";
  if (p.endsWith(".js")) return "application/javascript";
  if (p.endsWith(".svg")) return "image/svg+xml";
  if (p.endsWith(".png")) return "image/png";
  if (p.endsWith(".jpg") || p.endsWith(".jpeg")) return "image/jpeg";
  if (p.endsWith(".webp")) return "image/webp";
  if (p.endsWith(".avif")) return "image/avif";
  if (p.endsWith(".ico")) return "image/x-icon";
  return "text/html; charset=utf-8";
}

await runBuild();

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let reqPath = url.pathname;

    if (reqPath.endsWith("/") && reqPath !== "/")
      reqPath = reqPath.slice(0, -1);

    const clean = reqPath.replace(/^\//, "");
    const isAsset = /\.(css|js|png|jpg|jpeg|webp|avif|svg|ico)$/i.test(reqPath);

    const filePath =
      reqPath === "/"
        ? path.join(DIST, "index.html")
        : isAsset
          ? path.join(DIST, clean)
          : path.join(DIST, clean, "index.html");

    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType(filePath) });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () =>
  console.log(`✅ Dev server: http://localhost:${PORT}`),
);

const watcher = chokidar.watch("src", { ignoreInitial: true });

let building = false;
watcher.on("all", async () => {
  if (building) return;
  building = true;

  try {
    await runBuild();
    console.log("🔁 Rebuilt");
  } catch (e) {
    console.error("❌ Build failed:", e.message);
  } finally {
    building = false;
  }
});

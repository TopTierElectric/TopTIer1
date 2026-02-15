import { execSync } from "node:child_process";

function run(cmd, env = {}) {
  execSync(cmd, {
    stdio: "inherit",
    env: { ...process.env, ...env }
  });
}

function getGitPorcelainSet() {
  const out = execSync("git status --porcelain", { encoding: "utf8" }).trim();
  if (!out) return new Set();
  return new Set(out.split("\n").map(line => line.trim()).filter(Boolean));
}

const before = getGitPorcelainSet();

run("npm run build", { NODE_ENV: "production" });
run("npm run verify");

const after = getGitPorcelainSet();
const newEntries = [...after].filter(x => !before.has(x));

if (newEntries.length > 0) {
  console.error("\n❌ Verification failed: verification introduced new repository updates.\n");
  console.error(newEntries.join("\n"));
  process.exit(1);
}

console.log("✅ Zero-updates verification passed (no new git updates introduced).");

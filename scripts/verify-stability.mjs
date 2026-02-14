import { execSync } from "child_process";

const runsArg = Number.parseInt(process.argv[2] || "3", 10);
const runs = Number.isFinite(runsArg) && runsArg > 0 ? runsArg : 3;

for (let i = 1; i <= runs; i += 1) {
  console.log(`\n▶ Stability run ${i}/${runs}`);
  execSync("npm run verify:zero-updates", {
    stdio: "inherit",
    env: process.env
  });
}

console.log(`\n✅ Stability verification passed for ${runs} continuous run(s).`);

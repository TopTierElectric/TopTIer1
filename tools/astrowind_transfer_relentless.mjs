#!/usr/bin/env node
import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const iterationsIndex = args.indexOf("--iterations");
const iterations =
  iterationsIndex >= 0 && args[iterationsIndex + 1]
    ? Number(args[iterationsIndex + 1])
    : 3;

if (!Number.isInteger(iterations) || iterations <= 0) {
  throw new Error("--iterations must be a positive integer");
}

const run = (command, commandArgs) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      stdio: "inherit",
      shell: false,
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else
        reject(
          new Error(`${command} ${commandArgs.join(" ")} exited with ${code}`),
        );
    });
    child.on("error", reject);
  });

const main = async () => {
  console.error(
    `[astrowind-relentless] Running export+verify for ${iterations} iteration(s)`,
  );
  for (let i = 1; i <= iterations; i += 1) {
    console.error(`[astrowind-relentless] Iteration ${i} start`);
    await run("npm", ["run", "export:astrowind"]);
    await run("npm", ["run", "verify:astrowind-export"]);
    console.error(`[astrowind-relentless] Iteration ${i} complete`);
  }
  console.error("[astrowind-relentless] All iterations completed successfully");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

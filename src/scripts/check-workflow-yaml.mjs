import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parseDocument } from "yaml";

const workflowsDir = path.join(process.cwd(), ".github", "workflows");

if (!fs.existsSync(workflowsDir)) {
  console.error(`Missing workflows directory: ${workflowsDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(workflowsDir)
  .filter((name) => name.endsWith(".yml") || name.endsWith(".yaml"))
  .sort();

if (files.length === 0) {
  console.error("No workflow YAML files found under .github/workflows");
  process.exit(1);
}

let hasError = false;

for (const file of files) {
  const fullPath = path.join(workflowsDir, file);
  const source = fs.readFileSync(fullPath, "utf8");
  const doc = parseDocument(source, { prettyErrors: true });

  if (doc.errors.length > 0) {
    hasError = true;
    console.error(`YAML parse failed: .github/workflows/${file}`);
    for (const err of doc.errors) {
      console.error(`  - ${err.message}`);
    }
  } else {
    console.log(`OK .github/workflows/${file}`);
  }
}

if (hasError) {
  process.exit(1);
}

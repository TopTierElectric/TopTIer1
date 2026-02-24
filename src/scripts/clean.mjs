import { emptyDir } from "./lib/fs.mjs";
await emptyDir("dist");
console.log("✅ dist/ cleaned");

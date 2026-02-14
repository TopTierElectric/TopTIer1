import path from "path";
import { readText } from "./lib/fs.mjs";
import { strictVerifyDist } from "./lib/validate.mjs";
const site = JSON.parse(await readText(path.join("src/data/site.json")));
await strictVerifyDist({ distDir: "dist", site });

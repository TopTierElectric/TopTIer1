import fs from "fs";
const input = process.argv[2] || "gsc-queries.csv";
const csv = fs.readFileSync(input, "utf8").split("
").filter(Boolean);
const rows = csv.slice(1).map(l => l.split(","));
const queries = rows.map(r => (r[0] || "").toLowerCase().trim()).filter(Boolean);
const buckets = {
  panel: ["panel upgrade", "service upgrade", "breaker box", "panel replacement"],
  ev: ["ev charger", "level 2", "tesla charger"],
  generator: ["generator", "transfer switch", "standby"],
  repairs: ["troubleshooting", "flickering lights", "outlet not working", "breaker keeps tripping"]
};
const report = {};
for (const [bucket, terms] of Object.entries(buckets)) report[bucket] = queries.filter(q => terms.some(t => q.includes(t))).slice(0, 50);
fs.writeFileSync("gsc-gap-report.json", JSON.stringify(report, null, 2));
console.log("✅ Wrote gsc-gap-report.json");

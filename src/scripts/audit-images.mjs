import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "assets", "images");
if (!fs.existsSync(dir)) {
  console.error("❌ assets/images missing");
  process.exit(1);
}

let count = 0;
for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
  if (file.isDirectory()) continue;
  if (/\.(png|jpe?g|webp|avif|svg|gif)$/i.test(file.name)) count += 1;
}

if (count === 0) {
  console.error("❌ No image files found under assets/images");
  process.exit(1);
}

console.log(`✅ Image audit passed (${count} files in assets/images).`);

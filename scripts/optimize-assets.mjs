import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const root = process.cwd();
const logosDir = path.join(root, 'assets', 'images', 'logos');
const heroSource = path.join(root, 'assets', 'images', 'hero.jpg');

const logoFiles = [
  'TopTierElectrical_Primary_Black_2048.png',
  'TopTierElectrical_Primary_FlatGold_2048.png',
  'TopTierElectrical_Primary_FlatGold_4096.png',
  'TopTierElectrical_Primary_FlatGold_512.png',
  'TopTierElectrical_Primary_White_2048.png',
  'TopTierElectrical_Primary_White_512.png'
];

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const toWebp = async (inputPath) => {
  const outputPath = inputPath.replace(/\.png$/i, '.webp');
  await sharp(inputPath).webp({ quality: 82 }).toFile(outputPath);
  return outputPath;
};

const optimizeLogos = async () => {
  ensureDir(logosDir);
  const outputs = [];
  for (const file of logoFiles) {
    const filePath = path.join(logosDir, file);
    if (fs.existsSync(filePath)) {
      const output = await toWebp(filePath);
      outputs.push(output);
    }
  }
  return outputs;
};

const optimizeHero = async () => {
  if (!fs.existsSync(heroSource)) {
    return [];
  }
  const heroDir = path.dirname(heroSource);
  const webpPath = path.join(heroDir, 'hero.webp');
  const avifPath = path.join(heroDir, 'hero.avif');

  await sharp(heroSource).webp({ quality: 82 }).toFile(webpPath);
  await sharp(heroSource).avif({ quality: 50 }).toFile(avifPath);

  return [webpPath, avifPath];
};

const run = async () => {
  const logoOutputs = await optimizeLogos();
  const heroOutputs = await optimizeHero();
  const outputs = [...logoOutputs, ...heroOutputs];

  if (outputs.length === 0) {
    console.log('No assets optimized.');
    return;
  }

  console.log('Optimized assets:');
  outputs.forEach((file) => console.log(`- ${path.relative(root, file)}`));
};

run().catch((error) => {
  console.error('Asset optimization failed:', error);
  process.exit(1);
});

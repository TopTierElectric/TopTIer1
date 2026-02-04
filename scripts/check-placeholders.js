const fs = require('fs');
const path = require('path');

const disallowed = [
  'YOUR_CLOUDFLARE_ANALYTICS_TOKEN',
  'your-email@example.com',
  'REPLACE_WITH_REAL_TOKEN',
  'YOUR_ID_HERE'
];

const files = fs.readdirSync(process.cwd()).filter((file) => file.endsWith('.html'));
const hits = [];

files.forEach((file) => {
  const contents = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  disallowed.forEach((token) => {
    if (contents.includes(token)) {
      hits.push({ file, token });
    }
  });
});

if (hits.length > 0) {
  console.error('Placeholder tokens detected in HTML:');
  hits.forEach((hit) => {
    console.error(`- ${hit.file}: ${hit.token}`);
  });
  process.exit(1);
}

console.log('No placeholder tokens found in HTML.');

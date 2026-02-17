import { readFile } from "node:fs/promises";

const REQUIRED_FORM_FILES = [
  "contact.html",
  "booking.html",
  "src/pages/contact.html",
  "src/pages/booking.html",
];

const REQUIRED_ACTION = "https://formspree.io/f/mkovbvgj";
const FORBIDDEN_PATTERNS = [
  /toptierelectric11723@gmail\.com/g,
  /https:\/\/formsubmit\.co/g,
  /name="_honey"/g,
];

function getFormBlock(html, file) {
  const match = html.match(/<form[\s\S]*?<\/form>/i);
  if (!match) throw new Error(`${file}: missing <form>...</form> block`);
  return match[0];
}

for (const file of REQUIRED_FORM_FILES) {
  const html = await readFile(file, "utf8");
  const form = getFormBlock(html, file);

  if (!form.includes(`action="${REQUIRED_ACTION}"`)) {
    throw new Error(`${file}: form action is not ${REQUIRED_ACTION}`);
  }

  for (const requiredName of ["_subject", "_next", "_gotcha"]) {
    if (!form.includes(`name="${requiredName}"`)) {
      throw new Error(`${file}: missing hidden field ${requiredName}`);
    }
  }

  if (!form.includes('name="form_name"')) {
    throw new Error(`${file}: missing hidden field form_name`);
  }
}

const allFilesToScan = [
  "contact.html",
  "booking.html",
  "src/pages/contact.html",
  "src/pages/booking.html",
  "_headers",
];

for (const file of allFilesToScan) {
  const content = await readFile(file, "utf8");
  for (const forbidden of FORBIDDEN_PATTERNS) {
    forbidden.lastIndex = 0;
    if (forbidden.test(content)) {
      throw new Error(`${file}: contains forbidden pattern ${forbidden}`);
    }
  }
}

console.log("Formspree form verification passed.");

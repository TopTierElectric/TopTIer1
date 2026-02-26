export function extractMetaAndContent(rawHtml, fileLabel = "page") {
  const re = /<!--\s*@meta\s*([\s\S]*?)-->/m;
  const m = rawHtml.match(re);
  if (!m) throw new Error(`${fileLabel}: missing required @meta block`);
  const jsonText = m[1].trim();
  let meta;
  try {
    meta = JSON.parse(jsonText);
  } catch (e) {
    throw new Error(`${fileLabel}: @meta JSON parse error: ${e.message}`);
  }
  const content = rawHtml.replace(m[0], "").trimStart();
  return { meta, content };
}

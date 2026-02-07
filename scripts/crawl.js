#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const requestedBaseUrl = process.argv[2] || "http://localhost:8888/";
const outputDir = process.argv[3] || "reports";

const toBaseUrl = (input) => {
  try {
    const parsed = new URL(input);
    if (!parsed.pathname || parsed.pathname === "") {
      parsed.pathname = "/";
    }
    return parsed.toString();
  } catch (error) {
    console.error(`Invalid base URL: ${input}`);
    process.exit(64);
  }
};

const baseUrl = toBaseUrl(requestedBaseUrl);
const baseOrigin = new URL(baseUrl).origin;

const normalizeUrl = (input) => {
  try {
    const resolved = new URL(input, baseUrl);
    // Normalize hash-only differences so we don't crawl duplicate URLs.
    resolved.hash = "";
    return resolved.toString();
  } catch (error) {
    return null;
  }
};

const extractLinks = (html, currentUrl) => {
  const links = new Set();
  const regex = /href\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;
  let match;
  const skipExtensions = [
    ".css",
    ".js",
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".ico",
    ".pdf",
    ".json",
  ];
  while ((match = regex.exec(html)) !== null) {
    const href = (match[1] || match[2] || match[3] || "").trim();
    if (!href || href.startsWith("#")) {
      continue;
    }
    if (
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      continue;
    }
    let parsedHref;
    try {
      parsedHref = new URL(href, currentUrl);
    } catch (error) {
      continue;
    }
    const normalizedPath = parsedHref.pathname.toLowerCase();
    if (skipExtensions.some((ext) => normalizedPath.endsWith(ext))) {
      continue;
    }
    const resolved = normalizeUrl(parsedHref.toString());
    if (!resolved) {
      continue;
    }
    const resolvedUrl = new URL(resolved);
    if (resolvedUrl.origin !== baseOrigin) {
      continue;
    }
    links.add(resolvedUrl.toString());
  }
  return Array.from(links);
};

const extractTagContent = (html, tagName) => {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = html.match(regex);
  return match ? match[1].trim() : "";
};

const extractMeta = (html, name) => {
  const regex = new RegExp(`<meta[^>]*name=["']${name}["'][^>]*>`, "i");
  const match = html.match(regex);
  if (!match) return "";
  const contentMatch = match[0].match(/content=["']([^"']+)["']/i);
  return contentMatch ? contentMatch[1].trim() : "";
};

const extractCanonical = (html) => {
  const regex = /<link[^>]*rel=["']canonical["'][^>]*>/i;
  const match = html.match(regex);
  if (!match) return "";
  const hrefMatch = match[0].match(/href=["']([^"']+)["']/i);
  return hrefMatch ? hrefMatch[1].trim() : "";
};

const detectPrimaryCta = (html) => {
  const buttonRegex =
    /<(a|button)[^>]*class=["'][^"']*btn-primary[^"']*["'][^>]*>/i;
  const match = html.match(buttonRegex);
  if (!match) return "text";
  const tag = match[1].toLowerCase();
  const snippet = match[0];
  const hrefMatch = snippet.match(/href=["']([^"']+)["']/i);
  if (hrefMatch && hrefMatch[1].startsWith("tel:")) {
    return "call";
  }
  if (tag === "button") {
    return "form";
  }
  return "book";
};

const detectPageType = (pathname) => {
  const page = pathname.replace(/\/$/, "");
  if (page === "" || page.endsWith("index.html")) return "home";
  if (page.endsWith("services.html")) return "service-hub";
  if (page.endsWith("booking.html")) return "booking";
  if (page.endsWith("contact.html")) return "contact";
  if (page.endsWith("emergency.html")) return "emergency";
  if (page.endsWith("testimonials.html") || page.endsWith("reviews.html"))
    return "reviews";
  if (page.endsWith("gallery.html")) return "gallery";
  if (page.endsWith("faq.html")) return "faq";
  if (page.endsWith("blog.html")) return "blog";
  if (page.includes("/blog-")) return "post";
  if (page.endsWith("service-areas.html")) return "service-areas";
  if (page.endsWith(".html")) return "service-detail";
  return "other";
};

const readLocalPage = (url) => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname === "/" ? "/index.html" : urlObj.pathname;
  const filePath = path.join(process.cwd(), pathname.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    return { status: 404, body: "", location: null, source: "filesystem" };
  }
  const body = fs.readFileSync(filePath, "utf8");
  return { status: 200, body, location: null, source: "filesystem" };
};

const fetchPage = async (url) => {
  try {
    const response = await fetch(url, { redirect: "manual" });
    const status = response.status;
    const contentType = response.headers.get("content-type") || "";
    const location = response.headers.get("location");
    let body = "";
    if (contentType.includes("text/html")) {
      body = await response.text();
    }
    return { status, body, location, source: "http" };
  } catch (error) {
    return readLocalPage(url);
  }
};

const crawl = async () => {
  const visited = new Map();
  const linkGraph = new Map();
  const queue = [baseUrl];
  const enqueued = new Set([baseUrl]);
  let queueIndex = 0;

  while (queueIndex < queue.length) {
    const current = queue[queueIndex];
    queueIndex += 1;
    if (visited.has(current)) continue;
    let pageData;
    try {
      pageData = await fetchPage(current);
    } catch (error) {
      visited.set(current, {
        url: current,
        status: "error",
        error: error.message,
      });
      continue;
    }

    const { status, body, location, source } = pageData;
    const links = body ? extractLinks(body, current) : [];
    const title = body ? extractTagContent(body, "title") : "";
    const metaDescription = body ? extractMeta(body, "description") : "";
    const metaRobots = body ? extractMeta(body, "robots") : "";
    const canonical = body ? extractCanonical(body) : "";
    const h1Present = body ? /<h1[^>]*>/i.test(body) : false;
    const primaryCtaType = body ? detectPrimaryCta(body) : "";
    const timeMatch = body ? body.match(/<time[^>]*>([^<]+)<\/time>/i) : null;
    const lastUpdatedSignal = timeMatch ? timeMatch[1].trim() : "";

    visited.set(current, {
      url: current,
      status,
      location,
      title,
      metaDescription,
      metaRobots,
      canonical,
      h1Present,
      primaryCtaType,
      lastUpdatedSignal,
      links,
      statusSource: source,
    });

    linkGraph.set(current, links);

    links.forEach((link) => {
      if (!visited.has(link) && !enqueued.has(link)) {
        queue.push(link);
        enqueued.add(link);
      }
    });
  }

  const base = new URL(baseUrl);
  const pages = Array.from(visited.values()).map((page) => {
    const urlObj = new URL(page.url);
    return {
      ...page,
      path: urlObj.pathname,
      pageType: detectPageType(urlObj.pathname),
    };
  });

  const inboundCounts = new Map();
  linkGraph.forEach((links, from) => {
    links.forEach((link) => {
      const count = inboundCounts.get(link) || 0;
      inboundCounts.set(link, count + 1);
    });
  });

  const orphans = pages
    .filter((page) => page.url !== baseUrl)
    .filter((page) => (inboundCounts.get(page.url) || 0) === 0)
    .map((page) => page.url);

  const report = {
    baseUrl,
    pages,
    orphans,
    linkGraph: Object.fromEntries(linkGraph),
  };

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(outputDir, "crawl_raw.json"),
    `${JSON.stringify(report, null, 2)}
`,
  );

  const csvHeaders = [
    "URL",
    "page_type",
    "status",
    "canonical_present",
    "canonical_value",
    "indexability",
    "title_tag",
    "meta_description",
    "h1_present",
    "primary_cta_type",
    "last_updated_signal",
  ];

  const escapeCsv = (value) => {
    if (value === null || value === undefined) return "";
    const stringValue = String(value);
    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const rows = [csvHeaders.join(",")];
  pages.forEach((page) => {
    const canonicalPresent = page.canonical ? "Y" : "N";
    const indexability = page.metaRobots ? page.metaRobots : "index,follow";
    rows.push(
      [
        page.url,
        page.pageType,
        page.status,
        canonicalPresent,
        page.canonical,
        indexability,
        page.title,
        page.metaDescription,
        page.h1Present ? "Y" : "N",
        page.primaryCtaType,
        page.lastUpdatedSignal,
      ]
        .map(escapeCsv)
        .join(","),
    );
  });

  fs.writeFileSync(
    path.join(outputDir, "BASELINE_URL_INVENTORY.csv"),
    rows.join("\n"),
  );
};

crawl().catch((error) => {
  console.error(error);
  process.exit(1);
});

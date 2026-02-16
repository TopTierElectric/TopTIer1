// src/local-seo/fetch.ts
export async function fetchHtml(url: string, timeoutMs = 15000): Promise<{ status: number; finalUrl: string; html: string }> {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        // Helps avoid some simplistic bot blocks; still deterministic.
        'User-Agent': 'toptier1-local-seo-audit/1.0',
        Accept: 'text/html,*/*',
      },
    })
    const html = await res.text()
    return { status: res.status, finalUrl: res.url, html }
  } finally {
    clearTimeout(t)
  }
}

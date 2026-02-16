// src/local-seo/repo.ts
import fs from 'node:fs'
import path from 'node:path'
import { RepoFramework, RepoSnapshot } from './types'

const IGNORE_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  'out',
  'coverage',
  '.turbo',
  '.vercel',
])

function safeJoin(root: string, rel: string): string {
  return path.resolve(root, rel)
}

function listFilesRecursive(rootAbs: string, relDir: string): string[] {
  const abs = safeJoin(rootAbs, relDir)
  if (!fs.existsSync(abs)) return []
  const out: string[] = []

  const stack: string[] = [abs]
  while (stack.length) {
    const cur = stack.pop()!
    const entries = fs.readdirSync(cur, { withFileTypes: true })
    for (const ent of entries) {
      if (ent.isDirectory()) {
        if (IGNORE_DIRS.has(ent.name)) continue
        stack.push(path.join(cur, ent.name))
      } else if (ent.isFile()) {
        out.push(path.relative(rootAbs, path.join(cur, ent.name)))
      }
    }
  }

  // deterministic ordering
  out.sort((a, b) => a.localeCompare(b))
  return out
}

export function detectFramework(root: string): RepoFramework {
  const hasApp = fs.existsSync(safeJoin(root, 'app/layout.tsx')) || fs.existsSync(safeJoin(root, 'app/layout.jsx'))
  if (hasApp) return 'next_app_router'

  const hasPages =
    fs.existsSync(safeJoin(root, 'pages/_app.tsx')) ||
    fs.existsSync(safeJoin(root, 'pages/_app.jsx')) ||
    fs.existsSync(safeJoin(root, 'src/pages/_app.tsx')) ||
    fs.existsSync(safeJoin(root, 'src/pages/_app.jsx'))

  if (hasPages) return 'next_pages_router'
  return 'unknown'
}

export function createRepoSnapshot(root: string): RepoSnapshot {
  const framework = detectFramework(root)

  const readCache = new Map<string, string | null>()
  const filesCache = new Map<string, string[]>()

  function exists(relPath: string): boolean {
    return fs.existsSync(safeJoin(root, relPath))
  }

  function readText(relPath: string): string | null {
    if (readCache.has(relPath)) return readCache.get(relPath) ?? null
    const abs = safeJoin(root, relPath)
    if (!fs.existsSync(abs)) {
      readCache.set(relPath, null)
      return null
    }
    const txt = fs.readFileSync(abs, 'utf8')
    readCache.set(relPath, txt)
    return txt
  }

  function listFiles(relDir: string): string[] {
    if (filesCache.has(relDir)) return filesCache.get(relDir)!
    const files = listFilesRecursive(root, relDir)
    filesCache.set(relDir, files)
    return files
  }

  function searchText(opts: { roots: string[]; exts: string[]; query: RegExp | string }): { found: boolean; sample?: string } {
    const { roots, exts, query } = opts
    const regex = typeof query === 'string' ? new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) : query

    const candidates: string[] = []
    for (const r of roots) {
      for (const f of listFiles(r)) {
        const ext = path.extname(f).toLowerCase().replace('.', '')
        if (exts.length && !exts.includes(ext)) continue
        candidates.push(f)
      }
    }

    // deterministic
    candidates.sort((a, b) => a.localeCompare(b))

    for (const rel of candidates) {
      const txt = readText(rel)
      if (!txt) continue
      const m = txt.match(regex)
      if (m) {
        return { found: true, sample: `${rel}: ${m[0]}` }
      }
    }
    return { found: false }
  }

  return { root, framework, exists, readText, searchText }
}

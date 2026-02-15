# Workflow Control Matrix

This matrix maps each operational risk domain to the canonical local script and CI workflow gate.
Use this file as the source of truth when adding checks or updating CI.

## Canonical workflow ownership

| Risk domain                          | Local command                                                                  | Primary workflow gate      | Secondary guardrail                   | Owner intent                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------ | -------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| Formatting                           | `npm run format:check`                                                         | `.github/workflows/qa.yml` | `.github/workflows/quality-gates.yml` | Enforce consistent source formatting before merge.                     |
| Extensionless routing/link integrity | `npm run check:extensionless-links` + `npm run check:extensionless-collisions` | `.github/workflows/qa.yml` | `.github/workflows/ci.yml`            | Keep internal links Cloudflare-compatible and collision-free.          |
| Placeholder/content hygiene          | `npm run check:placeholders`                                                   | `.github/workflows/qa.yml` | `.github/workflows/quality-gates.yml` | Prevent shipping placeholder copy.                                     |
| Redirect correctness                 | `npm run check:origin-redirects` + `npm run check:redirects-cloudflare`        | `.github/workflows/qa.yml` | `.github/workflows/ci.yml`            | Verify host canonicalisation and \_redirects behavior.                 |
| Image reference correctness          | `npm run audit:images`                                                         | `.github/workflows/qa.yml` | `.github/workflows/quality-gates.yml` | Ensure every referenced image exists and text references stay aligned. |
| Broken-link simulation               | `npm run audit:links`                                                          | `.github/workflows/qa.yml` | `.github/workflows/quality-gates.yml` | Catch navigation regressions before deploy.                            |
| Workflow syntax/location integrity   | `npm run check:workflows`                                                      | `.github/workflows/qa.yml` | `.github/workflows/ci.yml`            | Keep workflow definitions valid and in approved paths.                 |
| Binary image drift in PRs            | `npm run check:no-binaries -- <range>`                                         | `.github/workflows/qa.yml` | N/A                                   | Keep the repository lightweight and prevent accidental binary growth.  |

## Consolidation guidance

1. Treat `qa.yml` as the end-to-end content quality gate.
2. Keep `ci.yml` focused on cross-stack checks (e.g., Terraform and route simulation).
3. Use `quality-gates.yml` only for minimal main-branch redundancy until deprecation is scheduled.
4. Keep `quality.yml` as a lightweight verification entrypoint for manual checks (`verify:zero-updates`).

## Change process

When adding a new risk domain:

1. Add/extend the script in `package.json`.
2. Wire the script into `qa.yml` first.
3. Document mapping in this matrix.
4. Add secondary coverage only if justified by deployment risk.

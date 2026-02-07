# Top Tier Electrical Cloudflare Pages Site

This repository contains the source and infrastructure configuration for the
Top Tier Electrical static site, hosted on **Cloudflare Pages**.  It includes
Terraform configurations, CI/CD workflows, Cloudflare routing files, and
supporting scripts.  The goal is to provide a portfolio‑grade example of a
modern, secure static website with infrastructure‑as‑code and automated
deployment.

## Contents

- **public/** – static assets and Cloudflare control files (`_redirects`, `_headers`).
- **scripts/** – Node utilities for verifying redirects and simulating navigation.
- **terraform/** – Infrastructure‑as‑Code modules and environment configuration.
- **.github/** – GitHub Actions workflows, code owners and templates.
- **docs/** – (optional) design documents and playbooks.

## Getting started

### Prerequisites

- Node.js 20
- npm (v7+)
- Terraform 1.8+
- Cloudflare Wrangler CLI (`npm install -g wrangler`)

### Local development

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Build the site to the `dist/` directory:

   ```bash
   npm run build
   ```

3. Run a local Cloudflare Pages preview:

   ```bash
   npx wrangler pages dev dist
   ```

   This will serve the built site on <http://localhost:8788> with the same routing
   semantics (including `_redirects` and `_headers`) that Cloudflare provides.

4. Optional: run the navigation simulator to crawl the site and detect broken links:

   ```bash
   node scripts/check-navigation-sim.mjs
   ```

### Infrastructure

Terraform code resides under `terraform/`.  To initialise and plan the
production environment:

```bash
cd terraform/envs/prod
terraform init
terraform plan
```

State is stored remotely in an S3 bucket with DynamoDB for locking (see
`backend.tf`).  In CI/CD, authentication to AWS uses GitHub’s OIDC
integration to avoid long‑lived credentials.

### Continuous integration

Pull requests trigger the **CI** workflow defined in
`.github/workflows/ci.yml`.  It performs:

- Terraform formatting, validation and planning
- IaC scanning (via Trivy)
- Site build and redirect syntax checks
- Optional navigation simulation via Wrangler

### Deployment

Pushes to the `main` branch (or manual triggers) run
`.github/workflows/deploy-prod.yml`, which builds the site and deploys it to
Cloudflare Pages using the Wrangler action.  The job is attached to the
`production` environment, allowing you to require manual approvals via GitHub
Environments.

## Architecture

The following Mermaid diagram illustrates the high‑level workflow:

```mermaid
flowchart LR
  Dev[Developer] --> GH[GitHub Repository]
  GH --> GA[GitHub Actions]
  GA -->|Build & Test| Build[Build Output (dist/)]
  GA -->|Deploy (Wrangler)| CF[Cloudflare Pages]
  User[Browser] --> CF
  GA -->|OIDC AssumeRole| AWS[AWS (remote tfstate)]
  AWS --> State[S3 + DynamoDB (Terraform state/locking)]
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to
contribute to this project and [SECURITY.md](SECURITY.md) for reporting
vulnerabilities.

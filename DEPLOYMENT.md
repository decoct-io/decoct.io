# Deployment — How Git Syncs with Cloudflare Pages

## Overview

The `decoct.io` site is deployed to **Cloudflare Pages** via a native GitHub integration. There is no manual deployment step — Cloudflare automatically builds and deploys the site whenever changes are pushed to GitHub.

## Integration Details

| Setting                | Value                                              |
| ---------------------- | -------------------------------------------------- |
| **Cloudflare project** | `decoct-io`                                        |
| **Pages subdomain**    | `decoct-io.pages.dev`                              |
| **Custom domain**      | `decoct.io`                                        |
| **GitHub repo**        | `decoct-io/decoct.io`                              |
| **Production branch**  | `main`                                             |
| **Framework**          | Astro (v5.18.0)                                    |
| **Build command**      | `npm run build`                                    |
| **Output directory**   | `dist`                                             |
| **Build image**        | v3                                                 |
| **Compatibility date** | 2026-03-09                                         |

## How It Works

### 1. GitHub → Cloudflare Pages (native integration)

Cloudflare Pages connects directly to the `decoct-io/decoct.io` GitHub repository via an OAuth/GitHub App integration. No API keys or tokens are needed in the repo — the connection is managed entirely through the Cloudflare dashboard.

When Cloudflare detects a push to GitHub, it:

1. **Queues** the deployment
2. **Initialises** the build environment
3. **Clones** the repo from GitHub
4. **Builds** using `npm run build` (producing static output in `dist/`)
5. **Deploys** the built assets to Cloudflare's edge network

### 2. Production deployments

Any push to the `main` branch triggers a **production deployment**. The built site is served at:

- `https://decoct.io` (custom domain)
- `https://decoct-io.pages.dev` (Pages subdomain)

### 3. Preview deployments

Pushes to **any other branch** (including pull request branches) trigger **preview deployments**. Each preview gets a unique URL:

```
https://<short-id>.decoct-io.pages.dev
```

Preview settings:
- `preview_deployment_setting`: **all** (every branch gets a preview)
- `preview_branch_includes`: `*` (no branch filtering)
- `pr_comments_enabled`: **true** (Cloudflare posts deployment URLs as PR comments)

### 4. GitHub Actions CI (separate from deployment)

The repo also has a GitHub Actions workflow (`.github/workflows/deploy.yml`) that runs on pushes and PRs to `main`. This workflow **only runs a build check** — it does not deploy. Its purpose is to catch build errors before Cloudflare deploys:

```yaml
# Runs: checkout → setup Node 22 → npm ci → npm run build
# Does NOT deploy — Cloudflare Pages handles deployment independently
```

## Deployment Flow Diagram

```
  Developer pushes to GitHub
          │
          ├──────────────────────────┐
          │                          │
          ▼                          ▼
  GitHub Actions CI          Cloudflare Pages
  (build check only)        (build + deploy)
          │                          │
          ▼                          ├── main branch → production
     Pass / Fail                     └── other branch → preview
```

## Custom Domain Setup

The `decoct.io` domain is registered through Cloudflare (expires 8 March 2027) and uses Cloudflare DNS with **Full** SSL mode. DNS is configured to point to the Cloudflare Pages project, making `decoct.io` serve the production deployment.

## Environment Variables

The `decoct-io` Pages project has **no environment variables** configured for either preview or production environments.

## Key Points

- **No deploy tokens or secrets are needed in the GitHub repo** — the Cloudflare ↔ GitHub connection is handled by the native integration
- **Deployment is automatic** — push to `main` and it's live within ~1 minute
- **The GitHub Actions workflow is CI only** — it validates the build but does not deploy
- **Every branch gets a preview** — useful for reviewing changes before merging to `main`

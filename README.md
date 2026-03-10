# decoct.io

Source for [decoct.io](https://decoct.io) — the project website and documentation for [decoct](https://github.com/decoct-io/decoct).

Built with [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/). Hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

## Development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:4321`.

## Structure

```
src/
  pages/           # Marketing pages (landing, features, getting started)
  content/docs/    # Starlight documentation (mounted at /docs)
  layouts/         # Base layout for non-docs pages
  components/      # Shared components
  styles/          # Global styles + Starlight overrides
public/            # Static assets
```

## Build & deploy

Deployed automatically via GitHub Actions on push to `main`. The workflow builds the site and publishes to Cloudflare Pages.

To build locally:

```bash
npm run build
npm run preview
```

## Licence

MIT

# Technology Stack
> Last mapped: 2026-05-12

## Runtime

**Environment:** Node.js
- CI/CD pin: `20` (via `actions/setup-node@v4` in `.github/workflows/deploy.yml`)
- Local version in use: `18.19.1` (no `.nvmrc` or `.node-version` file present)
- Recommendation: align local dev to Node 20 to match CI

**Package Manager:** npm `9.2.0`
- Lockfile: `package-lock.json` — present and committed
- Install command in CI: `npm ci`

## Language

**Primary:** TypeScript
- Config: `tsconfig.json` — extends `astro/tsconfigs/strictest`
- Path alias: `@/*` → `src/*`
- Strict mode: yes (via `astro/tsconfigs/strictest`)

**Secondary:** JavaScript (ESM)
- Used in: `astro.config.mjs`, `remark-blog-directives.mjs`
- Module type: `"type": "module"` in `package.json`

## Framework

**Core:** Astro `^4.16.18` (resolved `4.16.19`)
- Config: `astro.config.mjs`
- Mode: Static Site Generation (SSG) — no server adapter configured
- Output directory: `./docs` (required for GitHub Pages)
- Assets subdirectory: `_astro`
- Site URL: `https://eloysekonell.com.br`
- Dev toolbar: enabled

## Build & Bundler

**Bundler:** Vite (bundled inside Astro — no separate config)
- `import.meta.glob` used in `src/pages/sitemap.xml.ts` for auto-detecting static routes

**Build scripts** (`package.json`):
```bash
npm run dev       # astro dev  — http://localhost:4321
npm run build     # astro build — outputs to ./docs
npm run preview   # astro preview
npm run astro     # raw astro CLI passthrough
```

## Dependencies

**Production (`dependencies`):**

| Package | Version spec | Resolved | Purpose |
|---------|-------------|---------|---------|
| `astro` | `^4.16.18` | `4.16.19` | Core framework (SSG, routing, content collections, Image optimization) |
| `@astrojs/sitemap` | `^3.7.2` | — | Sitemap integration (declared but the project uses a custom `src/pages/sitemap.xml.ts` instead) |
| `remark-directive` | `^4.0.0` | — | Remark plugin enabling `::directive` / `:::container` syntax in Markdown |

**Dev (`devDependencies`):**

| Package | Version spec | Purpose |
|---------|-------------|---------|
| `@types/node` | `^22.10.1` | Node.js type definitions for TypeScript |

**Transitive (notable, from `remark-blog-directives.mjs`):**
- `unist-util-visit` — traverses the unified AST inside the custom remark plugin; pulled in transitively through `remark-directive`

## Plugins & Extensions

**Astro Integrations (in `astro.config.mjs`):**
- `@astrojs/sitemap` — declared as integration (note: project also ships a custom `sitemap.xml.ts` endpoint)

**Remark Markdown Plugins:**
1. `remark-directive` — enables directive syntax (`::leaf`, `:::container`, `:inline`)
2. `remarkBlogDirectives` (`./remark-blog-directives.mjs`) — custom plugin that transforms directives into HTML:
   - `::pullquote` — pull-quote block
   - `:::data-grid` — pipe-delimited stat grid
   - `:::inline-cta` — inline CTA block with WhatsApp link
   - `:::faq` — FAQ accordion (`<details>`/`<summary>`)
   - `:::exercise` — numbered exercise list

## Content Layer

**Astro Content Collections** (`src/content/config.ts`):
- `blog` — Markdown files in `src/content/blog/`, schema validated with Zod
- `cases` — Markdown files in `src/content/cases/`, schema validated with Zod
- Draft filtering via `draft: boolean` field on both collections

## Styling

**Approach:** Single global CSS file — no CSS framework, no preprocessor
- File: `src/styles/global.css`
- Imported in: `src/layouts/Layout.astro`
- Component-scoped styles use Astro's `<style>` blocks (compiled to scoped class names)

**Fonts:** Google Fonts (loaded via `<link>` in `Layout.astro`)
- `Cormorant Garamond` — weights 300/400/500/600, regular + italic (serif, headings)
- `Manrope` — weights 300/400/500/600/700 (sans-serif, body/UI)

## Image Handling

**Optimized images:** `src/assets/` — imported via `astro:assets`, output as WebP/AVIF
**Static images:** `public/` — served as-is (favicon, OG cover, client logos for URL references)

## Code Quality Tooling

**EditorConfig:** `.editorconfig` — 2-space indent, LF line endings, UTF-8, final newline
**No linter detected:** No `.eslintrc*`, `biome.json`, or similar found
**No formatter config detected:** No `.prettierrc*` found (EditorConfig is the only formatting standard)

## TypeScript Paths

```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

Import as `import { credenciais } from '@/data/credenciais'` from any file under `src/`.

---

*Stack analysis: 2026-05-12*

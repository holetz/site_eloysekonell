# Technology Stack

## Language & Runtime

- **TypeScript** (strict mode via `astro/tsconfigs/strictest`)
- **Node.js** ^18.17.1 || ^20.3.0 || >=21.0.0 (required by Astro); v22.22.1 installed
- **ES Modules** (`"type": "module"` in package.json)

## Core Framework

- **Astro** `^4.16.18` (resolved 4.16.19) — Static Site Generator (SSG mode, no SSR)
  - `@astrojs/compiler` 2.13.1
  - `@astrojs/markdown-remark` 5.3.0
  - `@astrojs/prism` 3.1.0 (syntax highlighting)
  - `@astrojs/sitemap` `^3.7.2` (integration, though a custom `sitemap.xml.ts` also exists)

## Markdown Processing

- **remark-directive** `^4.0.0` — enables `::directive` syntax in Markdown
- **remark-blog-directives.mjs** — custom Remark plugin for domain-specific directives (pullquote, data-grid, inline-cta, faq, exercise)
- **Unified ecosystem** — remark-parse, remark-gfm, remark-rehype, rehype-raw, rehype-stringify (bundled with Astro)
- **Shiki** — syntax highlighting (bundled with Astro)

## Content Management

- **Astro Content Collections** with Zod schemas (`src/content/config.ts`)
  - Blog collection: 12 Markdown posts
  - Cases collection: 3 Markdown case studies

## Styling

- **Plain CSS** — single global stylesheet (`src/styles/global.css`, 43 KB)
- **CSS custom properties** — design tokens for colors, spacing, typography, shadows, z-index
- **Scoped styles** — `<style>` tags inside `.astro` components
- No CSS preprocessor (no Sass, Less, or Tailwind)

## Typography

- **Cormorant Garamond** (serif, Google Fonts) — headings
- **Manrope** (sans-serif, Google Fonts) — body/UI

## Build Tools

- **Vite** (built into Astro 4) — dev server and bundler
- **esbuild** (integrated in Astro) — JS/TS transpilation
- **PostCSS** (integrated in Astro) — CSS processing

## Package Manager

- **npm** v10.9.4 (lockfileVersion 3)
- Lock file: `package-lock.json` (204 KB)

## Dev Dependencies

- `@types/node` `^22.10.1`

## Editor Configuration

- `.editorconfig`: 2-space indent, LF line endings, UTF-8, trim trailing whitespace (except `.md`)

## Code Quality Tooling

- **None configured** — no ESLint, Prettier, Biome, or similar linting/formatting tools

## Build Output

- Output directory: `./docs` (configured in `astro.config.mjs`)
- Asset directory: `_astro` (hashed filenames for cache busting)

## Scripts

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro"
}
```

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Site oficial de Eloyse Konell — consultoria em liderança e gestão estratégica de pessoas. Static site built with Astro 4, deployed to GitHub Pages at `eloysekonell.com.br`. All content is in **pt-BR**.

## Commands

```bash
npm run dev       # Start dev server (localhost:4321)
npm run build     # Build to ./docs (not dist)
npm run preview   # Preview production build
```

No test runner. No linter configured.

## Architecture

**Framework:** Astro 4 in static mode. No React/Vue — components are `.astro` files only.

**Content:** Astro Content Collections with Zod validation in [src/content/config.ts](src/content/config.ts).
- `src/content/blog/` — 13 markdown articles; fields: title, description, deck, pubDate, tags, readingTime, draft, related[], faq[]
- `src/content/cases/` — case studies; mostly draft, not linked from nav

**Single source of truth for credentials/stats:** [src/data/credenciais.ts](src/data/credenciais.ts) — years of experience, companies served, education, certifications. Update here, not per-page.

**Layouts:**
- `src/layouts/Layout.astro` — base with SEO meta, JSON-LD (Person/WebSite/ProfessionalService schemas), Intersection Observer for `.reveal` animations
- `src/layouts/BlogLayout.astro` — article template with author bio, related posts, social share, FAQ block
- `src/layouts/PageLayout.astro` — internal pages with breadcrumb/hero slots

**Design system:** Single file at [src/styles/global.css](src/styles/global.css) (~1300 lines). No Tailwind — uses CSS custom properties.
- Colors: `--sand`, `--olive`, `--olive-deep`, `--taupe`, `--bronze`, `--bronze-soft`
- Typography: Cormorant Garamond (headings/quotes), Manrope (body/UI)
- Spacing: `--space-1` (4px) through `--space-13` (160px)
- Responsive breakpoints: 900px, 768px, 600px, 500px
- Key utility classes: `.eyebrow`, `.btn`, `.btn-ghost`, `.reveal`, `.pullquote`, `.data-grid`, `.inline-cta`

**Custom Markdown directives** ([remark-blog-directives.mjs](remark-blog-directives.mjs)):
- `::pullquote[text]` — styled block quote
- `:::data-grid` — 3-column data viz (num | label)
- `:::inline-cta{eyebrow,heading,link}` — CTA block
- `:::faq` — FAQ accordion (### Q / answer pairs)
- `:::exercise{title,description}` — numbered exercise (num | question | hint)

**Build output:** `./docs` (GitHub Pages reads from this dir). Configured in `astro.config.mjs` via `outDir: './docs'`.

## Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`): `npm ci` → `npm run build` → deploys `./docs` to `gh-pages` branch with CNAME `eloysekonell.com.br`. No manual deploy needed.

## Page Routes

- `/` — Homepage
- `/sobre/` — About Eloyse
- `/servicos/` + four sub-pages (`assessment`, `estrategias-de-sucessao`, `desenvolvimento-de-liderancas`, `mentoria-transicao-carreira`)
- `/assessment/` — Assessment spotlight
- `/blog/` + `/blog/[...slug]/` — Blog listing and articles
- `/contato/`, `/faq/`, `/metodologia/`
- `/sitemap.xml` — generated dynamically

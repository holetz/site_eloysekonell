# Directory & Code Organization

## Top-Level Layout

```
site_eloysekonell/
├── .github/workflows/       CI/CD pipeline (deploy.yml)
├── docs/                    Build output (GitHub Pages serves this)
├── public/                  Static assets copied 1:1 to docs/
├── src/                     All source code
├── astro.config.mjs         Astro configuration
├── remark-blog-directives.mjs  Custom Remark plugin
├── tsconfig.json            TypeScript config (strictest)
├── package.json             Dependencies and scripts
├── CNAME                    Custom domain pointer
├── CLAUDE.md                Codebase documentation for LLMs
└── SEO-STRATEGY.md          SEO strategy document
```

## Source Code Organization (`src/`)

### `src/components/` — 17 Reusable UI Components

**Landing page sections (rendered in order on index.astro):**
- `Nav.astro` — Fixed navigation bar with scroll-shrink and mobile hamburger
- `Hero.astro` — Main hero with CTA and background photo
- `About.astro` — Bio, portrait, credential stats
- `Consultoria.astro` — Value proposition section
- `Proposito.astro` — Three-pillar purpose statement
- `Services.astro` — Two-column service listing
- `AssessmentSpotlight.astro` — Tabbed assessment section (Empresas/Individual)
- `Testimonials.astro` — Three testimonial cards
- `Clients.astro` — Client logo grid
- `Cta.astro` — WhatsApp CTA block
- `Campanha.astro` — Campaign/promotional banner
- `Footer.astro` — Footer with nav, contact, social links

**Shared components (used across pages):**
- `BreadcrumbList.astro` — Breadcrumb navigation + BreadcrumbList schema
- `PageHero.astro` — Hero variant for internal pages
- `ServiceCard.astro` — Card component for service listings
- `CaseCard.astro` — Card component for case study listings
- `FaqBlock.astro` — FAQ accordion with FAQPage schema

### `src/layouts/` — 4 Layout Templates

- `Layout.astro` (6.6 KB) — Base layout: `<head>` with SEO meta, OG tags, three JSON-LD schemas, global CSS, IntersectionObserver for animations
- `BlogLayout.astro` (8.0 KB) — Blog posts: Article JSON-LD, author bio, share buttons, related posts, conditional FAQ block
- `CaseLayout.astro` (7.6 KB) — Case studies: structured header (client/sector/problem/approach/result), Article JSON-LD, CTA
- `PageLayout.astro` (842 B) — Minimal wrapper: Nav + slots + Footer, optional breadcrumb

### `src/pages/` — 15 Pages + 2 Dynamic Routes

```
pages/
├── index.astro                  Homepage (landing page)
├── sobre.astro                  /sobre
├── contato.astro                /contato
├── metodologia.astro            /metodologia
├── faq.astro                    /faq
├── assessment.astro             /assessment
├── sitemap.xml.ts               Dynamic XML sitemap
├── blog/
│   ├── index.astro              /blog (post listing)
│   └── [...slug].astro          /blog/:slug (dynamic post page)
├── cases/
│   ├── index.astro              /cases (case listing)
│   └── [slug].astro             /cases/:slug (dynamic case page)
└── servicos/
    ├── index.astro              /servicos (service listing)
    ├── assessment.astro         /servicos/assessment
    ├── desenvolvimento-de-liderancas.astro
    ├── gestao-estrategica-de-pessoas.astro
    ├── mentoria-executiva.astro
    └── estrategias-de-sucessao.astro
```

### `src/content/` — Content Collections

```
content/
├── config.ts                    Zod schemas for blog and cases
├── blog/                        12 Markdown posts
│   ├── antes-da-palavra.md
│   ├── cadeira-vazia.md
│   ├── feedback-continuo-90-dias.md
│   ├── hora-de-mudar.md
│   ├── identificar-potencial-de-lideranca.md
│   ├── lideranca-tecnica-vs-humana.md
│   ├── rh-futuro.md
│   ├── saude-mental-estrategia.md
│   ├── sucessao-empresa-familiar.md
│   ├── sucessao-mal-planejada.md
│   ├── sucessor-e-sucessao.md
│   └── tecnico-virou-gestor.md
└── cases/                       3 Markdown case studies
    ├── datarunk.md
    ├── grupo-top.md
    └── nuvme.md
```

### `src/data/` — Centralized Data

- `credenciais.ts` — Single source of truth for factual data (years, companies, leaders, credentials, alumni, knowledge areas)

### `src/styles/` — Global Styling

- `global.css` (43 KB) — All design tokens, utility classes, component styles, responsive breakpoints, animations

### `src/assets/` — Optimized Images

```
assets/
├── icons/                       4 SVG service icons
│   ├── assessment.svg
│   ├── leadership.svg
│   ├── mentoring.svg
│   └── strategy.svg
├── logos/                       12 client/brand logos (PNG, WebP)
│   ├── logo_principal.png
│   ├── logo_datarunk.png
│   ├── logo_dgsis.png
│   ├── logo_grupo_top.png
│   ├── logo_guion.png
│   ├── logo_mtech.png
│   ├── logo_nuvme.png
│   ├── logo_possibilitar.png
│   ├── logo_rosa_claro.webp
│   ├── logo_straas.png
│   ├── logo_techlinker.webp
│   └── logo_colablife.png
└── photos/                      5 professional photos
    ├── eloyse-hero.jpg
    ├── eloyse-author-blog.jpg
    ├── eloyse-foto.jpg
    ├── eloyse-portrait.jpg
    └── eloyse-study.jpg
```

## Static Assets (`public/`)

```
public/
├── CNAME                        Domain: eloysekonell.com.br
├── robots.txt                   Crawler directives (allows AI bots)
├── llms.txt                     Content index for LLM crawlers
├── files/
│   └── portfolio_eloyse_konell.pdf
└── images/
    ├── logo.png                 Main logo (nav + favicon)
    ├── og-cover.jpg             Open Graph image (1200x630)
    ├── backgrounds/
    │   ├── background-min.jpg
    │   └── hero-background.jpg
    ├── icons/                   7 utility icons (PNG)
    ├── logos/                   12 client logos (public copies)
    └── photos/                  5 professional photos (public copies)
```

## Build Output (`docs/`)

Generated by `npm run build`. Contains pre-rendered HTML, optimized CSS/JS in `_astro/`, and copied `public/` assets. Deployed to GitHub Pages.

## Configuration Files

| File | Location | Purpose |
|------|----------|---------|
| `astro.config.mjs` | root | Site URL, output dir, Remark plugins, dev toolbar |
| `tsconfig.json` | root | Strictest TS config, `@/*` path alias |
| `package.json` | root | Dependencies, scripts, project metadata |
| `.editorconfig` | root | Editor formatting (2-space indent, LF, UTF-8) |
| `.gitignore` | root | Git exclusions |
| `.github/workflows/deploy.yml` | `.github/` | CI/CD: build + deploy to GitHub Pages |

## Test Organization

**No tests exist.** No test framework, no test files, no test scripts in package.json.

## File Size Summary

| Directory | Files | Approximate Size |
|-----------|-------|-----------------|
| `src/components/` | 17 | ~65 KB |
| `src/pages/` | 15 | ~75 KB |
| `src/layouts/` | 4 | ~23 KB |
| `src/content/` | 16 | ~50 KB |
| `src/styles/` | 1 | 43 KB |
| `src/assets/` | 21 | ~2.8 MB |
| `public/` | ~30 | ~13 MB |
| `docs/` (build) | ~450+ | ~14 MB |

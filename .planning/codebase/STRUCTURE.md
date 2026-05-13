# Codebase Structure

> Last mapped: 2026-05-12

## Directory Layout

```
site_eloysekonell/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD: build → docs/ → GitHub Pages
├── .planning/
│   └── codebase/               # GSD codebase map documents
├── docs/                       # Build output (generated, committed for GH Pages)
├── public/                     # Static files copied 1:1 to docs/
│   ├── CNAME                   # Domain config for GitHub Pages
│   ├── robots.txt
│   ├── llms.txt                # AI crawler index
│   ├── files/
│   │   └── portfolio_eloyse_konell.pdf
│   └── images/
│       ├── logo.png            # Favicon source
│       ├── og-cover.jpg        # OG image (1200×630)
│       ├── logos/              # Client logos (URL-only, no processing)
│       ├── photos/             # Public photos (URL-only, no processing)
│       ├── backgrounds/        # Background images (reserve)
│       └── icons/              # Public icon assets
├── src/
│   ├── assets/                 # Processed images (via astro:assets)
│   │   ├── icons/              # SVG icons (imported as ?raw for inline HTML)
│   │   ├── logos/              # Client logos + site logo (for <Image> components)
│   │   └── photos/             # Eloyse's photos (for <Image> components)
│   ├── components/             # Reusable Astro components
│   ├── content/                # Content Collections (Markdown)
│   │   ├── config.ts           # Zod schemas for blog and cases
│   │   ├── blog/               # Blog posts (*.md)
│   │   └── cases/              # Case studies (*.md, always draft: true initially)
│   ├── data/
│   │   └── credenciais.ts      # Single source of truth for factual numbers
│   ├── layouts/                # Page shell templates
│   ├── pages/                  # File-based routes (one file = one URL)
│   │   ├── blog/
│   │   ├── cases/
│   │   └── servicos/
│   └── styles/
│       └── global.css          # All global CSS, design tokens, button system
├── astro.config.mjs            # Astro config (outDir: docs, remark plugins, site URL)
├── remark-blog-directives.mjs  # Custom remark plugin for :::directive callouts
├── tsconfig.json
├── package.json
├── CLAUDE.md                   # Project instructions for LLMs
├── CNAME                       # Domain (do not edit)
└── SEO-STRATEGY.md             # SEO planning document
```

## src/ Subdirectory Breakdown

### `src/components/`

All Astro components. No subdirectories — flat structure.

| File | Role | Used in |
|------|------|---------|
| `Nav.astro` | Fixed navigation header with mobile hamburger, scroll-shrink effect | All pages (via layouts and index.astro directly) |
| `Footer.astro` | Site footer with nav links, contact info, social links | All pages (via layouts) |
| `Hero.astro` | Landing page hero section with CTA and background photo | `src/pages/index.astro` |
| `About.astro` | Bio section with portrait photo and stats | `src/pages/index.astro` (referenced in CLAUDE.md but not in current index) |
| `Consultoria.astro` | Value proposition section | `src/pages/index.astro` (referenced in CLAUDE.md) |
| `Proposito.astro` | Three-pillar purpose section | `src/pages/index.astro` (referenced in CLAUDE.md) |
| `Services.astro` | Services two-column section | `src/pages/index.astro` (referenced in CLAUDE.md) |
| `AssessmentSpotlight.astro` | Assessment tabs (Empresas / Individual) | `src/pages/index.astro` (referenced in CLAUDE.md) |
| `Testimonials.astro` | Three testimonial cards | `src/pages/index.astro` |
| `Clients.astro` | Client logo grid | `src/pages/index.astro` |
| `Cta.astro` | WhatsApp CTA section | `src/pages/index.astro` |
| `Campanha.astro` | Campaign banner | `src/pages/index.astro` |
| `PageHero.astro` | Hero header for internal pages (eyebrow, title, deck, optional image) | `src/pages/sobre.astro`, `contato.astro`, `metodologia.astro`, `faq.astro`, service pages, cases pages |
| `BreadcrumbList.astro` | Breadcrumb nav + `BreadcrumbList` JSON-LD schema | `src/layouts/BlogLayout.astro`, `src/layouts/CaseLayout.astro`, `src/layouts/PageLayout.astro` |
| `ServiceCard.astro` | Service card with title, deck, bullets, link | `src/pages/servicos/index.astro` |
| `CaseCard.astro` | Case card accepting `CollectionEntry<'cases'>` | `src/pages/cases/index.astro` |
| `FaqBlock.astro` | Accordion FAQ + `FAQPage` JSON-LD | `src/layouts/BlogLayout.astro`, `src/pages/faq.astro` |

### `src/layouts/`

| File | Role |
|------|------|
| `Layout.astro` | Base HTML shell: `<html>`, `<head>` with all meta tags + OG + Twitter, Google Fonts, three global JSON-LD schemas (`Person`, `WebSite`, `ProfessionalService`), `<slot name="head">` for extra schemas, scroll-reveal `IntersectionObserver` script |
| `BlogLayout.astro` | Blog post shell: extends `Layout.astro`, includes `Nav`, breadcrumb, article header, `<slot />` (Markdown body), optional `FaqBlock`, author bio, share buttons, related posts, `Article` JSON-LD |
| `PageLayout.astro` | Internal page shell: extends `Layout.astro`, includes `Nav`, optional breadcrumb, `<slot name="hero">`, `<slot />`, `Footer` |
| `CaseLayout.astro` | Case study shell: extends `Layout.astro`, includes `Nav`, breadcrumb, case header with client summary (problem/approach/result/metric), `<slot />` (prose), CTA block, `Article` JSON-LD |

### `src/pages/`

| File / Directory | URL | Notes |
|---|---|---|
| `index.astro` | `/` | Landing page — sequences section components |
| `sobre.astro` | `/sobre/` | Uses `PageLayout` + `PageHero`; imports `credenciais` for stats; emits `ProfilePage` JSON-LD |
| `contato.astro` | `/contato/` | Uses `PageLayout` + `PageHero` (center-aligned) |
| `metodologia.astro` | `/metodologia/` | Uses `PageLayout` + `PageHero` |
| `faq.astro` | `/faq/` | Uses `PageLayout` + `FaqBlock`; emits `FAQPage` JSON-LD |
| `sitemap.xml.ts` | `/sitemap.xml` | API endpoint (`GET` export); auto-detects static routes + queries collections |
| `servicos/index.astro` | `/servicos/` | Uses `PageLayout` + `PageHero` + `ServiceCard` (×4) |
| `servicos/desenvolvimento-de-liderancas.astro` | `/servicos/desenvolvimento-de-liderancas/` | Uses `PageLayout`; emits `Service` JSON-LD |
| `servicos/gestao-estrategica-de-pessoas.astro` | `/servicos/gestao-estrategica-de-pessoas/` | Uses `PageLayout`; emits `Service` JSON-LD |
| `servicos/assessment.astro` | `/servicos/assessment/` | Uses `PageLayout`; emits `Service` JSON-LD |
| `servicos/mentoria-executiva.astro` | `/servicos/mentoria-executiva/` | Uses `PageLayout`; emits `Service` JSON-LD |
| `blog/index.astro` | `/blog/` | Featured post + filtered grid + author bio + newsletter + partners — all inline in page file |
| `blog/[...slug].astro` | `/blog/[slug]/` | Dynamic; `getStaticPaths()` from `blog` collection; uses `BlogLayout` |
| `cases/index.astro` | `/cases/` | Dynamic listing of non-draft cases; uses `PageLayout` + `CaseCard`; emits `CollectionPage` JSON-LD |
| `cases/[slug].astro` | `/cases/[slug]/` | Dynamic; `getStaticPaths()` from `cases` collection; uses `CaseLayout` |

### `src/content/`

| File | Role |
|------|------|
| `config.ts` | Defines and exports `blog` and `cases` collections with Zod validation schemas |
| `blog/*.md` | 12 blog posts (all published). Slugs are kebab-case ASCII filenames. |
| `cases/*.md` | 3 case studies (`datarunk.md`, `nuvme.md`, `grupo-top.md`). Default `draft: true`. |

### `src/assets/`

| Directory | Contents | Import method |
|---|---|---|
| `photos/` | `eloyse-hero.jpg`, `eloyse-portrait.jpg`, `eloyse-foto.jpg`, `eloyse-study.jpg`, `eloyse-author-blog.jpg` | `import src from '../assets/photos/eloyse-hero.jpg'` → `<Image src={src} .../>` |
| `logos/` | `logo_principal.png` + 11 client logos (PNG, WebP) | Same — `<Image>` for components, or `?raw` for SVG |
| `icons/` | `assessment.svg`, `leadership.svg`, `mentoring.svg`, `strategy.svg` | `import icon from '...?raw'` → `set:html={icon}` |

### `src/data/`

| File | Role |
|------|------|
| `credenciais.ts` | Exports `credenciais` object with: `anosAtuacao`, `empresasAtendidas`, `lideresDesenvolvidos`, `assessmentsRealizados`, `localizacao`, `formacao[]`, `areasConhecimento[]`, `alumniOf[]`. Typed `as const`. |

### `src/styles/`

| File | Role |
|------|------|
| `global.css` | Single global stylesheet. Contains: CSS custom properties (all design tokens), reset, `.wrap` layout utility, typography base, `.eyebrow` pattern, nav styles, `.btn` / `.btn-ghost` / `.link-arrow` button system, section + reveal animation utilities. Imported once in `Layout.astro`. |

## Key Files

| File | Why it matters |
|------|----------------|
| `src/layouts/Layout.astro` | HTML shell for every page — touch with care, affects all pages |
| `src/styles/global.css` | All design tokens and global styles — the source of truth for the visual system |
| `src/data/credenciais.ts` | All factual numbers — never write stats inline elsewhere |
| `src/content/config.ts` | Content collection schemas — must match frontmatter in all `.md` files |
| `astro.config.mjs` | Build config — `outDir: ./docs` is required for GitHub Pages; `site` URL is used by sitemap |
| `.github/workflows/deploy.yml` | Auto-deploy on push to `main` |
| `public/CNAME` | Custom domain binding — do not remove or rename |

## Naming Conventions

**Component files:** PascalCase, `.astro` extension — `PageHero.astro`, `BreadcrumbList.astro`

**Page files:**
- Static pages: kebab-case — `sobre.astro`, `contato.astro`, `metodologia.astro`
- Dynamic routes: bracket notation — `[slug].astro`, `[...slug].astro`
- Index pages: `index.astro` in subdirectory

**Content files (Markdown):** kebab-case ASCII slugs — `lideranca-tecnica-vs-humana.md`, `grupo-top.md`

**Asset files (src/assets):** kebab-case with descriptive prefix — `eloyse-portrait.jpg`, `logo_principal.png` (logos use underscore historically)

**CSS classes:** BEM-lite with double underscores for elements — `.service-card__title`, `.page-hero__deck`. Global utilities use single class — `.wrap`, `.eyebrow`, `.reveal`

**TypeScript interfaces:** PascalCase `Props` interface defined in component frontmatter — `export interface Props { ... }`

## Where to Add New Code

**New landing page section:**
- Component: `src/components/[SectionName].astro`
- Register in: `src/pages/index.astro`

**New internal page:**
- Page: `src/pages/[slug].astro` using `<PageLayout>` and `<PageHero>`
- Add breadcrumb as prop to `PageLayout`
- If it's a service: also add `@id`-stable `Service` JSON-LD and update `hasOfferCatalog` in `src/layouts/Layout.astro`

**New service page:**
- File: `src/pages/servicos/[kebab-slug].astro`
- Uses: `PageLayout` + `PageHero`
- Must emit: `Service` JSON-LD with `@id: 'https://eloysekonell.com.br/servicos/[slug]/#service'`
- Must register: new `Offer` entry in `hasOfferCatalog` inside `src/layouts/Layout.astro`

**New blog post:**
- File: `src/content/blog/[kebab-slug].md`
- Required frontmatter: `title`, `description`, `deck`, `pubDate`, `readingTime`, `tags`
- Optional: `draft: true`, `faq: [{q, a}]`, `related: ['other-slug']`

**New case study:**
- File: `src/content/cases/[kebab-slug].md`
- Always start with `draft: true`
- Required frontmatter: `title`, `client`, `sector`, `problem`, `approach`, `result`, `pubDate`

**New shared UI component:**
- File: `src/components/[PascalCaseName].astro`
- Props typed with `export interface Props { ... }` in frontmatter
- Scoped styles in `<style>` block inside the component
- Use global tokens from CSS custom properties — no hardcoded color/spacing values

**New processed image (photo or logo for components):**
- Place in `src/assets/photos/` or `src/assets/logos/`
- Import and use with `<Image>` from `astro:assets`

**New SVG icon (for inline use):**
- Place in `src/assets/icons/`
- Import with `import iconName from './path.svg?raw'`
- Render with `set:html={iconName}` on a wrapper element

**New publicly-accessible static file:**
- Place in `public/` or `public/images/[category]/`
- Reference by URL path (e.g., `/images/logos/logo_client.png`)

## Content Collection Frontmatter Reference

**Blog post minimum:**
```markdown
---
title: 'Post Title'
description: 'SEO description (120–160 chars)'
deck: 'Subtitle shown in listing and article header'
pubDate: 2026-05-12
readingTime: '8 min'
tags: ['Liderança']
---
```

**Case study minimum:**
```markdown
---
title: 'Case Title'
client: 'Client Name'
sector: 'Tecnologia'
problem: 'One-sentence challenge description'
approach: 'One-sentence approach description'
result: 'One-sentence result description'
pubDate: 2026-05-12
draft: true
---
```

## Special Directories

**`docs/`:**
- Purpose: Astro build output, served by GitHub Pages
- Generated: Yes (`npm run build`)
- Committed: Yes (required by GitHub Pages configuration)
- Do not edit manually

**`public/`:**
- Purpose: Files served as-is without processing
- Generated: No
- Committed: Yes

**`.astro/`:**
- Purpose: Astro's internal type-generation cache
- Generated: Yes
- Committed: No (in `.gitignore`)

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes
- Committed: No

**`.planning/`:**
- Purpose: GSD planning documents and codebase maps
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-05-12*

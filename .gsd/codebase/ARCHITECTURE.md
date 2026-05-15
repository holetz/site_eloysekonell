# Architecture

## Overall Style

**Static Site Generator (SSG) monolith** — Astro pre-renders all pages to HTML at build time. No SSR, no API routes, no client-side framework runtime. Output goes to `./docs/` and is deployed to GitHub Pages.

## Core Data Flow

```
credenciais.ts (single source of truth for factual data)
    |
    +-> Layout.astro (Person, WebSite, ProfessionalService JSON-LD)
    +-> Components (stats, about, testimonials)
    
Content Collections (blog/*.md, cases/*.md)
    |
    +-> config.ts (Zod schema validation)
    +-> Dynamic routes ([...slug].astro, [slug].astro)
    +-> Specialized layouts (BlogLayout, CaseLayout)
    +-> remark-blog-directives.mjs (Markdown -> custom HTML)
    
Static pages (pages/*.astro)
    |
    +-> PageLayout.astro or Layout.astro
    +-> Component composition (Nav, Hero, sections, Footer)

All pages
    |
    +-> Layout.astro (SEO meta, OG tags, JSON-LD schemas)
    +-> docs/ (Astro build output)
    +-> GitHub Actions -> GitHub Pages
```

## Layout Hierarchy

```
Layout.astro (base)
  |
  +-- PageLayout.astro  (static pages: sobre, contato, metodologia, servicos/*)
  |     +-- Nav
  |     +-- PageHero (slot)
  |     +-- BreadcrumbList (optional)
  |     +-- Content (slot)
  |     +-- Footer
  |
  +-- BlogLayout.astro  (blog posts)
  |     +-- Nav
  |     +-- BreadcrumbList
  |     +-- Article header (title, meta, cover)
  |     +-- Article body (slot)
  |     +-- FaqBlock (conditional, from frontmatter)
  |     +-- Author bio
  |     +-- Share buttons
  |     +-- Related posts (conditional)
  |     +-- Footer
  |
  +-- CaseLayout.astro  (case studies)
        +-- Nav
        +-- BreadcrumbList
        +-- Case header (client, sector, problem, approach, result)
        +-- Case body (slot)
        +-- CTA section
        +-- Footer
```

## Key Design Patterns

### Single Source of Truth
`src/data/credenciais.ts` centralizes all factual data (years of experience, companies served, leaders developed, credentials, alumni). Components and layouts import from this single module. No hardcoded numbers in templates.

### Content Collections with Typed Schemas
Blog and case study content uses Astro's Content Collections with Zod validation in `src/content/config.ts`. Frontmatter is type-checked at build time. Draft filtering via `data.draft` boolean.

### SEO as Architecture
SEO is embedded in the layout layer, not bolted on. `Layout.astro` emits three JSON-LD schemas (Person, WebSite, ProfessionalService) on every page. `BlogLayout.astro` adds Article schema. `BreadcrumbList.astro` adds navigation schema. FAQ schema is auto-generated from frontmatter.

### Markdown Extension via Remark Plugin
`remark-blog-directives.mjs` extends Markdown with domain-specific directives (`::pullquote`, `:::data-grid`, `:::inline-cta`, `:::faq`, `:::exercise`). This keeps content files as pure Markdown while enabling rich rendering. Directives are transformed to HTML nodes during the Remark AST pass.

### Component Self-Containment
Landing page components (Hero, About, Consultoria, etc.) are self-contained: they own their data or import from `credenciais.ts`. No prop drilling from the page level. Interactive behavior uses inline `<script>` tags with vanilla JS.

### Zero Client-Side Framework
No React, Vue, Svelte, or similar runtime. Client-side interactivity is limited to:
- IntersectionObserver for `.reveal` scroll animations
- Clipboard API for share links
- Tab switching in AssessmentSpotlight
- Mobile menu toggle
- FAQ accordion

## Module Boundaries

| Module | Responsibility | Dependencies |
|--------|---------------|--------------|
| `layouts/` | Page structure, SEO, JSON-LD | `credenciais.ts`, components |
| `components/` | UI sections, reusable blocks | `credenciais.ts`, `astro:assets` |
| `pages/` | Routing, page composition | layouts, components, content collections |
| `content/` | Blog + case Markdown files | `config.ts` schema |
| `data/` | Factual data source | none |
| `styles/` | Global CSS + design tokens | none |
| `assets/` | Optimized images (WebP/AVIF) | none |
| `public/` | Static files (1:1 copy) | none |

## Routing Strategy

- **File-based routing** via Astro's `src/pages/` convention
- **Static routes:** Direct `.astro` files for fixed pages
- **Dynamic routes:** `[...slug].astro` (blog) and `[slug].astro` (cases) using `getStaticPaths()`
- **Sitemap:** Custom `sitemap.xml.ts` auto-detects static routes via `import.meta.glob` and queries content collections for dynamic routes

## Build & Deploy Pipeline

```
npm run build
    |
    +-> Astro SSG: renders all pages to static HTML
    +-> Output: ./docs/ (HTML, CSS, JS, images)
    +-> Assets in ./docs/_astro/ (hashed filenames)

git push main
    |
    +-> GitHub Actions: deploy.yml
    +-> npm ci && npm run build
    +-> peaceiris/actions-gh-pages@v4
    +-> Publishes ./docs/ to GitHub Pages
    +-> CNAME: eloysekonell.com.br
```

## Image Handling

- **`src/assets/`** — Images imported via `astro:assets` for automatic WebP/AVIF optimization and CLS prevention (used in components with `<Image>`)
- **`public/images/`** — Static images served as-is (logos, backgrounds, icons)
- **External URLs** — Blog cover images reference Unsplash CDN directly in frontmatter

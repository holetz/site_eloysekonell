# Architecture

> Last mapped: 2026-05-12

## System Overview

```text
┌──────────────────────────────────────────────────────────────────────┐
│                        Browser (Static HTML)                         │
│              Served via GitHub Pages (docs/ branch)                  │
└────────────────────────────┬─────────────────────────────────────────┘
                             │ HTTP (no server runtime)
┌────────────────────────────▼─────────────────────────────────────────┐
│                     Astro SSG Build Output                           │
│                        outDir: ./docs/                               │
├──────────────┬──────────────────┬──────────────────┬─────────────────┤
│  Static Pages│  Blog Posts      │  Case Studies    │  Dynamic Routes │
│ /index.html  │ /blog/[slug]/    │ /cases/[slug]/   │ /sitemap.xml    │
│ /sobre/      │ getStaticPaths() │ getStaticPaths() │ (GET endpoint)  │
│ /servicos/   │                  │                  │                 │
│ /contato/    │                  │                  │                 │
│ /faq/        │                  │                  │                 │
│ /metodologia/│                  │                  │                 │
└──────┬───────┴──────────────────┴──────────────────┴─────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Content Sources                               │
├──────────────────────────┬──────────────────────────────────────────┤
│  Content Collections     │  Data Module                             │
│  src/content/blog/*.md   │  src/data/credenciais.ts                 │
│  src/content/cases/*.md  │  (single source of truth for numbers)    │
│  schema: config.ts       │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
```

## Architecture Pattern

**Overall:** Static Site Generation (SSG) — zero server runtime.

Every page is pre-rendered at build time by Astro. The output in `docs/` is pure HTML/CSS/JS deployed to GitHub Pages. There is no API server, no backend process, and no database connection at request time.

## Layout System

Four layouts form a strict hierarchy. All layouts wrap `Layout.astro` as the HTML shell.

| Layout | File | Used By |
|--------|------|---------|
| Base HTML shell | `src/layouts/Layout.astro` | All other layouts |
| Blog post | `src/layouts/BlogLayout.astro` | `src/pages/blog/[...slug].astro` |
| Internal page | `src/layouts/PageLayout.astro` | `src/pages/sobre.astro`, `contato.astro`, `metodologia.astro`, `faq.astro`, service pages, cases index |
| Case study | `src/layouts/CaseLayout.astro` | `src/pages/cases/[slug].astro` |

`Layout.astro` accepts a named `head` slot for per-page JSON-LD injection. `PageLayout.astro` passes this slot through via `<slot name="head" slot="head" />`.

## Routing Strategy

**File-based routing** — Astro derives URLs directly from the file path under `src/pages/`.

| Route type | Example file | URL pattern |
|---|---|---|
| Static page | `src/pages/sobre.astro` | `/sobre/` |
| Static index | `src/pages/servicos/index.astro` | `/servicos/` |
| Dynamic (blog) | `src/pages/blog/[...slug].astro` | `/blog/lideranca-tecnica-vs-humana/` |
| Dynamic (cases) | `src/pages/cases/[slug].astro` | `/cases/datarunk/` |
| Endpoint | `src/pages/sitemap.xml.ts` | `/sitemap.xml` |

Dynamic routes use `getStaticPaths()` to enumerate all slugs at build time from Content Collections. Blog drafts (`draft: true`) are excluded in production but included in `import.meta.env.DEV`.

Cases use single-param `[slug].astro` (no catch-all). Blog uses catch-all `[...slug].astro` to support potential future nesting.

## Content Collections

Defined in `src/content/config.ts` using Astro's `defineCollection` with Zod schemas.

**`blog` collection** (`src/content/blog/*.md`):
- Required: `title`, `description`, `deck`, `pubDate`, `readingTime`, `tags`
- Optional: `updatedDate`, `coverImage`, `ogImage`, `draft`, `related`, `faq`
- `faq` field triggers automatic `<FaqBlock>` + `FAQPage` JSON-LD in `BlogLayout.astro`

**`cases` collection** (`src/content/cases/*.md`):
- Required: `title`, `client`, `sector`, `problem`, `approach`, `result`, `pubDate`
- Optional: `clientUrl`, `metric`, `updatedDate`, `coverImage`, `draft`, `tags`
- Always authored with `draft: true`; owner activates manually

## Data Flow

### Blog post render path

1. `src/content/blog/[slug].md` — Markdown source with frontmatter
2. `src/pages/blog/[...slug].astro` — calls `getCollection('blog')` in `getStaticPaths()`; passes frontmatter props + `<Content />` component to layout
3. `src/layouts/BlogLayout.astro` — wraps in `Layout.astro`, renders breadcrumb, article header, `<slot />` (the Markdown body), optional `<FaqBlock>`, author bio, share buttons, related posts
4. `src/layouts/Layout.astro` — emits full `<html>`, global CSS, Google Fonts, three JSON-LD schemas (`Person`, `WebSite`, `ProfessionalService`), `<slot name="head" />` for extra per-page JSON-LD

### Landing page composition

1. `src/pages/index.astro` — imports and sequences section components
2. Each component (`Nav`, `Hero`, `Campanha`, `Testimonials`, `Clients`, `Cta`, `Footer`) is self-contained with its own `<style>` block
3. All share tokens from `src/styles/global.css` (imported once in `Layout.astro`)

### Factual data flow

`src/data/credenciais.ts` exports a single `const credenciais` object. It is imported in `Layout.astro` (for JSON-LD `Person` schema), `src/pages/sobre.astro`, and any component needing displayed statistics. Never duplicated inline.

## Component Model

**Composition over inheritance.** There is no base class or prototype chain — components are composed by inclusion.

- **Section components** (`Hero`, `About`, `Consultoria`, etc.): one-per-section, used only in `src/pages/index.astro`. Self-contained HTML + scoped `<style>`.
- **Shared UI components** (`Nav`, `Footer`, `BreadcrumbList`, `PageHero`, `FaqBlock`): reused across pages and layouts. Props typed with TypeScript interfaces in the frontmatter.
- **Card components** (`ServiceCard`, `CaseCard`): accept typed props derived from content schemas. `CaseCard` accepts `CollectionEntry<'cases'>` directly.
- **No component barrel files** — all imports use direct paths.

Interactive behavior (mobile menu, FAQ accordion, category filter, copy-link button) lives in `<script>` tags within the owning component file. Astro processes these as module scripts at build time.

The global scroll-reveal animation is registered once in `Layout.astro` using `IntersectionObserver`. Any element with class `reveal` gains class `visible` when it enters the viewport.

## SEO Architecture

Every page emits three base JSON-LD schemas via `Layout.astro`:
- `Person` (`#eloyse`) — personal identity, credentials from `credenciais.ts`
- `WebSite`
- `ProfessionalService` (`#business`) — includes `hasOfferCatalog` linking to all four service pages by stable `@id`

Additional schemas are injected per-page via the `head` slot:
- `Article` — blog posts (in `BlogLayout.astro`) and case studies (in `CaseLayout.astro`)
- `FAQPage` — emitted by `FaqBlock.astro` (used in blog posts with `faq` frontmatter and in `src/pages/faq.astro`)
- `BreadcrumbList` — emitted by `BreadcrumbList.astro` (all internal pages and blog/case layouts)
- `ProfilePage` — `src/pages/sobre.astro`
- `CollectionPage` — `src/pages/cases/index.astro`
- `Service` — each individual service page (e.g., `src/pages/servicos/assessment.astro`)

## Sitemap Generation

`src/pages/sitemap.xml.ts` is an Astro API endpoint (`GET` export). It:
1. Auto-detects static `.astro` routes via `import.meta.glob('./**/*.astro')` — excludes dynamic routes, 404, and itself
2. Queries `getCollection('blog')` for published posts
3. Queries `getCollection('cases')` for published cases (wrapped in try/catch for resilience)
4. Returns XML with correct `priority` and `changefreq` per URL type

## Build and Deploy

```
npm run build
  └── Astro compiles src/ → docs/
        └── Assets hashed in docs/_astro/

git push main
  └── .github/workflows/deploy.yml triggers
        └── npm ci && npm run build
              └── peaceiris/actions-gh-pages@v4 pushes docs/ to gh-pages branch
                    └── GitHub Pages serves from eloysekonell.com.br
```

The `CNAME` file is committed both at repo root and in `public/` (copied to `docs/` at build). The deploy workflow also passes `cname: eloysekonell.com.br` to the action as a redundancy.

## Markdown Processing

`astro.config.mjs` registers two remark plugins for blog Markdown:
- `remark-directive` — enables the `:::` container directive syntax
- `remarkBlogDirectives` (`remark-blog-directives.mjs`) — custom plugin that transforms named directives into HTML callout blocks (e.g., `:::insight`, `:::alerta`)

## Image Strategy

Two image locations with different purposes:

| Location | Tool | Use case |
|---|---|---|
| `src/assets/` | `astro:assets` `<Image>` component | Internal images (photos, logos in components) — auto-converts to WebP/AVIF, emits correct `width`/`height` for CLS zero |
| `public/images/` | Direct URL reference | Public assets (OG cover, favicon, blog cover images via external URL) — no processing |

SVG icons in `src/assets/icons/` are imported with `?raw` query and injected as inline HTML via `set:html` for CSS styling without additional HTTP requests.

## Architectural Constraints

- **No server runtime:** `output` defaults to `'static'`. No SSR, no API routes beyond the sitemap endpoint.
- **Global state:** None. No Nanostores, no React context, no shared mutable state. All data is either build-time props or URL-derived.
- **Client JS:** Minimal vanilla JS only — scroll-shrink nav, mobile menu toggle, FAQ accordion, category filter, copy-link button. No framework JS shipped to the browser.
- **CSS encapsulation:** Global tokens and base styles in `src/styles/global.css` (imported once). Component-specific styles in scoped `<style>` blocks. No CSS Modules, no Tailwind.
- **Single source of truth for data:** `src/data/credenciais.ts` — never duplicate factual numbers elsewhere.
- **Button variants:** Exactly three canonical button classes (`.btn`, `.btn-ghost`, `.link-arrow`) defined in `global.css`. No scoped button variants.

## Anti-Patterns

### Inlining factual numbers in components

**What happens:** Writing `18 anos` or `500 líderes` directly in `.astro` files instead of importing from `credenciais.ts`.
**Why it's wrong:** Creates multiple sources of truth; updating a number requires finding all occurrences.
**Do this instead:** `import { credenciais } from '../data/credenciais';` and reference `credenciais.anosAtuacao`.

### Creating scoped button variants

**What happens:** Adding a new button style inside a component's `<style>` block (e.g., `.my-btn { background: var(--bronze); }`).
**Why it's wrong:** Duplicates the canonical system; the three variants in `global.css` cover all use cases.
**Do this instead:** Use `.btn`, `.btn-ghost`, or `.link-arrow` from `global.css`.

### Placing processed images in `public/`

**What happens:** Dropping a `.jpg` photo into `public/images/photos/` and referencing it in an `<img>` tag.
**Why it's wrong:** Bypasses Astro's image optimization pipeline; no WebP/AVIF output, no `width`/`height` CLS protection.
**Do this instead:** Place the photo in `src/assets/photos/`, import it, and use `<Image>` from `astro:assets`.

---

*Architecture analysis: 2026-05-12*

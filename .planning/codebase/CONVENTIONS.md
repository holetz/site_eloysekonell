# Coding Conventions
> Last mapped: 2026-05-12

## Component Authoring Pattern (`.astro` files)

Every `.astro` file follows the same three-zone structure:

```
---
// 1. FRONTMATTER — imports, Props interface, logic
---
<!-- 2. TEMPLATE — HTML/JSX markup -->
<style>
  /* 3. SCOPED STYLES — component-specific CSS only */
</style>
<script>
  // 4. CLIENT SCRIPT — interactive behaviour (when needed)
</script>
```

**Ordering rules inside the frontmatter:**
1. Framework/internal imports (`astro:assets`, `astro:content`)
2. Layout/component imports (relative `../`)
3. Data imports (`../../data/credenciais`)
4. `export interface Props { ... }` declaration
5. `const { ... } = Astro.props;` destructure
6. Computed values and JSON-LD schema objects

**Example:** `src/components/BreadcrumbList.astro`, `src/components/ServiceCard.astro`

---

## TypeScript Usage

**Config:** `tsconfig.json` extends `astro/tsconfigs/strictest`. TypeScript strict mode is on.

**Path alias:** `@/*` maps to `src/*` (defined in `tsconfig.json`). Usage in imports:
```ts
import { credenciais } from '@/data/credenciais';
// or relative:
import { credenciais } from '../../data/credenciais';
```

**Props interfaces:** Always declared as named exports directly in the component frontmatter using `export interface Props { ... }`. No external `types.d.ts` file for props.

```ts
// Correct pattern (src/components/ServiceCard.astro)
export interface Props {
  title: string;
  deck: string;
  href: string;
  iconHtml?: string;
  bullets?: string[];
}
```

**Optional props** use `?` suffix. Default values are applied in the destructure:
```ts
const { title, align = 'left', image } = Astro.props;
```

**Content collection types** use `import type { CollectionEntry } from 'astro:content'` and pass the full entry as a prop when the component renders collection data (see `src/components/CaseCard.astro`).

**Astro image types:** `import type { ImageMetadata } from 'astro'` for typed image props (see `src/components/PageHero.astro`).

**Type assertions in scripts:** Use `as HTMLButtonElement | null` or non-null assertion when querying the DOM inside `<script>` blocks (see `src/components/Nav.astro`).

**`any` usage:** Accepted in `BlogLayout.astro` for `getCollection` results where type inference is complex (known exception, not a pattern to extend).

**`as const` assertion:** Used on the `credenciais` export in `src/data/credenciais.ts` to freeze the data object as a readonly literal type.

---

## CSS / Styling Approach

### Global vs Scoped

- **Global styles only in `src/styles/global.css`** — all reset, typography, layout primitives (`.wrap`, `section`), utility classes, and section-level styles for home page components.
- **Scoped `<style>` blocks** — component-level styles written inside each `.astro` file. Used for card internals, hero variants, page-specific layouts.
- **No CSS modules, no Tailwind.** Plain CSS only.

### Token Usage

Always reference design tokens over literal values. All tokens are defined in `:root` in `src/styles/global.css`.

```css
/* Correct */
padding: var(--space-4) var(--space-8);
border: var(--border-line);
box-shadow: var(--shadow-md);

/* Wrong */
padding: 16px 40px;
```

Token categories available:
- Color: `--sand`, `--taupe`, `--olive`, `--olive-deep`, `--bronze`, `--bronze-soft`, `--line`
- Spacing: `--space-1` through `--space-13` (4px base scale)
- Typography: `--fs-h1` through `--fs-eyebrow`, `--serif`, `--sans`
- Shadow: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Border: `--border-line`, `--border-accent`
- Radius: `--radius-sm`, `--radius-md`
- Filter: `--filter-photo-warm`, `--filter-photo-neutral`, `--filter-logo-mute`
- Z-index: `--z-base`, `--z-sticky`, `--z-header`, `--z-modal`

### CSS Naming

**Global utilities** (`.wrap`, `.eyebrow`, `.reveal`, `.btn`, `.btn-ghost`, `.link-arrow`): flat, single-word or hyphenated names. Defined only in `global.css`.

**Component-scoped classes**: BEM-style with the component name as block. Elements use `__`, modifiers use `--`.
```css
/* Block */    .service-card { ... }
/* Element */  .service-card__title { ... }
/* Modifier */ .page-hero--has-image { ... }
/* Modifier */ .btn-ghost--light { ... }
```

**Section/page-specific classes** inside `.astro` scoped styles use descriptive hyphenated names tied to the page context (`.servico-section`, `.etapa-num`, `.cta-block__headline`).

### Button System

Exactly three canonical button variants — all defined in `global.css`, never re-created scoped:

| Class | Use |
|-------|-----|
| `.btn` | Primary CTA (bronze fill) |
| `.btn-ghost` | Secondary (outline, transparent) |
| `.btn-ghost--light` | Secondary on dark background (sand border/text) |
| `.link-arrow` | Inline text CTA with arrow |

`.btn` and `.btn-ghost` share the same box model: `padding: var(--space-4) var(--space-8)`.

### Responsive Breakpoints

- `@media (max-width: 900px)` — hero grid collapses, nav becomes mobile drawer
- `@media (max-width: 768px)` — section padding reduces, logo shrinks
- `@media (max-width: 640px)` — component-level adjustments (etapas grid, CTA block)

### Animations

Scroll-reveal uses the `.reveal` / `.reveal.visible` pattern. JS `IntersectionObserver` in `Layout.astro` adds `.visible`. Delay variants: `.delay-1`, `.delay-2`, `.delay-3`.

Always paired with `prefers-reduced-motion` override in `global.css`:
```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.delay-1, .reveal.delay-2, .reveal.delay-3 {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## Import Conventions

**Import order inside frontmatter:**
1. Astro built-ins (`astro:assets`, `astro:content`)
2. Internal layouts and components (relative paths)
3. Project data (`../data/credenciais`)
4. Static assets (images via `../assets/`)

```ts
// Example from BlogLayout.astro
import Layout from './Layout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import BreadcrumbList from '../components/BreadcrumbList.astro';
import FaqBlock from '../components/FaqBlock.astro';
import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import authorPhotoSrc from '../assets/photos/eloyse-author-blog.jpg';
```

**`import type`** is used for type-only imports to avoid runtime cost:
```ts
import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
```

---

## Naming Conventions

**Files:**
- Components: PascalCase (`.astro`) — `ServiceCard.astro`, `PageHero.astro`
- Pages: kebab-case (`.astro`) — `sobre.astro`, `desenvolvimento-de-liderancas.astro`
- Data/config: camelCase (`.ts`) — `credenciais.ts`, `config.ts`
- Build plugins: camelCase (`.mjs`) — `remark-blog-directives.mjs`
- Content slugs: kebab-case ASCII — `tecnico-virou-gestor.md`, `datarunk.md`

**TypeScript identifiers:**
- Interfaces: PascalCase (`Props`, `ImageMetadata`)
- Constants: `SCREAMING_SNAKE_CASE` for module-level string constants (`SITE_URL`, `SITE_NAME`, `DEFAULT_TITLE`)
- Variables and functions: camelCase (`isCurrent`, `relatedPosts`, `schemaItems`)
- JSON-LD schema objects: camelCase with `Schema` suffix (`articleSchema`, `personSchema`, `serviceSchema`)

**CSS classes:** See BEM naming section above.

---

## SEO Patterns

### Layout Hierarchy

All pages are wrapped in `src/layouts/Layout.astro`, which emits:
- Full `<head>` with title, description, canonical, OG, Twitter Card meta
- Three global JSON-LD schemas: `Person` (`#eloyse`), `WebSite`, `ProfessionalService` (`#business`)
- Font `<link>` preconnects for Google Fonts

Inner layouts extend `Layout.astro` via slot composition:
- `PageLayout.astro` — internal pages, includes auto-breadcrumb via `BreadcrumbList`
- `BlogLayout.astro` — blog posts, adds `Article` JSON-LD and optional `FaqBlock`
- `CaseLayout.astro` — case studies, adds `Article` JSON-LD

### JSON-LD Pattern

Each page that adds schema injects via `<slot name="head">`:
```astro
<Fragment slot="head">
  <script type="application/ld+json" set:html={JSON.stringify(serviceSchema)} />
</Fragment>
```

Service pages use stable `@id` anchors: `${SITE_URL}/servicos/[slug]/#service`.

Person/Business references cross-link via `@id`: `{ '@id': '${SITE_URL}#eloyse' }`.

### Title Pattern

```ts
const fullTitle = title === DEFAULT_TITLE ? title : `${title} | ${SITE_NAME}`;
// Result: "Desenvolvimento de Líderes na PME | Eloyse Konell — Gestão e Consultoria"
```

### Factual Data

All numbers (years, counts) are imported from `src/data/credenciais.ts`. Never hard-coded in `.astro` or `.md` files:
```ts
import { credenciais } from '../../data/credenciais';
// Usage: {credenciais.anosAtuacao} anos de prática
```

---

## Accessibility Patterns

**Focus visible:** Global `:focus-visible` rule in `global.css` covers `a`, `button`, `[role="tab"]`, `[role="button"]`, `input`, `select`, `textarea`, `summary`. Outline: `2px solid var(--bronze)`, offset `3px`. Uses `:where()` for low specificity.

**Mouse users:** `:focus:not(:focus-visible)` removes outline for pointer interactions.

**ARIA on interactive components:**
- `Nav.astro` — hamburger button: `aria-expanded`, `aria-controls`, `aria-label` (updates on state change); nav: `aria-label="Navegação principal"`
- `AssessmentSpotlight.astro` — tab pattern: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`; panels: `role="tabpanel"`, `aria-labelledby`
- `FaqBlock.astro` — accordion: `aria-expanded`, `aria-controls` on buttons; panels: `role="region"`, `aria-labelledby`, `hidden` attribute toggled
- `BreadcrumbList.astro` — `<nav aria-label="Breadcrumb">`, `aria-current="page"` on last item; separators: `aria-hidden="true"`
- `Nav.astro` links — `aria-current="page"` set via `isCurrent()` function

**Images:**
- All `<Image>` calls include descriptive `alt` text
- Decorative icon spans use `aria-hidden="true"` (e.g., `.service-card__icon`)

**Keyboard navigation:**
- Escape key closes mobile menu and returns focus to toggle button (`Nav.astro`)
- Tab links include `tabindex="-1"` on inactive tabs (roving tabindex pattern)

**Reduced motion:** `.reveal` animations disabled with `transition: none !important` under `prefers-reduced-motion: reduce`.

---

## Content Collections Patterns

**Schema location:** `src/content/config.ts` — uses Zod via `astro:content`.

**Blog collection (`src/content/blog/*.md`):**
- Required fields: `title`, `description`, `deck`, `pubDate`, `readingTime`
- `draft: z.boolean().default(false)` — set to `true` to hide from listings
- `faq` field: `z.array(z.object({ q, a })).optional()` — triggers `FaqBlock` in `BlogLayout`
- Cover images: external URL (Unsplash) or path under `public/images/blog/`

**Cases collection (`src/content/cases/*.md`):**
- Required fields: `title`, `client`, `sector`, `problem`, `approach`, `result`, `pubDate`
- **Always create with `draft: true`** — Eloyse activates manually
- Slugs: kebab-case ASCII (e.g., `datarunk`, `grupo-top`)

**Filtering drafts in queries:**
```ts
await getCollection('blog', ({ data }) => !data.draft)
```

**Remark directives** (`remark-blog-directives.mjs`) extend Markdown with custom blocks:
- `::pullquote[text]` — styled blockquote
- `:::data-grid` — stat grid (pipe-delimited `num | label`)
- `:::inline-cta{eyebrow heading link}` — embedded CTA with WhatsApp button
- `:::faq` — FAQ accordion (alternative to frontmatter `faq` field)
- `:::exercise{title description}` — numbered exercise block

---

## Linting and Formatting

No ESLint, Prettier, or Biome config files are present. No formatter configuration detected. Code style is maintained by convention rather than automated tooling.

TypeScript strictness is enforced by `tsconfig.json` extending `astro/tsconfigs/strictest`. Type errors will surface at build time via `npm run build`.

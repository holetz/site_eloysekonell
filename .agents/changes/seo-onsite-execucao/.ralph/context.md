# Context for subagents — SEO on-site execution

**Project:** eloysekonell.com.br — Astro 4.16 SSG, GitHub Pages, output to `docs/`.
**Owner:** Eloyse Konell — consultora em Liderança de Alta Performance e Gestão Estratégica de Pessoas, Blumenau-SC.
**Working directory:** `c:\Users\eloys\Repos\site_eloysekonell`

## What this change does

Implements the full on-site SEO strategy from `SEO-STRATEGY.md` in one shot:
1. Extracts the single-page-app anchors into real indexable routes (`/sobre`, `/servicos/*`, `/cases/*`, `/metodologia`, `/faq`, `/contato`).
2. Adds deep pillar-page content (1,500+ words) to service pages, case studies, FAQ, and 4 new blog posts.
3. Completes schema markup: `Service`, `FAQPage`, `BreadcrumbList`, `knowsAbout`, `alumniOf`, `hasCredential`, `hasOfferCatalog`, `mainEntityOfPage`.
4. Migrates images to `<Image>` from `astro:assets` (WebP/AVIF, explicit dimensions for CLS).

## Key files to be aware of

- `src/layouts/Layout.astro` — base layout, emits Person + WebSite + ProfessionalService JSON-LD in `<head>`.
- `src/layouts/BlogLayout.astro` — blog post layout, emits Article JSON-LD.
- `src/content/config.ts` — Zod schema for `blog` and (new) `cases` collections.
- `src/styles/global.css` — ALL global styles live here. Component-scoped styles go inside `.astro` files.
- `src/data/credenciais.ts` — (created in task 01) single source of truth for factual data.

## Critical constraints

- **Never change** palette/fonts (CSS variables `--sand`, `--bronze`, `--olive-deep`, etc.).
- **Never change** `outDir: './docs'` in `astro.config.mjs`.
- **Never inline base64 images** — always save to `src/assets/` or `public/images/`.
- **All content in pt-BR**, slugs in kebab-case ASCII without accents.
- **JSON-LD always in `<head>`** via layout slots, never in body.
- **Commit language:** Portuguese, format `tipo: descrição curta` — no `Co-Authored-By`.
- **Preflight = `npm run build`** (no lint/test/typecheck in this project).

## Schema @id anchors (stable across all tasks)

| Entity | @id |
|---|---|
| Eloyse (Person) | `https://eloysekonell.com.br/#eloyse` |
| Consultoria (ProfessionalService) | `https://eloysekonell.com.br/#business` |
| Service `/servicos/[slug]` | `https://eloysekonell.com.br/servicos/[slug]/#service` |
| Article `/blog/[slug]` | `https://eloysekonell.com.br/blog/[slug]/` |

## For full context

Read `03-tasks-00-READBEFORE.md` (boot context, factual data, conventions).
Read `01-specification.md` for WHAT and `02-plan.md` for HOW if task file is insufficient.

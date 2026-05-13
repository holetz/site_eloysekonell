# External Integrations
> Last mapped: 2026-05-12

## CI/CD Pipeline

**Platform:** GitHub Actions
- Workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main` branch; also supports `workflow_dispatch` (manual)
- Runner: `ubuntu-latest`
- Node version in CI: `20` (via `actions/setup-node@v4` with npm cache)
- Build step: `npm ci` → `npm run build` (outputs to `./docs`)
- Deploy action: `peaceiris/actions-gh-pages@v4`
  - Publish dir: `./docs`
  - CNAME: `eloysekonell.com.br`
  - Strategy: `force_orphan: true` (replaces `gh-pages` branch on every deploy)
  - Auth: `GITHUB_TOKEN` secret (standard, no custom secret needed)

**Deploy target:** GitHub Pages
- Custom domain: `eloysekonell.com.br` (set via `CNAME` file in `public/` and workflow config)
- `CNAME` file: `public/CNAME` — must not be removed

## External Fonts

**Google Fonts** (loaded via `<link>` in `src/layouts/Layout.astro`)
- Endpoint: `https://fonts.googleapis.com`
- Preconnect to `https://fonts.gstatic.com` (with `crossorigin`)
- Families loaded:
  - `Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500`
  - `Manrope:wght@300;400;500;600;700`
- Display strategy: `display=swap`
- No self-hosted fallback — fonts depend on Google CDN availability

## Communication / Contact

**WhatsApp Business**
- Number: `+55 47 99144-3844`
- API endpoint pattern: `https://wa.me/5547991443844`
- Used as primary CTA across the site: `src/components/Cta.astro`, `src/components/AssessmentSpotlight.astro`, `src/components/Campanha.astro`, `src/layouts/BlogLayout.astro`, multiple page files
- Pre-filled message variant in `src/pages/contato.astro`: `?text=Olá%20Eloyse%2C%20gostaria%20de%20conversar%20sobre...`
- Blog share link uses `https://wa.me/?text={title}%20{url}` pattern (`src/layouts/BlogLayout.astro`)

**Email**
- Address: `consultoria@eloysekonell.com.br`
- Referenced in: `src/components/Footer.astro`, JSON-LD in `src/layouts/Layout.astro`
- No transactional email service — contact is handled via WhatsApp/email link only

## Social Media

All links are static `<a>` tags; no SDK or embed is used.

| Platform | Handle / URL | Referenced in |
|----------|-------------|---------------|
| Instagram | `https://www.instagram.com/ek_gestaoeconsultoria` | `src/layouts/Layout.astro` (JSON-LD), `src/components/Footer.astro` |
| LinkedIn (Company) | `https://www.linkedin.com/company/eloysekonell` | `src/layouts/Layout.astro` (JSON-LD), `src/components/Footer.astro` |
| LinkedIn (Personal) | `https://www.linkedin.com/in/eloysekonell` | `src/layouts/Layout.astro` (JSON-LD) |

## SEO & Structured Data

**Schema.org JSON-LD** (emitted inline in `<head>` via `src/layouts/Layout.astro`):
- `Person` — Eloyse Konell profile with credentials, sameAs links, knowsAbout
- `WebSite` — site metadata
- `ProfessionalService` — business entity with offerCatalog of 4 services

**Additional JSON-LD per layout:**
- `src/layouts/BlogLayout.astro` — emits `Article` schema per post
- `src/layouts/CaseLayout.astro` — emits `Article` schema per case
- `src/layouts/PageLayout.astro` — includes `BreadcrumbList` via `src/components/BreadcrumbList.astro`
- `src/components/FaqBlock.astro` — emits `FAQPage` schema when FAQ items are present

**Open Graph / Twitter Cards** — all managed in `src/layouts/Layout.astro`:
- OG image: `https://eloysekonell.com.br/images/og-cover.jpg` (1200×630px, in `public/images/`)
- `og:locale`: `pt_BR`
- Twitter card type: `summary_large_image`

**Sitemap**
- Custom implementation: `src/pages/sitemap.xml.ts`
- Auto-detects static routes via `import.meta.glob`
- Includes blog posts and cases from content collections (draft-filtered)
- Endpoint: `https://eloysekonell.com.br/sitemap.xml`
- `Cache-Control: public, max-age=3600`

**robots.txt** (`public/robots.txt`):
- Allows all standard crawlers
- Explicitly permits AI crawlers: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and many others
- Disallows `/_astro/` (compiled assets directory)
- Points to sitemap

**llms.txt** (`public/llms.txt`):
- AI-readable index of site content (pages, blog posts)
- Format follows emerging `llms.txt` standard for AI crawlers

## Content Sources

**Markdown / Content Collections** (no external CMS):
- Blog posts: `src/content/blog/*.md` — authored locally, validated by Zod schema in `src/content/config.ts`
- Case studies: `src/content/cases/*.md` — authored locally, `draft: true` by default
- No headless CMS, no database, no API-based content source

**Static data file:** `src/data/credenciais.ts` — single source of truth for factual numbers (years of experience, client counts, etc.)

## Hosting & CDN

**Hosting:** GitHub Pages (served from `docs/` branch via `gh-pages` orphan branch)
- No separate CDN layer configured
- Assets served directly from GitHub Pages infrastructure
- Static assets path: `/_astro/` (Vite-built, content-hashed filenames)

**Domain:** `eloysekonell.com.br` — custom domain via CNAME DNS record pointing to GitHub Pages

## Analytics & Monitoring

**Analytics:** None detected — no Google Analytics, GTM, Plausible, Fathom, PostHog, or similar scripts found in any layout or page file.

**Error tracking:** None detected — no Sentry, Bugsnag, or similar integration.

**Logs:** No server-side logging (fully static site; no runtime).

## Webhooks & Automation

**Incoming webhooks:** None — fully static site with no backend.
**Outgoing webhooks:** None.
**Forms:** No form backend — contact is handled via WhatsApp and email links only.

## Downloadable Files

**Portfolio PDF:** `public/files/portfolio_eloyse_konell.pdf`
- Source file also at: `files/portfolio_eloyse_konell.pdf` (repo root, not deployed)
- Linked in `src/components/Footer.astro`

---

*Integration audit: 2026-05-12*

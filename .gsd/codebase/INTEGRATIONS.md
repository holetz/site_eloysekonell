# External Integrations

## Deployment & Hosting

### GitHub Pages
- **Type:** Static hosting
- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push to `main` branch or manual `workflow_dispatch`
- **Action:** `peaceiris/actions-gh-pages@v4` with `force_orphan: true`
- **Domain:** `eloysekonell.com.br` (custom CNAME)
- **Auth:** `${{ secrets.GITHUB_TOKEN }}` (built-in)

## Communication Services

### WhatsApp (Primary CTA)
- **Phone:** +55 47 99144-3844
- **URL patterns:**
  - `https://api.whatsapp.com/send/?phone=5547991443844` (with pre-filled text)
  - `https://wa.me/5547991443844` (simplified)
- **Used in:** Hero, Cta, Footer, Campanha, AssessmentSpotlight, contato.astro, service pages

### Email
- **Address:** consultoria@eloysekonell.com.br
- **Used in:** Footer, contato.astro, Layout.astro (JSON-LD)

### Phone
- **Number:** (47) 99144-3844
- **Used in:** Footer (`tel:` link)

## Social Media

### Instagram
- **Handle:** @ek_gestaoeconsultoria
- **URL:** https://www.instagram.com/ek_gestaoeconsultoria
- **Used in:** Footer, contato.astro, Layout.astro (JSON-LD sameAs)

### LinkedIn (Company)
- **URL:** https://www.linkedin.com/company/eloysekonell
- **Used in:** Footer, contato.astro, Layout.astro (JSON-LD sameAs)

### LinkedIn (Personal)
- **URL:** https://www.linkedin.com/in/eloysekonell
- **Used in:** Layout.astro (JSON-LD sameAs), BlogLayout.astro (author links)

## Font & Typography CDN

### Google Fonts
- **Service:** fonts.googleapis.com / fonts.gstatic.com
- **Fonts:** Cormorant Garamond (ital, wght 300-600), Manrope (wght 300-700)
- **Loading:** `<link>` with `display=swap`, preconnect to both domains
- **Used in:** Layout.astro `<head>`

## Image CDN

### Unsplash
- **Service:** images.unsplash.com
- **Usage:** Blog post and case study cover images (referenced as external URLs in frontmatter)
- **Count:** ~18 images across blog and case content
- **Pattern:** `https://images.unsplash.com/photo-[ID]?w=[WIDTH]&q=[QUALITY]`
- **Risk:** External dependency; images fail if Unsplash CDN is unavailable

## SEO & Crawlers

### Schema.org (JSON-LD)
- **Person:** Eloyse Konell identity, credentials, knowledge areas
- **WebSite:** Site-level structured data
- **ProfessionalService:** Business entity with service catalog
- **Article:** Blog posts and case studies (via BlogLayout/CaseLayout)
- **BreadcrumbList:** Navigation breadcrumbs (via BreadcrumbList component)
- **FAQPage:** FAQ blocks in blog posts (via FaqBlock component)

### robots.txt
- Explicitly allows 15+ AI/LLM crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
- Disallows `/_astro/` (build assets)
- Points to sitemap

### llms.txt
- Structured content index for AI crawlers
- Lists all main pages, featured posts, and contact info

## Analytics & Tracking

**None.** No Google Analytics, Matomo, tracking pixels, or consent management tools are integrated.

## Third-Party APIs

**None.** The site is fully static with no server-side API calls, serverless functions, or dynamic data fetching at runtime.

## Database Systems

**None.** Content is managed entirely through Markdown files and TypeScript data modules.

## Authentication

**None.** No authentication system; the site is fully public.

## Educational/Professional References (JSON-LD only)

- **FURB** (Universidade Regional de Blumenau) — https://www.furb.br/
- **PUCRS** (Pontificia Universidade Catolica do Rio Grande do Sul) — https://www.pucrs.br/
- SLAC, IBGC, GROU — professional certification bodies (referenced in credenciais.ts)

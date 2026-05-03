# CLAUDE.md — Contexto do projeto para LLMs

> Leia este arquivo antes de qualquer tarefa neste repositório.
> Ele descreve a arquitetura, convenções e restrições do projeto.

---

## Visão geral

**Site:** eloysekonell.com.br  
**Proprietária:** Eloyse Konell  
**Propósito:** Site institucional de consultoria em Liderança de Alta Performance e Gestão Estratégica de Pessoas.  
**Tecnologia:** [Astro](https://astro.build/) (SSG) + GitHub Pages  
**Deploy:** GitHub Actions → pasta `docs/` → GitHub Pages com domínio customizado

---

## Estrutura do projeto

```
site_eloysekonell/
├── .github/workflows/deploy.yml   # CI/CD: build Astro → docs/ → GitHub Pages
├── CLAUDE.md                      # Este arquivo
├── CNAME                          # domínio raiz (não editar)
├── astro.config.mjs               # config Astro (outDir: docs, sitemap)
├── package.json
├── remark-blog-directives.mjs     # plugin remark para diretivas customizadas
├── tsconfig.json
│
├── public/                        # Arquivos copiados 1:1 para docs/
│   ├── CNAME
│   ├── robots.txt
│   ├── llms.txt                   # Índice de conteúdo para LLMs/AI crawlers
│   ├── files/
│   │   └── portfolio_eloyse_konell.pdf
│   └── images/
│       ├── logo.png               # Logo principal (nav + favicon)
│       ├── og-cover.jpg           # Imagem OG (1200×630) — criar se ausente
│       ├── photos/                # Fotos para uso via URL pública
│       ├── logos/                 # Logos dos clientes (uso público)
│       │   ├── logo_datarunk.png
│       │   ├── logo_dgsis.png
│       │   ├── logo_grupo_top.png
│       │   ├── logo_guion.png
│       │   ├── logo_mtech.png
│       │   ├── logo_nuvme.png
│       │   ├── logo_possibilitar.png
│       │   ├── logo_rosa_claro.webp
│       │   ├── logo_straas.png
│       │   └── logo_techlinker.webp
│       └── backgrounds/           # Imagens de fundo (reserva)
│
├── src/
│   ├── assets/                    # Imagens importadas via astro:assets (WebP/AVIF otimizados)
│   │   ├── photos/                # Fotos da Eloyse (hero, portrait, study)
│   │   └── logos/                 # Logos dos clientes (para <Image> em componentes)
│   ├── components/                # Componentes reutilizáveis
│   │   ├── Nav.astro              # Navegação principal (home + páginas internas)
│   │   ├── Hero.astro             # Hero da landing page
│   │   ├── About.astro            # Seção Sobre (home)
│   │   ├── Consultoria.astro      # Seção Consultoria (home)
│   │   ├── Proposito.astro        # Seção Propósito (home)
│   │   ├── Services.astro         # Seção Serviços (home)
│   │   ├── AssessmentSpotlight.astro  # Seção Assessment (home)
│   │   ├── Testimonials.astro     # Depoimentos (home)
│   │   ├── Clients.astro          # Grid de logos de clientes
│   │   ├── Cta.astro              # CTA WhatsApp
│   │   ├── Campanha.astro         # Banner de campanha (home)
│   │   ├── Footer.astro           # Rodapé
│   │   ├── BreadcrumbList.astro   # Breadcrumb + schema BreadcrumbList (NOVO)
│   │   ├── PageHero.astro         # Hero para páginas internas (NOVO)
│   │   ├── ServiceCard.astro      # Card de serviço para /servicos (NOVO)
│   │   ├── CaseCard.astro         # Card de case study para /cases (NOVO)
│   │   └── FaqBlock.astro         # Bloco FAQ com schema FAQPage (NOVO)
│   ├── content/
│   │   ├── config.ts              # Schema Zod para blog e cases
│   │   ├── blog/                  # Posts de blog em Markdown (.md)
│   │   └── cases/                 # Case studies em Markdown (.md) — draft: true por padrão
│   ├── data/
│   │   └── credenciais.ts         # Fonte única de verdade para dados factuais (anos, números)
│   ├── layouts/
│   │   ├── Layout.astro           # Layout base com SEO completo (Person + ProfessionalService JSON-LD)
│   │   ├── BlogLayout.astro       # Layout para posts de blog (Article JSON-LD + FaqBlock)
│   │   ├── PageLayout.astro       # Layout para páginas internas com breadcrumb (NOVO)
│   │   └── CaseLayout.astro       # Layout para case studies (NOVO)
│   ├── pages/
│   │   ├── index.astro            # Landing page principal (home)
│   │   ├── sobre.astro            # Página /sobre (NOVO)
│   │   ├── contato.astro          # Página /contato (NOVO)
│   │   ├── metodologia.astro      # Página /metodologia (NOVO)
│   │   ├── faq.astro              # Página /faq com schema FAQPage (NOVO)
│   │   ├── sitemap.xml.ts         # Sitemap dinâmico (auto-detect de rotas)
│   │   ├── servicos/
│   │   │   ├── index.astro        # Listagem de serviços /servicos (NOVO)
│   │   │   ├── desenvolvimento-de-liderancas.astro
│   │   │   ├── gestao-estrategica-de-pessoas.astro
│   │   │   ├── assessment.astro
│   │   │   └── mentoria-executiva.astro
│   │   ├── cases/
│   │   │   ├── index.astro        # Listagem de cases /cases (NOVO)
│   │   │   └── [slug].astro       # Rota dinâmica para cada case
│   │   └── blog/
│   │       ├── index.astro        # Listagem do blog
│   │       └── [...slug].astro    # Rota dinâmica dos posts
│   └── styles/
│       └── global.css             # Todo o CSS do site
│
└── files/                         # Arquivos para download (fonte)
    └── portfolio_eloyse_konell.pdf
```

---

## Paleta de cores (CSS variables)

| Variável          | Hex / valor                     | Uso                        |
|-------------------|---------------------------------|----------------------------|
| `--sand`          | `#F1EBE0`                       | Background principal       |
| `--sand-warm`     | `#E8DED0`                       | Cards, hover suave         |
| `--sand-deep`     | `#D9CDB8`                       | Bordas leves               |
| `--taupe`         | `#6B5D4E`                       | Texto secundário           |
| `--taupe-soft`    | `#8A7E6C`                       | Meta, labels               |
| `--olive`         | `#3F3E30`                       | Fundo nav / menu mobile    |
| `--olive-deep`    | `#2E2D22`                       | Texto principal            |
| `--bronze`        | `#A88656`                       | Acento principal (CTAs)    |
| `--bronze-soft`   | `#C2A679`                       | Hover do bronze            |
| `--line`          | `rgba(46,45,34,0.14)`           | Divisores                  |

**Fontes:**  
- Títulos: `Cormorant Garamond` (serif, Google Fonts)  
- Corpo/UI: `Manrope` (sans-serif, Google Fonts)

---

## Design Tokens

Todos os tokens estão definidos em `:root` no [src/styles/global.css](src/styles/global.css). Use-os em vez de literais sempre que possível.

### Spacing scale (4px base)
`--space-1` (4px) · `--space-2` (8px) · `--space-3` (12px) · `--space-4` (16px) · `--space-5` (20px) · `--space-6` (24px) · `--space-7` (32px) · `--space-8` (40px) · `--space-9` (56px) · `--space-10` (72px) · `--space-11` (96px) · `--space-12` (120px) · `--space-13` (160px)

### Tipografia (clamp scales + variáveis)
`--fs-h1` · `--fs-h2` · `--fs-h3` · `--fs-h4` · `--fs-body` · `--fs-eyebrow`. h1 usa `font-weight: 400` + `letter-spacing: -0.015em` para autoridade executiva.

### Shadow scale
`--shadow-sm` (cards leves) · `--shadow-md` (hover de cards) · `--shadow-lg` (mobile menu, hero mark)

### Radius scale
`--radius-sm` (4px, foco/inputs) · `--radius-md` (8px, cards e CTAs eventuais)

### Filter presets (imagens)
`--filter-photo-warm` (fotos da Eloyse) · `--filter-photo-neutral` (fotos secundárias) · `--filter-logo-mute` (logos de clientes)

### Z-index scale
`--z-base` (1) · `--z-sticky` (50) · `--z-header` (100) · `--z-modal` (200)

### Border tokens
`--border-line` (1px solid var(--line)) · `--border-accent` (2px solid var(--bronze))

---

## Sistema de botões

Existem **exatamente 3 variantes** canônicas em `global.css`. Não criar variantes scoped novas em componentes.

- `.btn` — primary (background bronze, uso para CTA principal). Ex.: WhatsApp em Hero, Cta, Campanha.
- `.btn-ghost` — secondary (outline olive-deep, transparente). Ex.: "Falar com Eloyse" em /servicos.
- `.link-arrow` — CTA textual com seta (bronze, underline). Ex.: "Ver mais →" em prose de blog.

`.btn` e `.btn-ghost` têm o **mesmo box** (padding `var(--space-4) var(--space-8)`); só mudam fill e border.

---

## Convenções de desenvolvimento

### Astro components
- Cada seção da landing page tem seu próprio componente em `src/components/`
- Props tipadas com interfaces TypeScript no frontmatter (`---`)
- Scripts interativos ficam dentro do componente, com tag `<script>`
- Estilos de escopo de componente usam `<style>` dentro do `.astro`
- Estilos globais ficam exclusivamente em `src/styles/global.css`

### Blog (Content Collections)
- Posts em `src/content/blog/*.md`
- Frontmatter obrigatório: `title`, `description`, `pubDate`, `tags`
- `draft: true` oculta o post na listagem e rota
- Cover de post pode ser URL externa (ex: Unsplash) ou caminho em `public/images/blog/`
- Slugs são derivados automaticamente do nome do arquivo
- Campo opcional `faq: [{q: ..., a: ...}]` — renderiza `<FaqBlock>` e emite schema `FAQPage`

### Cases (Content Collections)
- Cases em `src/content/cases/*.md`
- **Sempre criar com `draft: true`** — Eloyse ativa manualmente após aprovar
- Frontmatter obrigatório: `title`, `description`, `pubDate`, `client`, `sector`, `results`
- Schema definido em `src/content/config.ts`
- Slugs kebab-case ASCII (ex: `datarunk`, `nuvme`, `grupo-top`)

### Dados factuais
- Importar **sempre** de `src/data/credenciais.ts` — nunca duplicar números em `.astro` ou `.md`
- Contém: anos de atuação, empresas atendidas, líderes desenvolvidos, assessments realizados

### SEO
- `Layout.astro` gerencia todos os meta tags (OG, Twitter, canonical, JSON-LD)
- JSON-LD global: `Person` + `ProfessionalService` + `WebSite` em todas as páginas
- `BlogLayout.astro`: emite `Article` JSON-LD; renderiza `<FaqBlock>` se frontmatter tiver `faq`
- `PageLayout.astro`: inclui `<BreadcrumbList>` automático
- `CaseLayout.astro`: emite `Article` JSON-LD para cases
- Sitemap dinâmico via `src/pages/sitemap.xml.ts` (auto-detect de rotas)
- `robots.txt` em `public/robots.txt`
- `llms.txt` em `public/llms.txt` (índice para AI crawlers)

### Imagens
- **Imagens de uso interno** (componentes Astro): ficam em `src/assets/` e são importadas via `astro:assets` com `<Image>` para WebP/AVIF automático e CLS zero
- **Imagens públicas** (favicon, og-cover, portfólio PDF): ficam em `public/`
- **Cover de posts** de blog: pode ser URL externa (Unsplash) ou arquivo em `public/images/blog/`
- **Nunca** usar base64 inline no HTML/CSS
- OG cover: `public/images/og-cover.jpg` (1200×630px)

### Acessibilidade
- Foco visível global via `:focus-visible` (outline `var(--bronze)` 2px offset 3px) — não remover.
- Animações respeitam `prefers-reduced-motion: reduce`.
- Skip link presente em `Layout.astro` (#main-content).
- Mobile menu, tabs (`AssessmentSpotlight`), accordion (`FaqBlock`) e breadcrumb com ARIA correto.

---

## Seções da landing page (ordem)

1. **Nav** (`#nav`) — fixo, scroll-shrink, menu hambúrguer mobile
2. **Hero** — CTA principal, foto via CSS background
3. **Sobre** (`#sobre`) — bio, foto portrait, stats
4. **Consultoria** (`#consultoria`) — proposta de valor, foto
5. **Propósito** (`#proposito`) — 3 pilares
6. **Serviços** (`#servicos`) — 2 colunas: Liderança | Consultoria
7. **Assessment** (`#assessment`) — tabs Empresas / Individual
8. **Depoimentos** (`#depoimentos`) — 3 cards
9. **Clientes** (`.clients`) — grid de logos
10. **CTA / Contato** (`#contato`) — WhatsApp CTA
11. **Footer** — nav, contato, redes sociais, link portfólio

---

## Tarefas recorrentes comuns

### Adicionar um novo post de blog
1. Criar `src/content/blog/[slug].md` com frontmatter correto
2. Opcional: adicionar imagem OG em `public/images/blog/` ou usar URL externa
3. `npm run build` para verificar

### Adicionar FAQ a um post
1. No frontmatter do post, adicionar `faq: [{q: "Pergunta?", a: "Resposta."}, ...]`
2. O bloco `<FaqBlock>` renderiza automaticamente após o corpo do post
3. Schema `FAQPage` é emitido automaticamente no `<head>`

### Adicionar um novo case study
1. Criar `src/content/cases/[slug].md` com frontmatter completo (ver schema em `src/content/config.ts`)
2. **Sempre usar `draft: true`** — Eloyse ativa manualmente após aprovar
3. `npm run build` para verificar

### Adicionar uma nova página de serviço
1. Criar `src/pages/servicos/[slug].astro` usando `<PageLayout>` e `<PageHero>`
2. Emitir `Service` schema JSON-LD com `@id` estável: `https://eloysekonell.com.br/servicos/[slug]/#service`
3. Adicionar entrada ao `hasOfferCatalog` em `src/layouts/Layout.astro`

### Adicionar depoimento
- Editar array `testimonials` em `src/components/Testimonials.astro`

### Adicionar logo de cliente
1. Adicionar imagem em `public/images/logos/` (uso via URL pública) ou `src/assets/logos/` (uso via `<Image>`)
2. Adicionar entrada ao array `clients` em `src/components/Clients.astro`

### Alterar informações de contato
- Email/telefone: `src/components/Footer.astro`
- Link WhatsApp: `src/components/Cta.astro` e `src/components/AssessmentSpotlight.astro`

---

## Build e deploy

```bash
# Desenvolvimento local
npm run dev          # http://localhost:4321

# Build de produção (gera docs/)
npm run build

# Preview local do build
npm run preview
```

O deploy é automático via GitHub Actions ao fazer push na branch `main`.  
O workflow está em `.github/workflows/deploy.yml`.

---

## Restrições importantes

- **Não alterar** a estrutura visual do site sem aprovação explícita
- **Não remover** o CNAME (`eloysekonell.com.br`)
- **Não committar** imagens base64 inline no HTML/CSS — sempre extrair para arquivo
- **Não alterar** `astro.config.mjs` sem entender o impacto no sitemap e CNAME
- O `outDir: './docs'` é obrigatório para GitHub Pages funcionar

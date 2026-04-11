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
├── tsconfig.json
│
├── public/                        # Arquivos copiados 1:1 para docs/
│   ├── CNAME
│   ├── robots.txt
│   ├── files/
│   │   └── portfolio_eloyse_konell.pdf
│   └── images/
│       ├── logo.png               # Logo principal (nav + favicon)
│       ├── og-cover.jpg           # Imagem OG (1200×630) — criar se ausente
│       ├── photos/
│       │   ├── eloyse-hero.jpg    # Foto hero (CSS background)
│       │   ├── eloyse-portrait.jpg# Foto seção Sobre
│       │   └── eloyse-study.jpg   # Foto seção Consultoria
│       ├── logos/                 # Logos dos clientes
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
│   ├── components/                # Um componente por seção
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Consultoria.astro
│   │   ├── Proposito.astro
│   │   ├── Services.astro
│   │   ├── AssessmentSpotlight.astro
│   │   ├── Testimonials.astro
│   │   ├── Clients.astro
│   │   ├── Cta.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts              # Schema do blog (Zod)
│   │   └── blog/                  # Posts em Markdown (.md)
│   ├── layouts/
│   │   ├── Layout.astro           # Layout base com SEO completo
│   │   └── BlogLayout.astro       # Layout para posts de blog
│   ├── pages/
│   │   ├── index.astro            # Landing page principal
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
- Imagens de post ficam em `public/images/blog/`
- Slugs são derivados automaticamente do nome do arquivo

### SEO
- `Layout.astro` gerencia todos os meta tags (OG, Twitter, canonical, JSON-LD)
- JSON-LD: `Person` e `WebSite` na home; `Article` em posts de blog
- Sitemap gerado automaticamente pelo `@astrojs/sitemap`
- `robots.txt` em `public/robots.txt`

### Imagens
- **Nunca** usar base64 inline — salvar arquivo em `public/images/`
- Logos de clientes: `public/images/logos/logo_[nome].png`
- Fotos: `public/images/photos/`
- OG cover: `public/images/og-cover.jpg` (1200×630px)

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
2. Opcional: adicionar imagem OG em `public/images/blog/`
3. `npm run build` para verificar

### Adicionar depoimento
- Editar array `testimonials` em `src/components/Testimonials.astro`

### Adicionar logo de cliente
1. Adicionar imagem em `public/images/logos/`
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

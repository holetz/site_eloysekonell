---
project_name: 'site_eloysekonell'
user_name: 'Israel'
date: '2026-05-16'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality', 'workflow_rules', 'critical_rules']
status: 'complete'
rule_count: 54
optimized_for_llm: true
---

# Project Context for AI Agents

_Este arquivo contém regras críticas e padrões que agentes AI devem seguir ao implementar código neste projeto. Foco em detalhes não-óbvios que agentes poderiam deixar passar._

---

## Technology Stack & Versions

**Core:**
- Astro 4.16.18 (SSG, `outDir: ./docs` — obrigatório para GitHub Pages)
- @astrojs/sitemap 3.7.2
- remark-directive 4.0.0 + plugin local `remark-blog-directives.mjs`
- Node.js 20 (pinado no CI: `.github/workflows/deploy.yml`)

**TypeScript:**
- Sem `tsconfig.json` no projeto — usa o default que Astro provê via `astro:assets` e `astro:content`.
- Tipagem é usada apenas para props de componentes `.astro` e para o schema Zod de Content Collections.

**Sem ferramentas de qualidade configuradas:**
- Sem ESLint, Prettier, Vitest, Jest, Playwright.
- Não introduzir nenhuma dessas sem solicitação explícita.

**Build/Deploy:**
- `npm run build` → gera em `./docs/`
- Deploy automático: push em `main` → `peaceiris/actions-gh-pages@v4` → GitHub Pages
- CNAME `eloysekonell.com.br` definido em duas fontes (raiz `/CNAME` e `public/CNAME`) — não editar nem remover

## Critical Implementation Rules

### Astro Component Rules

- **Props tipadas com `interface Props`** no frontmatter (`---`) de todo componente. Não usar `any`.
- **`<style>` é scoped por padrão** dentro de `.astro` — use só para ajustes locais; todo CSS reutilizável vai em `src/styles/global.css`.
- **`<script>` em `.astro` é bundled e roda uma vez por página** (hoisted). Use `is:inline` apenas quando precisar de execução por instância ou inline literal.
- **Não importar React/Vue/Svelte** — projeto é Astro puro. Interatividade é vanilla JS via `<script>`.
- **JSON-LD** vai sempre em `<head>` via `<script type="application/ld+json" set:html={JSON.stringify(obj)} />` (padrão usado em `Layout.astro`, `BlogLayout.astro`, etc.).
- **`astro:assets` é obrigatório** para imagens de `src/assets/` — usar `<Image src={importado} alt="..." />`, nunca `<img>` direto com path local.

### Markdown / Content Collections Rules

- **Schemas Zod são a fonte da verdade** (`src/content/config.ts`). Frontmatter inválido quebra `npm run build`. Validar antes:

  **Blog** — campos obrigatórios reais: `title`, `description`, `deck`, `pubDate`, `readingTime`. Opcionais: `updatedDate`, `coverImage` (**deve ser URL completa**, não path local), `ogImage` (URL), `tags`, `draft`, `related`, `faq[]`.

  **Cases** — campos obrigatórios reais: `title`, `client`, `sector`, `problem`, `approach`, `result` (singular), `pubDate`. Opcionais: `clientUrl` (URL), `updatedDate`, `coverImage` (URL), `draft`, `tags`. **Cases sempre criados com `draft: true`.**

- **Slugs vêm do nome do arquivo** — usar kebab-case ASCII (`grupo-top.md`, não `grupo_top.md` nem `Grupo Top.md`).

### Custom Markdown Directives (`remark-blog-directives.mjs`)

Disponíveis dentro de posts/cases — sintaxe `remark-directive`:

- **`::pullquote[texto]`** — citação destacada inline.
- **`:::data-grid`** … `num | label` por linha … **`:::`** — grid de números/labels.
- **`:::inline-cta{eyebrow="..." heading="..." link="..."}`** … texto do CTA … **`:::`** — bloco CTA WhatsApp (link default já é o número da Eloyse).
- **`:::faq`** … `### Pergunta` + parágrafo de resposta … **`:::`** — accordion `<details>`.
- **`:::exercise{title="..." description="..."}`** … `01 | **Pergunta** | dica` por linha … **`:::`** — checklist de exercícios (suporta `**bold**`).

Não criar HTML inline para esses padrões — usar as diretivas para manter consistência visual.

### Layout Hierarchy & Usage

Quatro layouts especializados — **escolher o correto evita duplicar SEO/JSON-LD**:

- **`Layout.astro`** — base. Cuida de `<head>` completo (meta, OG, canonical, JSON-LD global: `Person` + `ProfessionalService` + `WebSite`). Aceita `title`, `description`, `canonical`, `ogImage`, `ogType`, `articleDate`, `noindex`. Não inclui `<Nav>` nem `<Footer>` — quem usa direto é só `index.astro` (home).
- **`PageLayout.astro`** — para páginas internas estáticas (`/sobre`, `/contato`, `/servicos/*`, `/faq`, etc.). Inclui Nav + Footer + breadcrumb opcional. Aceita slot `head` para JSON-LD extra.
- **`BlogLayout.astro`** — posts. Emite `Article` JSON-LD e renderiza `<FaqBlock>` automaticamente se o frontmatter tem `faq`.
- **`CaseLayout.astro`** — case studies. Emite `Article` JSON-LD do case.

**Regra:** páginas novas em `src/pages/**` (que não sejam home, blog post ou case) devem usar `PageLayout`, nunca `Layout` direto.

### SEO & JSON-LD Conventions

- **Schemas globais** já são emitidos por `Layout.astro` — não duplicar `Person`/`WebSite`/`ProfessionalService` em páginas filhas.
- **Schemas por página** (ex: `Service`, `FAQPage`, `BreadcrumbList`) devem usar `@id` estável e canônico: `https://eloysekonell.com.br/<rota>/#<tipo>` (ex: `/servicos/assessment/#service`).
- **Páginas de serviço novas** precisam adicionar entrada no `hasOfferCatalog` de `Layout.astro` — caso contrário o catálogo fica desatualizado.
- **Sitemap** é dinâmico via `src/pages/sitemap.xml.ts` — auto-detect; não precisa registrar rota manualmente.
- **Dados factuais** (anos, números, formação, alumni) **sempre** vêm de `src/data/credenciais.ts`. Nunca hardcodar em `.astro` ou `.md`.

### Routing & Pages

- Rotas dinâmicas: `[...slug].astro` para blog, `[slug].astro` para cases — usam `getStaticPaths()` lendo Content Collections.
- `draft: true` no frontmatter oculta o item da listagem **e** da rota dinâmica — confirmar filtro em qualquer `getStaticPaths()` novo.

### Images & Assets

- **`src/assets/`** → import + `<Image>` de `astro:assets` → WebP/AVIF auto, CLS zero. Usar para fotos da Eloyse, logos em componentes, qualquer imagem referenciada em `.astro`.
- **`public/`** → uso direto por URL pública. Usar para favicon, `og-cover.jpg`, PDFs de download, e logos referenciados em data arrays por URL string (ex: `Clients.astro`).
- **Proibido**: base64 inline no HTML/CSS — sempre extrair para arquivo.
- **OG cover**: `public/images/og-cover.jpg` (1200×630).

### Design System Enforcement

- **Tokens CSS são obrigatórios** (`var(--space-*)`, `var(--bronze)`, `var(--fs-h2)`, etc.) — não usar literais como `#A88656`, `16px`, `1.5rem` quando há token equivalente.
- **3 variantes canônicas de botão** em `global.css`: `.btn` (primary bronze), `.btn-ghost` (outline), `.link-arrow` (link textual com seta). **Não criar variante scoped nova** em componentes.
- **`.btn` e `.btn-ghost` têm o mesmo box** — só mudam fill e border. Manter essa simetria.

### Testing Rules

- **Projeto não tem suite de testes configurada** (sem Vitest, Jest, Playwright, Cypress).
- **Validação é feita por build:** `npm run build` exercita o type-check do Astro, valida frontmatter via Zod e gera o sitemap. Roda esse comando como smoke test antes de qualquer entrega.
- **Verificação visual obrigatória para mudanças de UI:** `npm run dev` e abrir `http://localhost:4321` — testar golden path + responsividade mobile (375px), tablet (768px), desktop (1280px).
- **Não introduzir framework de testes sem solicitação explícita.** Se for adicionado depois, registrar a decisão aqui.
- **Não usar emojis em commits, código ou conteúdo** salvo se explicitamente pedido.

### Code Quality & Style Rules

- **Sem linter/formatter automático** — manter consistência manual: indentação 2 espaços, aspas simples em TS/JS, aspas duplas em atributos HTML/JSX, sem ponto-e-vírgula no fim de `import` quando o arquivo já não usa.
- **Linguagem do conteúdo:** todo texto visível (UI, posts, meta tags, alt text) em **Português brasileiro** com acentuação correta. Nunca substituir `ã` por `a`, `ç` por `c`, etc.
- **Comentários em código:** evitar. Só comentar para esclarecer um *porquê* não-óbvio (workaround, restrição externa, decisão contraintuitiva). Não escrever comentário que descreve *o que* o código já mostra.
- **Naming:**
  - Componentes `.astro` → `PascalCase.astro` (ex: `ServiceCard.astro`).
  - Páginas em `src/pages/` → `kebab-case.astro` ou `[slug].astro` para dinâmicas.
  - Conteúdo (`.md`) → `kebab-case-ascii.md`.
  - Imagens → `kebab-case-ascii` com extensão original (`.png`, `.webp`, `.avif`, `.jpg`).
- **Variáveis CSS:** sempre `--kebab-case`. Tokens novos devem ser declarados em `:root` em `global.css`, não inline.
- **HTML semântico**: `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>` — não `<div>` para tudo. Cada página tem **um** `<h1>`.
- **Acessibilidade não-negociável:**
  - `:focus-visible` global está definido (`outline var(--bronze) 2px offset 3px`) — não remover.
  - Animações em `<style>` precisam respeitar `@media (prefers-reduced-motion: reduce)`.
  - `alt=""` é obrigatório em `<img>`/`<Image>`; vazio só se decorativo.
  - Skip link em `Layout.astro` (`#main-content`) — toda página deve ter `<main id="main-content">`.
  - ARIA correto em mobile menu, tabs (`AssessmentSpotlight`), accordion (`FaqBlock`), breadcrumb.

### Development Workflow Rules

- **Branch principal:** `main` — deploy automático a cada push.
- **Não há branches de feature obrigatórias** para o site da Eloyse; pequenas mudanças vão direto em `main`. Para refatorações maiores, criar branch e PR.
- **Commits:** mensagens curtas em pt-BR, no infinitivo ou no passado (ex: "ajusta CTA do hero", "adiciona case Datarunk"). Sem prefixo convencional (`feat:`, `fix:`) — repositório não usa.
- **Pre-commit/CI:**
  - Não há hooks de pre-commit. CI roda `npm ci && npm run build`. Se o build quebrar, deploy não acontece.
  - Sempre rodar `npm run build` localmente antes de commitar.
- **Antes de fazer push:**
  - Verificar que `docs/` foi atualizado (build local) e está dentro dos arquivos staged se for o caso. **Atenção:** `docs/` é output do build — em geral não deve ser commitado manualmente; o CI gera e publica via `actions-gh-pages`.
  - Confirmar que `CNAME` (raiz e `public/`) está intacto.
- **Conteúdo novo (post/case):** criar `.md` → `npm run build` → verificar visualmente em `npm run dev` → commit + push.
- **Cases ficam em `draft: true`** até Eloyse aprovar manualmente. Não publicar case sem confirmação explícita.
- **Não force-push em `main`.**

### Critical Don't-Miss Rules

**Pegadinhas reais que quebram o site ou produzem código errado:**

1. **`coverImage` no blog/case é `z.string().url()`** — só URL completa. Path local (`/images/blog/foo.jpg`) reprova o build com erro Zod. Se precisar de cover hospedado, mova para `public/` e use URL absoluta `https://eloysekonell.com.br/images/blog/foo.jpg`.

2. **Blog requer `deck` e `readingTime`** (não só `title`/`description`/`tags`). Cases requerem `problem`, `approach`, `result` (singular). Conferir `src/content/config.ts` antes de criar conteúdo novo.

3. **`outDir: ./docs` é estrutural** — GitHub Pages serve dessa pasta. Mudar isso quebra o deploy. Não mexer em `astro.config.mjs` sem entender a cascata (sitemap, CNAME, workflow).

4. **CNAME existe em dois lugares** (`/CNAME` e `public/CNAME`). Os dois precisam estar presentes e idênticos. Remover qualquer um derruba o domínio customizado.

5. **`hasOfferCatalog` em `Layout.astro` é catálogo manual** — quando criar nova página em `/servicos/*`, adicionar entrada lá ou o catálogo fica desatualizado para SEO.

6. **JSON-LD por página precisa `@id` único e canônico** — sem `@id` ou com `@id` duplicado, Google deduplica/ignora entidades. Padrão: `https://eloysekonell.com.br/<rota>/#<tipo>`.

7. **`draft: true` filtra na listagem mas precisa filtrar também no `getStaticPaths()`** — se esquecer o filtro lá, o post draft fica acessível por URL direta. Sempre `.filter(p => !p.data.draft)` ao gerar rotas.

8. **Não duplicar `Person`/`ProfessionalService`/`WebSite` JSON-LD** em páginas filhas — `Layout.astro` já emite globalmente. Duplicar polui structured data.

9. **`src/data/credenciais.ts` é fonte única** de números factuais (anos de atuação, líderes desenvolvidos, etc.). Nunca hardcodar esses valores em `.astro` ou `.md` — quando o número mudar, vai esquecer de atualizar em algum lugar.

10. **Plugin `remark-blog-directives.mjs` faz HTML-injection via `node.value`** — o conteúdo do directive **não passa por sanitização adicional** além do `escapeHtml` interno. Não permitir conteúdo de usuário externo (formulário, API) passar por essas directives sem revisão. Hoje só Eloyse/Israel escrevem posts, então é seguro — mas registrar a restrição.

11. **`public/` é copiado 1:1 sem otimização.** Imagens grandes em `public/images/` vão pesados para produção. Usar `src/assets/` + `<Image>` sempre que possível.

12. **`devToolbar.enabled: true`** em `astro.config.mjs` — toolbar do Astro fica visível em dev. Não acidentalmente expor em build (Astro já remove em produção, mas conferir se alguma mudança de config não vazar isso).

13. **WhatsApp link default** está em vários componentes (`Cta.astro`, `AssessmentSpotlight.astro`, `Campanha.astro`, e na directive `:::inline-cta`). Trocar o número significa atualizar **todos os lugares** — considerar centralizar em `credenciais.ts` se for trocar.

14. **`llms.txt` é índice manual** (`public/llms.txt`) — ao criar página/post relevante, atualizar este arquivo também. Não é gerado automaticamente.

---

## Usage Guidelines

**Para agentes AI:**
- Ler este arquivo antes de implementar qualquer código neste projeto.
- Seguir todas as regras como documentado. Em dúvida, escolher a opção mais restritiva.
- Atualizar este arquivo quando novos padrões consolidarem.
- Tratar `CLAUDE.md` como visão geral / orientação humana; tratar este arquivo como regras críticas de execução para agentes.

**Para humanos (Israel / Eloyse):**
- Manter enxuto e focado em pegadinhas. Remover regras que se tornarem óbvias com o tempo.
- Atualizar quando stack mudar (versão Astro, novo plugin remark, etc.).
- Revisar trimestralmente — remover ruído, adicionar novas pegadinhas descobertas.
- Manter alinhado com `CLAUDE.md`: se uma regra crítica entrar aqui, conferir se vale também duplicar/referenciar lá.

Last Updated: 2026-05-16

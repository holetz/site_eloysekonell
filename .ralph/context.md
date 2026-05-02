# Context — site_eloysekonell SEO on-site execution

## Architecture

Astro 4.16 SSG → `docs/` → GitHub Pages. `outDir: './docs'` é mandatório. Locale pt-BR. Single landing page sendo expandida para múltiplas rotas dedicadas: `/sobre`, `/contato`, `/servicos/*` (hub + 4 sub-páginas — 3 delas pillar pages 1.500+ palavras), `/metodologia`, `/cases/*` (collection-based), `/faq`. Posts em content collection `blog`. Nova collection `cases`. Componentes em `src/components/`, layouts em `src/layouts/`, estilos globais SOMENTE em `src/styles/global.css` (estilos de componente são scoped no `.astro`).

## Critical constraints

- **Não alterar paleta nem tipografia.** Cores em CSS vars (`--sand`, `--bronze`, `--olive-deep`); fontes Cormorant Garamond + Manrope.
- **Não committar imagens base64** — sempre arquivo. Migração de `<img>` para `<Image>` (`astro:assets`) usa `src/assets/`; assets públicos críticos (favicon, og-cover, PDF, llms.txt, robots.txt, CNAME) ficam em `public/`.
- **Sem backend / SSR / APIs server-side** — `/contato` é mailto + WhatsApp + endereço, zero JS.
- **Não alterar** `astro.config.mjs` (outDir, sitemap config) sem necessidade explícita.
- **Cases fictícios com nomes reais autorizados** — sempre `draft: true` por protocolo; Eloyse promove manualmente.
- **Posts novos do cluster** — também `draft: true` até revisão.

## Schema linkage (IDs estáveis)

- Person: `${SITE_URL}/#eloyse`
- ProfessionalService: `${SITE_URL}/#business`
- Service por sub-página: `${SITE_URL}/servicos/[slug]/#service`
- Article.author sempre referenciado por `@id`, nunca duplicar Person.

## Voz / tom

Formal-acolhedora, pt-BR, frases curtas, sem jargão MBA. Espelhar tom dos componentes existentes (Hero, About, Consultoria) e dos 8 posts já publicados. H2s em formato pergunta + parágrafo-resposta direta para citability (AI Overviews).

## Dados factuais (única fonte)

`src/data/credenciais.ts` (criado em S01): 18 anos, +15 empresas, +500 líderes, +500 assessments. Formação: Psicologia FURB · MBA Neurociência PUCRS · Pós Gestão de Pessoas FURB · PCC SLAC · Governança Familiar IBGC · Análise Comportamental Avançada GROU. Áreas (knowsAbout): 8 strings cobrindo desenvolvimento de líderes, gestão estratégica de pessoas, análise comportamental, assessment, sucessão, governança, coaching, neurociência. Localização: Blumenau-SC, Vale do Itajaí.

## Testing approach

Sem suíte automatizada (`package.json` não tem `test`/`lint`/`typecheck`). Verificação por (a) `npm run build` verde após cada task, (b) smoke visual em `npm run preview` em desktop e mobile 375px, (c) Schema Validator + Rich Results Test em rotas-chave, (d) Lighthouse local em S28 (Performance ≥85, LCP <2,5s, CLS <0,1). Cada task tem Acceptance Criteria explícito.

## Commit conventions

1 commit por task. Mensagens em português, formato `tipo: descrição curta` (ex: `feat: criar página /sobre`, `content: adicionar FAQ aos posts existentes`, `chore: sitemap auto-detect`, `perf: migrar imagens para astro:assets`). **Não incluir** `Co-Authored-By` (não foi solicitado pelo usuário). **Sem `--no-verify`** ou skip de hooks.

## Padrões não-óbvios

- **Sitemap custom** em `src/pages/sitemap.xml.ts` (não usa `@astrojs/sitemap` integration apesar do dep). S05 troca array hardcoded por `import.meta.glob` + `getCollection` para auto-detect.
- **Markdown directives** via `remark-blog-directives.mjs` (custom plugin) — `:::pullquote`, `:::data-grid`, `:::inline-cta`, `:::exercise`. S06 adiciona `:::faq` (mas o **field `faq` no frontmatter é fonte preferida** para schema FAQPage).
- **Cover images de posts** são URLs externas Unsplash (`https://images.unsplash.com/...?w=1600&q=85`) referenciadas via inline CSS bg-image no `BlogLayout.astro` — manter assim (out-of-scope migrar para `<Image>`).
- **Componentes não-deletados** após S23 (home cleanup): `About.astro`, `Consultoria.astro`, `Proposito.astro`, `Services.astro`, `AssessmentSpotlight.astro` permanecem no repo como fonte de copy para extração; podem ser removidos no futuro mas **não nesta entrega**.
- **`@id` da Person** no Article (S03) usa `${SITE_URL}/#eloyse` (com trailing slash da home), espelhando exatamente o `@id` que Layout.astro emite.
- **Cases collection** vs páginas estáticas: optamos por collection (`src/content/cases/`) com schema Zod próprio + rota dinâmica `[slug].astro` — escalável para mais cases no futuro sem code change.

## Granularidade de PRs

Decisão do usuário: orchestrator decide. Sugestão default — 1 PR por task ou agrupar tasks afins (ex: "todos pillars juntos", "8 posts FAQ em 1 PR"). Sem CI de PR-build configurado (deploy.yml dispara só em push para `main`); validação local antes do merge.

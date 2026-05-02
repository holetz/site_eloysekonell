# 02 — Plan: Execução on-site da estratégia de SEO

> **Tipo:** HOW — implementação concreta da spec aprovada em [01-specification.md](01-specification.md).
> **Estratégia de execução:** orchestrator decide granularidade de PRs e paraleliza por arquivos não-conflitantes.

---

## 1. Overview

A entrega divide-se em **4 grupos lógicos** com dependências unidirecionais:

```
A. Infrastructure (plumbing)         B. New routes (content)
   ├── data file                        ├── /sobre, /contato, /metodologia
   ├── Person schema +                  ├── /servicos/* (hub + 5 páginas)
   ├── Article schema fix               ├── /cases/* (collection + 4 páginas)
   ├── BreadcrumbList component         └── /faq
   ├── Sitemap auto-detect
   ├── FAQ infrastructure
   └── credenciais data

C. Content updates                   D. Integration & cleanup
   ├── 8 posts: FAQ + H2 rewrite        ├── home cleanup (index.astro)
   └── 4 novos posts cluster            ├── Nav + Footer (real routes)
                                        ├── hasOfferCatalog (depende /servicos)
                                        ├── llms.txt update
                                        ├── image migration (componentes restantes)
                                        ├── CLAUDE.md update
                                        └── final build + sanity
```

**Princípios:**
- Cada step é **idempotente** (rodar duas vezes não quebra nada).
- Cada step lista exatamente os arquivos que toca (para orchestrator paralelizar por arquivo).
- Steps que criam arquivos novos têm zero conflito com steps que modificam arquivos existentes.
- Páginas novas usam `<Image>` desde o nascimento (não migram depois).

---

## 2. Architecture Changes

### 2.1 Estrutura de pastas resultante

```
src/
├── assets/                            # NOVO — imagens importadas via astro:assets
│   ├── photos/eloyse-hero.jpg
│   ├── photos/eloyse-portrait.jpg
│   ├── photos/eloyse-study.jpg
│   └── logos/                         # logos de clientes migrados
├── components/
│   ├── (existentes)
│   ├── BreadcrumbList.astro           # NOVO
│   ├── PageHero.astro                 # NOVO — hero reutilizável de página interna
│   ├── ServiceCard.astro              # NOVO — usado em /servicos hub
│   ├── FaqBlock.astro                 # NOVO — bloco FAQ visual + emite schema
│   └── CaseCard.astro                 # NOVO — usado em /cases hub
├── content/
│   ├── config.ts                      # MODIFICADO — field `faq` + collection `cases`
│   ├── blog/                          # 8 existentes + 4 novos
│   └── cases/                         # NOVO — 3 .md
├── data/
│   └── credenciais.ts                 # NOVO — números factuais centralizados
├── layouts/
│   ├── Layout.astro                   # MODIFICADO — Person + ProfessionalService
│   ├── BlogLayout.astro               # MODIFICADO — Article + FAQPage
│   ├── PageLayout.astro               # NOVO — layout base para páginas estáticas internas
│   └── CaseLayout.astro               # NOVO — layout para /cases/[slug]
├── pages/
│   ├── index.astro                    # MODIFICADO — home enxuta
│   ├── sobre.astro                    # NOVO
│   ├── contato.astro                  # NOVO
│   ├── metodologia.astro              # NOVO
│   ├── faq.astro                      # NOVO
│   ├── servicos/
│   │   ├── index.astro                # NOVO — hub
│   │   ├── desenvolvimento-de-liderancas.astro
│   │   ├── gestao-estrategica-de-pessoas.astro
│   │   ├── assessment.astro
│   │   └── mentoria-executiva.astro
│   ├── cases/
│   │   ├── index.astro                # NOVO — hub
│   │   └── [slug].astro               # NOVO — rota dinâmica
│   ├── blog/                          # mantém
│   └── sitemap.xml.ts                 # MODIFICADO — auto-detect
└── styles/global.css                  # MODIFICADO — leves adições
remark-blog-directives.mjs             # MODIFICADO — directive :::faq
public/
├── llms.txt                           # MODIFICADO
└── images/                            # parcialmente migrado para src/assets
```

### 2.2 Convenções de novas páginas

- **Layout base interno**: `PageLayout.astro` envolve `<Layout>` e adiciona padding/max-width consistentes + breadcrumb opcional. Páginas estáticas (`/sobre`, `/contato`, `/metodologia`, `/faq`, `/servicos/*`) o usam.
- **Hero de página interna**: `PageHero.astro` padroniza headline + deck + breadcrumb. Recebe props.
- **JSON-LD por página**: cada página interna emite o JSON-LD próprio (`Service`, `BreadcrumbList`, `FAQPage`) via `<script type="application/ld+json">` no `<head>` (slot do Layout).
- **Imagens**: `import` direto de `src/assets/` + `<Image>` ou `<Picture>` quando viável; senão `<img>` com width/height + WebP via `<picture><source>`.

### 2.3 Schema linkage

- `Person` → `@id: ${SITE_URL}#eloyse` (já existe — mantém)
- `ProfessionalService` → `@id: ${SITE_URL}#business` (já existe — mantém)
- `Service` (4 novos) → `@id: ${SITE_URL}/servicos/[slug]/#service`
- `hasOfferCatalog.itemListElement` → array de `{ '@id': '#service' das 4 URLs }`
- `Article.author` → `{ '@id': '#eloyse' }` (deduplica `Person`)
- `Article.mainEntityOfPage` → URL canônica do post
- `BreadcrumbList` → emitido por componente reusável

---

## 3. Implementation Steps

> Cada step lista `files-to-modify` e `depends_on` em IDs. **Steps sem `depends_on` podem rodar em paralelo no batch inicial.**
> Ordens dentro do batch: `S01` é o batch 1; `S08` no batch 2 etc. — orchestrator computa via grafo.

---

### S01 — Data: credenciais centralizadas

**files-to-modify:** `src/data/credenciais.ts` (novo)

**approach:** Criar arquivo TypeScript exportando objeto único com números factuais e formação acadêmica de Eloyse: `anosAtuacao: 18`, `empresasAtendidas: 15`, `lideresDesenvolvidos: 500`, `assessmentsRealizados: 500`, e arrays `formacao` (6 entradas: graduação Psicologia FURB, MBA Neurociência PUCRS, Pós Gestão de Pessoas FURB, PCC SLAC, IBGC, GROU) e `areasConhecimento` (8 strings para `Person.knowsAbout`). Tipado com `as const` para narrowing.

**depends_on:** []

---

### S02 — Schema: Person + ProfessionalService enriquecidos

**files-to-modify:** `src/layouts/Layout.astro`

**approach:** Importar `src/data/credenciais.ts` e adicionar ao `Person` schema os campos `knowsAbout` (array de strings), `alumniOf` (FURB, PUCRS como `EducationalOrganization`) e `hasCredential` (6 entradas tipo `EducationalOccupationalCredential`). No `ProfessionalService`, adicionar `hasOfferCatalog` apontando para `OfferCatalog` com `itemListElement` referenciando os 4 services por `@id` (URLs absolutas — mesmo que páginas ainda não existam, IDs são estáveis).

**depends_on:** [S01]

---

### S03 — Schema: Article fix (mainEntityOfPage + author @id)

**files-to-modify:** `src/layouts/BlogLayout.astro`

**approach:** Substituir o objeto `author: { '@type': 'Person', name: '...', url: ... }` por `author: { '@id': \`${SITE_URL}#eloyse\` }`. Adicionar `mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }` ao Article. Mover o JSON-LD do body para o `<head>` via slot do Layout (se ainda não estiver).

**depends_on:** []

---

### S04 — Componente BreadcrumbList reutilizável

**files-to-modify:** `src/components/BreadcrumbList.astro` (novo)

**approach:** Componente que recebe array de `{ label, href }` e emite (a) HTML visível com classes utilitárias, (b) JSON-LD `BreadcrumbList` com `itemListElement`. Usado em `BlogLayout`, `CaseLayout`, e páginas profundas (`/servicos/*`, `/cases/*`). Refatorar o breadcrumb visual já existente em `BlogLayout.astro` para usar este componente (sem regredir UX).

**depends_on:** []

---

### S05 — Sitemap auto-detect

**files-to-modify:** `src/pages/sitemap.xml.ts`

**approach:** Substituir array `staticPages` hardcoded por `import.meta.glob('./**/*.astro')` filtrando arquivos com `[` no nome (rotas dinâmicas) e arquivos `_*`/utilitários. Para `cases`, usar `getCollection('cases', ({ data }) => !data.draft)` igual ao blog. Manter `lastmod` derivado de `updatedDate ?? pubDate` para entries de collection; para páginas estáticas, `lastmod` = data de build (ou `mtime` se possível).

**depends_on:** []

---

### S06 — FAQ infrastructure (directive + collection field + schema emitter)

**files-to-modify:**
- `remark-blog-directives.mjs`
- `src/content/config.ts`
- `src/components/FaqBlock.astro` (novo)
- `src/layouts/BlogLayout.astro`

**approach:** (a) Estender `remark-blog-directives.mjs` com directive `:::faq` contendo pares `### pergunta` + parágrafo de resposta. (b) Adicionar field opcional `faq: z.array(z.object({ q: z.string(), a: z.string() })).optional()` ao schema da collection `blog`. (c) Criar `FaqBlock.astro` que aceita prop `faqs` e renderiza `<details><summary>` + emite `FAQPage` JSON-LD acoplado. (d) `BlogLayout.astro` lê `faq` do frontmatter (preferido sobre directive) e renderiza `<FaqBlock>` antes da bio do autor + emite JSON-LD.

**depends_on:** []

---

### S07 — Layouts/components base de página interna

**files-to-modify:**
- `src/layouts/PageLayout.astro` (novo)
- `src/components/PageHero.astro` (novo)
- `src/styles/global.css`

**approach:** `PageLayout` envolve `<Layout>` (passa props de SEO), aplica container max-width consistente, suporta slots `breadcrumb`, `hero`, e `default` (corpo). `PageHero` padroniza `<h1>` + deck + breadcrumb visual no topo. Adicionar 30-50 linhas a `global.css` para classes `.page-section`, `.page-prose`, `.cta-block` reutilizáveis. Sem alterar paleta nem tipografia.

**depends_on:** [S04]

---

### S08 — Página /sobre/

**files-to-modify:** `src/pages/sobre.astro` (novo)

**approach:** Página com bio expandida (extraída de `About.astro` + ampliada com dados de `src/data/credenciais.ts`). Estrutura: `<PageHero>` com headline "Sobre Eloyse Konell" + deck → seção bio (3-4 parágrafos: trajetória, abordagem, formação, base em Blumenau-SC) → seção credenciais (lista das 6 formações de `credenciais.ts`) → seção números (cards: 18 anos, +15 empresas, +500 líderes, +500 assessments) → CTA para `/contato/`. Importa foto via `astro:assets`. Emite breadcrumb `Início → Sobre`. Frontmatter SEO: title "Sobre — Eloyse Konell | Consultoria em Liderança", meta description ~155 chars.

**depends_on:** [S01, S04, S07]

---

### S09 — Página /contato/

**files-to-modify:** `src/pages/contato.astro` (novo)

**approach:** Página com canais de contato (zero JS). `<PageHero>` "Contato" → bloco com 3 cards: WhatsApp (link `wa.me/...`), e-mail (`mailto:consultoria@eloysekonell.com.br`), endereço/região (Blumenau-SC, Vale do Itajaí). Inclui frase de horário comercial e tempo médio de resposta. Schema `ContactPage` opcional. Breadcrumb `Início → Contato`.

**depends_on:** [S04, S07]

---

### S10 — Página /metodologia/

**files-to-modify:** `src/pages/metodologia.astro` (novo)

**approach:** Página descrevendo abordagem (extraída de `Proposito.astro` 3 pilares + `Consultoria.astro` proposta de valor). Sem nome próprio para o método — narrativa em primeira pessoa. ~600-900 palavras. Estrutura: hero → 3 pilares (cards) → "Como aplico" (3-5 etapas) → "Por que funciona" (1-2 parágrafos com referências às bases — neurociência, comportamento) → CTA para `/contato/`. Breadcrumb `Início → Metodologia`.

**depends_on:** [S04, S07]

---

### S11 — Hub /servicos/

**files-to-modify:**
- `src/pages/servicos/index.astro` (novo)
- `src/components/ServiceCard.astro` (novo)

**approach:** Hub que lista os 4 serviços com card cada (título, deck 1 frase, link). `<ServiceCard>` recebe `{ title, deck, href, icon? }` e renderiza com hover sutil. Hub emite `CollectionPage` schema. Breadcrumb `Início → Serviços`. Copy do hub: 1 parágrafo introdutório ~80 palavras + 4 cards.

**depends_on:** [S04, S07]

---

### S12 — Pillar /servicos/desenvolvimento-de-liderancas/

**files-to-modify:** `src/pages/servicos/desenvolvimento-de-liderancas.astro` (novo)

**approach:** Pillar page 1.500-2.000 palavras. Estrutura: hero → "O que é desenvolvimento de líderes na PME" (definição) → "Sinais de que sua empresa precisa" (lista) → "Como aplico" (etapas) → "FAQ" (5 perguntas) → links para 2-3 posts do cluster (sucessao, tecnico-virou-gestor, sucessor-e-sucessao) → CTA. Emite `Service` schema (`@id: #service`, `provider: { '@id': '#business' }`, `serviceType`, `areaServed`, `description`) + `BreadcrumbList` + `FAQPage` (ou inclui FAQ no Service). Voz: confirmada (formal-acolhedora). H2s em formato pergunta para citability.

**depends_on:** [S01, S04, S07]

---

### S13 — Pillar /servicos/gestao-estrategica-de-pessoas/

**files-to-modify:** `src/pages/servicos/gestao-estrategica-de-pessoas.astro` (novo)

**approach:** Mesmo padrão do S12, tópico "gestão estratégica de pessoas (sem RH dedicado)". Links cruzados: posts `rh-futuro`, `saude-mental-estrategia`. ~1.500-2.000 palavras. `Service` schema com `serviceType: "Gestão Estratégica de Pessoas"`.

**depends_on:** [S01, S04, S07]

---

### S14 — Pillar /servicos/assessment/

**files-to-modify:** `src/pages/servicos/assessment.astro` (novo)

**approach:** Mesmo padrão, tópico "assessment de liderança (empresas + individual)". Extrai conteúdo de `AssessmentSpotlight.astro` (tabs Empresas/Individual) e expande para 1.500-2.000 palavras. Links cruzados: posts `cadeira-vazia`, `hora-de-mudar`. `Service` schema.

**depends_on:** [S01, S04, S07]

---

### S15 — Página /servicos/mentoria-executiva/

**files-to-modify:** `src/pages/servicos/mentoria-executiva.astro` (novo)

**approach:** Página de serviço ~800-1.200 palavras (não pillar, copy mais focada). Tópico mentoria 1-1 para executivos. Estrutura: hero → "Para quem" → "Como funciona" → "Resultados típicos" → FAQ (3-4 perguntas) → CTA. `Service` schema.

**depends_on:** [S01, S04, S07]

---

### S16 — Collection cases + hub /cases/

**files-to-modify:**
- `src/content/config.ts`
- `src/pages/cases/index.astro` (novo)
- `src/pages/cases/[slug].astro` (novo)
- `src/layouts/CaseLayout.astro` (novo)
- `src/components/CaseCard.astro` (novo)

**approach:** (a) Adicionar collection `cases` ao `config.ts` com schema `{ title, client, sector, problem, approach, result, metric?, pubDate, draft, coverImage? }`. (b) `[slug].astro` usa `getStaticPaths` da collection e renderiza via `CaseLayout`. (c) `CaseLayout` emite `Article` schema com `about: Organization` + breadcrumb + estrutura visual: hero (cliente, setor, métrica) → "Desafio" → "Abordagem" → "Resultado" → CTA. (d) Hub lista cases via `<CaseCard>`.

**depends_on:** [S04, S07]

---

### S17 — Case Datarunk

**files-to-modify:** `src/content/cases/datarunk.md` (novo)

**approach:** Case fictício plausível, "Jornada de liderança da Datarunk". Frontmatter completo. Body: ~600-900 palavras. **Marcar `draft: true`** para Eloyse aprovar antes de mergear (proteção contra fatos contradizerem o relacionamento real). Inclui `metric` simulada (ex: "28% redução em turnover de líderes").

**depends_on:** [S16]

---

### S18 — Case Nuvme

**files-to-modify:** `src/content/cases/nuvme.md` (novo)

**approach:** Mesmo padrão de S17, tópico "Estruturação e implementação de RH na Nuvme". `draft: true`. Métrica simulada (ex: "Time de pessoas operacional em 90 dias").

**depends_on:** [S16]

---

### S19 — Case Grupo Top

**files-to-modify:** `src/content/cases/grupo-top.md` (novo)

**approach:** Mesmo padrão, "Assessments executivos do Grupo Top para desenvolvimento da alta gestão". `draft: true`. Métrica simulada.

**depends_on:** [S16]

---

### S20 — Página /faq/

**files-to-modify:** `src/pages/faq.astro` (novo)

**approach:** Página `/faq/` com 15-20 Q&As **consolidadas** (não duplicadas dos blocos FAQ por post). Categorias: "Sobre a consultoria", "Sobre os serviços", "Sobre o processo", "Sobre investimento" (sem dar valor — ver Open Questions). Emite `FAQPage` schema com todas as perguntas. Breadcrumb `Início → FAQ`. Conteúdo redigido por Claude com base na estratégia + componentes existentes.

**depends_on:** [S04, S06, S07]

---

### S21 — 8 posts existentes: FAQ + H2 reescritos

**files-to-modify:**
- `src/content/blog/cadeira-vazia.md`
- `src/content/blog/hora-de-mudar.md`
- `src/content/blog/rh-futuro.md`
- `src/content/blog/saude-mental-estrategia.md`
- `src/content/blog/sucessao-mal-planejada.md`
- `src/content/blog/sucessor-e-sucessao.md`
- `src/content/blog/tecnico-virou-gestor.md`
- `src/content/blog/antes-da-palavra.md`

**approach:** Para cada post: (a) reescrever 2-3 H2s existentes em formato pergunta (ex: "Como saber se um líder está pronto?") com parágrafo-resposta direta de 2-3 frases logo abaixo; (b) adicionar field `faq` ao frontmatter com 3-5 pares Q&A extractables (perguntas que um líder de PME faria sobre o tema do post). Sem reescrever o post inteiro — alterações cirúrgicas. Voz mantida.

**depends_on:** [S06]

---

### S22 — 4 posts novos do cluster

**files-to-modify:**
- `src/content/blog/identificar-potencial-de-lideranca.md` (novo)
- `src/content/blog/lideranca-tecnica-vs-humana.md` (novo)
- `src/content/blog/sucessao-empresa-familiar.md` (novo)
- `src/content/blog/feedback-continuo-90-dias.md` (novo)

**approach:** 4 posts de 800-1.200 palavras cada, com frontmatter completo (`title`, `description`, `deck`, `pubDate` distribuído nos próximos 8 semanas, `tags`, `readingTime`, `coverImage` Unsplash + cover, `draft: true`, `faq` array com 3-5 Q&As). Cada post linka a pillar page do tópico relacionado (S12-S14) e 1-2 posts existentes. Voz e estrutura H2-pergunta consistentes.

**depends_on:** [S06]

---

### S23 — Home enxuta

**files-to-modify:**
- `src/pages/index.astro`
- `src/components/Cta.astro`

**approach:** (a) Em `index.astro`, remover imports e tags de `<About>`, `<Consultoria>`, `<Proposito>`, `<Services>`, `<AssessmentSpotlight>`. Manter `<Nav>`, `<Hero>`, `<Campanha>`, `<Testimonials>`, `<Clients>`, `<Cta>`, `<Footer>`. (b) Encurtar `Cta.astro` para versão home (1 frase + WhatsApp + link "Ver todos os contatos →" para `/contato/`). NÃO deletar componentes — eles permanecem no repo (podem ser reusados em outras páginas, alguns já o são para extração de copy nas pillars).

**depends_on:** [S08, S09, S10, S11, S12, S13, S14, S15, S16, S20]
*(Por que dependências amplas? a home só pode perder essas seções depois que as rotas dedicadas existirem — links externos a `#sobre` continuam funcionando até a remoção, mas o ideal é não remover antes do destino existir.)*

---

### S24 — Nav + Footer apontam para rotas reais

**files-to-modify:**
- `src/components/Nav.astro`
- `src/components/Footer.astro`

**approach:** Substituir hrefs `#sobre`, `#servicos`, `#consultoria`, `#proposito`, `#assessment`, `#contato` por `/sobre/`, `/servicos/`, `/metodologia/`, `/contato/`, etc. Footer ganha link adicional para `/cases/`, `/faq/`, `/blog/`. Mobile menu (Nav) usa as mesmas URLs. `#depoimentos` e `#clientes` permanecem como âncoras (essas seções continuam na home).

**depends_on:** [S08, S09, S10, S11, S20]

---

### S25 — `llms.txt` atualizado

**files-to-modify:** `public/llms.txt`

**approach:** Reescrever `llms.txt` listando todas as rotas indexáveis com 1 frase de descrição cada: home, `/sobre`, `/contato`, `/servicos` + 4 sub, `/metodologia`, `/cases` + 3 sub, `/faq`, `/blog` + 8 + 4 posts. Manter contato e descrição da consultoria no topo. Formato compatível com [llms.txt convention](https://llmstxt.org/).

**depends_on:** [S08, S09, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20, S22]

---

### S26 — Image migration: componentes que permanecem

**files-to-modify:**
- `src/components/Hero.astro`
- `src/components/Nav.astro`
- `src/components/Clients.astro`
- `src/layouts/BlogLayout.astro`
- `src/styles/global.css`
- `src/assets/photos/*` (novos — movidos de `public/images/photos/`)
- `src/assets/logos/*` (novos — movidos de `public/images/logos/`)

**approach:** (a) Mover `public/images/photos/eloyse-hero.jpg` etc. para `src/assets/photos/`. (b) Em componentes, importar imagens (`import hero from '../assets/photos/eloyse-hero.jpg'`) e usar `<Image src={hero} alt="..." widths={[640,1024,1600]} formats={['avif','webp']} />`. (c) `Clients.astro` mapeia logos com `<Image>`. (d) `BlogLayout.astro` cover externo (Unsplash) permanece como `<img>` ou `background-image` por agora (out-of-scope §6). (e) Atualizar `global.css` removendo `background-image: url(/images/photos/...)` que migrou. (f) Reservar dimensões para CLS < 0,1.

**depends_on:** [S23, S24]
*(Depende de home/nav cleanup pra evitar conflito de edição em arquivos compartilhados.)*

---

### S27 — CLAUDE.md atualizado

**files-to-modify:** `CLAUDE.md`

**approach:** Atualizar seção "Estrutura do projeto" com novas rotas, novos componentes, novas collections. Atualizar seção "Tarefas recorrentes comuns" com instruções sobre como adicionar um novo case (`src/content/cases/[slug].md`) e como adicionar FAQ a um post (`faq` field no frontmatter). Sem alterar restrições.

**depends_on:** [S16]

---

### S28 — Build verification + sanity

**files-to-modify:** `.agents/changes/seo-onsite-execucao/03-tasks-99-final.md` (notes)

**approach:** Rodar `npm run build`, conferir `docs/` gerado contém todas as rotas novas (`docs/sobre/index.html`, `docs/servicos/desenvolvimento-de-liderancas/index.html`, etc.). Rodar Lighthouse local (CLI ou Chrome DevTools) na home + 1 pillar + 1 post — confirmar LCP < 2,5s e CLS < 0,1. Validar 2-3 JSON-LD com [schema.org validator](https://validator.schema.org/). Conferir `/sitemap.xml` lista todas as URLs novas. Documentar achados em notes.

**depends_on:** [S25, S26, S27]

---

## 4. Testing Strategy

**O projeto não tem suíte de testes automatizados** (sem `test`, `lint`, `typecheck` em [package.json](../../../package.json)). A verificação é manual via:

1. **Build smoke**: cada step termina com `npm run build` rodando sem warnings novos. Output em `docs/` contém os arquivos esperados.
2. **Visual smoke**: `npm run preview` + spot-check de cada rota nova no navegador (desktop + mobile resize). Confere que H1, breadcrumb, e CTA estão presentes.
3. **Schema validation**: validar JSON-LD de pelo menos 1 rota de cada tipo (`/sobre/`, `/servicos/desenvolvimento-de-liderancas/`, `/cases/datarunk/`, 1 post, `/faq/`) via [schema.org validator](https://validator.schema.org/).
4. **Sitemap**: abrir `http://localhost:4321/sitemap.xml` e conferir presença das URLs novas.
5. **Lighthouse**: rodar pelo menos na home + 1 pillar + 1 post pós-S28.
6. **Links**: spot-check Nav + Footer apontando pras rotas certas (sem 404 internos).
7. **Mobile**: responsivo OK em viewport 375px.
8. **Conteúdo factual**: Eloyse revisa drafts com `draft: true` (cases, posts novos) antes de promover.

**Convenções de commit**: 1 commit por step concluído com mensagem `tipo: descrição curta` (ex: `feat: criar página /sobre`, `feat: schema BreadcrumbList em rotas profundas`, `content: adicionar FAQ aos 8 posts existentes`). Sem `Co-Authored-By` na mensagem (não foi solicitado).

---

## 5. Risks

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **`<Image>` quebra build** se imagens em `public/` são referenciadas via path string em CSS após migração | Média | Alto (build vermelho) | Migrar referências de CSS antes ou simultaneamente; manter `<img>`/CSS bg-image como fallback até confirmação |
| **CLS regride** com `<Image>` se dimensões não forem reservadas | Média | Médio | Step S26 reserva width/height explicitamente; Lighthouse em S28 confirma |
| **Cases fictícios com nomes reais** podem gerar mal-entendido com clientes | Alta | Alto | `draft: true` em todos os cases; Eloyse aprova explicitamente antes de promover; texto de aviso em `00.request.txt` |
| **Canibalização** entre `/faq/` consolidado e blocos FAQ por post | Baixa | Médio | Conteúdo do `/faq/` é diferente (perguntas mais comerciais/comparativas; perguntas dos posts são mais temáticas) |
| **Pillar pages 1.500+ palavras** com qualidade frágil (LLM-redigido sem review humano) | Alta | Alto | Eloyse revisa antes de promover; estrutura factual + sem números inventados além dos confirmados em S01 |
| **Sitemap auto-detect** pode incluir páginas indesejadas (se houver `_*.astro`) | Baixa | Baixo | Filtro explícito em S05 |
| **Schema `Service` com URLs canônicas** que ainda não existem se S02 rodar antes de S12-S15 | Média | Médio | `S02` cria os `@id` mesmo sem URL resolver; Google tolera isso. Mas o orchestrator deve idealmente rodar S12-S15 antes de validar S02 em produção. |
| **8 .md de blog editados em paralelo** causando merge conflicts se orchestrator paralelizar S21 entre vários workers | Baixa | Baixo | S21 é uma única task com múltiplos arquivos — worker serializa internamente |
| **Footer/Nav apontando pra rota não-existente** se S24 rodar antes de S08-S20 | Média | Alto | `depends_on` explícito em S24 |
| **Tempo de build ultrapassa 2× atual** com 13+ rotas novas + `<Image>` | Baixa | Baixo | Astro SSG é eficiente; spot-check em S28 |

---

## 6. Rollout

1. **Branch única**: `seo-onsite-execucao` (criada do `main`).
2. **PRs incrementais**: orchestrator (próximo passo `/craftsman-ralph`) decide granularidade. Sugestão padrão: 1 PR por step ou por batch lógico (ex: "Schema infra" = S02+S03+S04, "Páginas /servicos" = S11+S12+S13+S14+S15).
3. **Cada PR roda `npm run build` em local** antes do merge (sem CI de build separado já configurado para PR — apenas o deploy.yml em `main`).
4. **Drafts permanecem `draft: true`** até aprovação de Eloyse. PR final não promove drafts — Eloyse faz isso depois manualmente (ou via PR menor).
5. **Deploy automático** via GitHub Actions ao push em `main` → `docs/` → GitHub Pages.
6. **Pós-deploy**: submeter sitemap atualizado ao Search Console (manual — Eloyse), conferir Rich Results Test em pelo menos 3 URLs.
7. **Sem rollback automatizado** — se algo quebrar após deploy, revert do commit em `main` é a saída.

---

## 7. Resumo de paralelização (para orchestrator)

**Batch 1 (paralelo, sem deps):** S01, S03, S04, S05, S06
**Batch 2 (depende do batch 1):** S02 (S01), S07 (S04)
**Batch 3 (depende de S01+S04+S07):** S08, S09, S10, S11, S12, S13, S14, S15, S16, S20
**Batch 4 (depende de S16):** S17, S18, S19, S27
**Batch 5 (depende de S06):** S21, S22 *(podem rodar em paralelo com batch 3-4)*
**Batch 6:** S23 (home cleanup) — depende de S08, S09, S10, S11, S20
**Batch 7:** S24 (Nav+Footer) — depende de S08, S09, S10, S11, S20
**Batch 8:** S25 (llms.txt), S26 (image migration) — depende de batch 6+7
**Batch 9:** S28 (final build) — depende de S25, S26, S27

---

**Aguardando aprovação explícita** para gerar tasks (`03-tasks-NN-*.md`) + artefatos de execução (`.ralph/`).

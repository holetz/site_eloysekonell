# 01 — Specification: Execução on-site da estratégia de SEO

> **Tipo:** WHAT only — sem decisões de implementação.
> **Mudança:** transformar a `SEO-STRATEGY.md` (itens em aberto que envolvem edição do projeto) em entregas concretas no repositório Astro.
> **Locale:** todo o conteúdo em **pt-BR**.

---

## 1. Overview

A estratégia de SEO em [SEO-STRATEGY.md](../../../SEO-STRATEGY.md) está parcialmente implementada (✅): o site tem `Person`/`WebSite`/`ProfessionalService` schemas na home, `Article` schema nos posts, `llms.txt`, `robots.txt` com bots de IA explícitos, e bio da autora ao final dos posts. Os itens em aberto se concentram em três frentes:

1. **Arquitetura de URLs**: o site hoje é uma single-page com âncoras (`#sobre`, `#servicos`, `#contato`, etc.). A estratégia exige extração para rotas dedicadas (`/sobre`, `/servicos/*`, `/contato`, `/cases/*`, `/metodologia`, `/faq`) — cada rota indexável é um vetor de ranking adicional.
2. **Conteúdo profundo + GEO-ready**: cada nova rota deve carregar copy real (pillar pages incorporadas às páginas de serviço, 1.500+ palavras), bloco FAQ extractable, e estrutura H2-pergunta + parágrafo-resposta direta para citação por LLMs (ChatGPT, Perplexity, AI Overviews).
3. **Schema completion + Core Web Vitals**: completar `Service`, `FAQPage`, `BreadcrumbList`, `mainEntityOfPage`, `hasOfferCatalog`, `knowsAbout`, `alumniOf`; e migrar imagens para `<Image>` do Astro (WebP/AVIF) para LCP < 2,5s.

A entrega cobre as 3 fases (Foundation + Expansion + Scale) que envolvem edição do código/conteúdo, em **execução completa única** (sem entrega faseada). Itens manuais externos (GBP, Search Console, GA4, citations, reviews, PR) ficam fora.

---

## 2. Functional Requirements

### 2.1 Core — Arquitetura de rotas

**Novas rotas a serem criadas:**

| Rota | Tipo | Origem do conteúdo |
|---|---|---|
| `/sobre/` | página estática | bio expandida + dados factuais novos |
| `/contato/` | página estática | extraída de `Cta.astro` + endereço/WhatsApp/e-mail |
| `/servicos/` | hub estático | nova — lista os 4 serviços com teasers |
| `/servicos/desenvolvimento-de-liderancas/` | pillar page (1.500+ palavras) | extraído de `Services.astro` + `Consultoria.astro` + redação nova |
| `/servicos/gestao-estrategica-de-pessoas/` | pillar page (1.500+ palavras) | extraído de `Services.astro` + redação nova |
| `/servicos/assessment/` | pillar page (1.500+ palavras) | extraído de `AssessmentSpotlight.astro` + redação nova |
| `/servicos/mentoria-executiva/` | página de serviço (~800-1.200 palavras) | redação nova |
| `/metodologia/` | página estática | extraída de `Proposito.astro` + `Consultoria.astro` |
| `/cases/` | hub estático | listagem dos 3 cases |
| `/cases/datarunk/` | case study | ficção plausível — Jornada de liderança |
| `/cases/nuvme/` | case study | ficção plausível — Estruturação/implementação de RH |
| `/cases/grupo-top/` | case study | ficção plausível — Assessments executivos para alta gestão |
| `/faq/` | página estática | 15-20 Q&As consolidadas |

**Posts novos do cluster (4 posts em `src/content/blog/`):** Claude escolhe os 4 títulos mais alinhados com o conteúdo existente (entre os 8 listados em SEO-STRATEGY §4.2) e redige drafts de 800-1.200 palavras cada, com bloco FAQ ao final.

### 2.2 Core — Mudanças na home (`src/pages/index.astro`)

A home passa a ter o seguinte fluxo de seções (estratégia híbrida — opção (c)):

```
Nav → Hero → Campanha → Testimonials → Clients → Cta (encurtado) → Footer
```

**Removidas da home** (movidas integralmente para rotas dedicadas):
- `About.astro` → fonte de `/sobre/`
- `Consultoria.astro` → fonte de `/metodologia/` + `/servicos/*`
- `Proposito.astro` → fonte de `/metodologia/`
- `Services.astro` → fonte de `/servicos/`
- `AssessmentSpotlight.astro` → fonte de `/servicos/assessment/`

A `Cta.astro` é simplificada e mantida na home; uma versão completa vai para `/contato/`.

A `Nav.astro` e `Footer.astro` passam a linkar para **rotas reais** em vez de âncoras (`#sobre` → `/sobre/`, etc.). Âncoras antigas em links externos não retornam 404 — devem redirecionar via meta refresh ou apenas deixar de existir (ver Open Questions).

### 2.3 Core — Schema markup

**Novos blocos a serem emitidos:**

| Schema | Onde | Campos exigidos |
|---|---|---|
| `Service` (4×) | `/servicos/[sub]/*` | `name`, `serviceType`, `provider: { '@id': '#business' }`, `areaServed`, `description`, `url` |
| `ItemList` ou `OfferCatalog` no `ProfessionalService` | Layout.astro (home + global) | `hasOfferCatalog` listando os 4 `Service` por `@id` |
| `BreadcrumbList` | rotas profundas: `/blog/*`, `/servicos/*`, `/cases/*` | espelhar breadcrumb visual existente |
| `FAQPage` | `/faq/` + posts com bloco FAQ | `mainEntity` array de `Question`/`Answer` |
| `Article.mainEntityOfPage` | `BlogLayout.astro` | self URL canônica |
| `Article.author` | `BlogLayout.astro` | passa a usar `{ '@id': '#eloyse' }` em vez de duplicar `Person` |
| `CaseStudy` ou `Article` para cases | `/cases/[slug]/` | cases usam `Article` com `about` e `mentions` referenciando `Organization` cliente |

**Schema da `Person` (ampliação):**
- `knowsAbout`: array com `["Desenvolvimento de líderes", "Gestão estratégica de pessoas", "Análise comportamental", "Assessment executivo", "Sucessão em empresas familiares", "Governança corporativa", "Coaching executivo", "Neurociência e comportamento"]`
- `alumniOf`: array com `EducationalOrganization` para FURB e PUCRS
- `hasCredential`: 6 entradas (Graduação, MBA, Pós em Gestão de Pessoas, PCC® SLAC, Governança IBGC, Análise Comportamental GROU)

### 2.4 Core — FAQ extractable em posts

- Novo field opcional `faq` no Zod schema de `src/content/config.ts` (array de `{ q: string, a: string }`).
- Novo remark directive `:::faq` (custom plugin estendendo `remark-blog-directives.mjs`) que renderiza o bloco visualmente E extrai dados para schema.
- `BlogLayout.astro` lê o field `faq` (ou parseia do directive) e emite `FAQPage` JSON-LD acoplado ao Article.
- **8 posts existentes** recebem bloco FAQ (3-5 perguntas extractables cada), redigido por Claude.
- **4 posts novos do cluster** já nascem com FAQ.

### 2.5 Core — Reescrita H2-pergunta dos posts existentes

Cada um dos 8 posts existentes em `src/content/blog/` passa por uma revisão de estrutura para que **pelo menos 2-3 H2s sejam frases interrogativas** seguidas de parágrafo de resposta direta (citability para AI Overviews). Sem reescrever o post inteiro — apenas H2s + parágrafo de abertura sob cada H2.

### 2.6 Core — Imagens (Core Web Vitals)

- Migrar uso de `<img>` cru e `background-image` CSS para `<Image>` / `<Picture>` do Astro (`astro:assets`) onde viável tecnicamente.
- Converter assets em `public/images/` para WebP/AVIF (manter PNG/JPG fallback).
- Aplicar `loading="lazy"` por default, exceto hero (LCP).
- Reservar dimensões (`width`/`height`) para impedir CLS.
- Imagens de fundo CSS que **não** podem migrar para `<Image>` (ex: hero com overlay) recebem `image-set()` com WebP + fallback.

### 2.7 Core — `llms.txt` e `robots.txt`

- `public/llms.txt` atualizado com links para todas as novas rotas (`/sobre`, `/servicos`, `/cases`, `/metodologia`, `/faq`, `/contato`).
- `public/robots.txt` mantém o que já tem.

### 2.8 Core — Sitemap dinâmico

- `src/pages/sitemap.xml.ts` substitui o array hardcoded `staticPages` por **auto-detecção** das rotas via `Astro.glob('./pages/**/*.astro')` (ou equivalente), excluindo arquivos `[*]` dinâmicos (que já são tratados via collections).
- Cases (`/cases/[slug]`) idealmente saem de uma collection `cases` (ver §2.9), mas até lá podem ser hardcoded.

### 2.9 Core — Collection de cases (opcional, depende da implementação)

Para manter consistência com a abordagem de collection do blog, `/cases/[slug]` pode usar uma nova content collection `cases` em `src/content/cases/` com schema próprio (`title`, `client`, `sector`, `problem`, `approach`, `result`, `metric`, `pubDate`). Alternativa simples: 3 arquivos `.astro` diretos em `src/pages/cases/`. **A spec não obriga uma das duas** — a decisão fica para o Plan (`02-plan.md`).

### 2.10 Edge cases

| Caso | Tratamento |
|---|---|
| Usuário acessa `/#sobre` (link externo antigo) | Sem ação especial — o anchor não existe mais na home, navegador rola até o topo. **Open Question:** vale criar um redirect via JS? |
| Bot lê post sem field `faq` | Não emite `FAQPage` schema; só emite `Article`. Sem erro. |
| Imagem ausente em caso de migração | Build não pode quebrar; placeholder via Astro asset pipeline ou skip do bloco. |
| `<Image>` falha em CSS background | Manter `background-image` para casos onde refator é inviável; documentar exceções no commit. |
| Post com `draft: true` | Continua oculto da listagem, sitemap e schema (comportamento atual mantido). |
| Cases não autorizados no futuro | Schema simples permite trocar `Organization.name` para genérico sem refazer estrutura. |
| Visitante com JS desabilitado | Todo o site deve funcionar 100% (Astro SSG já garante isso). |
| LLM faz crawl do `/faq/` | Conteúdo não pode ser duplicado verbatim das FAQs por post (canibalização). FAQs do `/faq/` são consolidadas/diferentes dos blocos por post. |

---

## 3. Non-functional Requirements

### 3.1 Performance / Core Web Vitals

| Métrica | Target |
|---|---|
| LCP | < 2,5s |
| INP | < 200ms |
| CLS | < 0,1 |
| Páginas indexáveis | de ~10 hoje → 25+ após esta entrega |

### 3.2 Acessibilidade

- Manter WCAG 2.1 AA. Cores já cumprem; `<Image>` exige `alt` em todos os usos (não decorativo).
- Hierarquia de headings consistente em cada nova página (uma `<h1>`, sem pular níveis).

### 3.3 Manutenibilidade

- Conteúdo das pillar pages e cases preferencialmente em **Markdown via content collection**, para que Eloyse possa editar sem mexer em `.astro`.
- Componentes reusáveis quando 2+ páginas compartilham padrão (ex: hero de página interna, bloco FAQ, bloco CTA).
- Zero conteúdo factual hardcoded em múltiplos lugares — números (`+500 líderes`, `18 anos`) ficam em fonte única (ex: `src/data/credenciais.ts`) e são importados.

### 3.4 SEO técnico

- Cada nova rota com: `<title>` único e descritivo, `meta description` única (130-160 chars), canonical correta, OG/Twitter cards, JSON-LD apropriado.
- Internal linking: cada pillar page linka 2-3 posts do cluster e o `/contato/`. Cada post linka a pillar page do tópico. Cada serviço linka `/contato/`.
- Locale `pt-BR` em todo HTML (já configurado).

### 3.5 Build

- `npm run build` deve continuar verde, gerando `docs/`.
- Tempo de build não pode ultrapassar ~2× o atual (entrar em vigilância se passar disso).

---

## 4. Integration Points

| Sistema | Integração |
|---|---|
| GitHub Actions (`.github/workflows/deploy.yml`) | Continua deployando `docs/` automaticamente — sem alteração no workflow esperada |
| Sitemap | `src/pages/sitemap.xml.ts` precisa enxergar as novas rotas (auto-detecção) |
| Astro `astro:assets` | Adoção do `<Image>` exige `import` de imagens em vez de path string (mudança de padrão) |
| Content collections | Possível nova collection `cases`; collection `blog` ganha field `faq` |
| `llms.txt` | Update manual do conteúdo, sem geração automática |
| Google Business Profile / Search Console / GA4 | **Fora deste escopo** (manual — Eloyse) |

---

## 5. Constraints & Assumptions

### Constraints

- **Astro 4.x SSG** — sem SSR, sem APIs server-side, sem rotas dinâmicas server-side.
- **`outDir: './docs'`** — obrigatório para GitHub Pages.
- **Locale pt-BR** — todo conteúdo, slugs, schemas em português.
- **Sem alteração visual da home aprovada além da remoção das seções extraídas** (Hero, Testimonials, Clients, Cta permanecem com layout atual).
- **`<Image>` do Astro** exige assets em `src/` (não `public/`) — pode obrigar mover arquivos.
- **Não comitar imagens base64** (CLAUDE.md).
- **Sem dependência de backend** — `/contato/` sem form (apenas mailto + WhatsApp + endereço).

### Assumptions

- Casos fictícios em `/cases/datarunk/`, `/cases/nuvme/`, `/cases/grupo-top/` são aceitáveis como narrativas plausíveis a serem revisadas por Eloyse antes de mergear (ela tem direito de veto sobre fatos específicos).
- Os 3 clientes citados aparecem como `Organization` em schema com permissão presumida (já estão como logos públicos no site, então a citação textual é compatível com o uso já feito).
- Voz/tom dos drafts seguem os componentes existentes (`Hero`, `About`, `Consultoria`) e os posts já publicados — formal-acolhedora, frases curtas, sem jargão MBA.
- Pillar pages e páginas de serviço são **a mesma coisa** (`/servicos/[sub]/` é a pillar page do tópico) — economia de páginas e concentração de autoridade.
- Eloyse revisará o draft de copy de cada página antes do deploy final; o plano entrega drafts merge-ready em PRs separados (orchestrator decide granularidade).
- WhatsApp, e-mail e endereço atuais permanecem corretos (47 99144-3844 / `consultoria@eloysekonell.com.br` / Blumenau-SC).

---

## 6. Out of Scope

- ✗ Configuração de Google Business Profile, Google Search Console, Google Analytics 4 (manual — Eloyse).
- ✗ Solicitação e gestão de reviews (manual — Eloyse).
- ✗ Pesquisa anual / webinars / podcasts (Phase 4 da estratégia).
- ✗ Outreach de guest posts e PR (manual — Eloyse).
- ✗ Citations em diretórios externos (Apontador, Hotfrog, Foursquare, Yelp BR) — manual.
- ✗ Backlink building.
- ✗ Tradução para outras línguas (site permanece pt-BR).
- ✗ Refator visual / mudança de paleta / mudança de tipografia.
- ✗ Sistema de comentários no blog.
- ✗ Newsletter / RSS feed (já existe ou não? — fora do escopo independente).
- ✗ Migração para framework diferente.
- ✗ Substituição de Unsplash em cover images de posts (continua external — pode ser tratado depois).
- ✗ Schema `Review`/`AggregateRating` (depende de reviews reais — vinculado a tarefas manuais).

---

## 7. Success Criteria

A entrega é considerada **completa** quando:

1. **Build limpo**: `npm run build` gera `docs/` sem warnings novos.
2. **Rotas indexáveis**: `/sobre/`, `/contato/`, `/servicos/`, `/servicos/desenvolvimento-de-liderancas/`, `/servicos/gestao-estrategica-de-pessoas/`, `/servicos/assessment/`, `/servicos/mentoria-executiva/`, `/metodologia/`, `/cases/`, `/cases/datarunk/`, `/cases/nuvme/`, `/cases/grupo-top/`, `/faq/` retornam HTML estático válido.
3. **Sitemap atualizado**: `/sitemap.xml` lista todas as novas rotas + posts existentes + 4 posts novos.
4. **Schema válido**: cada nova rota tem JSON-LD apropriado (validado via [Schema.org Validator](https://validator.schema.org/) ou [Google Rich Results Test](https://search.google.com/test/rich-results)).
5. **Person schema enriquecido**: `knowsAbout`, `alumniOf`, `hasCredential` presentes na home.
6. **ProfessionalService schema enriquecido**: `hasOfferCatalog` linka os 4 `Service` por `@id`.
7. **Article schema corrigido**: `mainEntityOfPage` presente; autor por `@id` em todos os posts.
8. **FAQ extractable**: 8 posts existentes + 4 posts novos têm bloco FAQ; cada post emite `FAQPage` schema.
9. **H2-pergunta**: cada post existente tem ≥2 H2s em formato pergunta + parágrafo-resposta direta.
10. **`/faq/`**: 15-20 Q&As consolidadas com `FAQPage` schema.
11. **Posts novos**: 4 drafts publicados com `pubDate` real e flag `draft: false` (ou `true` para revisão — orchestrator decide).
12. **Imagens**: ≥80% dos `<img>`/`background-image` migrados para `<Image>` ou WebP/AVIF; assets críticos da home (hero, about, consultoria) com WebP servido.
13. **Home enxuta**: home não inclui mais `About`, `Consultoria`, `Proposito`, `Services`, `AssessmentSpotlight`.
14. **Nav e Footer**: linkam para rotas reais (não mais âncoras).
15. **`llms.txt`**: lista todas as rotas novas com descrição curta.
16. **Internal linking**: cada pillar page linka 2-3 posts; cada post novo linka a pillar; cada serviço linka `/contato/`.
17. **CWV não regridem**: build local + Lighthouse na home, `/sobre/`, `/blog/`, `/servicos/desenvolvimento-de-liderancas/` retorna LCP < 2,5s, CLS < 0,1.
18. **CLAUDE.md atualizado**: a seção "Estrutura do projeto" reflete as novas rotas e collections.

---

## 8. Open Questions

1. **Redirect de âncoras antigas?** Vale criar `/?redirect=/sobre` ou JS leve em `index.astro` para detectar `#sobre`/`#servicos`/`#contato` e redirecionar para a rota dedicada? Hipótese: sim, mas é low-priority (links externos antigos são poucos — se houver). **Default da spec: NÃO criar redirect.**
2. **Anonimização vs nomes em `/cases/`**: confirmado uso de nomes reais (Datarunk, Nuvme, Grupo Top) — mas dado que os cases são fictícios, é mandatório que Eloyse revise antes do deploy para que números/processos descritos não contradigam o relacionamento real com cada cliente. **Default da spec: PRs de cases entram com `draft: true` (ou flag equivalente) até aprovação explícita.**
3. **Cases como collection ou páginas estáticas?** Decisão diferida ao Plan — both work; collection é mais escalável.
4. **4 posts novos do cluster — drafts publicados ou drafts pendentes?** Sugestão: redigir os 4 com `draft: true` e Eloyse promove a `false` quando aprovar (mesmo padrão do `comunicacao-de-lider`).
5. **Onde ficam os números factuais (`+500`, `18 anos`)?** Provavelmente `src/data/credenciais.ts` — confirma na fase Plan.
6. **Migração de imagens para `src/`** (necessário para `<Image>`) vs manter em `public/` (atual). Algumas imagens são acessadas por código externo (PDF do portfólio, OG cover) — essas ficam em `public/`. Demais migram para `src/assets/` ou similar.
7. **Página `/metodologia/` precisa de nome próprio para o método?** O usuário confirmou que **não há método nomeado**. A página vai narrar a abordagem (extraída de `Proposito` + `Consultoria`) sem batismo. Deixar alinhado com Eloyse se quer dar nome no futuro.

---

**Aguardando aprovação explícita** para escrever `02-plan.md` (HOW).

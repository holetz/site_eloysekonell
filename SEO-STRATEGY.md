# SEO Strategy — eloysekonell.com.br

**Business type:** Boutique consultancy (single-expert, agency template adapted)
**Date:** 2026-05-02
**Locale:** pt-BR | Brazil, Blumenau-SC

---

## 1. Discovery Summary

| Item | State |
|---|---|
| Stack | Astro SSG → `docs/` → GitHub Pages |
| Architecture | Single-page landing + `/blog/[slug]` (7 posts) |
| Schema | `Person` + `WebSite` + `ProfessionalService` (home) + `Article` com `author`/`publisher` (posts) |
| Geo signal | Blumenau-SC declared in Person schema |
| Authority signals | Logos de clientes, depoimentos, portfólio em PDF |
| E-E-A-T gaps | Author bio adicionada aos posts; faltam case studies estruturados e credenciais detalhadas |
| AI search readiness | `llms.txt` publicado, `robots.txt` com bots de IA explícitos; falta FAQ extractable e ProfilePage schema |
| Local SEO | Sem GBP confirmado, sem `LocalBusiness` ou `ProfessionalService` schema |

**Goals (assumidos — confirmar):**
1. Tornar Eloyse a referência citada em "desenvolvimento de líderes" e "gestão estratégica de pessoas" no Sul do Brasil
2. Capturar leads qualificados (PMEs, RHs estratégicos) via orgânico
3. Ser citada em respostas de IA (ChatGPT/Perplexity/AI Overviews) para temas de liderança

---

## 2. Competitive Landscape (Brasil — pt-BR)

**Concorrentes diretos para keywords de consultoria em liderança/gestão de pessoas:**

| Concorrente | Força | Brecha que você pode explorar |
|---|---|---|
| **Crescimentum** | Conteúdo robusto, blog ativo, autoridade alta | Distante, corporativo, pouco local/SC |
| **FranklinCovey Brasil** | Marca global, metodologia | Genérico, não-local, foco em treinamento |
| **Falconi (Pessoas)** | DA muito alta, autoridade | Foco em grandes empresas, pouco PME |
| **Fundação Dom Cabral** | Autoridade acadêmica | Educação executiva, não consultoria 1-1 |
| **DOM Strategy Partners** | Thought leadership forte | Estratégia, não pessoas-específico |
| **Consultores individuais (LinkedIn)** | Presença social forte | Site fraco / sem SEO real |

**Posicionamento recomendado (ângulo defensável):**
> **"Consultoria estratégica de pessoas para PMEs do Sul — método aplicado, resultados mensuráveis, sem treinamento de prateleira."**

Vantagens: (1) nicho geográfico (Vale do Itajaí / SC / Sul), (2) PME (segmento que os grandes ignoram), (3) abordagem 1-1 personalizada, (4) Eloyse como entidade-pessoa citável.

---

## 3. Site Architecture (Recomendada)

**Mantém:** landing page como home, blog em `/blog`.

**Adicionar (em ordem de prioridade):**

```
/
├── /                              # landing atual (manter)
├── /servicos/                     # NOVO — hub de serviços
│   ├── /servicos/desenvolvimento-de-liderancas/
│   ├── /servicos/gestao-estrategica-de-pessoas/
│   ├── /servicos/assessment/      # já existe seção, virar página
│   └── /servicos/mentoria-executiva/
├── /cases/                        # NOVO — case studies (3-5 inicialmente)
│   ├── /cases/[cliente-slug]/
│   └── ...
├── /sobre/                        # NOVO — bio expandida + credenciais
├── /metodologia/                  # NOVO — diferencial / processo
├── /blog/                         # mantém (7 posts → expandir)
├── /faq/                          # NOVO — Q&A para AI Overviews
└── /contato/                      # NOVO — form + WhatsApp + endereço
```

**Por que tirar serviços/sobre dos anchors da home:**
- Anchors `#sobre`, `#servicos` não rankeiam individualmente
- Páginas dedicadas = +6-8 URLs indexáveis, cada uma rankeando para sua keyword
- Mantém a home como "vitrine" e dá profundidade SEO

---

## 4. Content Strategy

### 4.1 Auditoria do blog atual (7 posts)

Os títulos atuais (`cadeira-vazia`, `hora-de-mudar`, `rh-futuro`, `saude-mental-estrategia`, `sucessao-mal-planejada`, `sucessor-e-sucessao`, `tecnico-virou-gestor`) sugerem temas de **sucessão, transição de carreira, RH estratégico, saúde mental**. Bom posicionamento — manter.

**Recomendações imediatas:**
- ~~Adicionar `Article` schema com `author` apontando para Eloyse (Person)~~ ✅ implementado em `BlogLayout.astro`
- ~~Adicionar bloco "sobre a autora" no final de cada post~~ ✅ implementado em `BlogLayout.astro`
- Adicionar 1 FAQ por post (3-5 perguntas extractables) → AI Overviews

### 4.2 Content gaps a preencher (próximos 6 meses)

**Pillar pages (uma por serviço — 1.500-2.500 palavras):**
1. *Desenvolvimento de líderes na PME: o método aplicado*
2. *Gestão estratégica de pessoas: como fazer sem RH dedicado*
3. *Assessment de liderança: quando e como usar*

**Cluster de blog (8-10 posts próximos 6 meses):**
- "Como identificar potencial de liderança na sua equipe"
- "Sinais de que sua empresa precisa de consultoria em pessoas"
- "Liderança técnica vs liderança humana: o gap nas PMEs"
- "Plano de sucessão para empresa familiar"
- "OKRs em PME: por que falha e como acertar"
- "Cultura organizacional: medir antes de mudar"
- "Onboarding de gestores: erros que custam caro"
- "Feedback contínuo: framework para implantar em 90 dias"

**Case studies (3 iniciais — usar logos atuais):**
- 1 case com cliente do segmento tech (Datarunk/Nuvme/Straas) → liderança técnica
- 1 case com cliente do segmento serviços (Grupo Top/Possibilitar) → estruturação de gestão
- 1 case com cliente do segmento educação (Guion/MTech) → desenvolvimento de equipes

### 4.3 E-E-A-T (Experience, Expertise, Authoritativeness, Trust)

| Sinal | Ação |
|---|---|
| **Experience** | Bio com anos de atuação, projetos concretos, números |
| **Expertise** | Credenciais, formações, certificações, livros lidos/escritos |
| **Authoritativeness** | LinkedIn ativo, palestras, podcasts, menções na imprensa |
| **Trust** | Depoimentos com nome+cargo+empresa, portfólio PDF, contato real |

**Author bio para posts (template):**
> *Eloyse Konell é consultora em liderança de alta performance e gestão estratégica de pessoas. Atua há [X] anos com PMEs no Sul do Brasil, ajudando empresas como [3 clientes] a estruturar gestão de pessoas com método. Baseada em Blumenau-SC.*

---

## 5. Technical Foundation

### 5.1 Schema upgrades (prioridade alta)

**Home (`Layout.astro`) — `ProfessionalService`:** ✅ implementado, com `founder` linkado por `@id` ao `Person`, endereço, `areaServed`, `serviceType`, e-mail e telefone. `hasOfferCatalog` ainda pode ser preenchido depois que as páginas de serviço existirem.

**Por página de serviço:** `Service` schema linkado ao `ProfessionalService` (a fazer junto com a Phase 1).
**Posts de blog:** ✅ `Article` com `author` (Person) e `publisher` (Organization) já implementados em `BlogLayout.astro`. Falta `mainEntityOfPage`.
**Case studies:** `Article` + reference ao cliente como `Organization` (com permissão).
**Página de FAQ:** `FAQPage` — para PMEs/B2B brasileiras ainda traz benefício de citação em IA, embora não rich result no Google (info, não crítico).

### 5.2 GEO (Generative Engine Optimization)

- [x] Criar `/llms.txt` em `public/` listando páginas principais e descrição da consultoria
- [ ] Estruturar cada post com H2s no formato pergunta + resposta direta no parágrafo seguinte (citability)
- [x] `sameAs` no Person schema → Instagram, LinkedIn da empresa e LinkedIn pessoal
- [x] `robots.txt` com GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended e demais bots de IA listados explicitamente

### 5.3 Core Web Vitals (Astro SSG já parte com vantagem)

| Métrica | Target |
|---|---|
| LCP | < 2.5s (foco: hero image — usar `<Image>` do Astro com WebP) |
| INP | < 200ms (cuidado com scripts no Nav mobile) |
| CLS | < 0.1 (reservar dimensões para fotos hero/about/consultoria) |

### 5.4 Local SEO (Blumenau-SC)

- [ ] Criar Google Business Profile (categoria: *Consultor de gestão*) — **maior ROI imediato**
- [ ] Adicionar Eloyse a citations: Apontador, Hotfrog Brasil, Foursquare, Yelp BR
- [ ] Pedir 5-10 reviews iniciais a clientes atuais (Datarunk, Nuvme, etc.)
- [ ] Página `/sobre` com endereço/região explícitos para reforçar geo-signal

---

## 6. Implementation Roadmap

### Phase 1 — Foundation (semanas 1-4)
- [ ] Criar páginas `/servicos`, `/sobre`, `/contato` (extrair das anchors)
- [x] Implementar `ProfessionalService` schema na home
- [x] Adicionar `Article` schema completo aos 7 posts existentes (author, publisher)
- [x] Criar `/llms.txt` e ajustar `robots.txt`
- [x] Configurar Google Search Console + Google Analytics 4 *(manual — Eloyse)*
- [x] Criar/reivindicar Google Business Profile *(manual — Eloyse)*

### Phase 2 — Expansion (semanas 5-12)
- [ ] Publicar 3 pillar pages (1 por serviço, 1.500+ palavras cada)
- [ ] Publicar 4 posts de blog do cluster novo
- [ ] Lançar `/cases` com 3 case studies estruturados (com permissão dos clientes)
- [ ] Criar `/metodologia` (diferencial competitivo)
- [ ] Conseguir 5 reviews no GBP
- [ ] Internal linking: cada post novo → pillar page relevante; pillar → serviço → contato

### Phase 3 — Scale (semanas 13-24)
- [ ] +6 posts no blog (cadência mensal)
- [ ] Criar `/faq` com 15-20 Q&As (para AI Overviews)
- [ ] Outreach: 3 guest posts em Crescimentum, RHpravocê, ou portais regionais
- [ ] Conseguir 2 menções/entrevistas em mídia local (Diário, NSC, Hoje em Dia Blumenau)
- [ ] Otimizar imagens existentes para WebP/AVIF (ganho CWV)
- [ ] Adicionar `BreadcrumbList` schema em rotas profundas

### Phase 4 — Authority (meses 7-12)
- [ ] Lançar formato proprietário: "Pesquisa anual sobre liderança em PMEs do Sul" (citation magnet)
- [ ] Webinar/podcast trimestral → episódios viram conteúdo
- [ ] Atingir 30+ posts no blog, 6+ case studies, 4+ pillar pages
- [ ] PR ativo: submeter Eloyse como fonte para Estadão PME, Pequenas Empresas Grandes Negócios
- [ ] Adicionar `Person.knowsAbout` e `Person.alumniOf` quando aplicável

---

## 7. KPI Targets

| Métrica | Baseline (estimado) | 3 meses | 6 meses | 12 meses |
|---|---|---|---|---|
| Páginas indexadas | ~10 | 25 | 45 | 70+ |
| Tráfego orgânico (sessões/mês) | <100 | 400 | 1.000 | 3.000 |
| Keywords rankeando top-10 | <5 | 15 | 40 | 100 |
| GBP views/mês | 0 | 200 | 600 | 1.500 |
| Backlinks (refer. domains) | <10 | 20 | 35 | 60 |
| Conversões orgânicas/mês (WhatsApp+form) | <5 | 15 | 30 | 60 |
| Citações em IA (ChatGPT/Perplexity) | 0 | tracked | 5 menções | 15+ menções |

---

## 9. Riscos e Dependências

| Risco | Mitigação |
|---|---|
| Cliente não autorizar case study com nome | Usar "empresa do setor X com Y funcionários" |
| Volume de produção de conteúdo (1 pessoa) | Ghostwriter ou repurpose de palestras gravadas |
| Local SEO competitivo em Blumenau | Foco regional Vale do Itajaí + nicho PME |
| Dependência da pessoa Eloyse (key-person) | Investir em Eloyse-as-entity (sameAs, menções) — vira ativo |

---

**Próximos passos sugeridos:**
1. Confirmar template "boutique consultancy" (vs agency tradicional)
2. Decidir se vamos extrair as anchors da home para páginas dedicadas (Phase 1)
3. Eloyse: executar os 2 quick wins manuais (GBP + Search Console/GA4) — ver §8.2
4. Iniciar Phase 1: páginas `/servicos`, `/sobre`, `/contato` como rotas dedicadas

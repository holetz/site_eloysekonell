# Graph Report - src/ + CLAUDE.md + specs/  (2026-05-02)

## Corpus Check
- 33 files · ~24,637 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 161 nodes · 196 edges · 13 communities detected
- Extraction: 86% EXTRACTED · 13% INFERRED · 1% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Conteudo do Blog (Lideranca & Sucessao)|Conteudo do Blog (Lideranca & Sucessao)]]
- [[_COMMUNITY_Arquitetura & Convencoes do Projeto|Arquitetura & Convencoes do Projeto]]
- [[_COMMUNITY_Secoes da Landing Page|Secoes da Landing Page]]
- [[_COMMUNITY_Renderizacao do Blog (Layout, Filtros, Compartilhamento)|Renderizacao do Blog (Layout, Filtros, Compartilhamento)]]
- [[_COMMUNITY_Fluxo de CTAs WhatsApp (Assessment & Contato)|Fluxo de CTAs WhatsApp (Assessment & Contato)]]
- [[_COMMUNITY_Proposito & Servicos|Proposito & Servicos]]
- [[_COMMUNITY_Diretivas Markdown Customizadas (data-grid, exercise, etc.)|Diretivas Markdown Customizadas (data-grid, exercise, etc.)]]
- [[_COMMUNITY_Dados de Prova Social (Clientes & Depoimentos)|Dados de Prova Social (Clientes & Depoimentos)]]
- [[_COMMUNITY_Grids Visuais (Stats & Pilares)|Grids Visuais (Stats & Pilares)]]
- [[_COMMUNITY_Stylesheet Global|Stylesheet Global]]
- [[_COMMUNITY_Container CSS .wrap|Container CSS .wrap]]
- [[_COMMUNITY_CSS BlogArtigo|CSS Blog/Artigo]]
- [[_COMMUNITY_Referencia de Tipos Astro|Referencia de Tipos Astro]]

## God Nodes (most connected - your core abstractions)
1. `A Cadeira Vazia na Sala de Reuniões: O Custo Invisível de Não Preparar Seus Líderes` - 11 edges
2. `Da Intenção à Execução: O RH do Futuro Não Se Constrói com Palavras` - 11 edges
3. `Sua Empresa Tem um Sucessor. Mas Tem uma Sucessão?` - 11 edges
4. `CLAUDE.md - Project context for LLMs` - 11 edges
5. `Blog Redesign Design Spec (2026-04-29)` - 10 edges
6. `CSS Brand Color Palette (root variables)` - 9 edges
7. `Quando Chega a Hora de Mudar` - 9 edges
8. `Os Impactos da Sucessão Mal Planejada nas Organizações` - 9 edges
9. `O Melhor Técnico do Time Virou Gestor. E Tudo Desmoronou.` - 9 edges
10. `Layout Base Astro Component` - 8 edges

## Surprising Connections (you probably didn't know these)
- `remarkBlogDirectives Plugin` --shares_data_with--> `Blog Dynamic Slug Route`  [INFERRED]
  remark-blog-directives.mjs → src/pages/blog/[...slug].astro
- `SEO Meta Tags (OG, Twitter, canonical)` --semantically_similar_to--> `Sitemap XML Endpoint`  [INFERRED] [semantically similar]
  src/layouts/Layout.astro → src/pages/sitemap.xml.ts
- `Decisão: BlogLayout.astro reescrito com cabeçalho centralizado max-width 820px e corpo 720px` --semantically_similar_to--> `JSON-LD on home (Person, WebSite) + Article on blog posts`  [INFERRED] [semantically similar]
  specs/2026-04-29-blog-redesign.md → CLAUDE.md
- `Decisão: criar 4 diretivas Markdown customizadas (pullquote, data-grid, inline-cta, exercise)` --conceptually_related_to--> `Constraint: do not commit base64 inline images - extract to public/images/`  [AMBIGUOUS]
  specs/2026-04-29-blog-redesign.md → CLAUDE.md
- `Decisão: novos campos no schema (deck, coverImage, readingTime, related)` --semantically_similar_to--> `Blog Content Collections schema with required title, description, pubDate, tags`  [INFERRED] [semantically similar]
  specs/2026-04-29-blog-redesign.md → CLAUDE.md

## Hyperedges (group relationships)
- **Landing Page Section Flow** — nav_header, hero_section, about_section, consultoria_section, proposito_section, services_section, assessment_spotlight_section, testimonials_section, clients_section, cta_section, footer_section [INFERRED 0.90]
- **WhatsApp CTA Conversion Flow** — cta_whatsapp_diagnostico, campanha_whatsapp_cta, assessment_whatsapp_corporate_cta, assessment_whatsapp_individual_cta, footer_social_whatsapp [INFERRED 0.90]
- **Dark Olive Section Visual Pattern** — global_css_consultoria_styles, global_css_assessment_styles, global_css_campanha_styles, global_css_cta_styles, global_css_footer_styles [INFERRED 0.85]
- **SEO Pipeline (meta tags, sitemap, structured data)** — layout_seo_meta, layout_person_schema, layout_website_schema, sitemap_route, blog_layout_article_schema [INFERRED 0.90]
- **Blog Post Render Pipeline** — blog_slug_route, blog_layout_component, layout_base_component, content_config_blog_collection, remark_blog_directives_plugin, astro_config [EXTRACTED 1.00]
- **Custom Markdown Directives Set** — remark_pullquote_directive, remark_data_grid_directive, remark_inline_cta_directive, remark_exercise_directive [EXTRACTED 1.00]
- **Cluster temático: planejamento de sucessão de liderança** — cadeira_vazia_post, sucessao_mal_planejada_post, sucessor_e_sucessao_post, tecnico_virou_gestor_post [INFERRED 0.90]
- **Conjunto completo das 4 diretivas Markdown customizadas** — redesign_spec_pullquote_directive, redesign_spec_data_grid_directive, redesign_spec_inline_cta_directive, redesign_plan_exercise_directive [EXTRACTED 1.00]
- **Cluster temático: bem-estar do líder e transição de carreira** — saude_mental_post, hora_de_mudar_post, tecnico_virou_gestor_post [INFERRED 0.85]

## Communities

### Community 0 - "Conteudo do Blog (Lideranca & Sucessao)"
Cohesion: 0.08
Nodes (40): Assessment estratégico de líderes (mapeamento de capital humano), Custo de substituir um executivo (200% do salário anual), Sustentabilidade organizacional via continuidade da liderança, A Cadeira Vazia na Sala de Reuniões: O Custo Invisível de Não Preparar Seus Líderes, Estatística: 60% das organizações brasileiras sem plano de sucessão estruturado, Transição de carreira em líderes sêniores / C-level, Deloitte Global Human Capital Trends 2025 (73% reconhecem necessidade, 7% progridem), Identidade profissional do líder entrelaçada com o cargo (+32 more)

### Community 1 - "Arquitetura & Convencoes do Projeto"
Cohesion: 0.08
Nodes (28): Astro SSG + GitHub Pages deployment, Constraint: do not remove CNAME (eloysekonell.com.br), Color palette CSS variables (sand, taupe, olive, bronze), Blog Content Collections schema with required title, description, pubDate, tags, Convention: estilos globais exclusivamente em src/styles/global.css, JSON-LD on home (Person, WebSite) + Article on blog posts, Landing page section order (Nav, Hero, Sobre, Consultoria, Propósito, Serviços, Assessment, Depoimentos, Clientes, CTA, Footer), Constraint: do not commit base64 inline images - extract to public/images/ (+20 more)

### Community 2 - "Secoes da Landing Page"
Cohesion: 0.11
Nodes (22): About Section (Sobre), Assessment Spotlight Section, Campanha Section (Mapa de Risco), WhatsApp CTA - Mapa de Risco da Liderança, Consultoria Section, Footer Navigation Links, CSS .about Styles, CSS .assessment-spotlight Styles (+14 more)

### Community 3 - "Renderizacao do Blog (Layout, Filtros, Compartilhamento)"
Cohesion: 0.12
Nodes (21): Blog Category Filter Script, Featured Post Selection, Blog Index Page, slugifyTag Helper, Article JSON-LD Schema (BlogLayout), BlogLayout Astro Component, Copy Link Clipboard Script, Related Posts Lookup (+13 more)

### Community 4 - "Fluxo de CTAs WhatsApp (Assessment & Contato)"
Cohesion: 0.19
Nodes (15): Assessment Tabs Click Handler, Assessment View: Empresas, Assessment View: Individual, WhatsApp CTA - Assessment Corporativo, WhatsApp CTA - Assessment Individual, CTA Section (Contato), WhatsApp CTA - Agendar Diagnóstico, Footer Portfolio Download Link (+7 more)

### Community 6 - "Proposito & Servicos"
Cohesion: 0.33
Nodes (7): CSS .proposito Styles, CSS .services Styles, Hero CTA - Ver Soluções, Propósito Section, Pilar 02 - Consultoria e Estratégia de Pessoas, Pilar 01 - Liderança de Alta Performance, Services Section

### Community 7 - "Diretivas Markdown Customizadas (data-grid, exercise, etc.)"
Cohesion: 0.33
Nodes (7): Astro Build Config, Markdown Remark Plugins Pipeline, remarkBlogDirectives Plugin, :::data-grid Container Directive, :::exercise Container Directive, :::inline-cta Container Directive, ::pullquote Leaf Directive Handler

### Community 8 - "Dados de Prova Social (Clientes & Depoimentos)"
Cohesion: 0.5
Nodes (4): Clients Data Array, Clients Section, CSS .clients Styles, Testimonials Data Array

### Community 10 - "Grids Visuais (Stats & Pilares)"
Cohesion: 1.0
Nodes (2): About Stats Grid, Propósito 3 Pilares

### Community 13 - "Stylesheet Global"
Cohesion: 1.0
Nodes (1): Global Stylesheet

### Community 14 - "Container CSS .wrap"
Cohesion: 1.0
Nodes (1): CSS .wrap Container

### Community 15 - "CSS Blog/Artigo"
Cohesion: 1.0
Nodes (1): CSS Blog/Article Styles

### Community 16 - "Referencia de Tipos Astro"
Cohesion: 1.0
Nodes (1): Astro env.d.ts Types Reference

## Ambiguous Edges - Review These
- `Constraint: do not commit base64 inline images - extract to public/images/` → `Decisão: criar 4 diretivas Markdown customizadas (pullquote, data-grid, inline-cta, exercise)`  [AMBIGUOUS]
  specs/2026-04-29-blog-redesign.md · relation: conceptually_related_to

## Knowledge Gaps
- **71 isolated node(s):** `About Stats Grid`, `Footer Portfolio Download Link`, `Hero Section`, `Navigation Header`, `Nav Scroll Shrink Handler` (+66 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Grids Visuais (Stats & Pilares)`** (2 nodes): `About Stats Grid`, `Propósito 3 Pilares`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Stylesheet Global`** (1 nodes): `Global Stylesheet`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Container CSS .wrap`** (1 nodes): `CSS .wrap Container`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CSS Blog/Artigo`** (1 nodes): `CSS Blog/Article Styles`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Referencia de Tipos Astro`** (1 nodes): `Astro env.d.ts Types Reference`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Constraint: do not commit base64 inline images - extract to public/images/` and `Decisão: criar 4 diretivas Markdown customizadas (pullquote, data-grid, inline-cta, exercise)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Blog Redesign Design Spec (2026-04-29)` connect `Arquitetura & Convencoes do Projeto` to `Conteudo do Blog (Lideranca & Sucessao)`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `Migração de 7 artigos HTML para Markdown + delete de 2 posts de exemplo` connect `Conteudo do Blog (Lideranca & Sucessao)` to `Arquitetura & Convencoes do Projeto`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **What connects `About Stats Grid`, `Footer Portfolio Download Link`, `Hero Section` to the rest of the system?**
  _71 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Conteudo do Blog (Lideranca & Sucessao)` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Arquitetura & Convencoes do Projeto` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Secoes da Landing Page` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
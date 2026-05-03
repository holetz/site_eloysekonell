# Notas Finais — SEO on-site execution

**Data:** 2026-05-02  
**Change:** seo-onsite-execucao  
**Task:** 28 — Build verification + sanity  

---

## 1. Resultado do Build

**Status:** VERDE — sem warnings novos.

```
npm run build

23:47:58 [build] output: "static"
23:47:58 [build] directory: C:\Users\eloys\Repos\site_eloysekonell\docs\
23:47:59 [build] 19 page(s) built in 1.72s
23:47:59 [build] Complete!
```

---

## 2. Rotas geradas em `docs/`

```
docs/blog/cadeira-vazia/index.html
docs/blog/hora-de-mudar/index.html
docs/blog/index.html
docs/blog/rh-futuro/index.html
docs/blog/saude-mental-estrategia/index.html
docs/blog/sucessao-mal-planejada/index.html
docs/blog/sucessor-e-sucessao/index.html
docs/blog/tecnico-virou-gestor/index.html
docs/cases/index.html
docs/contato/index.html
docs/faq/index.html
docs/index.html
docs/metodologia/index.html
docs/servicos/assessment/index.html
docs/servicos/desenvolvimento-de-liderancas/index.html
docs/servicos/gestao-estrategica-de-pessoas/index.html
docs/servicos/index.html
docs/servicos/mentoria-executiva/index.html
docs/sobre/index.html
```

**Total:** 19 páginas (11 rotas estáticas + 7 posts publicados + 1 hub de blog).

**Arquivos públicos verificados:**
- `docs/CNAME` ✅ (eloysekonell.com.br)
- `docs/robots.txt` ✅
- `docs/sitemap.xml` ✅
- `docs/llms.txt` ✅

---

## 3. Auditoria de Drafts

**Cases (draft: true — não gerados):**
- `docs/cases/datarunk/` — ausente ✅
- `docs/cases/nuvme/` — ausente ✅
- `docs/cases/grupo-top/` — ausente ✅

**Posts novos do cluster (draft: true — não gerados):**
- `docs/blog/antes-da-palavra/` — ausente ✅
- `docs/blog/feedback-continuo-90-dias/` — ausente ✅
- `docs/blog/identificar-potencial-de-lideranca/` — ausente ✅
- `docs/blog/lideranca-tecnica-vs-humana/` — ausente ✅
- `docs/blog/sucessao-empresa-familiar/` — ausente ✅

Hub `/cases/` mostra placeholder correto (sem items publicados).

---

## 4. Sitemap

**Status:** Válido, XML bem-formado.

**URLs presentes:**
- `https://eloysekonell.com.br/` (priority 1.0)
- `/blog/` (priority 0.8)
- `/cases/`, `/contato/`, `/faq/`, `/metodologia/`, `/servicos/`, `/sobre/` (priority 0.7)
- `/servicos/assessment/`, `/servicos/desenvolvimento-de-liderancas/`, `/servicos/gestao-estrategica-de-pessoas/`, `/servicos/mentoria-executiva/` (priority 0.7)
- 7 posts publicados com `lastmod` corretos (priority 0.7)

**Total de URLs:** 19  
**URLs draft:** nenhuma ✅

---

## 5. Schema Markup — Validação por Página

Verificação via inspeção do HTML gerado (tipos JSON-LD encontrados):

### Home (`/`)
- `Person` ✅ — com `knowsAbout`, `alumniOf`, `hasCredential`, `sameAs`
- `WebSite` ✅
- `ProfessionalService` ✅ — com `hasOfferCatalog` (4 serviços)

### `/sobre/`
- `ProfilePage` ✅
- `Person` ✅ (via Layout base)
- `BreadcrumbList` ✅

### `/servicos/desenvolvimento-de-liderancas/`
- `Service` ✅
- `FAQPage` ✅ (com `Question`/`Answer`)
- `BreadcrumbList` ✅
- `ProfessionalService` ✅ (via Layout base)

### `/faq/`
- `FAQPage` ✅ (com `Question`/`Answer`)
- `BreadcrumbList` ✅
- `Person` + `ProfessionalService` ✅ (via Layout base)

### `/blog/cadeira-vazia/`
- `Article` ✅
- `FAQPage` ✅ (com `Question`/`Answer`)
- `BreadcrumbList` ✅
- `WebPage` ✅
- `Person` + `ProfessionalService` ✅ (via Layout base)

---

## 6. Lighthouse Scores

Verificação não executada localmente (requer Chromium/browser com DevTools).  
Build gerou assets otimizados via `astro:assets`:
- 13 imagens convertidas para WebP com cache (sem reprocessamento)
- JS mínimo: 4 chunks hoisted totalizando ~1,4 kB gzip

Expectativa baseada na stack (Astro SSG + WebP + sem JS frameworks): Performance ≥90, CLS ~0.

---

## 7. Issues Encontradas

### P0 (Bloqueantes)
Nenhuma.

### P1 (Graves, não-bloqueantes)
Nenhuma.

### P2 (Otimizações futuras)
- `antes-da-palavra` foi criado como draft em task 21 mas não estava na lista original dos 8 posts existentes. É um post novo com pubDate 2026-05-02. Eloyse pode promover junto com os demais posts do cluster quando for revisar.
- Lighthouse com browser real ainda não executado — recomendado rodar `npm run preview` + Lighthouse CLI após deploy para baseline definitivo.
- `docs/cases/` hub mostra placeholder vazio (nenhum case publicado). Assim que Eloyse aprovar os 3 cases e setar `draft: false`, as cards aparecem automaticamente.

---

## 8. Status Final

O change **seo-onsite-execucao** está completo e pronto para PR / merge em `main` / deploy via GitHub Actions.

**Resumo do change (27 tasks completadas):**
- 11 novas rotas indexáveis criadas (`/sobre`, `/contato`, `/metodologia`, `/faq`, `/servicos/*`, `/cases/`)
- 3 case studies criados (draft — aguardando aprovação da Eloyse)
- 12 posts de blog (7 publicados, 5 em draft)
- Schema markup completo: Person, WebSite, ProfessionalService, Service, FAQPage, BreadcrumbList, ProfilePage, Article
- Imagens migradas para `astro:assets` com WebP/AVIF automático
- Sitemap dinâmico, llms.txt, robots.txt atualizados
- Nav e Footer apontando para rotas reais

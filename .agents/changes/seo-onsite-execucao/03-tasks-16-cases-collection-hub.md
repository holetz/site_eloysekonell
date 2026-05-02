---
id: "16"
phase: 3
complexity: high
depends_on: ["04", "07"]
files: ["src/content/config.ts", "src/pages/cases/index.astro", "src/pages/cases/[slug].astro", "src/layouts/CaseLayout.astro", "src/components/CaseCard.astro"]
---

# Task 16 — Collection cases + hub /cases/

## Objective

Habilitar `/cases/` como rota dinâmica derivada de uma collection de Markdown. Criar layout, componente de card, hub e rota dinâmica.

## Detailed Steps

1. Marcar `status: 🔄` para id "16".

2. **Estender `src/content/config.ts`:**
   - Adicionar collection `cases`:
     ```ts
     const cases = defineCollection({
       schema: z.object({
         title: z.string(),
         client: z.string(),               // nome do cliente (ex: "Datarunk")
         clientUrl: z.string().url().optional(),
         sector: z.string(),                // ex: "Tecnologia / Dados"
         problem: z.string(),               // ~1 frase
         approach: z.string(),              // ~1 frase
         result: z.string(),                // ~1 frase
         metric: z.string().optional(),     // ex: "redução de 28% em turnover"
         pubDate: z.coerce.date(),
         updatedDate: z.coerce.date().optional(),
         coverImage: z.string().url().optional(),
         draft: z.boolean().default(false),
         tags: z.array(z.string()).default([])
       })
     });
     export const collections = { blog, cases };
     ```
   - **Manter** collection `blog` intacta.

3. **Criar `src/components/CaseCard.astro`:**
   - Props: `entry` (CollectionEntry<'cases'>) com slug e data.
   - Render: card com cliente, setor, métrica destaque, link "Ler caso →".

4. **Criar `src/layouts/CaseLayout.astro`:**
   - Recebe `frontmatter` + `slug` + `<slot />` para corpo.
   - Envolve `<Layout>` com SEO completo.
   - Header: cliente, setor, métrica, breadcrumb (`<BreadcrumbList items={[{label:'Início',href:'/'},{label:'Cases',href:'/cases/'},{label: title}]} />`).
   - Slot do body — conteúdo Markdown do case.
   - Footer do case: CTA `/contato/`.
   - **JSON-LD `Article`** com:
     - `mainEntityOfPage: canonical`
     - `author: { '@id': '${SITE_URL}/#eloyse' }`
     - `publisher: { '@id': '${SITE_URL}/#business' }`
     - `about: { '@type': 'Organization', name: client, url: clientUrl }`
     - `mentions: [client Organization]`

5. **Criar `src/pages/cases/[slug].astro`:**
   - `getStaticPaths`: `await getCollection('cases', ({ data }) => !data.draft)`.
   - Importa o conteúdo do entry e renderiza via `<CaseLayout>`.

6. **Criar `src/pages/cases/index.astro`:**
   - Hub que lista todos os cases (`getCollection('cases', ({data}) => !data.draft)`).
   - `<PageHero>` "Cases", deck "Resultados de aplicação do método em diferentes contextos."
   - Grid de `<CaseCard>`.
   - Schema `CollectionPage` com `hasPart` listando os cases.
   - Breadcrumb `[Início, Cases]`.
   - **Se a collection estiver vazia** (todos drafts), mostrar mensagem placeholder: "Cases em preparação. Em breve."

7. Rodar `npm run build`. Verde — coleção vazia (drafts) é ok; hub mostra placeholder. `/cases/[slug]` não gera páginas até S17-S19 promoverem `draft: false`.

8. Commit: `feat: collection cases + hub + layout + rota dinâmica`.

9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] Schema Zod da collection `cases` aceita os campos descritos.
- [ ] `/cases/` (hub) renderiza, mesmo com 0 cases publicados.
- [ ] `/cases/[slug]/` funciona quando há cases não-draft.
- [ ] `CaseLayout.astro` emite Article schema com `about: Organization`.
- [ ] `BreadcrumbList` schema presente em hub e em cases.
- [ ] Build verde.

## Testing

- Build verde sem cases publicados.
- Após S17-S19: criar 1 case com `draft: false` temporariamente para confirmar rota — depois reverter.
- Schema Validator.

## Notes

- Não publicar cases reais aqui (S17-S19 fazem isso, todos com `draft: true` por protocolo).
- Sitemap S05 já tolera ausência da collection (try/catch).

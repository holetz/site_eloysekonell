---
id: "27"
phase: 4
complexity: low
depends_on: ["16"]
files: ["CLAUDE.md"]
---

# Task 27 — CLAUDE.md atualizado

## Objective

Refletir nova estrutura do projeto na documentação para LLMs (CLAUDE.md).

## Detailed Steps

1. Marcar `status: 🔄` para id "27".

2. Ler [CLAUDE.md](../../../CLAUDE.md) atual.

3. **Atualizar seção "Estrutura do projeto"** com:
   - Nova estrutura `src/pages/`:
     - `index.astro` (home enxuta)
     - `sobre.astro`, `contato.astro`, `metodologia.astro`, `faq.astro`
     - `servicos/index.astro` + 4 sub-páginas
     - `cases/index.astro` + `[slug].astro`
     - `blog/...` (mantém)
     - `sitemap.xml.ts` (mantém — auto-detect)
   - Nova estrutura `src/content/`:
     - `blog/` (mantém)
     - `cases/` (NOVO)
   - Nova estrutura `src/layouts/`:
     - `Layout.astro`, `BlogLayout.astro` (existentes)
     - `PageLayout.astro`, `CaseLayout.astro` (novos)
   - Nova estrutura `src/components/`:
     - Existentes (Nav, Hero, About, Consultoria, Proposito, Services, AssessmentSpotlight, Testimonials, Clients, Cta, Footer, Campanha)
     - **Nota**: About, Consultoria, Proposito, Services, AssessmentSpotlight não são mais usados na home — viraram fontes para extração; podem ser removidos no futuro se ninguém referenciar.
     - `BreadcrumbList.astro` (NOVO)
     - `PageHero.astro` (NOVO)
     - `ServiceCard.astro` (NOVO)
     - `CaseCard.astro` (NOVO)
     - `FaqBlock.astro` (NOVO)
   - Nova `src/data/credenciais.ts` (fonte única para números factuais).
   - Nova `src/assets/` (imagens importadas via astro:assets).

4. **Atualizar seção "Tarefas recorrentes comuns"** com:
   - **Adicionar um novo case study:**
     ```
     1. Criar `src/content/cases/[slug].md` com frontmatter completo (ver schema).
     2. `draft: true` por padrão até aprovação.
     3. `npm run build` para verificar.
     ```
   - **Adicionar FAQ a um post:**
     ```
     1. No frontmatter do post, adicionar `faq: [{q: ..., a: ...}, ...]`.
     2. O bloco renderiza automaticamente após o corpo do post.
     3. Schema FAQPage emitido automaticamente.
     ```
   - **Adicionar uma página de serviço nova:**
     ```
     1. Criar `src/pages/servicos/[slug].astro` usando <PageLayout> e <PageHero>.
     2. Emitir Service schema com @id estável.
     3. Adicionar entry ao hasOfferCatalog em Layout.astro.
     ```

5. **Atualizar seção "Imagens"** com:
   - Imagens de uso interno (componentes Astro): ficam em `src/assets/` e são importadas via `astro:assets`.
   - Imagens públicas (favicon, og-cover, portfólio PDF): ficam em `public/`.
   - Cover de posts pode ser URL externa (Unsplash).

6. **Não alterar** seções "Restrições importantes", "Visão geral", "Build e deploy" — exceto referências que ficaram desatualizadas.

7. Build verde (não toca código).

8. Commit: `docs: atualizar CLAUDE.md com nova arquitetura`.

9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] Seção "Estrutura do projeto" reflete realidade pós-change.
- [ ] Seção "Tarefas recorrentes comuns" inclui cases e FAQ.
- [ ] Sem regressão de informação útil que estava lá antes.
- [ ] Build verde.

## Testing

- Build verde.
- Leitura crítica do CLAUDE.md atualizado — bate com o que existe no repo.

## Notes

- Esta task pode rodar **em paralelo** com a maioria das outras desde que S16 tenha rodado (collection cases existe).
- Manter tom e formato do CLAUDE.md original.

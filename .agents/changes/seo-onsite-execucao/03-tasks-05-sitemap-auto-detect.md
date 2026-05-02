---
id: "05"
phase: 1
complexity: medium
depends_on: []
files: ["src/pages/sitemap.xml.ts"]
---

# Task 05 — Sitemap auto-detect

## Objective

Substituir o array `staticPages` hardcoded em `sitemap.xml.ts` por auto-detecção das rotas estáticas. Cobrir também a futura collection `cases`.

## Detailed Steps

1. Marcar `status: 🔄` para id "05".
2. Ler [src/pages/sitemap.xml.ts](../../../src/pages/sitemap.xml.ts) atual.
3. Substituir a definição manual de `staticPages` por scan via `import.meta.glob('../pages/**/*.astro', { eager: true })` (ou equivalente). Filtrar:
   - Excluir arquivos cujo path contém `[` (rotas dinâmicas, já tratadas por collections).
   - Excluir `pages/sitemap.xml.ts` e `pages/index.astro` (este último entra como `/`).
   - Excluir arquivos `404.astro` se existir.
4. Mapear cada path para URL: `src/pages/sobre.astro` → `/sobre/`, `src/pages/servicos/index.astro` → `/servicos/`, `src/pages/servicos/assessment.astro` → `/servicos/assessment/`.
5. Para `cases`: tentar `await getCollection('cases', ({ data }) => !data.draft)`. Se a collection ainda não existir (build antes de S16), usar try/catch e emitir vazio. **Importante:** task S16 cria a collection, então este código tem que tolerar ausência inicial.
6. Manter `getCollection('blog', ({ data }) => !data.draft)` como já está.
7. `lastmod` para páginas estáticas: usar `new Date()` (data de build) — aceitável para SSG.
8. Rodar `npm run build`. Verde. Abrir `docs/sitemap.xml` e conferir que tem pelo menos `/`, `/blog/`, e os 8 posts (mesmo conteúdo que antes; novas rotas aparecem só após S08+).
9. Commit: `chore: sitemap auto-detect das rotas estáticas`.
10. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `staticPages` array hardcoded foi removido.
- [ ] Build verde gerando `docs/sitemap.xml` válido.
- [ ] XML contém todas as rotas que existiam antes (`/`, `/blog/`, posts).
- [ ] Quando rotas novas chegarem (S08+), elas aparecem automaticamente sem editar sitemap.xml.ts.
- [ ] Tolera ausência da collection `cases` (não quebra build antes de S16).

## Testing

- Validar XML em validador online (ex: https://www.xml-sitemaps.com/validate-xml-sitemap.html).
- Smoke: abrir `docs/sitemap.xml`, contar URLs.

## Notes

- `import.meta.glob` em arquivos `.ts` que rodam no SSG do Astro: confirmar sintaxe (Astro usa Vite — funciona).
- Alternativa: `Astro.glob('../pages/**/*.astro')` se rodar dentro de componente. Como sitemap é endpoint TS, `import.meta.glob` é o padrão.

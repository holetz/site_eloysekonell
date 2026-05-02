---
id: "03"
phase: 1
complexity: low
depends_on: []
files: ["src/layouts/BlogLayout.astro"]
---

# Task 03 — Schema: Article fix (mainEntityOfPage + author @id)

## Objective

Corrigir o schema `Article` em `BlogLayout.astro`: adicionar `mainEntityOfPage`, e substituir `author` duplicado por referência `@id` ao `Person` da home.

## Detailed Steps

1. Marcar `status: 🔄` para id "03".
2. Ler [src/layouts/BlogLayout.astro](../../../src/layouts/BlogLayout.astro). Localizar bloco JSON-LD do `Article`.
3. Substituir:
   ```js
   author: { '@type': 'Person', name: 'Eloyse Konell', url: SITE_URL }
   ```
   por:
   ```js
   author: { '@id': `${SITE_URL}/#eloyse` }
   ```
4. Adicionar campo `mainEntityOfPage` ao Article:
   ```js
   mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
   ```
   (`canonical` é a URL absoluta do post — já calculada no Layout para meta tags; reutilizar.)
5. Se o bloco JSON-LD estiver no body, mover para o `<head>` via slot ou `set:html` no Layout. Manter no body se já estiver lá e mover for invasivo demais — registrar no Notes.
6. Rodar `npm run build`. Verde.
7. Smoke: abrir `docs/blog/[qualquer-post]/index.html` e confirmar que o JSON-LD do Article tem `mainEntityOfPage` e `author: { '@id': '...#eloyse' }`.
8. Commit: `fix: Article schema com mainEntityOfPage e author por @id`.
9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] Article schema dos 8 posts tem `mainEntityOfPage`.
- [ ] Article.author é `{ '@id': '...#eloyse' }` (sem duplicar o objeto Person).
- [ ] `npm run build` verde.
- [ ] Schema Validator não acusa erros estruturais em pelo menos 1 post.

## Testing

- Schema Validator + Rich Results Test em `docs/blog/cadeira-vazia/index.html` (ou outro post) — Article reconhecido, autor referenciado.

## Notes

- `@id` precisa do trailing slash da home: `${SITE_URL}/#eloyse`. Confirmar que é o mesmo `@id` que aparece em Layout.astro Person (tarefa S02 não muda esse `@id`).
- Não tocar em outros campos do Article (`headline`, `datePublished`, etc.).

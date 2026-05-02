---
id: "04"
phase: 1
complexity: medium
depends_on: []
files: ["src/components/BreadcrumbList.astro", "src/layouts/BlogLayout.astro", "src/styles/global.css"]
---

# Task 04 — Componente BreadcrumbList reutilizável

## Objective

Criar componente `<BreadcrumbList>` que renderiza breadcrumb visual + emite `BreadcrumbList` JSON-LD. Refatorar o breadcrumb visual já existente em `BlogLayout.astro` para usar o componente.

## Detailed Steps

1. Marcar `status: 🔄` para id "04".
2. Criar `src/components/BreadcrumbList.astro` com:
   - Props: `items: Array<{ label: string, href?: string }>` (sem href = item atual / leaf).
   - Render visual: `<nav aria-label="Breadcrumb">` + `<ol>` com `<li>` por item; separador visual `›`.
   - JSON-LD: `<script type="application/ld+json">` com `@type: 'BreadcrumbList'`, `itemListElement` array de `{ '@type': 'ListItem', position, name, item }` (item omitido para leaf).
   - Estilo escopado no próprio `.astro` (sem mexer em global.css ainda).
3. Localizar breadcrumb visual em [src/layouts/BlogLayout.astro](../../../src/layouts/BlogLayout.astro). Substituir por `<BreadcrumbList items={[{ label: 'Início', href: SITE_URL }, { label: 'Blog', href: '${SITE_URL}/blog/' }, { label: post.data.title }]} />`. Manter o look visual idêntico ao atual (sem regressão UX).
4. Mover estilos de breadcrumb existentes (se em escopo do BlogLayout) para o componente novo. Se houver classe global em `global.css` específica do breadcrumb, deixar lá e referenciá-la com matching class no componente.
5. Rodar `npm run build`. Verde.
6. Smoke visual: `npm run preview`, abrir `/blog/cadeira-vazia/` e confirmar breadcrumb idêntico ao anterior. Inspecionar HTML — JSON-LD `BreadcrumbList` presente.
7. Commit: `feat: componente BreadcrumbList reutilizável (visual + schema)`.
8. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `src/components/BreadcrumbList.astro` existe e aceita prop `items`.
- [ ] Breadcrumb visual no blog **idêntico** ao anterior (zero regressão).
- [ ] Cada página com breadcrumb emite JSON-LD `BreadcrumbList`.
- [ ] `npm run build` verde.

## Testing

- Diff visual do breadcrumb antes/depois em 1 post. Sem regressão.
- Schema Validator em `docs/blog/[slug]/index.html` reconhece BreadcrumbList.

## Notes

- O componente será reusado por S08-S20 (rotas profundas) e S16 (cases). Padronizar a API agora economiza retrabalho.
- Se ainda não há `BlogLayout.astro` modificado por S03, não tem conflito — S03 mexe no JSON-LD do Article, S04 mexe no breadcrumb visual + adiciona BreadcrumbList JSON-LD. Coexistem.

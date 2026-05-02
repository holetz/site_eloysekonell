---
id: "07"
phase: 2
complexity: medium
depends_on: ["04"]
files: ["src/layouts/PageLayout.astro", "src/components/PageHero.astro", "src/styles/global.css"]
---

# Task 07 — Layouts/components base de página interna

## Objective

Criar o esqueleto reusável de páginas internas (`/sobre`, `/contato`, `/servicos/*`, etc.). Padroniza container, hero, breadcrumb, prose styling.

## Detailed Steps

1. Marcar `status: 🔄` para id "07".

2. **Criar `src/layouts/PageLayout.astro`:**
   - Props: `title`, `description`, `canonical?`, `ogImage?`, `breadcrumb?: Array<{ label, href? }>`.
   - Envolve `<Layout>` (passando title, description, canonical, ogImage).
   - Estrutura interna:
     ```astro
     <Nav />
     <main class="page-main">
       {breadcrumb && <BreadcrumbList items={breadcrumb} />}
       <slot name="hero" />
       <slot />
     </main>
     <Footer />
     ```
   - Aplica `class="page-main"` com max-width consistente (~720px para texto, mas largura maior pra heros).

3. **Criar `src/components/PageHero.astro`:**
   - Props: `eyebrow?: string`, `title: string`, `deck?: string`, `align?: 'left' | 'center'` (default 'left'), `image?: ImageMetadata`.
   - Render: `<header class="page-hero">` com eyebrow (small caps), `<h1>`, `<p class="deck">`, e opcional `<Image>` à direita ou abaixo.
   - Estilo escopado.

4. **Adicionar a `src/styles/global.css`** (sem alterar paleta/fontes):
   - `.page-main` — max-width 720px, padding lateral, margem top/bottom consistentes.
   - `.page-prose` — estilo de prose (parágrafos, h2, h3, listas, blockquote) consistente com posts do blog.
   - `.cta-block` — bloco CTA reutilizável (background sand-warm, padding, botão bronze).
   - `.page-section` — separador entre seções de página interna.

5. Rodar `npm run build`. Verde (mesmo sem páginas usarem ainda).

6. Smoke: criar mentalmente uma página de teste para validar API. Não precisa criar arquivo real.

7. Commit: `feat: PageLayout e PageHero para páginas internas`.

8. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `PageLayout.astro` existe e aceita props obrigatórias.
- [ ] `PageHero.astro` existe e funciona.
- [ ] Classes utilitárias `.page-main`, `.page-prose`, `.cta-block`, `.page-section` em `global.css`.
- [ ] `npm run build` verde.
- [ ] Sem regressão na home ou no blog.

## Testing

- Build verde.
- Spot-check no `npm run preview`: home, blog, e blog post permanecem visualmente idênticos.

## Notes

- **Não** alterar paleta nem tipografia. Apenas adicionar classes que reutilizam variáveis CSS existentes.
- O `page-prose` deve seguir o mesmo padrão visual de prose dos posts do blog (parágrafos espaçados, h2 em Cormorant, etc.). Se o blog já tem class similar, reusar nomes ou alinhar.
- Componentes/Layouts ficam prontos mas só são usados a partir de S08+.

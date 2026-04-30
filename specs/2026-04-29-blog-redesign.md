# Blog Redesign — Design Spec
**Data:** 2026-04-29
**Referência:** `C:\Users\eloys\OneDrive\1.CONSULTORIA\6. PÁGINAS DA EK\Blog\artigo-cadeira-vazia.html`

---

## Objetivo

Adaptar o blog do site `eloysekonell.com.br` (Astro SSG) para seguir fielmente o design de referência HTML criado pela proprietária. O blog passa a ter layout editorial de alta fidelidade com destaque para liderança, estratégia e gestão de pessoas.

---

## Escopo

- Atualizar schema de Content Collections
- Reescrever `BlogLayout.astro` (artigo individual)
- Reescrever `src/pages/blog/index.astro` (listagem)
- Criar plugin remark para diretivas customizadas
- Migrar 7 artigos HTML → Markdown
- Deletar 2 posts de exemplo existentes
- Adicionar estilos CSS ao `global.css`

---

## 1. Schema de conteúdo

**Arquivo:** `src/content/config.ts`

Campos novos adicionados ao schema `blog`:

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `deck` | `string` | sim | Subtítulo editorial exibido no cabeçalho do artigo em serif itálico |
| `coverImage` | `string` | não | Caminho ou URL da imagem de capa (ex: `/images/blog/nome.jpg` ou URL Unsplash) |
| `readingTime` | `string` | sim | Tempo de leitura manual (ex: `"7 min de leitura"`) |
| `related` | `string[]` | não (default `[]`) | Slugs dos artigos relacionados exibidos na seção "Continue lendo" |

Campos existentes mantidos sem alteração: `title`, `description`, `pubDate`, `updatedDate`, `ogImage`, `tags`, `draft`.

**Exemplo de frontmatter completo:**
```yaml
---
title: "A Cadeira Vazia na Sala de Reuniões"
description: "Como o assessment estratégico transforma fragilidade em vantagem competitiva."
deck: "Mais de 60% das empresas brasileiras não têm plano de sucessão. E quando a fragilidade aparece, já é tarde."
pubDate: 2026-04-13
tags: ["Liderança"]
readingTime: "7 min de leitura"
coverImage: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1600&q=85"
related: ["sucessao-mal-planejada", "saude-mental-estrategia", "hora-de-mudar"]
draft: false
---
```

---

## 2. Página de listagem — `/blog`

**Arquivo:** `src/pages/blog/index.astro`

### Hero (mantido)
Eyebrow "Blog" + h1 "Liderança. Estratégia. *Pessoas.*" + parágrafo lead.

### Artigo em destaque
O post mais recente (não-draft) ocupa posição de destaque com card escuro (`var(--olive-deep)`), layout horizontal:
- Esquerda: imagem de capa como `background-image` (oculto se `coverImage` ausente)
- Direita: tag · título grande (serif) · deck · meta (data · tempo de leitura)

Quando há apenas 1 post, somente o featured é exibido sem grid abaixo.
Quando há 0 posts, exibe mensagem "Novos artigos em breve."

### Grid "Todos os artigos"
Divider tipográfico separando o featured dos demais.
Grid de 3 colunas com os posts restantes, card `var(--sand-warm)`:
- Tag · título · description · data · tempo de leitura · "Ler artigo →"

---

## 3. Artigo individual — `/blog/[slug]`

**Arquivo:** `src/layouts/BlogLayout.astro`

Estrutura de cima para baixo:

### 3.1 Nav
`Nav.astro` existente (fundo olive-deep). *Diferença intencional em relação à referência HTML (que usa nav sand): mantém consistência com o restante do site.*

### 3.2 Breadcrumb
```
Artigos / [primeira tag do post] / [título do post]
```
Localizado em `.container`, acima do cabeçalho. Links: "Artigos" aponta para `/blog`.

### 3.3 Cabeçalho do artigo
Centralizado, `max-width: 820px`, `margin: 0 auto`:
1. `.cat-tag` — primeira tag em maiúsculas, borda bronze
2. `h1.article-title` — 58px, serif, `font-weight: 500`
3. `.article-deck` — deck em serif itálico, 23px, cor `var(--taupe)`
4. `.article-meta` — `Por Eloyse Konell · [data formatada] · [readingTime]` com dots bronze (4px) como separadores

### 3.4 Imagem de capa
Renderizado somente se `coverImage` fornecido:
```html
<div class="cover" style={`background-image:url('${coverImage}')`}></div>
```
`max-width: 1200px`, `height: 520px`, `background-size: cover`, `background-position: center`.
`margin: 0 auto 70px`.

### 3.5 Corpo do artigo
`max-width: 720px`, `margin: 0 auto`, `padding: 0 32px`.

Estilos de tipografia:
- `p`: 18px, `line-height: 1.75`, `font-weight: 400`
- `h2`: 36px, `margin: 60px 0 24px`
- `h3`: 26px, `margin: 44px 0 16px`
- `ul li`: padding-left 28px, pseudo-elemento `—` em bronze
- `blockquote` não usado diretamente — substituído por diretivas

### 3.6 Author bio
`max-width: 720px`, grid `120px 1fr`, após o conteúdo:
- Foto circular: `src/images/photos/eloyse-portrait.jpg` (100% estático, não varia por artigo)
- Eyebrow "Sobre a autora"
- Nome "Eloyse *Konell*" (em itálico bronze)
- Bio fixa: "Psicóloga de formação, estrategista de liderança na prática. Há mais de uma década, ajuda empresas a transformar liderança em resultado..."
- Links: Site · LinkedIn · Contato (WhatsApp)

### 3.7 Share
Centralizado, após author bio:
- Eyebrow "Compartilhar este artigo"
- 4 ícones circulares (borda olive-deep): LinkedIn, WhatsApp, Email, Copiar link
- Links de share gerados dinamicamente a partir da URL canônica do artigo

### 3.8 Artigos relacionados
Seção `<section class="related">` com fundo `var(--sand-warm)`, `margin-top: 100px`:
- Eyebrow "Continue lendo" + h2 "Artigos relacionados"
- Busca os posts cujos slugs estão em `related[]` via `getCollection`
- Grid de 3 colunas com cards: imagem de capa (`height: 200px`) · eyebrow (tag · tempo) · h3 · excerpt · "Ler mais →"
- Se `related` estiver vazio (0 slugs válidos), a seção é omitida inteiramente. Se houver 1 ou 2 slugs válidos, os cards disponíveis são exibidos (sem preencher com outros artigos).

### 3.9 Footer
`Footer.astro` existente.

---

## 4. Diretivas Markdown customizadas

**Arquivo:** `remark-blog-directives.mjs` (raiz do projeto)
**Dependências:** `remark-directive` (adicionar ao `package.json`)
**Configuração:** `astro.config.mjs` — adicionar ao array `remarkPlugins`

### 4.1 Pullquote
```md
::pullquote[A sustentabilidade organizacional passa pela continuidade da liderança.]
```
Gera:
```html
<div class="pullquote"><p>A sustentabilidade organizacional...</p></div>
```
CSS: `margin: 60px -60px`, `padding: 50px 60px`, `border-top/bottom: 1px solid var(--bronze)`, texto centralizado em serif itálico 32px.

### 4.2 Data Grid
```md
:::data-grid
200% | custo de substituir um executivo
60%  | empresas sem plano de sucessão
3x   | mais engajamento com plano estruturado
:::
```
Gera grid 3 colunas. Cada linha `num | label` → `.data-item` com `.data-num` (48px bronze serif) e `.data-label`.
CSS: `margin: 50px -40px`, `padding: 40px`, `background: var(--sand-warm)`, `border-left: 3px solid var(--bronze)`.

### 4.3 Inline CTA
```md
:::inline-cta{link="https://wa.me/5547991443844" title="Esse é exatamente o tipo de desafio que eu resolvo."}
Se sua organização está preparando sucessores, vamos trocar uma ideia.
:::
```
Gera bloco escuro com eyebrow "Vamos conversar", h3 (title), p (corpo), botão "Falar com Eloyse".
CSS: `margin: 60px -40px`, `padding: 50px`, `background: var(--olive-deep)`.

---

## 5. Migração dos artigos

**Deletar:** `src/content/blog/lideranca-alta-performance.md` e `gestao-estrategica-de-pessoas.md` (eram exemplos).

**Criar** os 7 posts em `src/content/blog/`:

| Arquivo | Título | Tags | Imagem Unsplash (da referência) |
|---|---|---|---|
| `cadeira-vazia.md` | A Cadeira Vazia na Sala de Reuniões | Liderança | photo-1431540015161-0bf868a2d407 |
| `sucessao-mal-planejada.md` | Os Impactos da Sucessão Mal Planejada | Estratégia | photo-1507679799987-c73779587ccf |
| `saude-mental-estrategia.md` | Saúde Mental Não é Luxo, é Estratégia | Performance | photo-1474631245212-32dc3c8310c6 |
| `hora-de-mudar.md` | Quando Chega a Hora de Mudar | Liderança | photo-1506905925346-21bda4d32df4 |
| `rh-futuro.md` | O RH do Futuro Não é Mais Suporte | Estratégia | (extrair do HTML) |
| `tecnico-virou-gestor.md` | O Melhor Técnico Virou Gestor e Tudo Desmoronou | Pessoas | (extrair do HTML) |
| `sucessor-e-sucessao.md` | Você Tem um Sucessor. Mas Tem Sucessão? | Liderança | (extrair do HTML) |

Conteúdo de cada `.md`: extraído dos HTMLs, com pullquotes, data-grids e inline-CTAs convertidos para a sintaxe de diretivas.

---

## 6. Arquivos modificados / criados

| Arquivo | Ação |
|---|---|
| `src/content/config.ts` | Atualizar schema |
| `src/layouts/BlogLayout.astro` | Reescrever |
| `src/pages/blog/index.astro` | Reescrever |
| `src/pages/blog/[...slug].astro` | Atualizar props |
| `src/styles/global.css` | Adicionar estilos de artigo |
| `remark-blog-directives.mjs` | Criar |
| `astro.config.mjs` | Adicionar plugin |
| `package.json` | Adicionar `remark-directive` |
| `src/content/blog/cadeira-vazia.md` | Criar |
| `src/content/blog/sucessao-mal-planejada.md` | Criar |
| `src/content/blog/saude-mental-estrategia.md` | Criar |
| `src/content/blog/hora-de-mudar.md` | Criar |
| `src/content/blog/rh-futuro.md` | Criar |
| `src/content/blog/tecnico-virou-gestor.md` | Criar |
| `src/content/blog/sucessor-e-sucessao.md` | Criar |
| `src/content/blog/lideranca-alta-performance.md` | Deletar |
| `src/content/blog/gestao-estrategica-de-pessoas.md` | Deletar |

---

## 7. Fora do escopo

- Página de tag/categoria (`/blog/tag/[tag]`)
- Paginação da listagem
- Newsletter (campo no nav de referência — nav do Astro não possui)
- Download local das imagens Unsplash

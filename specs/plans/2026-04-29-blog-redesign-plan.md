# Blog Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the blog to match the reference HTML design — featured article listing, editorial article layout, custom Markdown directives, and 7 migrated articles.

**Architecture:** Add `remark-directive` + custom plugin to parse `::pullquote`, `:::data-grid`, `:::inline-cta`, `:::exercise` blocks in Markdown content. Rewrite `BlogLayout.astro` and `blog/index.astro`. Migrate all 7 HTML reference articles to Markdown. Add CSS to `global.css`.

**Tech Stack:** Astro 4, Content Collections, remark-directive 4.x, TypeScript

---

## File Map

| Action | Path |
|---|---|
| Create | `remark-blog-directives.mjs` |
| Modify | `package.json` |
| Modify | `astro.config.mjs` |
| Modify | `src/content/config.ts` |
| Rewrite | `src/layouts/BlogLayout.astro` |
| Rewrite | `src/pages/blog/index.astro` |
| Modify | `src/pages/blog/[...slug].astro` |
| Modify | `src/styles/global.css` |
| Delete | `src/content/blog/lideranca-alta-performance.md` |
| Delete | `src/content/blog/gestao-estrategica-de-pessoas.md` |
| Create ×7 | `src/content/blog/*.md` |

---

### Task 1: Install remark-directive and wire up plugin skeleton

**Files:**
- Modify: `package.json`
- Create: `remark-blog-directives.mjs`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Install remark-directive**

```bash
npm install remark-directive
```

Expected: `remark-directive` appears in `node_modules/` and `package.json` dependencies.

- [ ] **Step 2: Create plugin skeleton**

Create `remark-blog-directives.mjs` at the project root:

```js
import { visit } from 'unist-util-visit';

export function remarkBlogDirectives() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        // directives will be implemented in Task 2
      }
    });
  };
}
```

- [ ] **Step 3: Update astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkBlogDirectives } from './remark-blog-directives.mjs';

export default defineConfig({
  site: 'https://eloysekonell.com.br',
  outDir: './docs',
  build: {
    assets: '_astro',
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkBlogDirectives],
  },
});
```

- [ ] **Step 4: Verify build succeeds**

```bash
npm run build
```

Expected: Build completes with no errors. The plugin loads silently (no directives in existing content yet).

- [ ] **Step 5: Commit**

```bash
git add remark-blog-directives.mjs astro.config.mjs package.json package-lock.json
git commit -m "feat: install remark-directive and wire plugin skeleton"
```

---

### Task 2: Implement all 4 remark directives

**Files:**
- Modify: `remark-blog-directives.mjs`

- [ ] **Step 1: Write test article with all 4 directives**

Create `src/content/blog/_directive-test.md` (draft: true so it won't appear in the blog):

```md
---
title: "Directive Test"
description: "Internal test post — do not publish"
deck: "Testing all 4 custom directives."
pubDate: 2026-01-01
tags: ["Liderança"]
readingTime: "1 min"
draft: true
---

## Pullquote test

::pullquote[A sustentabilidade organizacional passa pela continuidade da liderança.]

## Data-grid test

:::data-grid
200% | custo de substituir um executivo
60%  | empresas sem plano de sucessão
3x   | mais engajamento com plano estruturado
:::

## Inline CTA test

:::inline-cta{eyebrow="Vamos conversar" heading="Esse é exatamente o tipo de desafio que eu resolvo." link="https://wa.me/5547991443844"}
Se sua organização está preparando sucessores, vamos trocar uma ideia.
:::

## Exercise test

:::exercise{title="Exercício prático" description="Responda com honestidade:"}
01 | **Quanto do seu dia é gasto em problemas operacionais?** | Se a resposta for mais da metade, você está operando como executor, não como gestor.
02 | **Quando foi a última vez que você conversou sobre desenvolvimento, não sobre entregas?** | Conversas sobre entregas são gestão de tarefas. Sobre desenvolvimento, são gestão de pessoas.
:::
```

- [ ] **Step 2: Run build to verify it builds (directives render as raw text for now)**

```bash
npm run build
```

Expected: Build succeeds. The directive syntax is ignored/raw since plugin is still a no-op.

- [ ] **Step 3: Implement all 4 directives in remark-blog-directives.mjs**

```js
import { visit } from 'unist-util-visit';

function extractText(node) {
  let text = '';
  function walk(n) {
    if (n.type === 'text') text += n.value;
    if (n.type === 'break') text += '\n';
    if (n.children) n.children.forEach(walk);
  }
  walk(node);
  return text;
}

function inlineToHtml(nodes) {
  return (nodes || []).map(n => {
    if (n.type === 'text') return n.value;
    if (n.type === 'strong') return `<strong>${inlineToHtml(n.children)}</strong>`;
    if (n.type === 'emphasis') return `<em>${inlineToHtml(n.children)}</em>`;
    return '';
  }).join('');
}

function splitAtBreaks(nodes) {
  const segments = [];
  let current = [];
  for (const n of nodes || []) {
    if (n.type === 'break') { segments.push(current); current = []; }
    else current.push(n);
  }
  if (current.length) segments.push(current);
  return segments;
}

export function remarkBlogDirectives() {
  return (tree) => {
    visit(tree, (node) => {

      // ::pullquote[text] — leaf directive
      if (node.type === 'leafDirective' && node.name === 'pullquote') {
        const text = extractText(node);
        Object.assign(node, {
          type: 'html',
          value: `<div class="pullquote"><p>${text}</p></div>`,
          children: undefined,
          name: undefined,
          attributes: undefined,
        });
      }

      // :::data-grid — pipe-delimited lines: "num | label"
      if (node.type === 'containerDirective' && node.name === 'data-grid') {
        const raw = extractText(node);
        const items = raw
          .split('\n')
          .filter((l) => l.includes('|'))
          .map((line) => {
            const [num, ...rest] = line.split('|').map((s) => s.trim());
            return `<div class="data-item"><div class="data-num">${num}</div><div class="data-label">${rest.join(' ')}</div></div>`;
          })
          .join('');
        Object.assign(node, {
          type: 'html',
          value: `<div class="data-grid">${items}</div>`,
          children: undefined,
          name: undefined,
          attributes: undefined,
        });
      }

      // :::inline-cta{eyebrow heading link} body text :::
      if (node.type === 'containerDirective' && node.name === 'inline-cta') {
        const attrs = node.attributes || {};
        const eyebrow = attrs.eyebrow || 'Vamos conversar';
        const heading = attrs.heading || '';
        const link = attrs.link || 'https://wa.me/5547991443844';
        const text = extractText(node).trim();
        Object.assign(node, {
          type: 'html',
          value: `<div class="inline-cta">
  <span class="art-eyebrow">${eyebrow}</span>
  <h3>${heading}</h3>
  <p>${text}</p>
  <a href="${link}" target="_blank" rel="noopener" class="btn-cta">Falar com Eloyse</a>
</div>`,
          children: undefined,
          name: undefined,
          attributes: undefined,
        });
      }

      // :::exercise{title description} pipe-delimited items :::
      // Each line: "01 | **Question** | Hint text"
      // Uses inlineToHtml+splitAtBreaks because remark already parsed **bold** into strong nodes
      // before this plugin runs — extractText+regex would strip the formatting.
      if (node.type === 'containerDirective' && node.name === 'exercise') {
        const attrs = node.attributes || {};
        const title = attrs.title || 'Exercício prático';
        const description = attrs.description || '';
        const segments = (node.children || [])
          .filter(c => c.type === 'paragraph')
          .flatMap(p => splitAtBreaks(p.children));
        const items = segments
          .map(seg => {
            const lineHtml = inlineToHtml(seg);
            if (!lineHtml.includes('|')) return '';
            const parts = lineHtml.split('|').map(s => s.trim());
            const num = parts[0] || '';
            const question = parts[1] || '';
            const hint = parts[2] || '';
            return `<div class="exercise-item">
  <div class="exercise-num">${num}</div>
  <div class="exercise-body">
    <p>${question}</p>
    ${hint ? `<p class="exercise-hint">${hint}</p>` : ''}
  </div>
</div>`;
          })
          .filter(Boolean)
          .join('');
        Object.assign(node, {
          type: 'html',
          value: `<div class="exercise">
  <div class="exercise-header">
    <span class="art-eyebrow">${title}</span>
    ${description ? `<p>${description}</p>` : ''}
  </div>
  <div class="exercise-items">${items}</div>
</div>`,
          children: undefined,
          name: undefined,
          attributes: undefined,
        });
      }
    });
  };
}
```

- [ ] **Step 4: Build and verify directives render correctly**

```bash
npm run build && npm run preview
```

Open `http://localhost:4321/blog/_directive-test` (if preview exposes drafts) — or check the generated HTML in `docs/blog/_directive-test/index.html`. Verify all 4 directive blocks produce correct HTML output:
- pullquote → `<div class="pullquote"><p>...</p></div>`
- data-grid → `<div class="data-grid">` with 3 items
- inline-cta → `<div class="inline-cta">` with button
- exercise → `<div class="exercise">` with 2 items

- [ ] **Step 5: Commit**

```bash
git add remark-blog-directives.mjs src/content/blog/_directive-test.md
git commit -m "feat: implement 4 remark directives (pullquote, data-grid, inline-cta, exercise)"
```

---

### Task 3: Update content schema and remove example posts

**Files:**
- Modify: `src/content/config.ts`
- Delete: `src/content/blog/lideranca-alta-performance.md`
- Delete: `src/content/blog/gestao-estrategica-de-pessoas.md`

- [ ] **Step 1: Replace src/content/config.ts**

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    deck: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    readingTime: z.string(),
    draft: z.boolean().default(false),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Delete example posts**

```bash
rm src/content/blog/lideranca-alta-performance.md
rm src/content/blog/gestao-estrategica-de-pessoas.md
```

- [ ] **Step 3: Update _directive-test.md frontmatter to match new schema**

The test post already has `deck` and `readingTime`. Verify it matches the new schema exactly — no missing required fields.

- [ ] **Step 4: Build to verify schema is valid**

```bash
npm run build
```

Expected: Build succeeds. Only `_directive-test.md` is in the collection (draft: true, so it won't appear in listings).

- [ ] **Step 5: Commit**

```bash
git add src/content/config.ts src/content/blog/lideranca-alta-performance.md src/content/blog/gestao-estrategica-de-pessoas.md src/content/blog/_directive-test.md
git commit -m "feat: update blog schema with deck, coverImage, readingTime, related fields"
```

---

### Task 4: Add blog and article CSS to global.css

**Files:**
- Modify: `src/styles/global.css` (append at end of file)

- [ ] **Step 1: Append the following CSS block to the end of src/styles/global.css**

```css
/* ─── BLOG — SHARED ─── */
.art-eyebrow {
  font-family: var(--sans);
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--bronze);
  font-weight: 500;
}

/* ─── BLOG — ARTICLE PAGE ─── */
.article-main { padding-bottom: 0; }

.article-main .wrap { max-width: 1200px; margin: 0 auto; padding: 0 32px; }

.article-main .breadcrumb {
  padding: 120px 0 0;
  font-size: 12px;
  color: var(--taupe);
  letter-spacing: 1px;
  display: flex;
  flex-wrap: wrap;
  gap: 0 4px;
}
.article-main .breadcrumb a { color: var(--taupe); transition: color .3s; }
.article-main .breadcrumb a:hover { color: var(--bronze); }
.article-main .breadcrumb span { color: var(--bronze); margin: 0 6px; }

.article-header {
  padding: 50px 32px 60px;
  text-align: center;
  max-width: 820px;
  margin: 0 auto;
}
.cat-tag {
  display: inline-block;
  padding: 8px 20px;
  border: 1px solid var(--bronze);
  color: var(--bronze);
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 32px;
}
.article-title {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  line-height: 1.1;
  color: var(--olive-deep);
  font-weight: 500;
  margin-bottom: 30px;
  letter-spacing: -.015em;
}
.article-deck {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  line-height: 1.45;
  color: var(--taupe);
  max-width: 680px;
  margin: 0 auto 40px;
}
.article-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--taupe);
  font-weight: 500;
  flex-wrap: wrap;
}
.article-meta .dot {
  width: 4px;
  height: 4px;
  background: var(--bronze);
  border-radius: 50%;
  flex-shrink: 0;
}

.cover {
  max-width: 1200px;
  margin: 0 auto 70px;
  height: 520px;
  background-size: cover;
  background-position: center;
}

.article-body {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 32px;
}
.article-body p {
  font-size: 18px;
  line-height: 1.75;
  color: var(--olive);
  margin-bottom: 24px;
  font-weight: 400;
}
.article-body h2 {
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  margin: 60px 0 24px;
  color: var(--olive-deep);
  font-weight: 500;
}
.article-body h3 {
  font-size: clamp(1.3rem, 2.2vw, 1.65rem);
  margin: 44px 0 16px;
  color: var(--olive-deep);
  font-weight: 600;
}
.article-body strong { color: var(--olive-deep); font-weight: 600; }
.article-body em { font-style: italic; color: var(--taupe); }
.article-body ul {
  margin: 24px 0 32px;
  padding-left: 0;
  list-style: none;
}
.article-body ul li {
  position: relative;
  padding-left: 28px;
  margin-bottom: 14px;
  font-size: 17px;
  line-height: 1.7;
  color: var(--olive);
}
.article-body ul li::before {
  content: '—';
  color: var(--bronze);
  font-weight: 600;
  position: absolute;
  left: 0;
  top: 0;
}

/* PULLQUOTE */
.pullquote {
  margin: 60px -60px;
  padding: 50px 60px;
  border-top: 1px solid var(--bronze);
  border-bottom: 1px solid var(--bronze);
  text-align: center;
}
.pullquote p {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.2rem, 2.5vw, 2rem);
  line-height: 1.35;
  color: var(--olive-deep);
  font-weight: 500;
  margin: 0;
}

/* DATA GRID */
.data-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 50px -40px;
  padding: 40px;
  background: var(--sand-warm);
  border-left: 3px solid var(--bronze);
}
.data-item { text-align: center; }
.data-num {
  font-family: var(--serif);
  font-size: 48px;
  color: var(--bronze);
  font-weight: 500;
  line-height: 1;
  margin-bottom: 8px;
}
.data-label {
  font-size: 12px;
  color: var(--taupe);
  letter-spacing: 1px;
  line-height: 1.4;
}

/* INLINE CTA */
.inline-cta {
  margin: 60px -40px;
  padding: 50px;
  background: var(--olive-deep);
  color: var(--sand);
  text-align: center;
  position: relative;
}
.inline-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: var(--bronze);
}
.inline-cta .art-eyebrow {
  display: block;
  margin: 18px 0 14px;
  color: var(--bronze);
}
.inline-cta h3 {
  color: var(--sand);
  font-size: clamp(1.3rem, 2.5vw, 1.9rem);
  margin-bottom: 18px;
  line-height: 1.3;
}
.inline-cta p {
  color: var(--sand-deep);
  font-size: 15px;
  margin-bottom: 28px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
.btn-cta {
  display: inline-block;
  padding: 16px 40px;
  background: var(--bronze);
  color: var(--olive-deep);
  font-family: var(--sans);
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid var(--bronze);
  transition: all .3s;
}
.btn-cta:hover { background: transparent; color: var(--bronze); }

/* EXERCISE */
.exercise {
  margin: 50px -40px;
  padding: 40px;
  background: var(--sand-warm);
  border-left: 3px solid var(--bronze);
}
.exercise-header { margin-bottom: 28px; }
.exercise-header .art-eyebrow { display: block; margin-bottom: 10px; }
.exercise-header p { font-size: 15px; color: var(--taupe); margin: 0; }
.exercise-items { display: flex; flex-direction: column; gap: 24px; }
.exercise-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 16px;
  align-items: start;
  padding-top: 20px;
  border-top: 1px solid var(--line);
}
.exercise-item:first-child { border-top: none; padding-top: 0; }
.exercise-num {
  font-family: var(--serif);
  font-size: 1.6rem;
  color: var(--bronze);
  font-weight: 500;
  line-height: 1.2;
}
.exercise-body p { font-size: 16px; color: var(--olive-deep); margin-bottom: 8px; font-weight: 400; line-height: 1.65; }
.exercise-hint { font-style: italic; color: var(--taupe) !important; font-size: 14px !important; }

/* AUTHOR BIO */
.author-bio {
  max-width: 720px;
  margin: 80px auto 0;
  padding: 50px 32px 0;
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 32px;
  align-items: start;
}
.author-bio-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-size: cover;
  background-position: center top;
  flex-shrink: 0;
}
.author-bio .art-eyebrow { display: block; margin-bottom: 8px; }
.author-name {
  font-family: var(--serif);
  font-size: 26px;
  color: var(--olive-deep);
  margin-bottom: 12px;
}
.author-name em { color: var(--bronze); font-weight: 400; font-style: italic; }
.author-bio p { font-size: 14px; color: var(--taupe); line-height: 1.6; margin-bottom: 16px; }
.author-links { display: flex; gap: 16px; flex-wrap: wrap; }
.author-links a {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--olive-deep);
  font-weight: 600;
  border-bottom: 1px solid var(--bronze);
  padding-bottom: 2px;
  transition: color .3s;
}
.author-links a:hover { color: var(--bronze); }

/* SHARE */
.share-section {
  max-width: 720px;
  margin: 50px auto 0;
  padding: 0 32px 80px;
  text-align: center;
}
.share-section .art-eyebrow { display: block; margin-bottom: 18px; }
.share-icons { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
.share-icons a,
.share-icons button {
  width: 44px;
  height: 44px;
  border: 1px solid var(--olive-deep);
  color: var(--olive-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all .3s;
  background: transparent;
  cursor: pointer;
}
.share-icons a:hover,
.share-icons button:hover {
  background: var(--olive-deep);
  color: var(--sand);
}

/* RELATED */
.related {
  background: var(--sand-warm);
  padding: 90px 0;
  margin-top: 100px;
  border-top: 1px solid var(--line);
}
.related-header { text-align: center; margin-bottom: 50px; }
.related-header .art-eyebrow { display: block; margin-bottom: 14px; }
.related-header h2 { font-size: clamp(1.8rem, 3vw, 2.4rem); }
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}
.related-card {
  background: var(--sand);
  border: 1px solid var(--line);
  transition: transform .35s, box-shadow .35s;
}
.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(46,45,34,.08);
}
.related-img {
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: var(--sand-warm);
}
.related-body { padding: 26px; }
.related-body .art-eyebrow { display: block; margin-bottom: 12px; }
.related-body h3 {
  font-family: var(--serif);
  font-size: 20px;
  margin-bottom: 14px;
  line-height: 1.3;
  color: var(--olive-deep);
}
.related-body p { font-size: 14px; color: var(--taupe); margin-bottom: 18px; line-height: 1.55; }
.read-more-link {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--olive-deep);
  border-bottom: 1px solid var(--bronze);
  padding-bottom: 3px;
  transition: color .3s;
}
.read-more-link:hover { color: var(--bronze); }

/* ─── BLOG — INDEX PAGE ─── */
.blog-main { padding-top: 160px; padding-bottom: 120px; }
.blog-hero { max-width: 700px; margin-bottom: 80px; }
.blog-hero h1 { margin: 16px 0 20px; }
.blog-hero h1 em { font-style: italic; color: var(--taupe); font-weight: 300; }
.blog-hero .lead { font-size: 1.1rem; line-height: 1.75; }

.featured-label {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--taupe-soft);
  margin-bottom: 16px;
}
.featured-card {
  display: flex;
  background: var(--olive-deep);
  color: var(--sand);
  margin-bottom: 24px;
  text-decoration: none;
  transition: opacity .3s;
  min-height: 220px;
}
.featured-card:hover { opacity: .92; }
.featured-img {
  width: 280px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-color: var(--olive);
}
.featured-body {
  flex: 1;
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.feat-tag {
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--bronze-soft);
  border: 1px solid var(--bronze-soft);
  padding: 4px 12px;
  display: inline-block;
  margin-bottom: 16px;
  font-weight: 500;
}
.feat-title {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  color: var(--sand);
  margin-bottom: 12px;
  line-height: 1.2;
  font-weight: 500;
}
.feat-deck {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1rem;
  color: var(--sand-deep);
  line-height: 1.55;
  margin-bottom: 0;
}
.feat-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--taupe-soft);
  font-weight: 500;
  margin-top: 24px;
}
.feat-meta .dot {
  width: 3px;
  height: 3px;
  background: var(--bronze);
  border-radius: 50%;
}

.all-articles-label {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--taupe-soft);
  margin: 56px 0 24px;
  padding-top: 32px;
  border-top: 1px solid var(--line);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}
.post-card {
  padding: 36px;
  border: 1px solid var(--line);
  background: var(--sand-warm);
  transition: border-color .3s, transform .3s;
  display: flex;
  flex-direction: column;
}
.post-card:hover { border-color: var(--bronze); transform: translateY(-4px); }
.post-card-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.post-tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--bronze);
  border: 1px solid var(--bronze);
  padding: 3px 10px;
}
.post-card h3 {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  margin-bottom: 12px;
  line-height: 1.25;
  color: var(--olive-deep);
}
.post-card h3 a { color: var(--olive-deep); transition: color .3s; }
.post-card h3 a:hover { color: var(--bronze); }
.post-desc { color: var(--taupe); line-height: 1.65; margin-bottom: 16px; font-size: .96rem; flex: 1; }
.post-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .06em;
  color: var(--taupe-soft);
  text-transform: uppercase;
  padding: 16px 0 12px;
  border-top: 1px solid var(--line);
  margin-top: auto;
}
.read-more {
  font-size: 11px;
  font-weight: 600;
  color: var(--bronze);
  letter-spacing: .08em;
  text-transform: uppercase;
  transition: letter-spacing .3s;
  align-self: flex-start;
}
.read-more:hover { letter-spacing: .14em; }
.no-posts { font-size: 1.1rem; color: var(--taupe-soft); padding: 40px 0; }

/* ─── RESPONSIVE — BLOG ─── */
@media (max-width: 900px) {
  .article-main .breadcrumb { padding-top: 90px; }
  .article-title { font-size: clamp(1.8rem, 6vw, 2.6rem); }
  .article-deck { font-size: 1.1rem; }
  .cover { height: 280px; margin-bottom: 40px; }
  .pullquote { margin: 40px -16px; padding: 32px 24px; }
  .pullquote p { font-size: clamp(1.1rem, 4vw, 1.4rem); }
  .data-grid { grid-template-columns: 1fr; margin: 32px -16px; padding: 28px; }
  .inline-cta { margin: 40px -16px; padding: 36px 24px; }
  .exercise { margin: 32px -16px; padding: 28px 24px; }
  .author-bio { grid-template-columns: 1fr; text-align: center; }
  .author-bio-photo { margin: 0 auto; }
  .author-links { justify-content: center; }
  .related-grid { grid-template-columns: 1fr; }
  .featured-card { flex-direction: column; }
  .featured-img { width: 100%; height: 200px; }
  .featured-body { padding: 24px; }
  .posts-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .blog-main { padding-top: 110px; }
}
```

- [ ] **Step 2: Build to verify no CSS errors**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add blog article and listing CSS to global.css"
```

---

### Task 5: Rewrite BlogLayout.astro

**Files:**
- Rewrite: `src/layouts/BlogLayout.astro`

- [ ] **Step 1: Replace the entire content of src/layouts/BlogLayout.astro**

```astro
---
import Layout from './Layout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import { getCollection } from 'astro:content';

export interface Props {
  title: string;
  description: string;
  deck: string;
  pubDate: Date;
  updatedDate?: Date;
  ogImage?: string;
  coverImage?: string;
  tags?: string[];
  readingTime: string;
  related?: string[];
}

const {
  title,
  description,
  deck,
  pubDate,
  updatedDate,
  ogImage,
  coverImage,
  tags = [],
  readingTime,
  related = [],
} = Astro.props;

const SITE_URL = 'https://eloysekonell.com.br';
const canonical = SITE_URL + Astro.url.pathname;
const dateIso = pubDate.toISOString();
const dateFormatted = pubDate.toLocaleDateString('pt-BR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const category = tags[0] || '';

let relatedPosts: any[] = [];
if (related.length > 0) {
  const allPosts = await getCollection('blog', ({ data }: any) => !data.draft);
  relatedPosts = related
    .map((slug: string) => allPosts.find((p: any) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 3);
}

const shareUrl = encodeURIComponent(canonical);
const shareTitle = encodeURIComponent(title);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url: canonical,
  datePublished: dateIso,
  dateModified: (updatedDate ?? pubDate).toISOString(),
  author: { '@type': 'Person', name: 'Eloyse Konell', url: SITE_URL },
  publisher: {
    '@type': 'Organization',
    name: 'Eloyse Konell — Gestão e Consultoria',
    url: SITE_URL,
  },
  ...(ogImage && { image: ogImage }),
  ...(tags.length && { keywords: tags.join(', ') }),
};
---

<Layout
  title={title}
  description={description}
  canonical={canonical}
  ogType="article"
  ogImage={ogImage}
  articleDate={dateIso}
>
  <Nav />

  <main class="article-main">
    <div class="wrap">
      <div class="breadcrumb">
        <a href="/blog">Artigos</a>
        {category && <><span>/</span><span>{category}</span></>}
        <span>/</span><span>{title}</span>
      </div>
    </div>

    <header class="article-header">
      {category && <div class="cat-tag">{category}</div>}
      <h1 class="article-title">{title}</h1>
      <p class="article-deck">{deck}</p>
      <div class="article-meta">
        <span>Por Eloyse Konell</span>
        <span class="dot"></span>
        <time datetime={dateIso}>{dateFormatted}</time>
        <span class="dot"></span>
        <span>{readingTime}</span>
      </div>
    </header>

    {coverImage && (
      <div class="cover" style={`background-image:url('${coverImage}')`}></div>
    )}

    <article class="article-body" itemscope itemtype="https://schema.org/Article">
      <slot />
    </article>

    <div class="author-bio">
      <div
        class="author-bio-photo"
        style="background-image:url('/images/photos/eloyse-portrait.jpg')"
      ></div>
      <div>
        <span class="art-eyebrow">Sobre a autora</span>
        <h4 class="author-name">Eloyse <em>Konell</em></h4>
        <p>
          Psicóloga de formação, estrategista de liderança na prática. Há mais de uma
          década, ajuda empresas a transformar liderança em resultado, atuando onde o
          comportamento humano encontra a estratégia de negócio.
        </p>
        <div class="author-links">
          <a href="https://www.eloysekonell.com.br" target="_blank" rel="noopener">Site</a>
          <a href="https://www.linkedin.com/in/eloysekonell" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://wa.me/5547991443844" target="_blank" rel="noopener">Contato</a>
        </div>
      </div>
    </div>

    <div class="share-section">
      <span class="art-eyebrow">Compartilhar este artigo</span>
      <div class="share-icons">
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/>
          </svg>
        </a>
        <a
          href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
          </svg>
        </a>
        <a href={`mailto:?subject=${shareTitle}&body=${canonical}`} aria-label="E-mail">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </a>
        <button class="copy-link-btn" data-url={canonical} aria-label="Copiar link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
          </svg>
        </button>
      </div>
    </div>

    {relatedPosts.length > 0 && (
      <section class="related">
        <div class="related-header">
          <span class="art-eyebrow">Continue lendo</span>
          <h2>Artigos relacionados</h2>
        </div>
        <div class="related-grid">
          {relatedPosts.map((post: any) => (
            <article class="related-card">
              {post.data.coverImage && (
                <div
                  class="related-img"
                  style={`background-image:url('${post.data.coverImage}')`}
                ></div>
              )}
              <div class="related-body">
                <span class="art-eyebrow">
                  {post.data.tags[0]} · {post.data.readingTime}
                </span>
                <h3>{post.data.title}</h3>
                <p>{post.data.description}</p>
                <a href={`/blog/${post.slug}`} class="read-more-link">Ler mais →</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    )}
  </main>

  <Footer />

  <script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />

  <script>
    document.querySelectorAll<HTMLButtonElement>('.copy-link-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.url || '');
        btn.setAttribute('title', 'Link copiado!');
        setTimeout(() => btn.setAttribute('title', ''), 2000);
      });
    });
  </script>
</Layout>
```

- [ ] **Step 2: Build to verify no TypeScript or template errors**

```bash
npm run build
```

Expected: Build succeeds. The `_directive-test.md` draft article renders with the new layout (visible in `docs/` output).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BlogLayout.astro
git commit -m "feat: rewrite BlogLayout with full article structure matching reference design"
```

---

### Task 6: Update [slug].astro to pass new props

**Files:**
- Modify: `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Replace src/pages/blog/[...slug].astro**

```astro
---
import { getCollection, type CollectionEntry } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

type Props = { post: CollectionEntry<'blog'> };

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogLayout
  title={post.data.title}
  description={post.data.description}
  deck={post.data.deck}
  pubDate={post.data.pubDate}
  updatedDate={post.data.updatedDate}
  ogImage={post.data.ogImage}
  coverImage={post.data.coverImage}
  tags={post.data.tags}
  readingTime={post.data.readingTime}
  related={post.data.related}
>
  <Content />
</BlogLayout>
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog/[...slug].astro
git commit -m "feat: pass new blog frontmatter fields to BlogLayout"
```

---

### Task 7: Rewrite blog/index.astro

**Files:**
- Rewrite: `src/pages/blog/index.astro`

- [ ] **Step 1: Replace src/pages/blog/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';

const allPosts = (await getCollection('blog', ({ data }: any) => !data.draft))
  .sort((a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

const [featured, ...rest] = allPosts;

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
---

<Layout
  title="Blog"
  description="Artigos sobre liderança de alta performance, gestão estratégica de pessoas e desenvolvimento de equipes — por Eloyse Konell."
>
  <Nav />

  <main class="blog-main">
    <div class="wrap">
      <div class="blog-hero">
        <span class="eyebrow">Blog</span>
        <h1>Liderança. Estratégia. <em>Pessoas.</em></h1>
        <p class="lead">
          Reflexões e análises sobre o que separa organizações que crescem de forma sustentável
          das que ficam presas em ciclos de urgência.
        </p>
      </div>

      {!featured ? (
        <p class="no-posts">Novos artigos em breve.</p>
      ) : (
        <>
          <div class="featured-label">— Artigo em destaque</div>
          <a href={`/blog/${featured.slug}`} class="featured-card">
            {featured.data.coverImage && (
              <div
                class="featured-img"
                style={`background-image:url('${featured.data.coverImage}')`}
              ></div>
            )}
            <div class="featured-body">
              <div>
                {featured.data.tags[0] && (
                  <span class="feat-tag">{featured.data.tags[0]}</span>
                )}
                <h2 class="feat-title">{featured.data.title}</h2>
                <p class="feat-deck">{featured.data.deck}</p>
              </div>
              <div class="feat-meta">
                <time datetime={featured.data.pubDate.toISOString()}>
                  {formatDate(featured.data.pubDate)}
                </time>
                <span class="dot"></span>
                <span>{featured.data.readingTime}</span>
              </div>
            </div>
          </a>

          {rest.length > 0 && (
            <>
              <div class="all-articles-label">Todos os artigos</div>
              <div class="posts-grid">
                {rest.map((post: any) => (
                  <article class="post-card">
                    {post.data.tags.length > 0 && (
                      <div class="post-card-tags">
                        {post.data.tags.slice(0, 2).map((tag: string) => (
                          <span class="post-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <h3>
                      <a href={`/blog/${post.slug}`}>{post.data.title}</a>
                    </h3>
                    <p class="post-desc">{post.data.description}</p>
                    <div class="post-card-meta">
                      <time datetime={post.data.pubDate.toISOString()}>
                        {formatDate(post.data.pubDate)}
                      </time>
                      <span>{post.data.readingTime}</span>
                    </div>
                    <a href={`/blog/${post.slug}`} class="read-more">Ler artigo →</a>
                  </article>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  </main>

  <Footer />
</Layout>
```

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

Expected: Build succeeds. `/blog` page generated in `docs/blog/index.html`.

- [ ] **Step 3: Preview and visually verify blog index**

```bash
npm run preview
```

Open `http://localhost:4321/blog`. Verify:
- Hero section displays correctly
- "Novos artigos em breve" appears (no real articles yet — draft test post doesn't count)

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/index.astro
git commit -m "feat: rewrite blog index with featured article card and 3-col grid"
```

---

### Task 8: Migrate artigo-cadeira-vazia

**Files:**
- Create: `src/content/blog/cadeira-vazia.md`

- [ ] **Step 1: Create src/content/blog/cadeira-vazia.md**

```md
---
title: "A Cadeira Vazia na Sala de Reuniões: O Custo Invisível de Não Preparar Seus Líderes"
description: "Como o assessment estratégico transforma a fragilidade da sucessão em vantagem competitiva."
deck: "Mais de 60% das empresas brasileiras não têm plano de sucessão estruturado. E quando a fragilidade aparece, já é tarde."
pubDate: 2026-04-13
tags: ["Liderança"]
readingTime: "7 min de leitura"
coverImage: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1600&q=85"
related: ["sucessao-mal-planejada", "saude-mental-estrategia", "hora-de-mudar"]
---

Imagine o seguinte cenário: seu gerente comercial, responsável por 35% do faturamento da empresa, anuncia que está saindo. A pergunta que deveria ser simples se transforma em desafio: quem assume?

Se você sentiu um desconforto ao ler isso, não está sozinho.

Segundo dados recentes, mais de 60% das organizações brasileiras não possuem um plano de sucessão estruturado. E aqui está a verdade inconveniente: a maioria das empresas só percebe essa fragilidade quando já é tarde demais.

O resultado? Promoções e movimentações de cadeiras apressadas. Contratações externas que não atendem à cultura. Perda de conhecimento institucional e, inevitavelmente, impacto direto nos resultados do negócio.

::pullquote["A sustentabilidade de uma organização não se mede apenas por práticas ESG ou indicadores financeiros — ela passa, fundamentalmente, pela continuidade da liderança."]

## Assessment: muito além de um diagnóstico

Quando falamos em assessment de líderes, muitos ainda pensam em testes psicológicos isolados ou avaliações pontuais para processos seletivos. Essa visão é totalmente limitada.

Um processo de assessment para desenvolvimento de líderes funciona como um **mapeamento estratégico de capital humano**. E ele responde perguntas cruciais:

- Quem, hoje, tem potencial real para assumir posições críticas no futuro?
- Quais competências precisam ser desenvolvidas para garantir essa transição?
- Onde estão os gaps que podem comprometer a continuidade do negócio?
- Como acelerar a prontidão de talentos internos de forma estruturada?

Mais do que identificar pessoas, o assessment revela padrões, riscos e oportunidades que a observação cotidiana simplesmente não captura.

## O impacto real no negócio

Organizações que investem em assessment estruturado para desenvolvimento e sucessão colhem benefícios tangíveis. Os números falam por si:

:::data-grid
200% | do salário anual é o custo de substituir um executivo
60%  | das empresas não têm plano de sucessão
3x   | mais engajamento em times com plano estruturado
:::

Outros benefícios mensuráveis:

- **Aceleração da curva de aprendizado** — líderes preparados assumem com clareza sobre seus pontos de desenvolvimento
- **Preservação da cultura organizacional** — sucessores internos carregam o DNA da empresa
- **Decisões baseadas em dados** — menos "achismo", mais estratégia
- **Engajamento de talentos** — profissionais que enxergam um caminho claro de crescimento permanecem

## Por onde começar

Implementar uma estratégia de assessment para desenvolvimento de líderes não precisa ser um projeto faraônico. Mas precisa ser intencional.

**Primeiro:** reconhecer que sustentabilidade organizacional exige investimento contínuo em pessoas — não apenas em processos, tecnologia ou produtos.

**Segundo:** entender que assessment não é um evento. É um processo integrado à gestão de talentos.

**Terceiro**, e talvez o mais importante: aceitar que *a melhor hora para preparar sucessores é quando você ainda não precisa deles.*

::pullquote["A cadeira vazia na sala de reuniões não precisa ser um problema. Pode ser uma oportunidade planejada — uma transição que fortalece a organização em vez de fragilizá-la."]

A pergunta que fica é: **sua empresa está construindo esse futuro hoje?**

:::inline-cta{eyebrow="Vamos conversar" heading="Esse é exatamente o tipo de desafio que eu resolvo." link="https://wa.me/5547991443844"}
Se sua organização está em um momento de preparar sucessores ou estruturar a próxima geração de liderança, vamos trocar uma ideia.
:::
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. `docs/blog/cadeira-vazia/index.html` is generated.

- [ ] **Step 3: Preview and visually inspect the article**

```bash
npm run preview
```

Open `http://localhost:4321/blog/cadeira-vazia`. Verify:
- Breadcrumb shows "Artigos / Liderança / A Cadeira Vazia..."
- Title at 58px serif, centered
- Deck in italic below title
- Meta shows author, date, "7 min de leitura"
- Cover image (Unsplash) appears below header
- Pullquotes have bronze borders
- Data-grid shows 3 stats in bronze
- Inline-CTA block is dark with button
- Author bio shows at bottom
- Share icons appear
- Blog index at `/blog` now shows this as the featured article

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/cadeira-vazia.md
git commit -m "feat: add artigo cadeira-vazia — first migrated article"
```

---

### Task 9: Migrate artigo-sucessao-mal-planejada

**Files:**
- Create: `src/content/blog/sucessao-mal-planejada.md`

- [ ] **Step 1: Create src/content/blog/sucessao-mal-planejada.md**

```md
---
title: "Os Impactos da Sucessão Mal Planejada nas Organizações"
description: "O que acontece quando o capitão desaparece e não há ninguém preparado para assumir o leme."
deck: "O que acontece quando o capitão desaparece e não há ninguém preparado para assumir o leme."
pubDate: 2026-04-01
tags: ["Estratégia"]
readingTime: "6 min de leitura"
coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85"
related: ["cadeira-vazia", "sucessor-e-sucessao", "tecnico-virou-gestor"]
---

Imagine uma organização como um grande navio, navegando em águas turbulentas. O capitão, experiente e conhecedor de cada detalhe da embarcação, é o responsável por guiar a tripulação com segurança. Agora, pense no que aconteceria se, de repente, esse capitão desaparecesse, sem que houvesse um substituto preparado para assumir o leme. O navio ficaria à deriva, os tripulantes entrariam em pânico e o risco de colisão ou naufrágio seria iminente.

Essa metáfora ilustra com clareza o que ocorre nas empresas quando a sucessão de liderança é negligenciada.

A sucessão de liderança é um dos pilares mais críticos para o sucesso organizacional, mas, infelizmente, muitas empresas tratam o tema como uma preocupação distante, algo a ser resolvido apenas quando a crise já está instalada. O resultado? Transições abruptas, desorganizadas e, muitas vezes, caóticas.

::pullquote["O que poderia ser um processo natural de renovação e continuidade acaba se transformando em um verdadeiro incêndio organizacional."]

Processos são interrompidos, conhecimento estratégico se perde, a produtividade despenca e, no meio do caos, a confiança da equipe é abalada.

## Além da substituição de um líder

O problema vai além da substituição de um líder. Uma sucessão mal planejada é como arrancar uma peça fundamental de uma engrenagem sem ter um substituto à mão. A organização não perde um profissional; perde a continuidade estratégica, a estabilidade e a visão de longo prazo que mantêm o negócio funcionando.

O vazio deixado por um líder que parte sem uma transição cuidadosa pode desencadear uma série de efeitos negativos:

- Sobrecarga para outros gestores
- Decisões impulsivas e desalinhadas
- Clima organizacional marcado pela incerteza e desmotivação

## Da crise à oportunidade

Para evitar esse cenário, é essencial que a sucessão seja tratada como um processo contínuo e estratégico, e não como uma medida de emergência. Imagine uma organização que, em vez de esperar pela crise, constrói um pipeline de talentos robusto, alinhado à sua estratégia e cultura.

Nesse cenário, a sucessão não é um problema, mas uma oportunidade. Uma oportunidade de fortalecer a organização, de preparar líderes internos que já compreendem a essência do negócio e de garantir que a transição seja suave, sem rupturas ou perdas significativas.

Quando a sucessão é planejada com antecedência, a organização colhe diversos benefícios: reduz-se o risco de lacunas de liderança inesperadas, a continuidade é preservada nos processos, no conhecimento e nos valores culturais, e a empresa ganha a chance de desenvolver líderes internos alinhados com a visão de longo prazo.

Segundo uma pesquisa da Harvard Business Review, **cerca de 60% das organizações não possuem um plano de sucessão estruturado**. Por outro lado, estudos da Gallup mostram que empresas com planos de sucessão bem definidos têm **33% mais chances de alcançar suas metas estratégicas**.

::pullquote["A sucessão, quando bem planejada, não é apenas uma resposta a uma crise iminente, mas uma oportunidade de fortalecer a organização e garantir que ela esteja sempre um passo à frente."]

A gestão de sucessão não deve ser vista como um mero protocolo de emergência, mas como um investimento estratégico no futuro da organização. É a garantia de que, quando o capitão partir, haverá alguém preparado para assumir o leme, mantendo o navio no curso certo, rumo a águas promissoras.

:::inline-cta{eyebrow="Vamos conversar" heading="Esse é exatamente o tipo de desafio que eu resolvo." link="https://wa.me/5547991443844"}
Se esse tema faz sentido para o momento da sua organização, vamos trocar uma ideia.
:::
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: Build succeeds. `docs/blog/sucessao-mal-planejada/index.html` generated.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/sucessao-mal-planejada.md
git commit -m "feat: add artigo sucessao-mal-planejada"
```

---

### Task 10: Migrate artigo-saude-mental

**Files:**
- Create: `src/content/blog/saude-mental-estrategia.md`

- [ ] **Step 1: Create src/content/blog/saude-mental-estrategia.md**

```md
---
title: "Liderança no Limite: Saúde Mental Não é Luxo, é Estratégia"
description: "Fala-se muito de saúde mental nas empresas, mas pouco da saúde mental de quem lidera. E o impacto reverbera em cascata."
deck: "Fala-se muito de saúde mental nas empresas, mas pouco da saúde mental de quem lidera. E o impacto reverbera em cascata."
pubDate: 2026-04-10
tags: ["Performance"]
readingTime: "6 min de leitura"
coverImage: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=1600&q=85"
related: ["hora-de-mudar", "cadeira-vazia", "rh-futuro"]
---

Quantos líderes você conhece que terminam o dia com a sensação de nunca ter feito o suficiente? Que carregam a pressão de bater metas, manter o time engajado e ainda transmitir confiança — mesmo quando por dentro estão esgotados? Essa é a realidade silenciosa de grande parte das lideranças hoje.

Fala-se muito de saúde mental nas empresas, mas ainda pouco da saúde mental dos líderes. É comum ver iniciativas voltadas para os times — aplicativos de terapia, palestras motivacionais, campanhas de calendário. Mas quem carrega a responsabilidade de inspirar, sustentar resultados e tomar decisões em ambientes incertos muitas vezes não encontra espaço para admitir vulnerabilidade.

O resultado? **Líderes adoecem em silêncio**, e o impacto reverbera em cascata pela organização.

::pullquote["O problema não é falta de boas intenções, mas de profundidade. Programas de bem-estar não compensam jornadas desorganizadas e a cultura da disponibilidade 24/7."]

## O que diferencia líderes que preservam a saúde mental

- **Clareza estratégica:** eliminar a névoa de prioridades confusas reduz ansiedade
- **Ritmos sustentáveis:** alternar intensidade com pausas protege a energia coletiva
- **Escuta genuína:** o espaço para escuta verdadeira permite detectar sinais de esgotamento cedo
- **Exemplo pessoal:** um líder que respeita seus próprios limites autoriza o time a fazer o mesmo

## Quem cuida do cuidador?

Mas há um ponto raramente discutido: quem cuida do cuidador? Líderes são preparados para apoiar seus times, mas não recebem espaço para expor pressões, dúvidas e solidão no cargo. A ausência desse suporte transforma a liderança em gargalo tóxico. Conselhos, alta gestão e o RH precisam colocar o bem-estar dos líderes no centro da estratégia.

## Do discurso à prática

- Incluir indicadores de bem-estar no mesmo painel que mede performance
- Fazer auditorias de carga de trabalho com a mesma seriedade das auditorias financeiras
- Valorizar líderes não só pelos números, mas pela qualidade de ambiente que constroem
- Criar fóruns seguros para que líderes compartilhem vulnerabilidades sem medo de julgamento

::pullquote["Saúde mental não pode ser vista como luxo. É fator crítico de performance sustentável."]

Empresas que entendem isso não apenas reduzem turnover e aumentam engajamento, mas constroem culturas de confiança capazes de atravessar qualquer crise.

E você, como líder, **tem cuidado de si com a mesma intensidade que cuida do seu time?**

:::inline-cta{eyebrow="Vamos conversar" heading="Esse é exatamente o tipo de desafio que eu resolvo." link="https://wa.me/5547991443844"}
Se esse tema faz sentido para o momento da sua organização, vamos trocar uma ideia.
:::
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/saude-mental-estrategia.md
git commit -m "feat: add artigo saude-mental-estrategia"
```

---

### Task 11: Migrate artigo-hora-de-mudar

**Files:**
- Create: `src/content/blog/hora-de-mudar.md`

- [ ] **Step 1: Create src/content/blog/hora-de-mudar.md**

```md
---
title: "Quando Chega a Hora de Mudar"
description: "O ponto de inflexão de quem ocupa o topo — e por que a mentoria se torna o diferencial decisivo na travessia."
deck: "O ponto de inflexão de quem ocupa o topo — e por que a mentoria se torna o diferencial decisivo na travessia."
pubDate: 2026-04-05
tags: ["Pessoas"]
readingTime: "8 min de leitura"
coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85"
related: ["tecnico-virou-gestor", "saude-mental-estrategia", "sucessao-mal-planejada"]
---

Você já acordou com a sensação de que algo não encaixa mais? Não é o salário. Não é a equipe. Não é nem a empresa, necessariamente. É algo mais profundo: a percepção de que o caminho que te trouxe até aqui não é mais o caminho que te leva adiante.

Se você é líder e está sentindo isso, saiba: você está longe de ser o único.

## O cenário que ninguém conta nos bastidores da liderança

Dados recentes revelam um panorama impressionante. **Cerca de 70% dos profissionais estão ativamente considerando uma mudança de carreira.** Entre líderes de nível sênior, diretores e C-level, esse número cresce à medida que o mundo do trabalho se transforma.

Um estudo da Deloitte (Global Human Capital Trends, 2025) identificou que 73% das organizações reconhecem a necessidade de reinventar o papel dos seus líderes. No entanto, **apenas 7% estão efetivamente fazendo progresso** nessa direção.

E o que acontece com o líder nesse cenário? Ele fica preso entre a pressão por resultados e a sensação crescente de que precisa de algo diferente.

::pullquote["A pergunta não é se você vai precisar se reinventar. É quando."]

## Por que mudar é tão difícil para quem lidera?

Para a maioria dos profissionais, uma transição de carreira é um desafio logístico. Para líderes, a questão é muito mais profunda. A identidade profissional de um líder está entrelaçada com o cargo. Decidir mudar significa, em certa medida, questionar a própria identidade.

- **O peso da visibilidade.** Quanto mais alto você está, mais olhos estão sobre você. Mudar de direção pode gerar julgamento
- **A ilusão do "já cheguei".** Muitos líderes sentem culpa por querer algo diferente quando "já conquistaram tanto"
- **O medo do recomeço.** Começar algo novo depois de décadas construindo expertise pode parecer um retrocesso. Mas raramente é
- **O isolamento na decisão.** Líderes costumam ser procurados para aconselhar os outros. Quando são eles que precisam de direção, frequentemente não sabem a quem recorrer

## O que mais de 10 anos com líderes me ensinaram

O que aprendi nesse tempo é que a mudança não precisa ser um salto no escuro. Com o direcionamento certo, ela se transforma em uma transição consciente, com etapas definidas, riscos calculados e clareza sobre o que realmente importa.

- **O timing importa mais do que a coragem.** Esperar o momento certo, com preparação e direção, é muito mais inteligente do que agir por impulso
- **Autoconhecimento é a base de tudo.** Antes de saber para onde ir, o líder precisa entender quem ele é além do cargo
- **Transição não é abandono, é evolução.** A experiência acumulada, as relações, as competências — tudo isso é transferível
- **Rede e reposicionamento são tão importantes quanto competência.** O líder em transição precisa reposicionar sua narrativa profissional e ativar conexões estratégicas
- **O processo emocional é real e precisa de espaço.** Transição de carreira mexe com ego, identidade, segurança financeira, dinâmica familiar

::pullquote["O arrependimento mais comum entre pessoas que mudaram de carreira não é ter mudado. É ter demorado para mudar."]

Mudar não significa que você fracassou onde estava. Significa que você está evoluindo. E evolução, especialmente na liderança, exige acompanhamento.

Você não precisa ter todas as respostas agora. **Você precisa dar o primeiro passo com a orientação certa.**

:::inline-cta{eyebrow="Vamos conversar" heading="Esse é exatamente o tipo de desafio que eu resolvo." link="https://wa.me/5547991443844"}
Se você está vivendo um momento de transição e quer caminhar com clareza, vamos trocar uma ideia.
:::
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/hora-de-mudar.md
git commit -m "feat: add artigo hora-de-mudar"
```

---

### Task 12: Migrate artigo-rh-futuro

**Files:**
- Create: `src/content/blog/rh-futuro.md`

- [ ] **Step 1: Create src/content/blog/rh-futuro.md**

```md
---
title: "Da Intenção à Execução: O RH do Futuro Não Se Constrói com Palavras"
description: "Os sinais não são sutis. Eles estão gritando. E o RH que permanece relevante é o RH antifrágil."
deck: "Os sinais não são sutis. Eles estão gritando. E o RH que permanece relevante é o RH antifrágil."
pubDate: 2026-04-20
tags: ["Estratégia"]
readingTime: "9 min de leitura"
coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85"
related: ["cadeira-vazia", "sucessor-e-sucessao", "saude-mental-estrategia"]
---

Chegou a hora de tirar o RH do discurso bonito e colocá-lo no centro das decisões que moldam o futuro dos negócios. Durante anos, falamos sobre o futuro do RH. Agora ele está aqui — urgente, implacável e cheio de oportunidades para quem tiver coragem de encarar a realidade e sair da superficialidade da zona de conforto.

Os sinais não são sutis. Eles estão gritando:

- O engajamento global dos colaboradores está **parado em 23% há mais de duas décadas** (Gallup, 2024)
- **Apenas 12% dos RHs** usam inteligência artificial ativamente — enquanto o Marketing já opera com 34% de adoção (McKinsey, 2024)
- O desengajamento custa **US$ 8,8 trilhões por ano** à economia global. Uma perda invisível, porém monumental

Esses dados não são apenas estatísticas. São sintomas de um RH que ainda insiste em operar como coadjuvante, quando o jogo exige liderança estratégica e protagonismo real.

## Verdades duras (e libertadoras)

### 1. Estamos sendo ultrapassados

Enquanto o RH ainda discute se deve ou não experimentar novas tecnologias, áreas como Marketing e Operações já escalam decisões baseadas em dados, IA e automação inteligente. Não é sobre "ficar digital". É sobre **conquistar relevância**.

### 2. A maior crise de talentos da história já começou

- **44% das habilidades atuais** estarão obsoletas até 2030 (WEF)
- Até 2027, **60% da força de trabalho** precisará ser requalificada
- Mesmo assim, **apenas 15% das empresas** fazem planejamento estratégico de talentos

::pullquote["Negar essa realidade é escolher a escassez. E o preço da inação será alto."]

### 3. A força invisível está gritando — e o RH está surdo

- Os **silver workers** são o grupo que mais cresce, mas estão fora dos planos de desenvolvimento
- **95% das mulheres** temem ser penalizadas por buscar flexibilidade — o que indica que ainda não entregamos equidade real
- **40% da geração Z** convive com ansiedade crônica e, em vez de repensar o modelo de trabalho, tratamos isso como "falta de resiliência"

## O RH Antifrágil

A grande pergunta não é mais "o que fazer?", mas sim: **o que você ainda está esperando para fazer o que já sabe que precisa ser feito?**

O RH que permanece relevante é o RH Antifrágil. Não o que se adapta apenas. Mas o que cresce na complexidade, lidera a transição e impulsiona inovação real. Um RH que:

- Adota a IA como parceira de decisões estratégicas, sem abrir mão do olhar humano
- Domina dados e storytelling para influenciar e pautar decisões de negócio
- Desenvolve habilidades do agora e do futuro, com foco em impacto e adaptabilidade
- Inclui verdadeiramente todas as vozes e talentos nos sistemas de decisão
- Executa com consistência — e não apenas planeja

::pullquote["Segunda-feira você volta à rotina... ou vira o jogo?"]

Você pode manter o status quo e ver talentos escaparem, reputações erodirem e resultados minguarem. Ou pode liderar a construção do RH que sua organização precisa para continuar existindo nos próximos anos.

Porque o RH do futuro já começou. E você ainda tem tempo de fazer parte dele, **como protagonista**.

:::inline-cta{eyebrow="Vamos conversar" heading="Tenho ferramentas, projetos e metodologias prontas para impulsionar essa virada junto com você." link="https://wa.me/5547991443844"}
Se este artigo te provocou, fale comigo.
:::
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/rh-futuro.md
git commit -m "feat: add artigo rh-futuro"
```

---

### Task 13: Migrate artigo-tecnico-virou-gestor

**Files:**
- Create: `src/content/blog/tecnico-virou-gestor.md`

- [ ] **Step 1: Create src/content/blog/tecnico-virou-gestor.md**

```md
---
title: "O Melhor Técnico do Time Virou Gestor. E Tudo Desmoronou."
description: "Competência técnica e competência de gestão não são a mesma coisa. E o sistema que confunde as duas está quebrando times inteiros."
deck: "Competência técnica e competência de gestão não são a mesma coisa. E o sistema que confunde as duas está quebrando times inteiros."
pubDate: 2026-04-14
tags: ["Liderança"]
readingTime: "7 min de leitura"
coverImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=85"
related: ["cadeira-vazia", "sucessao-mal-planejada", "hora-de-mudar"]
---

Ele era o engenheiro que resolvia tudo. Entregava antes do prazo, dominava cada detalhe. Quando a vaga de coordenação abriu, não havia dúvida.

Seis meses depois, três pessoas pediram demissão.

Não por incompetência dele. Mas porque **ninguém o avisou que liderar pessoas exige um conjunto de habilidades completamente diferente de executar tarefas.**

Essa história é fictícia. Mas eu a vejo se repetir toda semana. E é aí que mora o problema.

::pullquote["Competência técnica e competência de gestão não são a mesma coisa. Não são sequer uma evolução linear."]

São domínios distintos. Um exige conhecimento de processos, ferramentas, métricas. O outro exige leitura de pessoas, regulação emocional, capacidade de influenciar sem controlar.

Na psicologia organizacional, existe um conceito chamado **Princípio de Peter**: as pessoas são promovidas até atingirem o nível de sua incompetência. Não porque sejam incapazes, mas porque o sistema premia performance individual e assume que ela se traduz automaticamente em capacidade de gestão.

O resultado aparece rápido nos indicadores:

- Turnover que não para de subir
- Clima organizacional deteriorado
- Talentos saindo para a concorrência
- Produtividade estagnada apesar de mais cobrança

E o líder, que antes era a referência do time, vira o gargalo. Centraliza decisões, não delega, e acaba sobrecarregado fazendo o trabalho que deveria ensinar outros a fazer.

## Por que a maioria das empresas não resolve isso?

Porque falta diagnóstico.

Existe uma cultura de "aprender liderando" que soa bonita, mas na prática significa jogar alguém na água sem boia e torcer para que nade.

Sem ferramentas que ajudem o líder a entender seu próprio perfil, seus pontos cegos e como ele impacta a dinâmica da equipe, a tendência é repetir os mesmos padrões. Os que funcionavam como executor. Mas que travam como gestor.

:::exercise{title="Exercício prático" description="Se você se reconheceu, responda com honestidade:"}
01 | **Quanto do seu dia é gasto resolvendo problemas operacionais que sua equipe deveria resolver sozinha?** | Se a resposta for "mais da metade", você está operando como executor, não como gestor. Não é crítica — é um sinal de que o sistema não te deu as ferramentas certas.
02 | **Qual foi a última vez que você teve uma conversa com um liderado sobre o desenvolvimento dele — e não sobre uma entrega?** | Conversas sobre entregas são gestão de tarefas. Conversas sobre desenvolvimento são gestão de pessoas. A diferença define o tipo de líder que você está sendo.
03 | **Se você saísse de férias por 30 dias, sua equipe manteria a operação rodando?** | Se a resposta for "não" ou "talvez, com muito medo", o problema não é a equipe. É que a liderança está concentrada em uma pessoa. E isso é um risco para o negócio.
:::

## A boa notícia

Esse gap não é permanente. É um **gap de consciência, não de capacidade**.

Quando um líder entende como seu perfil comportamental impacta a equipe, onde estão seus pontos cegos e quais alavancas de mudança estão ao alcance, a transformação é rápida.

É exatamente isso que o **Assessment comportamental** faz. Funciona como um espelho estratégico: mostra o líder que você é hoje, e o caminho para o líder que a sua equipe precisa.

::pullquote["Esse gap não é permanente. É um gap de consciência, não de capacidade."]

Conhece um líder que precisa ler isso? Encaminhe essa edição. Às vezes, **a mudança começa com uma boa leitura.**

:::inline-cta{eyebrow="Vamos conversar" heading="Esse é exatamente o tipo de desafio que eu resolvo." link="https://wa.me/5547991443844"}
Se esse tema faz sentido para o momento da sua organização, vamos trocar uma ideia.
:::
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/tecnico-virou-gestor.md
git commit -m "feat: add artigo tecnico-virou-gestor"
```

---

### Task 14: Migrate artigo-sucessor-e-sucessao

**Files:**
- Create: `src/content/blog/sucessor-e-sucessao.md`

- [ ] **Step 1: Create src/content/blog/sucessor-e-sucessao.md**

```md
---
title: "Sua Empresa Tem um Sucessor. Mas Tem uma Sucessão?"
description: "A maioria das empresas tem um nome. Quase nenhuma tem o processo. E a diferença entre os dois custa bilhões."
deck: "A maioria das empresas tem um nome. Quase nenhuma tem o processo. E a diferença entre os dois custa bilhões."
pubDate: 2026-04-28
tags: ["Estratégia"]
readingTime: "9 min de leitura"
coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85"
related: ["cadeira-vazia", "sucessao-mal-planejada", "tecnico-virou-gestor"]
---

Na edição passada, escrevi sobre o melhor técnico do time virando gestor sem preparo. Hoje trato de uma versão maior, e mais cara, do mesmo erro de lógica.

A cena se repete em quase todo planejamento estratégico que acompanho. Reunião do conselho, slides bem feitos. O fundador apresenta o nome do sucessor escolhido: alguém que está na casa há quinze anos, conhece a operação como ninguém, entrega resultados consistentes. Há aplausos. Comunicado oficial. Brinde no fim da tarde.

::pullquote["A maioria das empresas tem um sucessor nomeado. Quase nenhuma tem uma sucessão."]

Dezoito meses depois, o sucessor pediu transferência, foi reposicionado em uma vaga de menor exposição, ou continua no cargo travando todas as decisões importantes. A operação que parecia sólida começa a rachar de formas que ninguém previu.

E quase nunca é sobre a pessoa escolhida. Quem é escolhido para suceder costuma ser o melhor executor. **Quem precisa ser formado é outra pessoa.** E raramente é a mesma.

## Sucessão não é decisão. É construção.

Existe uma confusão que custa caro: tratar "plano de sucessão" e "construção de sucessão" como sinônimos. Não são.

**Plano de sucessão** é o documento. Tem nome do candidato, prazo estimado, talvez uma matriz de competências preenchida. Dura uma reunião de conselho.

**Construção de sucessão** é o processo. Leva entre três e sete anos. Envolve formar a pessoa em decisões progressivamente mais complexas, expô-la a contextos que ela não domina, dar autonomia real — não simulada — sobre áreas que importam, e criar mecanismos para que ela aprenda a errar antes de assumir a cadeira definitiva.

Pesquisa da PwC Family Business Survey indica que **apenas 34% das empresas familiares americanas** têm um plano de sucessão robusto, documentado e comunicado. E plano comunicado, vale dizer, ainda é menos do que sucessão construída.

## O critério usado é quase sempre o errado

Quem costuma ser escolhido para suceder: o mais leal, o mais antigo, o mais técnico, o que mais se parece com quem está saindo. **Quatro critérios que dizem muito sobre o passado e quase nada sobre a capacidade de sustentar o futuro.**

Quem precisa ser formado é outra pessoa:

- Leitura sistêmica do negócio, não apenas domínio operacional
- Regulação emocional sob pressão, em decisões ambíguas
- Autonomia decisória sem necessidade constante de validação
- Capacidade de gerir conflito sem evitá-lo

John A. Davis, professor de Harvard e hoje no MIT Sloan, criou em 1978 o modelo das três dimensões do negócio familiar: família, propriedade e gestão. A tese central segue atual: sucessão não acontece em uma dessas dimensões isolada, mas no equilíbrio entre as três.

## O caso Disney

Em fevereiro de 2020, depois de adiar a aposentadoria quatro vezes, Bob Iger escolheu Bob Chapek como sucessor. Chapek vinha da divisão de parques, conhecia operação, era leal. Em menos de três anos, foi demitido pelo conselho. Iger voltou ao cargo em novembro de 2022 e descreveu a indicação como um dos maiores erros da própria carreira.

::pullquote["A operação não desabou por incompetência do sucessor. Desabou porque ele foi escolhido para executar. E o cargo exigia algo de outra natureza."]

## O custo é maior do que parece

:::data-grid
US$ 1,4bi | perda extra em valor de mercado em transições não planejadas
30%       | das empresas familiares sobrevivem à 2ª geração
3%        | chegam à 4ª geração
:::

E há o custo invisível. Cultura organizacional que se quebra. Time da segunda linha que perde referência e começa a sair. Clientes que percebem instabilidade. Decisões estratégicas congeladas por seis a doze meses enquanto a empresa "espera o novo líder se firmar". Esse custo silencioso reorganiza o resultado dos próximos cinco anos.

:::exercise{title="Exercício prático" description="Três perguntas que definem se você está construindo sucessão, ou só nomeando alguém:"}
01 | **Se você precisasse sair em seis meses, quem assumiria — e o que essa pessoa precisaria aprender nos próximos três anos?** | Se a resposta para a segunda parte for "muita coisa", você tem um nome. Não tem uma sucessão.
02 | **Quantas decisões estratégicas, no último trimestre, passaram exclusivamente por você?** | Cada decisão que só você consegue tomar é uma decisão que ninguém ao seu lado está sendo formado para tomar. E é também um ponto de fragilidade do negócio.
03 | **Existe alguém na sua empresa hoje que pode te dizer "não" e ser ouvido?** | Sucessores não se formam em ambientes onde só uma voz importa. Se ninguém te confronta, ninguém está aprendendo a ocupar o seu lugar.
:::

## Onde a construção começa

**Sucessão começa quando o líder atual decide formar pessoas. Não quando decide sair.**

Quem espera o anúncio da aposentadoria para iniciar o processo já chegou tarde. A pergunta que define se uma empresa está se preparando para suceder não é "quem vai assumir?". É outra: quantas pessoas, hoje, na sua organização, têm exposição real às decisões que você toma sozinho?

Se a resposta for "nenhuma", o problema não é encontrar sucessor. É que não há ninguém em formação.

Conhece um líder que precisa ler isso? Encaminhe essa edição. **A construção de sucessão começa, muitas vezes, com uma boa leitura no momento certo.**

:::inline-cta{eyebrow="Vamos conversar" heading="Esse é exatamente o tipo de desafio que eu resolvo." link="https://wa.me/5547991443844"}
Se a sucessão na sua empresa ainda é um nome num slide, vamos transformar isso em processo real.
:::
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/sucessor-e-sucessao.md
git commit -m "feat: add artigo sucessor-e-sucessao"
```

---

### Task 15: Final build, visual verification, and cleanup

**Files:**
- Delete: `src/content/blog/_directive-test.md`

- [ ] **Step 1: Delete test article**

```bash
rm src/content/blog/_directive-test.md
```

- [ ] **Step 2: Full build**

```bash
npm run build
```

Expected: Build succeeds with 0 errors. `docs/` contains 7 blog article pages + 1 index.

- [ ] **Step 3: Preview and verify all pages**

```bash
npm run preview
```

Check the following:

| Page | What to verify |
|---|---|
| `/blog` | Featured card shows most recent article (sucessor-e-sucessao, 2026-04-28); 6 other articles in 3-col grid below |
| `/blog/cadeira-vazia` | Cover image, pullquotes, data-grid (3 stats), inline-cta, author bio, share icons, 3 related cards |
| `/blog/tecnico-virou-gestor` | Exercise section renders with 3 numbered items |
| `/blog/sucessor-e-sucessao` | Both data-grid AND exercise section render correctly |
| Main site `/` | Hero and all sections unaffected by changes |

- [ ] **Step 4: Commit cleanup**

```bash
git add -A
git commit -m "feat: complete blog redesign — 7 articles migrated, layout matches reference design"
```

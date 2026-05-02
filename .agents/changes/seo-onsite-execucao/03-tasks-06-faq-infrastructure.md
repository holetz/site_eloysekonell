---
id: "06"
phase: 1
complexity: high
depends_on: []
files: ["remark-blog-directives.mjs", "src/content/config.ts", "src/components/FaqBlock.astro", "src/layouts/BlogLayout.astro"]
---

# Task 06 — FAQ infrastructure (directive + collection field + schema emitter)

## Objective

Habilitar FAQs estruturados em posts: campo opcional `faq` no frontmatter, directive remark `:::faq`, componente visual `FaqBlock`, e emissão de `FAQPage` schema.

## Detailed Steps

1. Marcar `status: 🔄` para id "06".

2. **Estender `src/content/config.ts`:**
   - Adicionar field opcional ao schema da collection `blog`:
     ```ts
     faq: z.array(z.object({
       q: z.string().min(1),
       a: z.string().min(1)
     })).optional()
     ```
   - **Não alterar** outros fields existentes.

3. **Estender `remark-blog-directives.mjs`:**
   - Adicionar suporte para directive `:::faq` (container directive). Sintaxe esperada no Markdown:
     ```
     :::faq
     ### Pergunta 1?
     Resposta direta em 1-2 frases.

     ### Pergunta 2?
     Resposta.
     :::
     ```
   - Renderizar como `<section class="faq-block">` contendo `<details><summary>` por par. **Não** emitir JSON-LD aqui — isso fica no FaqBlock/Layout (preferimos o field `faq` do frontmatter como source-of-truth para schema).
   - Se directive presente E field ausente, parsear pares para popular `faq` virtualmente em runtime (best-effort, opcional — se complexo, deixar para depois e priorizar field).

4. **Criar `src/components/FaqBlock.astro`:**
   - Props: `faqs: Array<{ q: string, a: string }>`, `title?: string` (default "Perguntas frequentes").
   - Render visual: `<section class="faq-block">` + `<h2>` + lista de `<details><summary>{q}</summary><p>{a}</p></details>`. Estilo escopado.
   - Emite JSON-LD `FAQPage`:
     ```json
     {
       "@context": "https://schema.org",
       "@type": "FAQPage",
       "mainEntity": [
         { "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } }
       ]
     }
     ```

5. **Estender `src/layouts/BlogLayout.astro`:**
   - Após o `<slot />` (corpo do post) e antes da author bio, se `post.data.faq?.length`, renderizar `<FaqBlock faqs={post.data.faq} />`.
   - Coexistir com S03 (Article schema) — `FAQPage` é schema separado, ambos podem coexistir.

6. Rodar `npm run build`. Verde.

7. Smoke: criar temporariamente um post com `faq` no frontmatter (ou usar um existente em S21 depois) — confirmar render visual e JSON-LD presentes. Reverter o teste antes de commitar.

8. Commit: `feat: infraestrutura de FAQ (directive, schema, component)`.

9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `config.ts` aceita field `faq` opcional sem quebrar posts existentes.
- [ ] `remark-blog-directives.mjs` reconhece `:::faq` como directive válido.
- [ ] `FaqBlock.astro` renderiza corretamente e emite `FAQPage` JSON-LD.
- [ ] `BlogLayout.astro` integra o bloco quando `faq` existe.
- [ ] Posts existentes (sem `faq`) continuam buildando sem warnings.
- [ ] `npm run build` verde.

## Testing

- Build verde em todos os 8 posts existentes (sem FAQ ainda — S21 popula).
- Schema Validator em post de teste com FAQ — `FAQPage` reconhecido.

## Notes

- Esta task é **pré-requisito** para S20 (`/faq/` page reusa `FaqBlock`), S21 (8 posts com FAQ), S22 (4 posts novos com FAQ).
- Se directive `:::faq` der trabalho excessivo, **priorizar** o field `faq` do frontmatter — é o que vai ser usado nas tasks posteriores. Directive vira nice-to-have.
- `FAQPage` aceita múltiplas em uma página? Sim. Mas só um por página é o ideal — então `FaqBlock` emite um, e `/faq/` (S20) emite o seu próprio com as 15-20 perguntas consolidadas.

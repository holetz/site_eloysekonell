---
id: "22"
phase: 4
complexity: high
depends_on: ["06"]
files: ["src/content/blog/identificar-potencial-de-lideranca.md", "src/content/blog/lideranca-tecnica-vs-humana.md", "src/content/blog/sucessao-empresa-familiar.md", "src/content/blog/feedback-continuo-90-dias.md"]
---

# Task 22 — 4 posts novos do cluster

## Objective

Criar 4 posts novos do cluster de SEO, 800-1.200 palavras cada, com FAQ e links para pillar pages. Todos com `draft: true`.

## Detailed Steps

1. Marcar `status: 🔄` para id "22".

2. **Posts a criar (slugs e temas):**

   | Slug | Título sugerido | Pillar relacionada (link interno) |
   |---|---|---|
   | `identificar-potencial-de-lideranca` | "Como identificar potencial de liderança na sua equipe" | `/servicos/desenvolvimento-de-liderancas/` |
   | `lideranca-tecnica-vs-humana` | "Liderança técnica vs liderança humana: o gap nas PMEs" | `/servicos/desenvolvimento-de-liderancas/` |
   | `sucessao-empresa-familiar` | "Plano de sucessão para empresa familiar: o básico que ninguém conta" | `/servicos/gestao-estrategica-de-pessoas/` |
   | `feedback-continuo-90-dias` | "Feedback contínuo: framework para implantar em 90 dias" | `/servicos/gestao-estrategica-de-pessoas/` |

3. **Para cada post, criar `.md` com:**
   - **Frontmatter completo** (referência: schema em `src/content/config.ts`):
     ```yaml
     ---
     title: "..."
     description: "..."  # 130-160 chars
     deck: "..."         # 1 frase de chamada
     pubDate: 2026-MM-DD  # distribuir nas 8 semanas (ex: +1 semana, +3 semanas, +5 semanas, +7 semanas)
     readingTime: "8 min"
     coverImage: "https://images.unsplash.com/..."  # imagem temática
     ogImage: "https://images.unsplash.com/...?w=1200&q=85"
     tags: ["liderança", "PME", ...]  # consistente com taxonomia atual
     draft: true
     related: ["sucessor-e-sucessao", "tecnico-virou-gestor"]  # 2 posts existentes relacionados
     faq:
       - q: "..."
         a: "..."
       # 3-5 perguntas
     ---
     ```
   - **Body (800-1.200 palavras):**
     - Lead (primeiro parágrafo) com a tese principal.
     - 4-6 H2s, **a maioria em formato pergunta** com resposta direta em 2-3 frases.
     - Subseções com exemplos concretos (mesmo hipotéticos) e 1-2 listas/bullets.
     - **Link para a pillar page** relacionada (1 vez no corpo, naturalmente).
     - **Link para 1 post existente** relacionado.
     - Fechamento com convite à ação (link para `/contato/` ou para a pillar).
   - **Voz**: formal-acolhedora, frases curtas, sem jargão MBA.

4. **Distribuição de `pubDate`:** começando em ~2026-05-09 (próxima semana), espaçar de 2 em 2 semanas. Ex:
   - identificar-potencial-de-lideranca: 2026-05-09
   - lideranca-tecnica-vs-humana: 2026-05-23
   - sucessao-empresa-familiar: 2026-06-06
   - feedback-continuo-90-dias: 2026-06-20

5. Rodar `npm run build`. Verde — posts em `draft: true` não aparecem em listagens nem rotas.

6. Smoke: temporariamente marcar `draft: false` em 1 post para validar render. Reverter antes de commit.

7. Commit: `content: criar 4 posts novos do cluster (drafts)`.

8. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] 4 arquivos `.md` criados em `src/content/blog/`.
- [ ] Cada um com 800-1.200 palavras.
- [ ] Cada um com field `faq` (3-5 Q&As).
- [ ] Cada um linka a pillar page relacionada (1×).
- [ ] Cada um linka a 1 post existente.
- [ ] Todos com `draft: true`.
- [ ] Frontmatter cumpre schema da collection `blog`.
- [ ] Build verde.

## Testing

- Build verde.
- Validar 1 post com `draft: false` temporário — schema Article + FAQPage presentes.

## Notes

- **Não inventar dados específicos da Eloyse** que não estejam em `credenciais.ts` ou nos componentes existentes.
- Usar exemplos hipotéticos rotulados como tal ("imagine uma empresa de 30 pessoas..."), não casos reais.
- Promoção de `draft: true` para `false` é manual (Eloyse) após revisão — protocolo aplicado também aqui.
- Cover image do Unsplash com query temática (ex: "team meeting", "succession planning") — manter padrão do site.

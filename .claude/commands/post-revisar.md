---
description: Revisa o post da branch atual usando o subagente editor-blog (voz, estrutura, SEO)
---

Você vai revisar o draft do post atual da branch `post/*`.

## 1. Detecte o post atual

Rode `git rev-parse --abbrev-ref HEAD`. Se a branch **não** começar com `post/`, pare e avise o usuário que o comando só funciona em branches de post (`post/<slug>`).

Caso contrário, extraia o `<slug>` (parte após `post/`) e confirme com `Read` que `src/content/blog/<slug>.md` existe.

## 2. Invoque o subagente editor-blog

Use a ferramenta `Agent` com:
- `subagent_type: "editor-blog"`
- `description: "Revisão editorial do post <slug>"`
- `prompt`: peça a revisão completa do arquivo `src/content/blog/<slug>.md`. Inclua o caminho absoluto. Peça achados estruturados por dimensão (voz, estrutura, frontmatter, SEO) e uma lista priorizada de sugestões.

## 3. Apresente os achados

Mostre as sugestões do subagente ao usuário, **agrupadas por dimensão**, de forma legível. Para cada sugestão crítica/média, ofereça aplicar.

## 4. Aplique seletivamente

Pergunte ao usuário quais sugestões aplicar. Aplique **apenas** as aprovadas — use `Edit` para mudanças pontuais. Não reescreva o post inteiro a menos que o usuário peça explicitamente.

## 5. Confirme

Reporte em 1-2 linhas o que foi alterado e sugira o próximo passo (revisar visualmente em http://localhost:4321/blog/<slug> e depois `/post-publicar`).

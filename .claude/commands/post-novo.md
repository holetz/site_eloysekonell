---
description: Cria novo post de blog a partir de um briefing — gera conteúdo completo, branch e dev server
argument-hint: <briefing livre — ex: "post sobre como medir ROI de mentoria executiva">
---

Você vai criar um novo post de blog para o site da Eloyse Konell a partir do briefing abaixo.

**Briefing do usuário:** $ARGUMENTS

Siga estes passos em ordem. Reporte ao usuário em uma linha o que está fazendo a cada passo importante.

## 1. Estude voz e estrutura existentes

Leia 3 posts em `src/content/blog/` para calibrar voz, comprimento e padrões editoriais. Posts disponíveis:
- `cadeira-vazia.md`, `hora-de-mudar.md`, `rh-futuro.md`, `saude-mental-estrategia.md`, `sucessao-mal-planejada.md`, `sucessor-e-sucessao.md`, `tecnico-virou-gestor.md`

Leia também o schema em `src/content/config.ts` para garantir frontmatter correto.

## 2. Defina o slug

A partir do briefing, gere um slug em kebab-case, sem acentos, máx ~5 palavras, evocativo (não literal). Verifique com `Glob` que `src/content/blog/<slug>.md` ainda não existe — se existir, ajuste o slug.

## 3. Crie a branch

```
git checkout main
git pull origin main
git checkout -b post/<slug>
```

Se houver mudanças não commitadas em `main`, pare e avise o usuário antes de prosseguir.

## 4. Gere o post completo

Crie `src/content/blog/<slug>.md` com:

**Frontmatter** (siga o schema em `src/content/config.ts`):
- `title`: chamativo, segue o padrão dos posts existentes (geralmente "Substantivo Forte: Subtítulo Provocador" ou pergunta retórica)
- `description`: 1 frase, 120-160 chars, otimizada para SEO
- `deck`: subtítulo editorial — pode ser igual à description ou complementar
- `pubDate`: data de hoje no formato `YYYY-MM-DD` (consulte memória ou use a data atual conhecida)
- `tags`: 1-3 tags. Use exclusivamente as tags já presentes no blog: "Liderança", "Estratégia", "Pessoas", "Sucessão" (rode `Grep` em `src/content/blog/*.md` para confirmar quais existem)
- `readingTime`: estime "X min de leitura" (~200 palavras/min)
- `coverImage`: **omita o campo** — será adicionado manualmente pela Eloyse depois
- `related`: 2-3 slugs de posts existentes tematicamente relacionados (verifique que existem)
- `draft: true`

**Conteúdo** (~800-1500 palavras):
- Abertura forte: pergunta provocativa ou cenário concreto que prende em 2-3 linhas
- 3-5 seções `## H2` com subtítulos editoriais (não use "Introdução" / "Conclusão")
- 1-2 `::pullquote["citação destacada"]` em pontos altos do texto
- Quando citar dados, use fontes reconhecidas (Deloitte, Gallup, McKinsey, Harvard Business Review, FGV) e seja específico. **Se não tiver certeza de um dado, não invente** — use linguagem qualitativa
- Negrito (`**...**`) em afirmações-chave, com moderação
- Fechamento que conecta com a consultoria/mentoria da Eloyse, sem soar comercial

**Voz e tom:**
- Segunda pessoa ("você"), profissional mas humana
- Provocativa sem ser agressiva
- Foco em líderes sênior, diretores, C-level
- Português brasileiro, sem regionalismos
- Evite jargão corporativo vazio e listas tipo "5 dicas para..."

## 5. Inicie o dev server em background

Rode `npm run dev` com `run_in_background: true`. Aguarde alguns segundos para o servidor subir.

## 6. Resuma para o usuário

Devolva uma resposta curta com:
- Branch: `post/<slug>`
- Arquivo: `src/content/blog/<slug>.md`
- Visualizar localmente: `http://localhost:4321/blog/<slug>`
- Próximos passos sugeridos:
  - Revisar e editar o conteúdo manualmente
  - Adicionar `coverImage` quando tiver a imagem
  - Rodar `/post-revisar` para uma revisão editorial automatizada
  - Rodar `/post-publicar` quando estiver pronto

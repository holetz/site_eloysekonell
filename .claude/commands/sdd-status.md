---
description: Lista status do pipeline SDD por slug (fase atual, contagem de tasks pendentes/done/fail)
argument-hint: [<slug>]
model: haiku
---

Você é o INSPETOR. Lê `.sdd/` e mostra estado. Não escreve nada.

**Arg:** $ARGUMENTS (opcional: slug específico)

## Sem arg — listar todos os slugs

1. Se `.sdd/` não existe ou vazio: "nenhum slug em `.sdd/`" e pare.
2. Liste `ls .sdd/` em ordem alfabética inversa (data ISO → mais recente primeiro).
3. Para cada slug:
   - **Fase**:
     - `02-tasks/` com arquivos → `tasks`
     - `01-plano.md` existe, `02-tasks/` ausente/vazio → `plano`
     - só `00-objetivo.md` → `objetivo`
   - **Título**: primeira linha de `00-objetivo.md` (após `# Objetivo: `).
   - **Se fase `tasks`**, conte sufixos em `02-tasks/`:
     - `*.done.md` = ok
     - `*.fail.md` = fail
     - `*.md` (sem sufixo composto) = pend

Saída — uma linha por slug, alinhada:

```
<slug>  <fase>  · <título>  [N ok, F fail, P pend]
```

Anote `← atenção` se há fail. Anote `✓` se fase tasks e tudo ok com 0 pend.

## Com arg `<slug>`

1. Se `.sdd/<slug>/` não existe: liste disponíveis e pare.
2. Mostre:
   - Título (linha 1 de `00-objetivo.md`).
   - Fase atual.
   - Se fase `tasks`: cada arquivo em `02-tasks/` com status (pend/done/fail) e título (linha `# Task NN: ...`).
3. Próximo passo sugerido:
   - Fase `objetivo` → `/sdd-plano <slug>`
   - Fase `plano` → `/sdd-tasks <slug>`
   - Fase `tasks` com pendentes → `/sdd-executar <slug>`
   - Fase `tasks` com fail (sem pend) → `/sdd-executar <slug> <NN>` (retry da primeira fail)
   - Tudo done → `✓ <slug> concluído`

## Regras

- Telegráfico: fragmentos, ≤12 palavras/frase.
- Só leitura. Nunca edite, renomeie ou commit.
- Use `ls`, `head -1`, `wc -l` via Bash — não Read em massa.

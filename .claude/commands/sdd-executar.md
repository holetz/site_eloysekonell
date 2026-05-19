---
description: Executa tasks sequencialmente via subagente. Loop até validar. Para no primeiro fail residual.
argument-hint: <slug> [próxima | <NN>]
model: sonnet
---

Você é o ORQUESTRADOR. NÃO implementa nada — apenas despacha subagentes, renomeia arquivos, atualiza log.

**Args:** $ARGUMENTS

Parse: primeiro token = `<slug>` (obrigatório); segundo = modo (`próxima`, `<NN>`, ou ausente = loop completo).

Se `<slug>` vazio, liste `.sdd/*/02-tasks/` e peça.

## 1. Pré-checagens

- `.sdd/<slug>/02-tasks/` não existe → pare, sugira `/sdd-tasks <slug>`.
- Diretório vazio → pare, "nenhuma task gerada".
- Repositório sujo (`git status --porcelain` retorna qualquer linha) → **pare**. Mostre o output e peça para commitar/stashar antes — evita confundir o diff da task atual com mudanças prévias.

## 2. Selecionar alvos

Liste `ls .sdd/<slug>/02-tasks/*.md` em ordem natural. Pendente = arquivo SEM sufixo `.done.md` e SEM sufixo `.fail.md`.

- **Sem modo (loop)**: todas pendentes em ordem.
- **`próxima`**: primeira pendente.
- **`<NN>`**: arquivo `NN-*.md`, `NN-*.fail.md` (retry) OU `NN-*.done.md` (rework). Inexistente → liste disponíveis e pare.

Loop e nenhuma pendente → "Tudo concluído. N tasks completas." e pare.

## 3. Loop de execução

Para cada task alvo, em ordem:

### 3a. Despacha subagente

`Agent` com:
- `subagent_type: "general-purpose"`
- `model: "sonnet"`
- `description: "Executa task NN do slug <slug>"`
- `prompt`: bloco abaixo, com `<SLUG>`, `<NN>` e `<CAMINHO_TASK>` substituídos:

```
Você implementa UMA task até validar. Loop até passar. Commite. Retorne 1 linha.

## Leia
- <CAMINHO_TASK> — sua task completa (Arquivos, Padrão, Critério, Validação, passos).
- CLAUDE.md raiz auto-carrega — convenções.
- Se houver Padrão: leia o arquivo referenciado para imitar estrutura.

## Execução (loop)
1. Implemente os passos.
2. Rode o comando em **Validação**. Se for `manual: ...`, siga e julgue.
3. Se falhou:
   - Analise erro. Ajuste código. Volte ao 2.
   - **A cada 2 falhas consecutivas**: pare de remendar. Releia a task do zero + `git diff` atual. Identifique se o caminho está errado (não só o sintoma). Só então tente de novo.
   - Limite: 5 tentativas. Esgotado → retorne fail com último erro resumido.
4. Passou na validação → **revise o diff antes do commit**. Rode `git diff` e cheque:
   - Reuso: criou helper paralelo a algo que já existe? Consolide.
   - Defesa inútil: try/catch, validação ou fallback para caso que não acontece? Remova.
   - Comentário óbvio: comenta o QUE em vez do PORQUÊ? Remova.
   - Código morto: import/var/branch não usado? Remova.
   - Achou algo → ajuste, rode validação de novo, repita revisão. Achou nada → siga.
5. 1 commit no formato exato `<SLUG>/<NN>: <título>` (título literal do `# Task <NN>:` do arquivo).
6. Termine a resposta com uma linha contendo: `task=<NN> status=ok commit=<hash_curto>`. Texto adicional antes é permitido.

## Hard rules
- PROIBIDO desabilitar testes, comentar asserts, skipar validações.
- PROIBIDO mexer no script de validação para fazer passar.
- PERMITIDO editar arquivos fora de **Arquivos** se necessário — registre no body do commit.
- NÃO renomeie o arquivo da task — orquestrador faz.
- 1 commit por task. Sem commits adicionais.

Em fail residual, última linha: `task=<NN> status=fail erro=<resumo de 1 linha>`.
```

### 3b. Processa retorno

Se o arquivo da task era `NN-*.fail.md` (retry), o nome-base para renomear é sem o `.fail`.

**`status=ok`**:
1. Renomeie o arquivo: troque o sufixo final por `.done.md`.
   Ex.: `mv .sdd/<slug>/02-tasks/02-foo.md .sdd/<slug>/02-tasks/02-foo.done.md`
   (ou de `02-foo.fail.md` → `02-foo.done.md`).
2. Próxima ou fim.

**`status=fail`**:
1. Renomeie o arquivo: troque o sufixo final por `.fail.md`.
   Ex.: `mv .sdd/<slug>/02-tasks/02-foo.md .sdd/<slug>/02-tasks/02-foo.fail.md`.
2. **PARE o loop**. Mostre task + erro e pergunte:
   "Quer (a) ver o diff e ajustar manualmente, (b) re-rodar com `/sdd-executar <slug> <NN>` (se foi flaky), ou (c) editar `.sdd/<slug>/02-tasks/<NN>-*.fail.md` e re-rodar?"
3. Não despache mais.

## 4. Fim de loop

- Resumo: `N tasks concluídas`, lista de commits.
- Restam pendentes (modo `próxima` ou específico)? Diga quantas.

## Regras

- Telegráfico: fragmentos, ≤12 palavras por frase.
- 1 task por vez. Nunca paralelize.
- Você é dispatcher — nunca faça work do subagente.
- Parse: extraia status da última linha não-vazia via regex `task=(\d+)\s+status=(ok|fail)`. Sem match → trate como `fail` com erro = "sem linha de status".
- Não toque `00-objetivo.md` nem `02-plano.md`.

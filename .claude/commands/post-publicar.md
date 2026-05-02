---
description: Finaliza o post da branch atual, valida build, mergeia em main e dispara o deploy
---

Você vai publicar o post atual. Algumas ações são destrutivas/irreversíveis (push para main, deploy público). **Sempre confirme com o usuário antes do passo 6.**

## 1. Detecte o post atual

Rode `git rev-parse --abbrev-ref HEAD`. Se não começar com `post/`, pare e avise. Extraia `<slug>`.

Confirme que `src/content/blog/<slug>.md` existe.

## 2. Verifique o estado do repositório

Rode `git status`. O working tree deve estar limpo OU ter mudanças apenas no arquivo do post. Qualquer outra mudança não commitada → pare e mostre ao usuário, peça confirmação para continuar.

## 3. Atualize o frontmatter para publicação

Leia `src/content/blog/<slug>.md`:
- Se tiver `draft: true`, troque para `draft: false` (ou remova a linha — o default do schema é `false`)
- Atualize `pubDate` para a data de hoje (`YYYY-MM-DD`)
- Verifique `coverImage`:
  - Se ausente ou vazio → **pergunte ao usuário** se ele já adicionou a imagem ou quer publicar sem capa. Não prossiga sem resposta.

## 4. Valide com build de produção

Rode `npm run build`. Se falhar, mostre o erro completo e pare — não tente corrigir automaticamente, peça orientação ao usuário.

## 5. Mostre o resumo e peça confirmação

Apresente ao usuário:
- Título do post
- Slug e URL final: `https://eloysekonell.com.br/blog/<slug>/`
- Tags
- Data de publicação
- Status do `coverImage`

E pergunte explicitamente: **"Confirma o merge em `main` e o deploy público?"** Aguarde resposta afirmativa antes de prosseguir. Se negativa, pare.

## 6. Commit, push, merge em main

Após confirmação, execute em sequência (use `git` via Bash):

```
git add src/content/blog/<slug>.md
git commit -m "post: <título>"
git push -u origin post/<slug>
git checkout main
git pull origin main
git merge --no-ff post/<slug> -m "merge: post <slug>"
git push origin main
```

Se algum passo falhar, **pare imediatamente** e mostre o erro — não tente corrigir sem orientação.

## 7. Pare o dev server

Mate qualquer processo escutando na porta 4321 (PowerShell):

```powershell
Get-NetTCPConnection -LocalPort 4321 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | Sort-Object -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
```

## 8. Reporte ao usuário

Resuma em poucas linhas:
- Commit hash do merge em main
- URL final: `https://eloysekonell.com.br/blog/<slug>/`
- Lembrete: o GitHub Actions vai rodar o deploy em ~1-2 minutos. Acompanhe em https://github.com/holetz/site_eloysekonell/actions
- Pergunte se quer apagar a branch local (`git branch -d post/<slug>`) e remota (`git push origin --delete post/<slug>`)

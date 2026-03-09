# Task 04: Mensagem de Commit Final — `04-commit-msg.md`

**Depends on**: Task 01, Task 02, Task 03
**Estimated complexity**: Low
**Type**: Documentation

## Objective

Gerar o arquivo `04-commit-msg.md` com a mensagem de commit final consolidada,
descrevendo o impacto comportamental de toda a mudança para o usuário.

## ⚠️ Important information

Before coding, Read FIRST -> Load [03-tasks-00-READBEFORE.md](03-tasks-00-READBEFORE.md)

## Files to Modify/Create

- `.agents/changes/SITE-001-services-restructure/04-commit-msg.md` — criação

## Detailed Steps

1. Update `PROGRESS.md` to mark this task as 🔄 In Progress.

2. Read the git log for commits since implementação iniciada nesta branch/feature
   (commits com mensagem contendo "SITE-001" ou referentes aos flip cards).

3. Read the full diff dos commits identificados para entender o que mudou de fato.

4. Read `01-specification.md` e `02-plan.md` para revisão do escopo.

5. Create the file `04-commit-msg.md` following the template below:

```markdown
feat(services): reestruturar seção de serviços com flip cards 3D e duas frentes estratégicas

A seção de serviços foi completamente reestruturada: os 6 cards estáticos anteriores
foram substituídos por **8 flip cards interativos** organizados em dois grupos temáticos —
**Liderança Alta Performance** e **Gestão Estratégica de Pessoas**.

Cada card exibe título e ícone na frente, e ao clique/toque revela descrição detalhada
(parágrafo introdutório + bullets estruturados) mais um botão de CTA ancorando na seção
de contato. A interação é acessível por teclado (Enter/Space) com atualização de
`aria-expanded`.

Closes SITE-001

- Substituídos 6 cards legados por 8 flip cards 3D com transição CSS 0.5s
- Criados dois grupos temáticos com rótulos: Liderança (4 serviços) e Gestão (4 serviços)
- Grade 2×2 em desktop; 1 coluna em mobile
- Pills/badges coloridas para serviços com subtítulo categorial
- Ícones SVG inline (outline) temáticos por serviço
- Acessibilidade: `role=button`, `tabindex`, `aria-expanded`, foco por teclado
- Botão "Quero saber mais" no verso de cada card com scroll suave para `#block-2`
- Zero dependências JS externas novas; flip 100% CSS transform 3D
```

6. Update `PROGRESS.md` to mark this task as ✅ Completed.

7. Commit: `docs: add final commit message for SITE-001 services restructure`

## Acceptance Criteria

- [ ] File `04-commit-msg.md` exists in `.agents/changes/SITE-001-services-restructure/`
- [ ] Message follows conventional commit format (`feat(scope): description`)
- [ ] Message describes behavioral changes for users (not implementation details)
- [ ] All key changes are listed as bullets
- [ ] `Closes SITE-001` reference present

## Testing

- Read the generated file and verify it reads clearly as a final git commit message
- Verify lines are wrapped at ≤ 100 characters

## Notes

- If intermediate commits were done per task, this message is intended for the final
  squash commit (or MR description) summarizing the full feature.

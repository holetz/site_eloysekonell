---
id: "01"
phase: 1
complexity: low
depends_on: []
files: ["src/data/credenciais.ts"]
---

# Task 01 — Data: credenciais centralizadas

## Objective

Criar fonte única de verdade para números factuais e formação acadêmica de Eloyse Konell. Tudo que usar esses dados depois (`/sobre`, `/metodologia`, schemas, etc.) importa daqui.

## Detailed Steps

1. Marcar `status: 🔄` em `.ralph/state.json` para id "01".
2. Criar `src/data/credenciais.ts` com:
   - `export const credenciais = { ... } as const;`
   - Campos numéricos: `anosAtuacao: 18`, `empresasAtendidas: 15`, `lideresDesenvolvidos: 500`, `assessmentsRealizados: 500`.
   - Campo `formacao`: array de objetos `{ tipo: string, titulo: string, instituicao: string, sigla: string }` com 6 entradas (graduação, MBA, pós, PCC, IBGC, GROU). Ver READBEFORE §4.
   - Campo `areasConhecimento`: array de 8 strings (para `Person.knowsAbout`).
   - Campo `localizacao`: `{ cidade: 'Blumenau', estado: 'SC', regiao: 'Vale do Itajaí', pais: 'BR' }`.
   - Campo `alumniOf`: array com `{ name: 'FURB', url: 'https://www.furb.br/' }` e `{ name: 'PUCRS', url: 'https://www.pucrs.br/' }`.
3. Adicionar JSDoc breve no topo do arquivo explicando que é fonte única e ninguém deve duplicar.
4. Rodar `npm run build` — deve ficar verde (arquivo é importado só nas próximas tasks).
5. Commit: `chore: criar fonte única de credenciais e dados factuais`.
6. Marcar `status: ✅` em state.json com hash do commit.

## Acceptance Criteria

- [ ] `src/data/credenciais.ts` existe e exporta `credenciais` tipado com `as const`.
- [ ] Tem todos os campos listados em READBEFORE §4.
- [ ] `npm run build` passa.
- [ ] Sem warnings de TypeScript no IDE.

## Testing

- `npm run build` verde.
- Abrir o arquivo no editor: confirmar que tipos são inferidos corretamente (`credenciais.anosAtuacao` é `18`, não `number`).

## Notes

- **Não** importar este arquivo em nada nesta task — só criar. Importações vêm em S02, S08, S10.
- Manter formação em ordem cronológica (graduação primeiro, certificações depois).

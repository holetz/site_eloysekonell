---
id: "10"
phase: 3
complexity: medium
depends_on: ["04", "07"]
files: ["src/pages/metodologia.astro"]
---

# Task 10 — Página /metodologia/

## Objective

Criar página `/metodologia/` descrevendo a abordagem de Eloyse (sem batismo do método). Conteúdo extraído de `Proposito.astro` + `Consultoria.astro` + redação nova.

## Detailed Steps

1. Marcar `status: 🔄` para id "10".

2. Ler [src/components/Proposito.astro](../../../src/components/Proposito.astro) (3 pilares) e [src/components/Consultoria.astro](../../../src/components/Consultoria.astro) (proposta de valor) — extrair copy como base.

3. Criar `src/pages/metodologia.astro` usando `<PageLayout>`:
   - `title`: "Metodologia — Como atuo | Eloyse Konell"
   - `description`: ~155 chars: "Abordagem aplicada para desenvolvimento de líderes e gestão de pessoas — baseada em neurociência, análise comportamental e contexto da PME."
   - `canonical`: `${SITE_URL}/metodologia/`.
   - `breadcrumb`: `[{ label: 'Início', href: '/' }, { label: 'Metodologia' }]`.

4. **Conteúdo (~600-900 palavras):**
   - `<PageHero>` eyebrow "Metodologia", title "Método aplicado, não treinamento de prateleira", deck 1-2 frases sobre abordagem.
   - **"Os 3 pilares"**: 3 cards com os 3 pilares de `Proposito.astro` (manter mesmas palavras-chave). Cada card: título + 2-3 frases.
   - **"Como aplico"**: 4-5 etapas numeradas (Diagnóstico → Plano → Execução → Acompanhamento → Mensuração). Cada etapa: 2-3 frases.
   - **"Por que funciona"** (~150 palavras): referenciar bases — neurociência (PUCRS), análise comportamental avançada (GROU), coaching profissional (PCC SLAC), governança (IBGC). Importar `credenciais` para citar formações sem hardcoding.
   - **"O que muda na empresa"**: bullets com ganhos esperados (líderes mais autônomos, decisões mais consistentes, ciclos curtos de feedback, redução de conflito, sucessão planejada).
   - **CTA**: "Quer aplicar isso na sua liderança? Vamos conversar." → `/contato/`.

5. **Voz**: H2s como afirmação ou pergunta direta. Frases curtas. Sem jargão.

6. Rodar `npm run build`. Verde.

7. Smoke visual: `/metodologia/` desktop e mobile.

8. Commit: `feat: criar página /metodologia com abordagem aplicada`.

9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `/metodologia/` retorna HTML válido.
- [ ] H1 único, H2s consistentes (3-5).
- [ ] Pilares extraídos de Proposito.astro presentes.
- [ ] Bases (neurociência, análise comportamental, etc.) citadas via `credenciais`.
- [ ] CTA para `/contato/` presente.
- [ ] Mobile responsivo.
- [ ] `npm run build` verde.

## Testing

- Build + preview.
- Spot-check da prosa: voz consistente com `Consultoria.astro` original.

## Notes

- Não criar nome novo para o método (decisão Open Question da spec).
- Eloyse pode ajustar copy depois — aqui entrega draft merge-ready.
- Não duplicar lista de formações com `/sobre` — em `/metodologia/`, citar de forma contextual ("formação em neurociência..."), não como lista.

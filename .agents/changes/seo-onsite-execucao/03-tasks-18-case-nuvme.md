---
id: "18"
phase: 4
complexity: medium
depends_on: ["16"]
files: ["src/content/cases/nuvme.md"]
---

# Task 18 — Case Nuvme (Estruturação e implementação de RH)

## Objective

Criar case study fictício plausível "Estruturação e implementação de RH na Nuvme". `draft: true`.

## Detailed Steps

1. Marcar `status: 🔄` para id "18".

2. Criar `src/content/cases/nuvme.md` com:
   - **Frontmatter:**
     ```yaml
     ---
     title: "Estruturação de RH na Nuvme"
     client: "Nuvme"
     clientUrl: "https://nuvme.com.br"
     sector: "SaaS / Cloud"
     problem: "Crescimento acelerado sem área de pessoas estruturada — processos informais e gargalos em onboarding."
     approach: "Diagnóstico em 30 dias e implementação faseada de 5 frentes prioritárias em ciclos de 90 dias."
     result: "Time de pessoas operacional, ciclos de feedback rodando e onboarding padronizado."
     metric: "Time de pessoas operacional em 90 dias"
     pubDate: 2026-04-22
     coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85"
     draft: true
     tags: ["gestão estratégica de pessoas", "saas", "PME"]
     ---
     ```

3. **Body (~500-800 palavras):**
   - **Contexto**: SaaS em crescimento, time pequeno mas escalando rápido; ainda sem RH dedicado; sócios e líderes acumulando demandas de gente.
   - **Desafio**: onboarding inconsistente, ausência de ciclos de feedback, decisões de remuneração ad hoc, dificuldade de definir cultura à medida que o time cresce.
   - **Abordagem**: 30 dias de diagnóstico (entrevistas com sócios e líderes, leitura dos processos atuais); priorização de 5 frentes (cultura, atração, onboarding, feedback, remuneração); execução em ciclos de 90 dias com responsável interno por frente; consultoria como suporte e mensuração.
   - **Resultado**: pessoa interna de gente operacional após 90 dias; cultura documentada e em uso; onboarding padronizado; ciclos de feedback semestrais rodando; sócios voltam a focar no negócio.
   - **O que aprendi** (opcional, ~80 palavras): a importância de não tentar implementar tudo de uma vez — priorização foi metade do trabalho.

4. Voz: terceira pessoa.

5. Rodar `npm run build`. Verde.

6. Commit: `content: criar case Nuvme em draft`.

7. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] Arquivo existe e cumpre schema.
- [ ] `draft: true`.
- [ ] 500-800 palavras.
- [ ] Métrica plausível.
- [ ] Build verde.

## Testing

- Build verde.
- Validação opcional via `draft: false` temporário.

## Notes

- Manter consistência de tom entre os 3 cases (S17, S18, S19).
- Métrica do Nuvme é menos numérica e mais qualitativa ("operacional em 90 dias") — também é válido.

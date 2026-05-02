---
id: "19"
phase: 4
complexity: medium
depends_on: ["16"]
files: ["src/content/cases/grupo-top.md"]
---

# Task 19 — Case Grupo Top (Assessments executivos para alta gestão)

## Objective

Criar case study fictício plausível "Assessments executivos do Grupo Top para desenvolvimento da alta gestão". `draft: true`.

## Detailed Steps

1. Marcar `status: 🔄` para id "19".

2. Criar `src/content/cases/grupo-top.md` com:
   - **Frontmatter:**
     ```yaml
     ---
     title: "Assessments Executivos no Grupo Top"
     client: "Grupo Top"
     sector: "Multi-negócios"
     problem: "Decisões de promoção e sucessão na alta gestão sem base estruturada — risco de erro alto e custoso."
     approach: "Programa de assessments executivos com devolutiva integrada à estratégia de sucessão do grupo."
     result: "Decisões de sucessão e promoção apoiadas por leitura técnica do potencial e do gap de cada executivo."
     metric: "Sucessão de 3 cargos-chave planejada e executada em 18 meses"
     pubDate: 2026-04-29
     coverImage: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1600&q=85"
     draft: true
     tags: ["assessment", "sucessão", "alta gestão"]
     ---
     ```

3. **Body (~500-800 palavras):**
   - **Contexto**: grupo com múltiplos negócios sob a mesma estrutura; alta gestão composta por executivos seniores em diferentes empresas do grupo; momento de planejamento sucessório.
   - **Desafio**: decisões de promoção e sucessão sendo tomadas com leituras subjetivas; ausência de framework comum para comparar potencial entre executivos de empresas diferentes; risco de erro de sucessão (custoso em alta gestão).
   - **Abordagem**: aplicação de assessments executivos completos (DISC, análise comportamental avançada, entrevistas estruturadas) em uma camada da liderança; relatórios individuais com devolutiva ao avaliado e ao decisor (com consentimento); plano de desenvolvimento individual para gaps prioritários; reuniões de calibração com a alta gestão.
   - **Resultado**: critério comum para discutir potencial; decisões de sucessão menos baseadas em "achismo"; planos de desenvolvimento em execução para sucessores; 3 cargos-chave com sucessão planejada em 18 meses.
   - **O que aprendi** (opcional, ~80 palavras): a devolutiva ao avaliado é metade do valor — sem ela, vira só relatório que ninguém usa.

4. Voz: terceira pessoa.

5. Build verde.

6. Commit: `content: criar case Grupo Top em draft`.

7. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] Arquivo existe e cumpre schema.
- [ ] `draft: true`.
- [ ] 500-800 palavras.
- [ ] Métrica plausível e específica para alta gestão.
- [ ] Build verde.

## Testing

- Build verde.

## Notes

- "Grupo Top" pode ser interpretado como nome genérico de grupo de empresas — não inventar marcas filhas.
- Tom mais formal/corporativo que os outros 2 cases (clientela é alta gestão).

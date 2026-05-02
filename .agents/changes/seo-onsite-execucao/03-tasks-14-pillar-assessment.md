---
id: "14"
phase: 3
complexity: high
depends_on: ["01", "04", "07"]
files: ["src/pages/servicos/assessment.astro"]
---

# Task 14 — Pillar /servicos/assessment/

## Objective

Pillar page de 1.500-2.000 palavras sobre assessment de liderança (empresas + individual). Substitui a seção `AssessmentSpotlight.astro` da home com profundidade. Schema `Service` linkado.

## Detailed Steps

1. Marcar `status: 🔄` para id "14".

2. Ler [src/components/AssessmentSpotlight.astro](../../../src/components/AssessmentSpotlight.astro) — extrair as duas variantes (Empresas / Individual) como base. Esses tabs viram seções da página.

3. Criar `src/pages/servicos/assessment.astro` usando `<PageLayout>`:
   - `title`: "Assessment de Liderança | Eloyse Konell"
   - `description`: ~155 chars: "Avaliação aprofundada de potencial e gap de líderes — base científica (DISC, neurociência, comportamento) para decisões de pessoas."
   - `canonical`: `${SITE_URL}/servicos/assessment/`.
   - `breadcrumb`: `[Início, Serviços, Assessment]`.

4. **Conteúdo (1.500-2.000 palavras, H2s em pergunta):**
   - Hero.
   - **H2: "O que é assessment de liderança?"** (~200 palavras) — definição direta, não é teste de personalidade simples; é leitura de potencial + comportamento + ajuste à função.
   - **H2: "Quando usar assessment?"** (~250 palavras) — momentos: promoção, sucessão, contratação executiva, redesenho de squad, conflito recorrente, dúvida sobre desenvolvimento. Lista numerada com 1 frase por momento.
   - **H2: "Como funciona o processo?"** (~300 palavras) — etapas: briefing → ferramentas (DISC, comportamental avançada, entrevistas) → análise → devolutiva individual → relatório executivo → plano de desenvolvimento. Cita certificações de Eloyse (Análise Comportamental Avançada GROU, PCC SLAC) sem hardcoding — importar `credenciais`.
   - **H2: "Para quem é o assessment?"** (~300 palavras) — duas frentes:
     - **Empresas / Tomadores**: para decisões de promoção, sucessão, contratação, mapeamento de squad. Inclui devolutiva ao decisor.
     - **Individual / Líder**: para autoconhecimento profundo, decisão de carreira, mudança de função. Devolutiva é só para o avaliado.
   - **H2: "Que entregáveis você recebe?"** (~150 palavras) — relatório individual, relatório consolidado (se múltiplos), plano de desenvolvimento, devolutiva síncrona.
   - **`<FaqBlock>` com 5 perguntas:**
     1. "Quanto tempo dura o processo?"
     2. "Os resultados ficam só para o avaliado ou a empresa também vê?"
     3. "É o mesmo que DISC?"
     4. "Funciona remotamente?"
     5. "Qual o investimento?"  *(resposta: depende de escopo, sem valor fixo)*
   - **Posts relacionados**: links para `cadeira-vazia`, `hora-de-mudar`, e 1 post novo do cluster.
   - **CTA** → `/contato/`.

5. **JSON-LD `Service`** com `@id: ${SITE_URL}/servicos/assessment/#service`, `serviceType: "Assessment Executivo"`.

6. Build verde, smoke, commit `feat: pillar page /servicos/assessment`, marcar `✅`.

## Acceptance Criteria

- [ ] ≥1.500 palavras.
- [ ] H2s em formato pergunta.
- [ ] Duas frentes (Empresas / Individual) cobertas.
- [ ] Cita ferramentas (DISC, análise comportamental, neurociência) sem inventar metodologia inexistente.
- [ ] FaqBlock + Service schema válidos.
- [ ] Build verde.

## Testing

- Build + preview.
- Schema Validator.
- Word count.

## Notes

- Esse serviço é mencionado na seção atual da home com contagem `+500 assessments`. Reusar esse número via `credenciais.assessmentsRealizados`.
- Não inventar tipos de relatório que não existam — manter genérico ("relatório individual", "relatório consolidado").

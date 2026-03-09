
# Task 01: HTML dos Flip Cards — `services.html`

**Depends on**: None (independent)  
**Estimated complexity**: Medium  
**Type**: Feature

## Objective

Reescrever completamente o arquivo `src/components/sections/services.html` com a nova
estrutura de 8 flip cards organizados em 2 grupos temáticos (4 cards cada).

## ⚠️ Important information

Before coding, Read FIRST -> Load [03-tasks-00-READBEFORE.md](03-tasks-00-READBEFORE.md)

## Files to Modify/Create

- `src/components/sections/services.html` — reescrita completa

## Detailed Steps

1. Update `PROGRESS.md` to mark this task as 🔄 In Progress (in the Status column).
   If `PROGRESS.md` doesn't exist yet, create it with the table defined in `03-tasks-00-READBEFORE.md`.

2. Read the current `src/components/sections/services.html` to understand the existing structure.

3. Read `03-tasks-00-READBEFORE.md` to confirm the expected HTML structure and rules.

4. Rewrite `src/components/sections/services.html` preserving:
   - The `<!-- COMPONENT: services -->` comment header
   - The `<section>` tag with `class="u-align-center u-clearfix u-grey-10 u-section-2"` and `id="carousel_23e7"`
   - The inner `u-group-1` banner div (unchanged)

5. Add the new `<div class="c-services">` wrapper after the banner div, containing:

   **Group 1 — LIDERANÇA ALTA PERFORMANCE** (`c-services__group`, `data-group="leadership"`)
   with `<h3 class="c-services__group-title">LIDERANÇA ALTA PERFORMANCE</h3>` and
   a `<div class="c-services__grid">` with 4 `.c-flip-card` elements:

   **Card 1 — Liderança de Alta Performance**
   - Front: SVG icon (person with star/crown, outline), title, pills: "Workshops", "Experiências Executivas", "Team Building"
   - Back intro: "Intervenções estruturadas para desenvolver competências críticas de liderança em contextos reais de negócio."
   - Back bullets:
     - "Cada programa é desenhado sob medida para trabalhar decisão, influência, performance, gestão de mudança, IE e accountability"
     - "Formato executivo, aplicado e orientado a resultado mensurável"

   **Card 2 — Jornada Estratégica de Desenvolvimento de Líderes**
   - Front: SVG icon (path/journey/route, outline), title, no pills
   - Back intro: "Programa contínuo de evolução de liderança, estruturado por competências-chave e desafios organizacionais."
   - Back bullets:
     - "Integra diagnóstico inicial, trilhas modulares e acompanhamento de maturidade de liderança"
     - "Forma líderes preparados para crescimento, transformação e tomada de decisão complexa"

   **Card 3 — Arquitetura de Sucessão, Assessment & Pipeline de Liderança**
   - Front: SVG icon (org chart / network nodes, outline), title, no pills
   - Back intro: "Sistema estruturado de identificação, avaliação e aceleração de talentos críticos."
   - Back bullets:
     - "Mapeia prontidão, riscos organizacionais e gaps estratégicos de competências"
     - "Garante continuidade executiva e segurança no crescimento do negócio"

   **Card 4 — Mentoria de Transição Executiva**
   - Front: SVG icon (compass/mentor, outline), title, no pills
   - Back intro: "Mentoria para líderes em promoção, reposicionamento ou mudança de contexto organizacional."
   - Back bullets:
     - "Trabalha posicionamento estratégico, leitura de cenários, clareza decisória e fortalecimento de autoridade"
     - "Reduz o tempo de adaptação e maximiza impacto nos primeiros ciclos de liderança"

   **Group 2 — GESTÃO ESTRATÉGICA DE PESSOAS** (`c-services__group`, `data-group="people"`)
   with `<h3 class="c-services__group-title">GESTÃO ESTRATÉGICA DE PESSOAS</h3>` and
   a `<div class="c-services__grid">` with 4 `.c-flip-card` elements:

   **Card 5 — Inteligência Estratégica de Talentos & Consultoria Estrutural de RH**
   - Front: SVG icon (magnifying glass + people, outline), title, no pills
   - Back intro: "Diagnóstico da estrutura de gestão de pessoas com base em indicadores de performance, eficiência e risco organizacional."
   - Back bullets:
     - "Integra análise de competências, prontidão, vulnerabilidades e maturidade de RH"
     - "Inclui consultoria para redesenho da estrutura de RH: papéis, processos, governança e indicadores"
     - "Transforma dados e estrutura em direcionadores objetivos de decisão executiva"

   **Card 6 — Arquitetura e Design Organizacional**
   - Front: SVG icon (building/architecture blueprint, outline), title, no pills
   - Back intro: "Redesenho estrutural orientado por eficiência, clareza de papéis e alinhamento à estratégia."
   - Back bullets:
     - "Reorganiza responsabilidades, fluxos de decisão e interfaces críticas entre áreas"
     - "Cria estrutura capaz de sustentar crescimento, escala e transformação"

   **Card 7 — Estratégia de Mobilidade & Gestão Integrada de Talentos**
   - Front: SVG icon (arrows/flow/mobility, outline), title, no pills
   - Back intro: "Estruturação de um sistema completo de gestão de talentos, integrando mobilidade interna e recrutamento estratégico."
   - Back bullets:
     - "Abrange diagnóstico de competências, mapeamento de talentos subaproveitados e desenho do processo de seleção"
     - "Reduz dependência de contratações desalinhadas e fortalece retenção"
     - "Assegura que cada movimento — interno ou externo — esteja conectado às prioridades futuras"

   **Card 8 — Planejamento Estratégico de Pessoas**
   - Front: SVG icon (calendar/roadmap, outline), title, no pills
   - Back intro: "Construção do roadmap anual de talentos alinhado às metas corporativas."
   - Back bullets:
     - "Define prioridades, indicadores-chave e plano de execução integrado ao planejamento do negócio"
     - "Posiciona a área de pessoas como eixo estratégico de competitividade e sustentabilidade"

6. Each `.c-flip-card` must have:
   - `tabindex="0"`
   - `role="button"`
   - `aria-expanded="false"`
   - `aria-label` with the service title

7. Each `.c-flip-card__back` must end with:
   ```html
   <a href="#block-2" class="c-flip-card__cta">Quero saber mais</a>
   ```

8. All SVG icons must be inline, outline stroke style, `viewBox="0 0 24 24"`, `width="40" height="40"`, `stroke="currentColor"`, `fill="none"`, `stroke-width="1.5"`.

9. Update `PROGRESS.md` to mark this task as ✅ Completed.

10. Commit: `feat: add flip card HTML structure for services section (SITE-001 task 01)`

## Acceptance Criteria

- [ ] File `src/components/sections/services.html` exists and contains new structure
- [ ] `id="carousel_23e7"` and `class="u-section-2"` preserved on `<section>`
- [ ] `u-group-1` banner preserved unchanged
- [ ] 8 `.c-flip-card` elements present (4 per group)
- [ ] 2 `.c-services__group` elements with correct titles
- [ ] Card 1 has pills ("Workshops", "Experiências Executivas", "Team Building")
- [ ] All cards have `aria-expanded`, `role="button"`, `tabindex="0"`
- [ ] All backs have `<a href="#block-2" class="c-flip-card__cta">`
- [ ] All SVG icons are inline with `fill="none"` and `stroke="currentColor"`

## Testing

- Open `dist/index.html` after build and inspect DOM in DevTools
- Verify 8 cards exist with correct aria attributes
- Verify group titles are visible

## Notes

- The SVGs don't need to be pixel-perfect thematic icons — clean, recognizable outline icons
  from the standard SVG icon vocabulary (similar to Heroicons / Feather Icons stroke style)
  are acceptable and encouraged.
- Do NOT reference external icon libraries — all SVG paths must be inline in the HTML.
- The `<!-- META: ... -->` comments at the top should be updated to reflect the new structure.

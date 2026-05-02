---
id: "15"
phase: 3
complexity: medium
depends_on: ["01", "04", "07"]
files: ["src/pages/servicos/mentoria-executiva.astro"]
---

# Task 15 — Página /servicos/mentoria-executiva/

## Objective

Página de serviço (~800-1.200 palavras, não-pillar) sobre mentoria executiva 1-1. Schema `Service` linkado.

## Detailed Steps

1. Marcar `status: 🔄` para id "15".

2. Criar `src/pages/servicos/mentoria-executiva.astro` usando `<PageLayout>`:
   - `title`: "Mentoria Executiva 1-1 | Eloyse Konell"
   - `description`: ~155 chars: "Mentoria 1-1 para executivos em transição, novos desafios ou momentos de inflexão na carreira."
   - `canonical`: `${SITE_URL}/servicos/mentoria-executiva/`.
   - `breadcrumb`: `[Início, Serviços, Mentoria Executiva]`.

3. **Conteúdo (800-1.200 palavras, H2s em pergunta):**
   - Hero.
   - **H2: "Para quem é a mentoria executiva?"** (~150 palavras) — perfil: executivos em transição (promoção, mudança de empresa, novo escopo), líderes em inflexão de carreira, sucessores em preparação. Exclui: quem busca treinamento técnico/operacional.
   - **H2: "Como funciona?"** (~200-250 palavras) — formato: encontros quinzenais (~75min), agenda definida pelo mentorado mas com diagnóstico inicial, ciclo mínimo de 3 meses, devolutivas escritas opcionais.
   - **H2: "Que temas costumam aparecer?"** (~150 palavras) — bullets: posicionamento, gestão de stakeholders, decisões difíceis (demitir, promover, mudar área), construção de time, transição cultural, conflito com pares/sócios.
   - **H2: "Mentoria ou coaching?"** (~150 palavras) — diferenciar: mentoria traz repertório; coaching estimula descoberta. Eloyse opera nas duas (PCC SLAC + experiência) e ajusta conforme demanda.
   - **`<FaqBlock>` com 3-4 perguntas:**
     1. "Funciona remotamente?" (sim, default)
     2. "Quanto custa?"
     3. "Posso indicar para alguém da minha empresa?"
     4. "Atende mentor sem nível executivo (mid-level)?"
   - **CTA** → `/contato/`.

4. **JSON-LD `Service`** com `@id: ${SITE_URL}/servicos/mentoria-executiva/#service`, `serviceType: "Mentoria Executiva"`, `areaServed: ["Brasil"]` (remoto, então cobertura nacional).

5. Build verde, smoke, commit `feat: página /servicos/mentoria-executiva`, marcar `✅`.

## Acceptance Criteria

- [ ] 800-1.200 palavras.
- [ ] Diferencia mentoria de coaching de forma clara.
- [ ] Cita PCC SLAC via `credenciais` (sem hardcoding).
- [ ] FaqBlock + Service schema válidos.
- [ ] Build verde.

## Testing

- Build + preview.
- Schema Validator.

## Notes

- Tom mais pessoal/confessional que os pillars (mentoria é serviço 1-1).
- Não inventar duração específica de contrato se não há padrão — manter "ciclos mínimos de 3 meses" como sugestão genérica.

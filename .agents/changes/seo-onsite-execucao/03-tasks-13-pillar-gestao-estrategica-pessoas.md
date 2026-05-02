---
id: "13"
phase: 3
complexity: high
depends_on: ["01", "04", "07"]
files: ["src/pages/servicos/gestao-estrategica-de-pessoas.astro"]
---

# Task 13 — Pillar /servicos/gestao-estrategica-de-pessoas/

## Objective

Pillar page de 1.500-2.000 palavras sobre gestão estratégica de pessoas (especialmente para PMEs sem RH dedicado). Schema `Service` linkado.

## Detailed Steps

1. Marcar `status: 🔄` para id "13".

2. Ler [src/components/Services.astro](../../../src/components/Services.astro) e [src/components/Consultoria.astro](../../../src/components/Consultoria.astro) — extrair copy base.

3. Criar `src/pages/servicos/gestao-estrategica-de-pessoas.astro` usando `<PageLayout>`:
   - `title`: "Gestão Estratégica de Pessoas para PMEs | Eloyse Konell"
   - `description`: ~155 chars: "Como estruturar gestão de pessoas em PMEs sem RH dedicado: framework aplicado, ciclos curtos, decisões consistentes."
   - `canonical`: `${SITE_URL}/servicos/gestao-estrategica-de-pessoas/`.
   - `breadcrumb`: `[..., Início, Serviços, Gestão Estratégica de Pessoas]`.

4. **Conteúdo (1.500-2.000 palavras, H2s em pergunta):**
   - Hero.
   - **H2: "O que é gestão estratégica de pessoas?"** (~200 palavras) — definição: vai além do operacional (folha, ponto, contratação). É colocar pessoas no centro da estratégia de crescimento.
   - **H2: "Por que PMEs adiam estruturar gestão de pessoas?"** (~200-250 palavras) — sintomas: "RH ainda não cabe no orçamento", líder de gente sendo o sócio, processos informais, ausência de ciclos de feedback. Custo de adiar.
   - **H2: "Como estruturar sem montar um RH inteiro?"** (~300 palavras) — etapas: diagnóstico → priorização (3-5 frentes) → ciclos curtos (90 dias) → mensuração → ajuste. Cada etapa em parágrafo curto.
   - **H2: "Quais frentes priorizar primeiro?"** (~250 palavras) — lista priorizada (cultura/valores, atração e onboarding, ciclo de feedback, desenvolvimento, sucessão, remuneração estratégica). Razão pra cada uma.
   - **H2: "Quanto tempo até ver mudança real?"** (~150 palavras) — expectativa realista 90-180 dias para resultados iniciais; 12 meses para sistema rodando.
   - **`<FaqBlock>` com 5 perguntas:**
     1. "Empresa com 20 pessoas precisa de gestão estratégica?"
     2. "É o mesmo que ter um RH terceirizado?"
     3. "Como você ajuda se eu não tenho ninguém de RH?"
     4. "Funciona para empresa familiar?"
     5. "O sócio precisa estar envolvido?"
   - **Posts relacionados**: links para `rh-futuro`, `saude-mental-estrategia` e 1 dos posts novos do cluster (S22).
   - **CTA** → `/contato/`.

5. **JSON-LD `Service`** com `@id: ${SITE_URL}/servicos/gestao-estrategica-de-pessoas/#service`, `serviceType: "Gestão Estratégica de Pessoas"`.

6. Build verde, smoke, commit `feat: pillar page /servicos/gestao-estrategica-de-pessoas`, marcar `✅`.

## Acceptance Criteria

- [ ] ≥1.500 palavras.
- [ ] H2s em formato pergunta com resposta direta.
- [ ] FaqBlock com 5 perguntas.
- [ ] Schema `Service` válido.
- [ ] Links para 2-3 posts.
- [ ] Build verde.

## Testing

- Build + preview.
- Schema Validator.
- Word count.

## Notes

- Não duplicar exatamente os mesmos exemplos do S12. Cada pillar deve ter exemplos distintos.
- Usar tom mais voltado para o **decisor** (sócio/diretor de PME), não para o líder direto.

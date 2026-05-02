---
id: "20"
phase: 3
complexity: medium
depends_on: ["04", "06", "07"]
files: ["src/pages/faq.astro"]
---

# Task 20 — Página /faq/

## Objective

Página `/faq/` com 15-20 Q&As consolidadas (não duplicadas dos blocos FAQ por post). Foco em perguntas comerciais/comparativas. Schema `FAQPage`.

## Detailed Steps

1. Marcar `status: 🔄` para id "20".

2. Criar `src/pages/faq.astro` usando `<PageLayout>`:
   - `title`: "Perguntas Frequentes — Eloyse Konell"
   - `description`: ~155 chars: "Dúvidas comuns sobre consultoria em liderança, gestão estratégica de pessoas, assessments e mentoria."
   - `canonical`: `${SITE_URL}/faq/`.
   - `breadcrumb`: `[Início, FAQ]`.

3. **Conteúdo:** página com 15-20 perguntas distribuídas em **4 categorias**:

   **A. Sobre a consultoria (4-5 perguntas):**
   - "Quem é Eloyse Konell?"
   - "Onde a consultoria é prestada — só em Blumenau?"
   - "Qual o foco principal do trabalho?"
   - "Atende empresas grandes ou só PMEs?"
   - "Trabalha com setor específico?"

   **B. Sobre os serviços (5-6 perguntas):**
   - "Qual a diferença entre desenvolvimento de líderes e mentoria executiva?"
   - "Posso contratar só assessment, sem desenvolvimento depois?"
   - "Faz treinamento corporativo de prateleira?"
   - "Como saber qual serviço é o ideal?"
   - "Atende líder individual ou só via empresa?"
   - "Faz coaching também?"

   **C. Sobre o processo (3-4 perguntas):**
   - "Como começar uma conversa?"
   - "Quanto tempo dura um projeto típico?"
   - "Como é a entrega dos resultados?"
   - "Trabalha presencial ou remoto?"

   **D. Sobre investimento e contratação (2-3 perguntas):**
   - "Qual o investimento?" *(resposta: depende de escopo, sem valor fixo; agendar conversa para diagnóstico)*
   - "Há contrato mínimo?"
   - "Emite NF como PJ?"

4. **Implementação:**
   - Cada categoria como `<section>` com `<h2>` e múltiplos `<details><summary>`.
   - Renderizar com componente `<FaqBlock>` (uma instância por categoria, ou uma única com todas as perguntas — preferir UMA `<FaqBlock>` consolidada com 15-20 entradas para emitir um `FAQPage` schema único).
   - Frontmatter da página define array `faqs` com Q&A; passa para `<FaqBlock>`.

5. **JSON-LD `FAQPage`** com todas as perguntas (emitido por `<FaqBlock>`).

6. **CTA final** → `/contato/`.

7. Build verde, smoke, commit `feat: criar página /faq com 15-20 perguntas consolidadas`, `✅`.

## Acceptance Criteria

- [ ] 15-20 perguntas em 4 categorias.
- [ ] **Não duplica** perguntas que aparecem nos blocos FAQ por post (foco aqui é mais comercial/comparativo).
- [ ] FAQPage schema válido com todas as perguntas.
- [ ] Breadcrumb funcional.
- [ ] Mobile responsivo.
- [ ] Build verde.

## Testing

- Build + preview.
- Schema Validator: FAQPage com 15-20 entradas.
- Spot-check anti-duplicação: comparar 2-3 perguntas com FAQs de posts (S21, S22) — devem ser diferentes.

## Notes

- Respostas curtas (2-4 frases) — perguntas frequentes não são lugar para texto longo.
- Voz formal-acolhedora consistente. Sem jargão.
- Não dar valor de investimento — só direcionar para conversa.

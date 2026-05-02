---
id: "12"
phase: 3
complexity: high
depends_on: ["01", "04", "07"]
files: ["src/pages/servicos/desenvolvimento-de-liderancas.astro"]
---

# Task 12 — Pillar /servicos/desenvolvimento-de-liderancas/

## Objective

Pillar page de 1.500-2.000 palavras sobre desenvolvimento de líderes na PME. Combina conteúdo do Services.astro + Consultoria.astro + redação nova. Schema `Service` linkado.

## Detailed Steps

1. Marcar `status: 🔄` para id "12".

2. Ler [src/components/Services.astro](../../../src/components/Services.astro) e [src/components/Consultoria.astro](../../../src/components/Consultoria.astro) para extrair copy base.

3. Criar `src/pages/servicos/desenvolvimento-de-liderancas.astro` usando `<PageLayout>`:
   - `title`: "Desenvolvimento de Líderes na PME | Eloyse Konell"
   - `description`: ~155 chars com keyword principal.
   - `canonical`: `${SITE_URL}/servicos/desenvolvimento-de-liderancas/`.
   - `breadcrumb`: `[{ label: 'Início', href: '/' }, { label: 'Serviços', href: '/servicos/' }, { label: 'Desenvolvimento de Líderes' }]`.

4. **Conteúdo (1.500-2.000 palavras, voz formal-acolhedora, H2s em formato pergunta para citability):**
   - `<PageHero>` com eyebrow "Serviços", title "Desenvolvimento de líderes na PME", deck 1-2 frases.
   - **H2: "O que é desenvolvimento de líderes na PME?"** (~150-200 palavras) — definição clara, parágrafo direto começando com a resposta. Diferencia treinamento corporativo grande de método aplicado em PME.
   - **H2: "Quando uma PME precisa investir em desenvolvimento de líderes?"** (~200-250 palavras) — sinais (turnover de liderança, gestores técnicos sem repertório de gente, sucessão sem planejamento, conflitos recorrentes, expansão exigindo nova camada de gestão). Lista numerada.
   - **H2: "Como o desenvolvimento de líderes funciona na prática?"** (~250-300 palavras) — etapas (diagnóstico, plano individual + coletivo, execução acompanhada, mensuração). Cada etapa em parágrafo curto.
   - **H2: "Que resultados esperar?"** (~150-200 palavras) — bullets de ganhos: redução de turnover, decisões mais consistentes, ciclos de feedback fluidos, sucessão visível, retenção. Frase de cautela: prazo realista 4-12 meses.
   - **H2: "Por que essa abordagem?"** (~200-250 palavras) — diferencia método aplicado vs. treinamento de prateleira. Usa `credenciais` para citar bases (PCC, neurociência, análise comportamental).
   - **`<FaqBlock>` com 5 perguntas** (frontmatter `faq` ou prop direta):
     1. "Quanto tempo leva para ver resultado?"
     2. "Funciona para empresa pequena (até 30 pessoas)?"
     3. "É treinamento ou consultoria?"
     4. "Como é cobrado?"
     5. "Trabalha com líderes técnicos (engenharia/TI)?"
   - **Posts relacionados**: links para 2-3 posts existentes mais alinhados (`tecnico-virou-gestor`, `sucessor-e-sucessao`, `cadeira-vazia` ou outros 4 posts que serão criados em S22).
   - **CTA**: "Vamos avaliar como aplicar isso na sua empresa?" → `/contato/`.

5. **JSON-LD `Service`** (id estável):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Service",
     "@id": "${SITE_URL}/servicos/desenvolvimento-de-liderancas/#service",
     "name": "Desenvolvimento de Líderes",
     "serviceType": "Desenvolvimento de Líderes",
     "provider": { "@id": "${SITE_URL}/#business" },
     "areaServed": ["Brasil", "Santa Catarina", "Vale do Itajaí"],
     "description": "...",
     "url": "${SITE_URL}/servicos/desenvolvimento-de-liderancas/"
   }
   ```

6. Rodar `npm run build`. Verde.

7. Smoke: contar palavras (≥1.500), conferir hierarquia H1→H2→H3, checar render do FaqBlock e JSON-LD.

8. Commit: `feat: pillar page /servicos/desenvolvimento-de-liderancas`.

9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] Página tem ≥1.500 palavras.
- [ ] H1 único; ≥4 H2s em formato pergunta com resposta direta.
- [ ] FaqBlock com 5 perguntas presente.
- [ ] Schema `Service` válido.
- [ ] Breadcrumb funcional.
- [ ] Links cruzados para 2-3 posts existentes.
- [ ] CTA para `/contato/`.
- [ ] `npm run build` verde.

## Testing

- Build + preview.
- Schema Validator: Service + FAQPage + BreadcrumbList reconhecidos.
- Conferir contagem de palavras.

## Notes

- **Esta task é principal carga de conteúdo.** Reservar tempo. Evitar gerar conteúdo genérico tipo "lorem". Usar exemplos concretos (até hipotéticos) e voz consultiva.
- Não inventar números/dados além dos confirmados em `credenciais.ts`.
- Conteúdo deve servir como pillar — quatro posts do blog vão linkar pra cá.

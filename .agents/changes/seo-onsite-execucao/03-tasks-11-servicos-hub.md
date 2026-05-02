---
id: "11"
phase: 3
complexity: medium
depends_on: ["04", "07"]
files: ["src/pages/servicos/index.astro", "src/components/ServiceCard.astro"]
---

# Task 11 — Hub /servicos/

## Objective

Criar hub `/servicos/` listando os 4 serviços com card cada. Componente `ServiceCard` reusável.

## Detailed Steps

1. Marcar `status: 🔄` para id "11".

2. **Criar `src/components/ServiceCard.astro`:**
   - Props: `title: string`, `deck: string`, `href: string`, `icon?: string` (emoji ou path), `bullets?: string[]` (3 itens opcionais).
   - Render: `<article class="service-card">` com título, deck, bullets (se houver), e link "Saiba mais →".
   - Estilo escopado (alinhado com tom visual do site — sand-warm, bordas leves).

3. **Criar `src/pages/servicos/index.astro`:**
   - `title`: "Serviços — Eloyse Konell | Liderança e Gestão Estratégica de Pessoas"
   - `description`: ~155 chars listando os 4 serviços brevemente.
   - `canonical`: `${SITE_URL}/servicos/`.
   - `breadcrumb`: `[{ label: 'Início', href: '/' }, { label: 'Serviços' }]`.

4. **Conteúdo:**
   - `<PageHero>` eyebrow "Serviços", title "Como posso ajudar", deck "Quatro frentes de atuação para empresas e líderes que querem método, não treinamento de prateleira."
   - **Parágrafo introdutório** (~80 palavras): contextualizando que cada serviço atende um momento específico da empresa.
   - **Grid de 4 `<ServiceCard>`**:
     1. **Desenvolvimento de Líderes** → `/servicos/desenvolvimento-de-liderancas/`. Deck: "Para empresas que precisam preparar gestores para o próximo nível de complexidade."
     2. **Gestão Estratégica de Pessoas** → `/servicos/gestao-estrategica-de-pessoas/`. Deck: "Para PMEs que crescem e precisam estruturar gestão de pessoas sem montar um RH inteiro."
     3. **Assessment** → `/servicos/assessment/`. Deck: "Para tomadores de decisão que querem clareza sobre o potencial e o gap dos seus líderes."
     4. **Mentoria Executiva** → `/servicos/mentoria-executiva/`. Deck: "Para executivos em transição ou em novos desafios — espaço seguro para pensar a própria liderança."
   - **CTA final**: "Não sabe qual serviço encaixa? Vamos conversar." → `/contato/`.

5. **JSON-LD `CollectionPage`** com `hasPart` listando os 4 services por `@id`:
   ```json
   { "@type": "CollectionPage", "name": "Serviços", "hasPart": [{ "@id": "...#service" }, ...] }
   ```

6. Rodar `npm run build`. Verde.

7. Smoke: `/servicos/` desktop + mobile (cards em 2x2 ou 1x4 conforme viewport).

8. Commit: `feat: criar hub /servicos com 4 cards e ServiceCard component`.

9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `/servicos/` renderiza hub com 4 cards.
- [ ] `ServiceCard.astro` é reutilizável.
- [ ] Links dos cards apontam para as 4 sub-páginas (que serão criadas em S12-S15).
- [ ] Breadcrumb e schema presentes.
- [ ] Mobile responsivo.
- [ ] `npm run build` verde.

## Testing

- Build + preview.
- Schema Validator: `CollectionPage` reconhecido.

## Notes

- Cards apontam para rotas que ainda não existem (S12-S15) — links 404 no preview até essas tasks rodarem. **Não é blocker** — orchestrator garante ordem antes do deploy final.
- Decks dos cards: copiar do roteiro acima ou ajustar sem perder a essência. Usar voz formal-acolhedora.

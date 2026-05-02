---
id: "23"
phase: 5
complexity: medium
depends_on: ["08", "09", "10", "11", "12", "13", "14", "15", "16", "20"]
files: ["src/pages/index.astro", "src/components/Cta.astro"]
---

# Task 23 — Home enxuta

## Objective

Remover seções da home que migraram para rotas dedicadas. Encurtar `Cta.astro` para versão home (com link para `/contato/` para visualização completa).

## Detailed Steps

1. Marcar `status: 🔄` para id "23".

2. **Editar `src/pages/index.astro`:**
   - Remover imports e tags de:
     - `<About>`
     - `<Consultoria>`
     - `<Proposito>`
     - `<Services>`
     - `<AssessmentSpotlight>`
   - **Manter** imports e tags de:
     - `<Nav>`
     - `<Hero>`
     - `<Campanha>` (se está em uso atualmente — confirmar)
     - `<Testimonials>`
     - `<Clients>`
     - `<Cta>` (versão encurtada — ver passo 3)
     - `<Footer>`
   - Conferir que IDs de âncora removidos (`#sobre`, `#consultoria`, `#proposito`, `#servicos`, `#assessment`) **não** são referenciados em outro lugar — se forem, ajustar.
   - **Não deletar** os componentes `About.astro`, `Consultoria.astro`, etc. — eles permanecem no repo (podem ser usados como referência ou reutilizados).

3. **Editar `src/components/Cta.astro`:**
   - Encurtar para versão home: 1 frase forte + 1 botão WhatsApp + 1 link "Ver formas de contato →" para `/contato/`.
   - Remover qualquer copy redundante com `/contato/`.
   - **Não** alterar fundamentalmente a estrutura visual — manter tom de bloco final.

4. Rodar `npm run build`. Verde.

5. Smoke visual: `/` em desktop e mobile.
   - Sem `#sobre`, `#consultoria`, etc. (rolagem para baixo só mostra Hero → Campanha → Testimonials → Clients → Cta → Footer).
   - CTA enxuto.
   - Sem 404 internos (links da Nav agora apontando para rotas reais — S24).

6. Commit: `feat: home enxuta após extração de seções para rotas dedicadas`.

7. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] `src/pages/index.astro` não importa `About`, `Consultoria`, `Proposito`, `Services`, `AssessmentSpotlight`.
- [ ] Componentes não-deletados (estão no repo, mas não usados na home).
- [ ] `Cta.astro` versão home tem 1 frase + WhatsApp + link `/contato/`.
- [ ] Build verde.
- [ ] Home renderiza sem 404 internos.

## Testing

- Build + preview.
- Spot-check: rolar a home e conferir o novo fluxo.
- Conferir que links da Nav e Footer (que ainda apontam para `#anchors` até S24 rodar) não causam 404 — *ATENÇÃO*: se Nav linkar `#sobre`, agora a âncora não existe na home; usuário rola até o topo. Não-bloqueante mas S24 corrige.

## Notes

- **`Campanha.astro` mantém** — é uma seção temporal (campanha promocional), conforme o uso atual.
- **`Hero.astro`, `Testimonials.astro`, `Clients.astro`** ficam intocados.
- Esta task pressupõe que todas as rotas dedicadas existem (deps S08-S20).

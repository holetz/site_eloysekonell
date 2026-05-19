# Task 01: Trocar `<section>` por `<div>` no FaqBlock

**Arquivos**: src/components/FaqBlock.astro
**Critério**: `FaqBlock.astro` não contém `<section class="faq-block">` nem `</section>` como elemento-raiz; contém `<div class="faq-block" role="region" aria-labelledby="faq-title">` e `id="faq-title"` no `<h2>`.
**Validação**: manual: inspecionar DOM em `/assessment` e `/servicos/mentoria-transicao-carreira`; bloco FAQ sem padding extra no topo/base

- [ ] Abrir `src/components/FaqBlock.astro`; localizar linha 23: `<section class="faq-block">`
- [ ] Substituir por `<div class="faq-block" role="region" aria-labelledby="faq-title">`
- [ ] Na linha 24, adicionar `id="faq-title"` ao `<h2 class="faq-title">` → `<h2 class="faq-title" id="faq-title">`
- [ ] Substituir `</section>` de fechamento (linha 50) por `</div>`
- [ ] Rodar `npm run build`; confirmar 0 erros

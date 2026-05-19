# Task 04: Remover `.wrap` das 6 sections em assessment.astro

**Arquivos**: src/pages/assessment.astro
**Critério**: Nenhuma das 6 `<section class="page-section ... wrap">` contém a classe `wrap`; classes `page-section` e específicas (ex: `assessment-intro`) permanecem.
**Validação**: manual: `/assessment` no browser; largura do conteúdo alinhada ao header/footer; sem inset duplo visível

- [ ] Linha 69: `class="page-section assessment-intro wrap"` → `class="page-section assessment-intro"`
- [ ] Linha 112: `class="page-section assessment-quando wrap"` → `class="page-section assessment-quando"`
- [ ] Linha 153: `class="page-section assessment-publico wrap"` → `class="page-section assessment-publico"`
- [ ] Linha 203: `class="page-section assessment-entregaveis wrap"` → `class="page-section assessment-entregaveis"`
- [ ] Linha 233: `class="page-section wrap"` → `class="page-section"`
- [ ] Linha 241: `class="page-section assessment-cta wrap"` → `class="page-section assessment-cta"`
- [ ] Rodar `npm run build`; 0 erros

# Task 07: Remover `.wrap` do article em desenvolvimento-de-liderancas.astro

**Arquivos**: src/pages/servicos/desenvolvimento-de-liderancas.astro
**Critério**: Linha 69 não contém `wrap`; `class="servico-page"` permanece.
**Validação**: manual: `/servicos/desenvolvimento-de-liderancas` no browser; largura do conteúdo alinhada ao header/footer

- [ ] Linha 69: `<article class="servico-page wrap">` → `<article class="servico-page">`
- [ ] Rodar `npm run build`; 0 erros
- [ ] Verificar visualmente: sem inset duplo, conteúdo alinhado ao header

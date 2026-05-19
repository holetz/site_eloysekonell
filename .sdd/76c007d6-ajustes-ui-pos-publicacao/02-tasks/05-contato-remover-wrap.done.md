# Task 05: Remover `.wrap` da section em contato.astro

**Arquivos**: src/pages/contato.astro
**Critério**: Linha 23 não contém `wrap`; `class="contato-wrap"` permanece.
**Validação**: manual: `/contato` no browser; largura do conteúdo alinhada ao header/footer

- [ ] Linha 23: `<section class="contato-wrap wrap">` → `<section class="contato-wrap">`
- [ ] Rodar `npm run build`; 0 erros
- [ ] Verificar `/contato` visualmente: sem inset duplo, margens laterais equivalentes ao header

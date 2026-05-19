# Task 06: Remover `.wrap` e ajustar espaçamento em servicos/index.astro

**Arquivos**: src/pages/servicos/index.astro
**Critério**: Linha 101 não contém `wrap`; segundo `.servicos-intro` tem margem superior distinta do primeiro, criando espaço simétrico ao redor do bloco.
**Validação**: manual: `/servicos` no browser; parágrafo "As quatro frentes abaixo…" com espaço equivalente acima e abaixo; largura do conteúdo alinhada ao header

- [ ] Linha 101: `<div class="wrap servicos-wrap">` → `<div class="servicos-wrap">`
- [ ] Localizar regra CSS de `.servicos-intro` (linha ~137); inspecionar se já há `margin-bottom` no primeiro parágrafo
- [ ] Adicionar `margin-top: var(--space-10)` ao segundo `.servicos-intro` via seletor `.servicos-intro + .servicos-intro` no `<style>` do arquivo; se `margin-collapse` anular, usar `padding-top` no segundo em vez de `margin-top`
- [ ] Rodar `npm run dev`; verificar espaçamento visualmente antes de fazer `build` final
- [ ] Rodar `npm run build`; 0 erros

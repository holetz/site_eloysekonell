# Task 02: Ajustar `getImage` para 640×800 em BlogLayout e /blog

**Arquivos**: src/layouts/BlogLayout.astro, src/pages/blog/index.astro
**Critério**: Ambos os arquivos chamam `getImage` com `width: 640, height: 800`; nenhum chama com `width: 120, height: 120`.
**Validação**: manual: abrir artigo do blog e `/blog` no DevTools com DPR=2 (Device Pixel Ratio); foto da autora sem blur

- [ ] Em `src/layouts/BlogLayout.astro` linha 61: trocar `width: 120, height: 120` → `width: 640, height: 800`
- [ ] Em `src/pages/blog/index.astro` linha 18: trocar `width: 120, height: 120` → `width: 640, height: 800`
- [ ] Verificar que o `format: 'webp'` permanece nos dois arquivos
- [ ] Rodar `npm run build`; confirmar que a pipeline de imagens não emite erro
- [ ] Inspecionar no `npm run preview`: foto nítida em 2x, círculo no artigo sem distorção, frame 4:5 no `/blog` visualmente correto

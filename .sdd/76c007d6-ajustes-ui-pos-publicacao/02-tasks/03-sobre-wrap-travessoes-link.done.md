# Task 03: Remover `.wrap`, travessões e link em sobre.astro

**Arquivos**: src/pages/sobre.astro
**Critério**: `sobre.astro` não contém `class="sobre-page wrap"`, nem `—` nas linhas de corpo (62 e 120), nem o `<a href="/metodologia/"` com texto "Conheça a metodologia". `<title>` e `alt` com `—` permanecem intactos.
**Validação**: manual: `/sobre` no browser; largura do conteúdo alinhada ao header; sem `—` visível nos parágrafos de corpo; link "Conheça a metodologia" ausente do DOM inspecionado

- [ ] Linha 38: `<section class="sobre-page wrap">` → `<section class="sobre-page">`
- [ ] Linha 62: `pipeline — de` → `pipeline, de`
- [ ] Linha 120: `organizacional —` → `organizacional,`
- [ ] Linha 125: remover `<a href="/metodologia/" class="link-arrow">Conheça a metodologia →</a>` inteiro
- [ ] Confirmar que linha 26 (`title="Sobre Eloyse Konell — Psicóloga...`) e linha 45 (`alt="Eloyse Konell — consultora..."`) permanecem com `—` inalterado
- [ ] Rodar `npm run build`; 0 erros

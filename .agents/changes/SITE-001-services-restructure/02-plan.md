# Implementation Plan: Reestruturação da Seção de Serviços — Flip Cards

**JIRA**: SITE-001  
**Data**: 2026-03-08  
**Status**: Aguardando aprovação

---

## Overview

Substituir a grade atual de 6 cards estáticos por 8 flip cards 3D organizados em dois grupos
temáticos. A implementação é **self-contained** em 3 arquivos de componente (`services.html`,
`services.css`) e 1 arquivo de script global (`main.js`). Nenhuma dependência externa nova.
A mecânica de flip é baseada em CSS 3D transform; JavaScript gerencia apenas estado e ARIA.

---

## Architecture Changes

### Estrutura HTML nova

```
<section>                          ← mantém id="carousel_23e7", u-section-2
  <div u-group-1>                  ← banner dark — sem alteração
  <div class="c-services">
    <div class="c-services__group" data-group="leadership">
      <h3 class="c-services__group-title">LIDERANÇA ALTA PERFORMANCE</h3>
      <div class="c-services__grid">
        <div class="c-flip-card" tabindex="0" aria-expanded="false">
          <div class="c-flip-card__inner">
            <div class="c-flip-card__front">  ← ícone + título + pills
            <div class="c-flip-card__back">   ← intro + bullets + CTA
```

### Novos arquivos / modificações

| Arquivo | Ação |
|---------|------|
| `src/components/sections/services.html` | Reescrita completa |
| `src/styles/components/services.css` | Reescrita completa |
| `src/scripts/main.js` | Adição de `initServiceCards()` |

### Ícones SVG

8 SVGs inline (outline, 40×40px viewBox), sem arquivos externos.
Um ícone temático por serviço, definidos diretamente no HTML.

---

## Implementation Steps

### Step 1: HTML do componente `services.html`

**Arquivos**: `src/components/sections/services.html`

**Technical approach**:  
Reescrever completamente o HTML da seção mantendo o `id="carousel_23e7"` e
a classe `u-section-2` para não quebrar âncoras ou seletores existentes.
Adicionar a estrutura `.c-services` > `.c-services__group` > `.c-services__grid` > `.c-flip-card`.
Cada `.c-flip-card` contém `.c-flip-card__inner` > `.c-flip-card__front` + `.c-flip-card__back`.
Incluir os 8 SVGs inline nos cards front. Adicionar `tabindex="0"`, `role="button"`,
`aria-expanded="false"` e `aria-label` em cada card para acessibilidade.
Pills são `<span class="c-flip-card__pill">` dentro do front.
CTA no back é `<a href="#block-2" class="c-flip-card__cta">Quero saber mais</a>`.

**Dependencies**: Nenhuma

---

### Step 2: CSS do componente `services.css`

**Arquivos**: `src/styles/components/services.css`

**Technical approach**:  
Reescrever completamente usando classes `c-*` (BEM). Manter os seletores `.u-section-2`
e `.u-group-1` apenas para compatibilidade de layout estrutural já definido no nicepage.
Implementar:
- `.c-services`: container wrapper, `max-width: 929px`, `margin: auto`
- `.c-services__group`: bloco de grupo, `margin-bottom: 60px`
- `.c-services__group-title`: estilo de rótulo de frente (uppercase, cor paleta-1, separador)
- `.c-services__grid`: CSS Grid, `grid-template-columns: repeat(2, 1fr)`, `gap: 16px`
- `.c-flip-card`: `perspective: 1200px`, altura mínima `min-height: 260px`
- `.c-flip-card__inner`: `transform-style: preserve-3d`, `transition: transform 0.5s ease`
- `.c-flip-card--flipped .c-flip-card__inner`: `transform: rotateY(180deg)`
- `.c-flip-card__front` + `.c-flip-card__back`: `backface-visibility: hidden`; back tem `transform: rotateY(180deg)`
- `.c-flip-card__pill`: badge arredondado, fundo `--color-palette-3`, texto escuro
- `.c-flip-card__cta`: botão com estilo coerente com `u-btn` existente
- Responsividade: `@media (max-width: 767px)` → grid 1 coluna; `@media (max-width: 991px)` → manter 2 colunas ou reduzir para 1 se necessário

**Dependencies**: Step 1 (nomes de classes definidos no HTML)

---

### Step 3: JavaScript — `initServiceCards()` em `main.js`

**Arquivos**: `src/scripts/main.js`

**Technical approach**:  
Adicionar função `initServiceCards()` que:
1. Seleciona todos `.c-flip-card`
2. Adiciona listener de `click` → toggle de classe `c-flip-card--flipped` + toggle de `aria-expanded`
3. Adiciona listener de `keydown` para `Enter` e `Space` (acessibilidade por teclado), com `preventDefault()` no Space
4. Retorna objeto com método `destroy()` para cleanup
Chamar `initServiceCards()` dentro de `initSiteModules()` e incluir no objeto de retorno.

**Dependencies**: Step 1 e Step 2

---

## Testing Strategy

- **Visual manual**: Abrir `dist/index.html` no navegador e verificar:
  - Dois grupos com seus rótulos
  - Cards em 2×2 em desktop
  - Flip 3D ao clicar
  - Flip reverso ao clicar novamente
  - Pills visíveis no card 1
  - CTA funcionando e fazendo scroll para `#block-2`
- **Responsividade**: Testar em 320px, 768px, 1200px (DevTools)
- **Teclado**: Navegar por Tab, ativar com Enter/Space, verificar `aria-expanded`
- **Build**: Rodar `npm run build` e verificar que `dist/` contém HTML montado correto



---

## Risks and Mitigations

- **Risk**: `backface-visibility` inconsistente em iOS Safari antigo → **Mitigation**: adicionar prefixo `-webkit-backface-visibility: hidden`
- **Risk**: Cards com título muito longo quebrem a grade → **Mitigation**: definir `min-height` no `.c-flip-card__front` e usar `overflow: auto` no back
- **Risk**: nicepage.css sobrescreve estilos do flip → **Mitigation**: usar seletores BEM específicos (`c-`) que não conflitam com `u-*`
- **Risk**: `transform-style: preserve-3d` não funciona em elementos com `overflow: hidden` → **Mitigation**: não usar `overflow: hidden` no `.c-flip-card`

---

## Rollout Considerations

- O build atual roda `npm run build` e gera `dist/` — nenhuma mudança de processo.
- O site em `docs/` é o build legado; o novo componente vive em `src/`.
- Nenhuma mudança na seção CTA, header, footer ou outras seções.
- Nenhuma alteração de rotas ou deploy process.

# Plano: Ajustes visuais e de layout pós-publicação

## Abordagem
Seis ajustes independentes; cada um isolado por arquivo/componente, sem dependências cruzadas. Foto autora: `getImage` recebe 640×800 em `BlogLayout.astro` e `blog/index.astro` — image pipeline gera resolução 2x; CSS existente (background-size: cover + border-radius) mantém o crop. Carrossel de depoimentos: substituição da grid estática por flex + `scroll-snap-type: x mandatory` com botões SVG inline em `Testimonials.astro`. Remoção de `.wrap` nos 5 containers-alvo elimina inset duplo (`.page-main` já fornece max-width + padding). Travessões e link: edição pontual em `sobre.astro`. FaqBlock: troca `<section>` por `<div role="region" aria-labelledby>` no componente — remove o double-padding do global `section { padding }` em todas as páginas que o usam.

## Alternativas consideradas
- Carrossel com lib externa (Swiper, Splide) — rejeitada: dependência externa desnecessária; scroll-snap nativo cobre o requisito sem JS adicional
- Corrigir double-padding via override `section.faq-block` no `global.css` — rejeitada: mais frágil que trocar o elemento-raiz no componente
- Remover regra global `section { padding }` — rejeitada: explicitamente fora de escopo

## Mudanças por arquivo
- `src/layouts/BlogLayout.astro` — `getImage` width/height de 120×120 para 640×800
- `src/pages/blog/index.astro` — `getImage` width/height de 120×120 para 640×800
- `src/components/Testimonials.astro` — grid estática → carrossel scroll-snap; botões SVG prev/next; CSS mobile 1-card / desktop 1,5-card; JS de scroll por clique
- `src/pages/servicos/index.astro` — remove `.wrap` do `<div class="wrap servicos-wrap">`; adiciona `margin-top: var(--space-10)` a `.servicos-intro + .servicos-intro`
- `src/pages/sobre.astro` — remove `.wrap` de `<section class="sobre-page wrap">`; linha 62 `— de` → `, de`; linha 120 `organizacional —` → `organizacional,`; remove `<a href="/metodologia/" ...>Conheça a metodologia →</a>` (linha 125)
- `src/pages/assessment.astro` — remove `.wrap` das 6 `<section class="page-section ... wrap">`
- `src/pages/contato.astro` — remove `.wrap` de `<section class="contato-wrap wrap">`
- `src/pages/servicos/desenvolvimento-de-liderancas.astro` — remove `.wrap` de `<article class="servico-page wrap">`
- `src/components/FaqBlock.astro` — `<section class="faq-block">` → `<div class="faq-block" role="region" aria-labelledby="faq-title">`; adiciona `id="faq-title"` em `<h2 class="faq-title">`

## Ordem lógica
1. `FaqBlock.astro`: troca `<section>` por `<div>` + atributos de acessibilidade
2. `BlogLayout.astro` e `blog/index.astro`: alterar dimensões no `getImage` (paralelo)
3. `sobre.astro`: remover `.wrap`, substituir travessões, remover link metodologia
4. `assessment.astro`: remover `.wrap` das 6 sections
5. `contato.astro`: remover `.wrap` da section
6. `servicos/index.astro`: remover `.wrap` do div; ajustar CSS segundo parágrafo
7. `servicos/desenvolvimento-de-liderancas.astro`: remover `.wrap` do article
8. `Testimonials.astro`: implementar carrossel scroll-snap com botões SVG inline

## Riscos técnicos
- Carrossel dentro de `.wrap` (`overflow: hidden` por padrão em alguns contextos) pode clipar o peek do próximo card → verificar se scroll container precisa de margens negativas ou `overflow: visible` no wrapper durante implementação
- `FaqBlock` em `BlogLayout.astro` perde `section { padding }` — artigos com FAQ ficam com apenas `margin: 3rem 0` em vez do padding da section; tradeoff aceitável, não listado no objetivo como página afetada
- `getImage` 640×800 aumenta asset gerado em build (~3–5× o tamanho anterior) — tradeoff deliberado para nitidez Retina; sem alternativa dentro do escopo

## Decisões abertas
- Peek do carrossel: se `.wrap` clipar overflow, decidir entre `overflow: visible` no wrapper ou padding-right no track para sinalizar que há mais conteúdo — decidir na implementação observando o comportamento visual
- Margem segundo `.servicos-intro`: CSS margin collapse pode anular `margin-top: var(--space-10)` se a folha já tiver `margin-bottom: var(--space-10)` no primeiro parágrafo; se inefetivo visualmente, substituir por `padding-top` no segundo para ou separador — verificar no `npm run dev`
- `id="faq-title"` em `FaqBlock`: valor fixo; se múltiplos FaqBlocks aparecerem na mesma página (não acontece atualmente), geraria IDs duplicados — sem impacto no escopo atual, registrado para vigilância futura

## Validação
- `npm run build` conclui sem erros de TypeScript ou Astro pipeline
- `/blog` e artigo individual: foto da autora nítida em DevTools com Device Pixel Ratio = 2 (sem blur em 2x)
- Seção depoimentos na home: arrasto horizontal funciona; próximo card parcialmente visível no desktop (≥1280px); um card por vez em 375px; setas prev/next avançam/retrocedem corretamente
- `/servicos`: espaçamento acima e abaixo do parágrafo "As quatro frentes abaixo…" visualmente equivalente
- 5 páginas com `.wrap` removido (`/sobre`, `/assessment`, `/contato`, `/servicos`, `/servicos/desenvolvimento-de-liderancas`): margem lateral do conteúdo alinhada ao header/footer
- `/sobre`: ausência de `—` nos parágrafos de corpo (linhas 62 e 120); `<title>` e `alt` com travessão intactos; link "Conheça a metodologia" ausente do DOM inspecionado
- FAQ em `/assessment` e `/servicos/*`: padding vertical ao redor do bloco equivalente ao de outras seções (sem espaço extra no topo ou base do componente)

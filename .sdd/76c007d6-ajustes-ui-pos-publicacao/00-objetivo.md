# Objetivo: Ajustes visuais e de layout pós-publicação

## Contexto
Site da Eloyse Konell publicado. Cliente identificou seis pontos de polimento após ver no ar. Não são bugs funcionais — são ajustes de fidelidade, hierarquia visual e ritmo que afetam percepção de cuidado profissional.

## O que muda
- Foto da Eloyse renderiza nítida em Retina. Causa raiz: `getImage` força 120x120 num retrato 4:5 (distorção + downscale). Chamar `getImage` com 640×800 (4:5, 2x) em ambos os arquivos (`BlogLayout.astro` e `blog/index.astro`), mantendo `eloyse-author-blog.jpg` como fonte. Círculo no `BlogLayout` permanece via crop CSS (`border-radius: 50%`, `object-fit: cover`); frame 4:5 em `/blog` via `background-size: cover` no div existente.
- Depoimentos exibidos em carrossel horizontal com scroll-snap (arrastar + setas SVG inline, sem auto-play). Desktop: 1,5 cards visíveis (peek do próximo sinaliza scroll). Mobile: 1 card por vez. Setas sem dependência externa — SVG simples inline.
- Seção Serviços (`/servicos`): parágrafo "As quatro frentes abaixo..." com margem superior e inferior simétricas, criando respiro equilibrado ao redor.
- Páginas internas com largura regida por `.page-main`. `.wrap` removido apenas dos containers diretos das páginas: `sobre`, `assessment`, `contato`, `servicos/index`, `servicos/desenvolvimento-de-liderancas`.
- Página Sobre: travessões (`—`) nas linhas de corpo (linhas 62 e 120 de `sobre.astro`) substituídos por vírgula. Travessões em `<title>` e atributo `alt` permanecem intactos. Link "Conheça a metodologia →" removido do DOM.
- FAQ sem double-padding em todas as páginas que o usam. Fix no componente `FaqBlock`: trocar `<section>` por `<div>`; adicionar `id` ao `<h2 class="faq-title">` e `aria-labelledby` correspondente no `<div>` (mantém semântica). Beneficia `/assessment` e 4 páginas `/servicos/*`.

## Sucesso
- Foto no `BlogLayout` e em `/blog` nítida em telas 1x e 2x; enquadramento 4:5 preservado na seção da autora; círculo do artigo mantido sem distorção.
- Depoimentos em carrossel horizontal: 1,5 cards no desktop, 1 no mobile; navegáveis por arrasto e setas SVG; sem empilhamento em tela larga.
- Espaçamento antes e depois do parágrafo-âncora em `/servicos` simétrico e alinhado ao ritmo da seção.
- Conteúdo das cinco páginas listadas alinha à mesma largura visual do header/footer; sem inset duplicado.
- Texto de `/sobre` sem caracteres `—` nos parágrafos de corpo; `<title>` e `alt` intactos.
- Link "Conheça a metodologia →" ausente do DOM em `/sobre`.
- Margens verticais ao redor do `FaqBlock` equivalentes às demais seções em todas as cinco páginas que o renderizam.

## Fora de escopo
- Redesign de seções ou nova arquitetura de informação.
- Mudanças de copy além da substituição de travessões por vírgula em `/sobre`.
- Substituição da foto por nova imagem (`eloyse-author-blog.jpg` permanece como fonte).
- Criar página/conteúdo de metodologia.
- Reescrita do sistema de grid global.
- Refatorar componentes reusáveis da home (Hero, About, Services, Testimonials, Cta, AssessmentSpotlight, Proposito, Consultoria, Campanha, Clients, Footer) — `.wrap` permanece neles.
- Remoção de `.wrap` em `/blog` (sections full-bleed, fora de `page-main` — verificado, sem conflito).
- Auto-play em carrossel de depoimentos.
- Tratamento individual de componentes reusáveis caso apareçam com inset duplo em página interna — abordagem pontual fica fora deste ciclo.
- Remoção da regra global `section { padding }` — escopo restrito ao componente FAQ.

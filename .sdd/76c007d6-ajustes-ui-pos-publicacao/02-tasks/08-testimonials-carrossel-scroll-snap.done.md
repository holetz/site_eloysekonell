# Task 08: Implementar carrossel scroll-snap em Testimonials.astro

**Arquivos**: src/components/Testimonials.astro
**Critério**: `.testimonials-grid` usa `display: flex; overflow-x: scroll; scroll-snap-type: x mandatory`; desktop mostra 1,5 cards (peek); mobile mostra 1 card; botões prev/next SVG inline presentes no DOM; sem auto-play; sem biblioteca externa.
**Validação**: manual: home page no browser; arrastar track horizontalmente funciona; setas prev/next avançam/retrocedem; próximo card parcialmente visível em ≥1280px; 1 card por vez em 375px

- [ ] Alterar `.testimonials-grid` de `display: grid` para `display: flex; overflow-x: scroll; scroll-snap-type: x mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch`
- [ ] Cada `.testimonial` recebe `flex: 0 0 calc(100% / 1.5); scroll-snap-align: start` (desktop); breakpoint ≤768px: `flex: 0 0 100%`
- [ ] Verificar se `.testimonials` ou pai usa `overflow: hidden` que clipe o peek — se sim, adicionar `overflow: visible` ou margens negativas no track
- [ ] Adicionar botões prev/next antes e depois do track: `<button class="testimonials-prev">` e `<button class="testimonials-next">` com SVG seta simples inline (chevron esquerdo/direito, sem dependência)
- [ ] Adicionar `<script>` inline: `prev.addEventListener('click', () => grid.scrollBy({ left: -cardWidth, behavior: 'smooth' }))`; idem para next com `+cardWidth`; `cardWidth` = `grid.firstElementChild.offsetWidth`
- [ ] Estilizar botões: posição absoluta ou adjacente ao track; sem fundo preenchido pesado (ghost ou minimal); acessível com `aria-label="Anterior"` / `aria-label="Próximo"`
- [ ] Rodar `npm run build`; 0 erros; validar no browser em 375px e 1280px

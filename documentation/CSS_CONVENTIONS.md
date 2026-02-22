# CSS CONVENTIONS — Eloyse Konell

Convenções para manter o CSS previsível, fácil de revisar por IA e seguro para evolução incremental.

## 1) Nomenclatura (classes e IDs)

## Estado atual (legado Nicepage)

- Classes utilitárias e estruturais: `u-*` (ex.: `u-section-2`, `u-list-1`, `u-btn-1`)
- IDs de blocos/seções: `sec-*`, `block-*`, `carousel_*`

## Padrão recomendado para novo código

- **Classes de componente:** `c-nome-do-componente`
- **Elementos internos:** `c-componente__elemento`
- **Variações:** `c-componente--modificador`
- **Hooks JS:** `js-nome-da-acao`
- **IDs:** usar somente quando necessário (âncora, acessibilidade ou integração)

Exemplo:

```html
<section class="c-hero c-hero--home" id="hero">
  <h1 class="c-hero__title">...</h1>
  <button class="c-button js-open-whatsapp">...</button>
</section>
```

Regra de ouro: não renomear classes `u-*` existentes em massa; evoluir por camada de override/controlado.

---

## 2) Organização de arquivos CSS

## Situação atual

- `nicepage.css`: base vendor (não editar diretamente)
- `index.css`: estilos específicos da página principal

## Direção arquitetural (já prevista no projeto)

- `src/styles/settings/`: variáveis/tokens
- `src/styles/global/`: base global
- `src/styles/components/`: componentes reutilizáveis

## Ordem recomendada dentro de cada arquivo

1. Estrutura/layout
2. Tipografia
3. Cores e fundos
4. Estados/interações
5. Responsividade

Regra prática para IA:

- Mudança global de visual: priorizar camada de settings/global.
- Mudança local de seção: editar CSS da seção/componente.

---

## 3) Media queries e breakpoints

Breakpoints oficiais em uso no `index.css`:

- `@media (max-width: 1199px)`
- `@media (max-width: 991px)`
- `@media (max-width: 767px)`
- `@media (max-width: 575px)`

Boas práticas:

- Manter a mesma ordem de declaração (do maior para o menor).
- Alterar apenas o necessário por breakpoint.
- Evitar criar breakpoints novos sem necessidade de layout real.

---

## 4) Boas práticas de escrita CSS

- Preferir classes a seletores por tag.
- Evitar alta especificidade e cadeias muito longas.
- Não usar `!important` exceto em conflito inevitável com legado vendor.
- Agrupar regras relacionadas e manter blocos curtos.
- Reutilizar valores recorrentes (`padding: 30px`, `font-size: 1.25rem`, `line-height: 1.4`) antes de criar novos.
- Garantir contraste e legibilidade em textos sobre imagem.

---

## 5) Convivência com legado Nicepage

- `nicepage.css` deve ser tratado como biblioteca externa.
- Ajustes devem ocorrer em `index.css` (ou camada modular futura), com escopo mínimo.
- Sempre validar impacto visual em:
  - desktop
  - tablet (`991px` / `767px`)
  - mobile (`575px`)

---

## 6) Checklist rápido antes de commitar CSS

- A alteração foi feita no arquivo correto (global vs local)?
- Reutiliza breakpoints oficiais?
- Evita mexer em `nicepage.css`?
- Mantém tipografia oficial (Montserrat/Raleway)?
- Não quebrou seção existente em mobile?

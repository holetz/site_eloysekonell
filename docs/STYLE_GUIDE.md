# STYLE GUIDE — Eloyse Konell

Guia visual prático para manter consistência da identidade do site e acelerar alterações assistidas por IA.

## 1) Paleta de cores (extraída de `index.css`)

### Cores explícitas encontradas

- `rgba(0, 0, 0, 0.5)`
  - Uso atual: overlay/escurecimento do hero (`.u-section-1` com `linear-gradient`).

### Tokens de cor usados no HTML/CSS (via classes Nicepage)

O projeto usa majoritariamente classes semânticas (`u-palette-*`, `u-grey-*`, `u-white`) e não valores hex diretos no `index.css`.

Tokens mais recorrentes:

- `u-palette-1-base`
- `u-palette-1-light-1`
- `u-palette-1-light-3`
- `u-palette-2-dark-3`
- `u-palette-3-dark-2`
- `u-palette-4-base`
- `u-palette-4-light-3`
- `u-palette-5-base`
- `u-palette-5-light-2`
- `u-palette-5-light-3`
- `u-grey-5`, `u-grey-10`, `u-grey-30`, `u-grey-80`
- `u-white`

> Decodificação de hex desses tokens está em `nicepage.css` (camada vendor). Evite redefinir esses valores diretamente em `index.css` sem necessidade.

---

## 2) Tipografia

### Fontes oficiais

- **Montserrat** (destaque em títulos e chamadas)
- **Raleway** (base institucional/apoio)

As fontes são carregadas no `index.html` por Google Fonts (`u-theme-google-font` e `u-page-google-font`).

### Escala tipográfica observada em `index.css`

- `0.9375rem` (~15px): textos de suporte/listas
- `1.25rem` (~20px): títulos de cards/itens
- `1.5rem` (~24px): destaque intermediário
- `1.875rem` (~30px): títulos de seção
- `2.25rem` (~36px) e `2em`: chamadas maiores

### Altura de linha

- `1.4`: textos descritivos em cards/listas
- `1.8`: blocos mais longos

---

## 3) Espaçamentos

Valores recorrentes encontrados:

- `padding: 30px` (muito frequente em containers)
- `padding: 17px` e `padding: 10px` (ícones/ajustes internos)
- `margin: 0 auto` (centralização)
- `margin: 16px 0 0` (espaço entre título e texto)
- `margin: 8px 0 0`, `margin: 20px 0 0` (ajustes verticais)

### Regra prática

- Reutilize primeiro os padrões acima.
- Se precisar de novo espaçamento, priorize múltiplos de `2px`/`5px` para manter ritmo visual.
- Evite “números mágicos” em elementos novos sem justificativa visual clara.

---

## 4) Componentes visuais padrão

Padrões recorrentes da UI atual:

- **Hero com imagem + overlay escuro** (`.u-section-1`)
- **Cards em grade com ícone circular + título + descrição** (`.u-section-2`)
- **Bloco com slider/carrossel** (`.u-section-3`)
- **Seção de conteúdo com imagem + texto institucional** (`.u-section-4`)
- **Grid de logos/parcerias** (`.u-section-7`)
- **CTA com botão arredondado (raio alto)** (`.u-section-5`)
- **Footer com contatos e redes sociais** (`footer`)

### Diretriz de consistência

- Preservar hierarquia visual: título > subtítulo > corpo.
- Manter raio/estilo de botão existente para CTAs.
- Não misturar estilos novos com classes `u-*` sem escopo claro.

---

## 5) Guia de branding

### Tom e mensagem

- Posicionamento: consultoria de RH estratégica, humana e transformadora.
- Linguagem: profissional, acolhedora e orientada a resultados sustentáveis.

### Aplicação de marca

- Logo principal em contextos institucionais (header/footer).
- Evitar distorcer proporção de logos de parceiros.
- Priorizar contraste adequado em textos sobre imagem (usar overlay quando necessário).

### Regras para IA

- Não trocar fontes oficiais sem solicitação explícita.
- Não introduzir paleta paralela fora de `u-palette-*` + tokens já usados.
- Em novas seções, replicar estrutura visual de seção existente mais próxima (card, bloco institucional, CTA ou lista de logos).

---

## 6) Responsividade oficial

Breakpoints ativos no `index.css`:

- `1199px`
- `991px`
- `767px`
- `575px`

Ao criar novo estilo, use esses mesmos cortes para manter comportamento responsivo consistente no projeto inteiro.

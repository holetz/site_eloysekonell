# AI GUIDELINES — Eloyse Konell

Guia operacional para agentes de IA modificarem este projeto com segurança, velocidade e mínimo retrabalho.

## 1) Como navegar no projeto

## Arquivos críticos (estado atual)

- `index.html`: estrutura principal da página
- `index.css`: estilos específicos da home
- `nicepage.css`: base visual legada/vendor
- `nicepage.js`: scripts legados
- `images/`: assets de conteúdo visual
- `technical_design.md`: arquitetura alvo e direção de modularização

## Regra de prioridade para edição

1. Alteração de conteúdo/seção: `index.html`
2. Ajuste visual local: `index.css`
3. Ajuste de vendor: **evitar** (`nicepage.css` só em último caso)

---

## 2) Onde encontrar componentes específicos

Mapeamento rápido de seções em `index.html`:

- Header/logo: `header#sec-a060`
- Hero principal: `.u-section-1` (`#sec-2e86`)
- Serviços em cards: `.u-section-2` (`#carousel_23e7`)
- Slider missão/visão: `.u-section-3` (`#sec-d0f5`)
- Sobre nós: `.u-section-4` (`#block-1`)
- Alianças/parcerias: `.u-section-7` (`#sec-92a9`)
- CTA contato: `.u-section-5` (`#block-2`)
- Seção de respiro/apoio: `.u-section-6` (`#block-3`)
- Rodapé: `footer#sec-4f1f`

Mapeamento de assets:

- Logos e imagens: `images/`
- Arquivos públicos: `files/`

---

## 3) Padrões de comentários para IA

Para mudanças relevantes, incluir comentários curtos e rastreáveis no HTML:

```html
<!-- AI: START section-cta copy update -->
...
<!-- AI: END section-cta copy update -->
```

Para CSS novo de componente/seção:

```css
/* AI: section-alliances mobile spacing fix */
```

Boas práticas:

- Comentário deve explicar **intenção**, não descrever o óbvio.
- Não poluir o arquivo com comentários redundantes.
- Remover comentários temporários após validação final, quando não agregarem manutenção futura.

---

## 4) Como modificar estilos globais

Estado atual:

- Não há `theme.css` consolidado em produção ativa.
- Global visual ainda depende fortemente de `nicepage.css` + classes `u-palette-*`.

Fluxo recomendado:

1. Tentar resolver em `index.css` com escopo controlado por seção.
2. Evitar sobrescrever classes genéricas globais `u-*` sem necessidade.
3. Se mudança for realmente global, documentar impacto e validar todas as seções.

Direção futura (arquitetura alvo):

- Centralizar tokens em `src/styles/settings/` (quando pipeline modular estiver ativo).

---

## 5) Como criar novos componentes

## Se o projeto continuar no modo estático atual

1. Inserir bloco no `index.html` próximo da seção correlata.
2. Criar classes novas com prefixo de componente (`c-*`) sem remover `u-*` existente.
3. Adicionar estilos no `index.css` em bloco dedicado.
4. Replicar breakpoints padrão (`1199/991/767/575`).

## Se a estrutura modular `src/` estiver ativa

1. Criar pasta do componente em `src/components/common/` ou `src/components/sections/`.
2. Separar `component.html`, `component.css` e `component.js` (quando necessário).
3. Incluir componente no template com padrão `<!-- INCLUDE: ... -->`.

---

## 6) Checklist obrigatório antes de alterar

- Entendeu se a mudança é **conteúdo**, **layout local** ou **estilo global**?
- Identificou a seção correta em `index.html`?
- Evitou edição direta de `nicepage.css`?
- Manteve tipografia oficial (Montserrat/Raleway)?
- Usou apenas breakpoints oficiais (`1199`, `991`, `767`, `575`)?
- Revisou impacto em desktop/tablet/mobile?
- Garantiu que links externos, WhatsApp, e-mail e telefone continuam válidos?

---

## 7) Anti-padrões (não fazer)

- Não reestruturar todo HTML para “limpar” sem solicitação explícita.
- Não apagar classes `u-*` em lote.
- Não criar paleta nova sem alinhamento com branding.
- Não introduzir dependências de build/framework sem tarefa específica.
- Não alterar textos institucionais críticos sem validar contexto de marca.

---

## 8) Entrega esperada de uma IA após mudanças

Toda entrega deve informar:

- Arquivos alterados
- O que foi mudado (resumo objetivo)
- Riscos/impactos possíveis
- Como validar rapidamente no navegador

# Specification: Reestruturação da Seção de Serviços — Flip Cards

**JIRA**: SITE-001  
**Data**: 2026-03-08  
**Status**: Aguardando revisão

---

## Overview

A seção de serviços atual exibe 6 cards estáticos em grade 3×2. O objetivo é reestruturar
essa seção para comunicar de forma granular e interativa 8 serviços organizados em duas
frentes estratégicas distintas: **Liderança Alta Performance** (4 serviços) e **Gestão
Estratégica de Pessoas** (4 serviços).

A nova experiência utiliza **flip cards 3D** que mostram informação essencial na frente
e revealam descrição detalhada + CTA no verso ao clique/toque, mantendo o visual limpo e
coerente com o estilo atual do site (branco, sombra leve, bordas arredondadas).

---

## Functional Requirements

### Core Functionality

- **8 flip cards** no total, substituindo os 6 cards estáticos atuais.
- Cada card tem **frente (face)** e **verso (back)**:
  - **Frente**: ícone SVG outline + título do serviço + pills/tags de subtítulo (onde aplicável)
  - **Verso**: parágrafo introdutório + lista de bullets + botão "Quero saber mais" ancorando em `#block-2`
- Cards organizados em **dois grupos verticalmente empilhados**:
  1. Grupo 1 — **LIDERANÇA ALTA PERFORMANCE** (4 cards em grade 2×2)
  2. Grupo 2 — **GESTÃO ESTRATÉGICA DE PESSOAS** (4 cards em grade 2×2)
- Cada grupo possui cabeçalho de identificação (título da frente estratégica).
- O flip é ativado por **clique** (desktop e mobile — mesma mecânica via touch).
- O flip ocorre com **transição CSS suave** (rotação 3D no eixo Y, ~0.5s).
- O cabeçalho superior da seção (banner dark existente) **permanece inalterado**.

### Conteúdo dos 8 Serviços

#### Frente 1: LIDERANÇA ALTA PERFORMANCE

| # | Título | Subtítulo (pills) |
|---|--------|-------------------|
| 1 | Liderança de Alta Performance | Workshops · Experiências Executivas · Team Building |
| 2 | Jornada Estratégica de Desenvolvimento de Líderes | — |
| 3 | Arquitetura de Sucessão, Assessment & Pipeline de Liderança | — |
| 4 | Mentoria de Transição Executiva | — |

**Verso card 1 (Liderança de Alta Performance)**  
Intro: _Intervenções estruturadas para desenvolver competências críticas de liderança em contextos reais de negócio._  
Bullets:
- Programas desenhados sob medida para temas como decisão, influência, performance, gestão de mudança, IE e accountability
- Formato executivo, aplicado e orientado a resultado mensurável

**Verso card 2 (Jornada Estratégica)**  
Intro: _Programa contínuo de evolução de liderança, estruturado por competências-chave e desafios organizacionais._  
Bullets:
- Integra diagnóstico inicial, trilhas modulares e acompanhamento de maturidade de liderança
- Forma líderes preparados para crescimento, transformação e tomada de decisão complexa

**Verso card 3 (Arquitetura de Sucessão)**  
Intro: _Sistema estruturado de identificação, avaliação e aceleração de talentos críticos._  
Bullets:
- Mapeia prontidão, riscos organizacionais e gaps estratégicos de competências
- Garante continuidade executiva e segurança no crescimento do negócio

**Verso card 4 (Mentoria de Transição Executiva)**  
Intro: _Mentoria para líderes em promoção, reposicionamento ou mudança de contexto organizacional._  
Bullets:
- Trabalha posicionamento estratégico, leitura de cenários, clareza decisória e fortalecimento de autoridade
- Reduz o tempo de adaptação e maximiza impacto nos primeiros ciclos de liderança

#### Frente 2: GESTÃO ESTRATÉGICA DE PESSOAS

| # | Título | Subtítulo (pills) |
|---|--------|-------------------|
| 5 | Inteligência Estratégica de Talentos & Consultoria Estrutural de RH | — |
| 6 | Arquitetura e Design Organizacional | — |
| 7 | Estratégia de Mobilidade & Gestão Integrada de Talentos | — |
| 8 | Planejamento Estratégico de Pessoas | — |

**Verso card 5 (Inteligência Estratégica)**  
Intro: _Diagnóstico da estrutura de gestão de pessoas com base em indicadores de performance, eficiência e risco organizacional._  
Bullets:
- Integra análise de competências, prontidão, vulnerabilidades e maturidade de RH
- Inclui consultoria para redesenho da estrutura de RH (papéis, processos, governança, indicadores)
- Transforma dados e estrutura em direcionadores objetivos de decisão executiva

**Verso card 6 (Design Organizacional)**  
Intro: _Redesenho estrutural orientado por eficiência, clareza de papéis e alinhamento à estratégia._  
Bullets:
- Reorganiza responsabilidades, fluxos de decisão e interfaces críticas entre áreas
- Cria estrutura capaz de sustentar crescimento, escala e transformação

**Verso card 7 (Mobilidade & Talentos)**  
Intro: _Estruturação de um sistema completo de gestão de talentos, integrando mobilidade interna e recrutamento estratégico._  
Bullets:
- Abrange diagnóstico de competências, mapeamento de talentos subaproveitados e desenho do processo de seleção
- Reduz dependência de contratações desalinhadas e fortalece retenção
- Assegura que cada movimento — interno ou externo — esteja conectado às prioridades futuras

**Verso card 8 (Planejamento Estratégico de Pessoas)**  
Intro: _Construção do roadmap anual de talentos alinhado às metas corporativas._  
Bullets:
- Define prioridades, indicadores-chave e plano de execução integrado ao planejamento do negócio
- Posiciona a área de pessoas como eixo estratégico de competitividade e sustentabilidade

### Edge Cases

- Cards com título longo devem ser truncados ou redimensionados, nunca cortados abruptamente.
- Múltiplos cards podem estar virados ao mesmo tempo (sem lógica de exclusão mútua).
- Clicar novamente no card virado deve retorná-lo à face original.
- O botão "Quero saber mais" deve ativar scroll suave até `#block-2` (já tratado pelo `main.js` existente).

---

## Non-Functional Requirements

- **Performance**: Nenhuma dependência JS nova de terceiros. Flip 100% em CSS transition; JS utilizado apenas para `aria-expanded` e toggle da classe de estado.
- **Acessibilidade**: `aria-expanded`, `role="button"`, `tabindex`, navegação por teclado (Enter/Space ativa flip), foco visível no card.
- **Responsividade**: Grade 2×2 em desktop (≥992px); 1 coluna em mobile (≤767px); 2 colunas em tablet (768px–991px).
- **Compatibilidade**: Funciona com jQuery existente (1.9.1) ou sem ele; não depende de jQuery para o flip.
- **Maintainability**: CSS do componente em `src/styles/components/services.css`; HTML em `src/components/sections/services.html`; JS de serviços inline no componente ou em `src/scripts/main.js`.

---

## Integration Points

- **`src/components/sections/services.html`**: substituição completa do conteúdo HTML.
- **`src/styles/components/services.css`**: substituição/reescrita completa dos estilos.
- **`src/scripts/main.js`**: adição de módulo `initServiceCards()` chamado a partir do `onDomReady`.
- **`#block-2`** (seção CTA): âncora alvo do CTA — sem alteração necessária no componente CTA.
- **Ícones**: 8 novos SVGs inline ou como arquivos em `src/assets/images/icons/` (outline style).

---

## Constraints and Assumptions

### Constraints

- Não editar `nicepage.css`, `nicepage.js` ou `vendor/`.
- Não remover ou renomear a classe `u-section-2` nem o ID `carousel_23e7` se referenciados externamente.
- O build atual usa cópia direta; os arquivos `src/` refletem os componentes que compõem o `dist/`.
- Ícones devem ser SVGs simples (outline, monochrome) — sem dependências de font icons (Font Awesome, etc.).

### Assumptions

- O banner escuro superior (`u-group-1` / `u-palette-3-dark-2`) permanece visualmente como está.
- `#block-2` existe no HTML final montado e é acessível via scroll suave.
- O projeto é buildado via `tools/build.js` que resolve `<!-- INCLUDE: -->` — portanto editar apenas os arquivos em `src/`.
- "Pills coloridas" usam a paleta existente do projeto (`--color-palette-1`, `--color-palette-3`).

---

## Out of Scope

- Alteração do cabeçalho/header da seção (banner escuro).
- Formulário de contato inline nos cards.
- Animações de entrada (scroll reveal) nos cards.
- Backend/CRM integrations.
- Criação de páginas individuais por serviço.
- Tradução ou versionamento de idioma.

---

## Success Criteria

- [ ] 8 flip cards renderizados corretamente no build (`dist/`).
- [ ] Dois grupos claramente identificados com seus respectivos rótulos.
- [ ] Frente exibe: ícone + título + pills (onde aplicável).
- [ ] Verso exibe: parágrafo intro + bullets + botão CTA ancorando `#block-2`.
- [ ] Flip ativado por clique/toque com transição 3D suave (~0.5s).
- [ ] Flip revertido ao segundo clique/toque.
- [ ] Grade 2×2 em desktop; 1 coluna em mobile.
- [ ] Navegação por teclado (Tab → Enter/Space) funcional com aria-expanded.
- [ ] Nenhuma regressão nas outras seções.
- [ ] CSS do componente não polui estilos globais.

---

## Open Questions

- Os ícones SVG serão fornecidos pelo cliente ou criados ad-hoc pelo desenvolvedor?
  → **Assunção**: criados inline como SVGs genéricos temáticos por serviço.
- A altura mínima do card deve ser fixada em qual valor?
  → **Assunção**: `min-height: 280px` na frente; verso cresce dinamicamente.

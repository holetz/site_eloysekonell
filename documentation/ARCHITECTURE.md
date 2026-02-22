# Arquitetura do Projeto

## 1) Visão geral

Este projeto é um site institucional estático da Eloyse Konell. A base em produção é HTML/CSS/JS sem framework frontend, com assets e bibliotecas legadas (Nicepage + jQuery).

A arquitetura segue dois níveis de referência:

- **Estado atual (operacional):** build simples por cópia de arquivos para `dist/` via script NPM.
- **Arquitetura alvo (modular):** organização por componentes em `src/components`, CSS componentizado em `src/styles` e assembly por includes para gerar HTML final em `dist/`.

Essa separação permite evolução incremental sem interromper o site existente.

---

## 2) Princípios arquiteturais

- **Separação de responsabilidades:** conteúdo/estrutura (HTML), estilo (CSS), comportamento (JS) e assets em áreas dedicadas.
- **Fonte vs distribuição:** desenvolvimento em `src/` e geração final em `dist/`.
- **Componentização:** seções e blocos reutilizáveis em `src/components/common` e `src/components/sections`.
- **Migração segura:** convivência entre legado (`index.html`, `nicepage.css`) e nova arquitetura modular.
- **Documentação orientada a IA:** regras explícitas para reduzir mudanças arriscadas em arquivos críticos.

---

## 3) Estrutura de diretórios (detalhada)

### Raiz do projeto

- `index.html`: página principal legada/operacional.
- `Eloyse-Konell.html`: artefato alternativo de exportação.
- `index.css`: estilos da página principal.
- `nicepage.css`, `nicepage.js`, `jquery-1.9.1.min.js`: dependências legadas/vendor.
- `intlTelInput/`: biblioteca de telefone internacional (CSS/JS utilitário).
- `images/`, `files/`, `linktree/`: conteúdo estático público atual.
- `package.json`: scripts de build, dev e preview.
- `technical_design.md`: blueprint técnico da arquitetura alvo.
- `docs/`: documentação técnica e operacional.
- `dist/`: saída de build (artefatos finais para deploy).

### `src/` (código-fonte modular)

- `src/components/`
  - `common/`: componentes compartilhados entre páginas/seções.
    - Estado atual identificado: `header.html`.
  - `sections/`: componentes de seções de página.
    - Estado atual identificado: `hero.html`.
- `src/styles/`
  - `settings/`: tokens/variáveis globais (arquitetura alvo).
  - `global/`: base global de estilo (arquitetura alvo).
  - `components/`: estilos específicos por componente (arquitetura alvo).
- `src/scripts/`: scripts globais/modulares (arquitetura alvo).
- `src/templates/`: templates-base com includes para assembly (arquitetura alvo).
- `src/assets/`
  - `fonts/`
  - `images/backgrounds/`
  - `images/icons/`
  - `images/logos/`

### Outras pastas

- `config/`: configurações de apoio (reservada para expansão).
- `tools/`: scripts de automação/build customizado (reservado para implementação do assembler).
- `vendor/` dentro de `src/`: reservado para dependências de terceiro tratadas como biblioteca.

---

## 4) Fluxo de dados e componentes

## 4.1 Fluxo atual (em produção)

1. Navegador carrega `index.html`.
2. `index.html` referencia CSS/JS estáticos (`index.css`, `nicepage.css`, `nicepage.js`, jQuery etc.).
3. Assets são carregados de pastas públicas (`images/`, `files/`, `intlTelInput/`).
4. Build NPM apenas copia arquivos para `dist/`.

## 4.2 Fluxo alvo (modular com assembly)

1. Templates em `src/templates/*.html` definem estrutura macro da página.
2. Marcadores de include (ex.: `<!-- INCLUDE: components/common/header -->`) apontam para componentes em `src/components/**`.
3. Script de build/assembly (em `tools/`) resolve includes e gera HTML final.
4. CSS global + CSS de componentes é consolidado para distribuição.
5. Resultado final é publicado em `dist/`.

## 4.3 Fluxo de responsabilidade por camada

- **Template:** define layout e ordem das seções.
- **Componente HTML:** define marcação semântica da unidade de UI.
- **Componente CSS:** encapsula estilo da unidade.
- **Script de componente/global:** comportamento interativo.
- **Build:** transforma fonte modular em saída estática consumível.

---

## 5) Sistema de build e assembly

## 5.1 Build implementado hoje

Scripts NPM atuais (em `package.json`):

- `npm run clean`: remove `dist/`.
- `npm run build`: recria `dist/` e copia arquivos/pastas da raiz para distribuição.
- `npm run dev`: servidor estático local em `:8080`.
- `npm run preview`: servidor estático local em `:4173`.

**Importante:** não há bundling, minificação ou assembly por includes ativo no estado atual.

## 5.2 Assembly planejado (design técnico)

O design técnico define um assembler leve em Node.js para:

- ler templates em `src/templates`;
- substituir includes por fragmentos de `src/components`;
- consolidar CSS global + CSS de componentes;
- copiar assets de `src/assets` para `dist/assets`.

Esse pipeline deve manter a simplicidade do projeto estático, evitando dependência de framework pesado.

---

## 6) Convenções de código

## 6.1 Nomeação

- Pastas e arquivos: `kebab-case`.
- IDs e classes: nomes descritivos e estáveis.
- Componentes: nome curto e semântico (`header`, `hero`, `contact-form`).

## 6.2 Componentes HTML

- Cada componente deve começar com metadados em comentário, por exemplo:
  - `<!-- COMPONENT: nome -->`
  - `<!-- META: description="..." -->`
  - `<!-- META: dependencies="..." -->` (quando aplicável)
- Um componente deve representar **uma responsabilidade visual principal**.

## 6.3 CSS

- Preferir CSS por componente em `src/styles/components` (ou co-localizado na arquitetura futura).
- Evitar edição direta de arquivos vendor (`nicepage.css` etc.).
- Para sobreposição de legado, priorizar classes próprias e seletores explícitos.

## 6.4 JavaScript

- Scripts de componente devem inicializar de forma defensiva (checando existência de elementos no DOM).
- Evitar lógica global acoplada diretamente ao HTML legado quando houver alternativa modular.

## 6.5 Regras para IA e manutenção

- Não editar `dist/` manualmente.
- Alterar fonte em `src/` e/ou arquivos raiz versionados, depois executar build.
- Em mudanças estruturais, atualizar `docs/ARCHITECTURE.md` e `docs/COMPONENTS.md` no mesmo PR.

---

## 7) Estado atual vs alvo (resumo rápido)

- **Atual:** site estático funcional, build por cópia, modularização em início.
- **Alvo:** assembly por includes + estilos componentizados + separação consolidada `src/` → `dist/`.
- **Estratégia recomendada:** migração incremental por seção/componente, preservando compatibilidade visual.

---

## 8) Checklist operacional para novos contribuidores

1. Ler este documento e `technical_design.md`.
2. Identificar se a mudança é legado (raiz) ou modular (`src/`).
3. Priorizar inclusão de novos blocos em `src/components`.
4. Manter metadados de componente e nomenclatura consistente.
5. Rodar `npm run build` antes de publicar artefatos.
6. Validar visualmente desktop e mobile.

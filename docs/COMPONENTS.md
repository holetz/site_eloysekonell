# Componentes do Projeto

## 1) Objetivo deste documento

Este guia descreve os componentes da arquitetura modular, com foco em:

- inventário dos componentes existentes;
- propósito de cada componente;
- estrutura de arquivos recomendada;
- padrão para criação de novos componentes;
- metadados/documentação para manutenção por devs e IA.

---

## 2) Inventário atual de componentes

Baseado no estado atual de `src/components/`.

## 2.1 Componentes em `src/components/common`

### `header`

- **Arquivo atual:** `src/components/common/header.html`
- **Categoria:** comum (reutilizável)
- **Propósito:** renderizar o cabeçalho institucional com identidade visual (logo).
- **Dependências declaradas no componente:** imagem de logo em `src/assets/images/logos/logo_rosa_claro.webp`.
- **Observação:** usa classes legadas do ecossistema Nicepage (`u-*`), o que facilita compatibilidade durante migração.

## 2.2 Componentes em `src/components/sections`

### `hero`

- **Arquivo atual:** `src/components/sections/hero.html`
- **Categoria:** seção de página
- **Propósito:** apresentar mensagem principal e proposta de valor na dobra inicial.
- **Metadados declarados no componente:** descrição e `section_id`.
- **Observação:** seção ainda baseada em classes legadas (`u-*`) para manter paridade visual.

---

## 3) Estrutura recomendada de arquivos por componente

## 3.1 Estrutura mínima

Para cada novo componente, usar uma pasta própria:

```text
src/components/{common|sections}/{nome-do-componente}/
├── {nome-do-componente}.html
├── {nome-do-componente}.css      # opcional no início, recomendado
└── {nome-do-componente}.js       # opcional (quando houver interação)
```

## 3.2 Estado de transição atual

Atualmente há componentes como arquivo HTML direto (ex.: `header.html`, `hero.html`) sem pasta dedicada.

Esse formato é aceito durante transição, mas o padrão alvo é **1 componente = 1 diretório** para facilitar:

- rastreabilidade de mudanças;
- coesão entre HTML/CSS/JS;
- automação de assembly e documentação.

---

## 4) Convenções de metadados de componente

Todo componente HTML deve iniciar com comentários padronizados:

```html
<!-- COMPONENT: nome-do-componente -->
<!-- META: description="Descrição curta e objetiva" -->
<!-- META: dependencies="caminho1,caminho2" -->
<!-- META: section_id="id-da-secao" -->
```

Campos mínimos recomendados:

- `COMPONENT`: nome canônico do componente.
- `description`: finalidade funcional e visual.

Campos opcionais (usar quando fizer sentido):

- `dependencies`: assets externos necessários.
- `section_id`: ID de ancoragem de seção.
- `owner`: pessoa/time responsável.
- `status`: `draft`, `stable`, `deprecated`.

---

## 5) Como criar novos componentes

## 5.1 Passo a passo

1. Definir se o componente é `common` ou `sections`.
2. Criar diretório e arquivos base do componente.
3. Escrever metadados no topo do HTML.
4. Implementar HTML com marcação semântica e classes previsíveis.
5. Criar CSS específico do componente sem depender de sobrescritas frágeis.
6. Adicionar JS apenas se houver comportamento necessário.
7. Incluir no template/assembly (arquitetura alvo) ou integrar no HTML principal (estado atual).
8. Atualizar este documento com o novo item do inventário.

## 5.2 Critérios de qualidade

- Componente com responsabilidade única.
- Dependências explícitas em metadados.
- Sem acoplamento implícito a scripts globais não documentados.
- Estrutura pronta para migração completa para assembly por include.

---

## 6) Padrão de include/assembly (arquitetura alvo)

Quando o assembler estiver ativo, templates usarão marcadores como:

```html
<!-- INCLUDE: components/common/header -->
<!-- INCLUDE: components/sections/hero -->
```

Regras práticas:

- O caminho do include deve ser estável e previsível.
- O include deve apontar para a entrada HTML do componente.
- Componentes não devem conter lógica de composição de página inteira.

---

## 7) Matriz de responsabilidade de componentes

- **`common/*`**: blocos reutilizáveis entre páginas (header, footer, botões, formulários compartilhados).
- **`sections/*`**: blocos de conteúdo da página principal (hero, sobre, serviços, contato).

Regra de decisão:

- Se o bloco pode ser reutilizado em múltiplos contextos, é `common`.
- Se o bloco representa uma parte temática da página, é `sections`.

---

## 8) Template de documentação para novo componente

Use este modelo ao registrar um componente novo:

```markdown
### `nome-do-componente`

- Categoria: common | sections
- Arquivos:
  - src/components/.../nome-do-componente.html
  - src/components/.../nome-do-componente.css
  - src/components/.../nome-do-componente.js
- Propósito: ...
- Entradas (dados/conteúdo): ...
- Dependências: ...
- Eventos/comportamento: ...
- Status: draft | stable | deprecated
```

---

## 9) Backlog de componentização sugerido

Para evoluir a arquitetura sem ruptura, próximos candidatos naturais:

1. `footer` (common)
2. `about` (sections)
3. `services` (sections)
4. `contact-form` (common ou sections, conforme reuso)
5. `partners`/`alliances` (sections)

Esses itens devem ser extraídos incrementalmente do HTML legado, com validação visual a cada etapa.

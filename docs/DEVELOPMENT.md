# Guia de Desenvolvimento

Este documento reúne o fluxo completo para desenvolver, testar, buildar e preparar deploy do site da Eloyse Konell.

---

## 1. Setup do Ambiente

### 1.1 Requisitos

Para trabalhar no projeto, você precisa de:

- **Git** (clone e versionamento)
- **Node.js** (recomendado: versão LTS)
- **npm** (vem com Node.js)
- **Python 3** (usado para servidor local via `http.server`)

Verifique localmente:

```bash
git --version
node --version
npm --version
python3 --version
```

### 1.2 Clone e instalação

```bash
git clone <URL_DO_REPOSITORIO>
cd site_eloysekonell
npm install
```

> Observação: o projeto é estático e pode não ter dependências de runtime complexas, mas `npm install` é recomendado para padronizar o ambiente.

### 1.3 Primeiro build

```bash
npm run build
```

Resultado esperado:

- pasta `dist/` criada
- arquivos estáticos copiados para `dist/`

---

## 2. Estrutura do Projeto

## 2.1 Visão das pastas principais

- `index.html`:
  - página principal em produção (estrutura legada/operacional)
- `index.css`:
  - estilos específicos da home atual
- `nicepage.css`, `nicepage.js`, `jquery-1.9.1.min.js`:
  - base legada/vendor
- `images/`, `files/`, `intlTelInput/`, `linktree/`:
  - assets e páginas estáticas auxiliares
- `src/`:
  - arquitetura modular em evolução (componentes, estilos e scripts)
- `docs/`:
  - documentação técnica, convenções e guias
- `dist/`:
  - saída de build para publicação
- `tools/`, `config/`:
  - área para automações/configurações de suporte

## 2.2 Estrutura modular (`src/`)

- `src/components/common/`:
  - componentes reutilizáveis (ex.: header/footer)
- `src/components/sections/`:
  - seções da página (ex.: hero, serviços)
- `src/styles/settings/`:
  - variáveis/tokens (arquitetura alvo)
- `src/styles/global/`:
  - base global de estilo
- `src/styles/components/`:
  - estilos por componente
- `src/scripts/`:
  - scripts JS de comportamento
- `src/templates/`:
  - templates para assembly futuro
- `src/assets/`:
  - fontes e imagens organizadas por tipo

## 2.3 Fluxo de trabalho recomendado

1. Identifique se a mudança é **legado atual** (`index.html`/`index.css`) ou **modular** (`src/`).
2. Faça a alteração no ponto correto.
3. Rode validação local (`npm run dev` e checagem visual).
4. Rode build (`npm run build`).
5. Revise `dist/` e prepare deploy.

---

## 3. Desenvolvimento Local

## 3.1 Como fazer alterações

### Conteúdo/estrutura

- Edite `index.html` para mudanças imediatas na página principal.
- Para evolução modular, crie/edite componentes em `src/components/`.

### Estilo

- Ajuste local de seção: `index.css` (estado atual)
- Evolução modular: `src/styles/components/` e camadas globais em `src/styles/`

### Comportamento

- Scripts existentes: `src/scripts/`
- Evite acoplamento desnecessário com vendor.

## 3.2 Como testar localmente

Inicie servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:

- `http://localhost:8080`

Teste em:

- desktop
- tablet
- mobile

## 3.3 Como fazer build

```bash
npm run build
```

Script atual:

- limpa `dist/` (`npm run clean`)
- copia arquivos estáticos definidos em `package.json`

## 3.4 Como visualizar build de produção

Após o build, rode preview:

```bash
npm run preview
```

Acesse:

- `http://localhost:4173`

> Dica: para validar conteúdo final, abra o servidor na pasta do projeto e confira se `dist/` contém todos os arquivos esperados.

---

## 4. Adicionando Componentes

## 4.1 Como criar um novo componente

Escolha a categoria:

- reutilizável entre páginas/blocos: `src/components/common/`
- seção temática da página: `src/components/sections/`

Padrão recomendado por componente:

```text
src/components/{common|sections}/{nome-do-componente}/
├── {nome-do-componente}.html
├── {nome-do-componente}.css
└── {nome-do-componente}.js   # opcional
```

## 4.2 Padrões a seguir

No topo do HTML, use metadados:

```html
<!-- COMPONENT: nome-do-componente -->
<!-- META: description="Descrição curta" -->
<!-- META: dependencies="caminho/opcional" -->
<!-- META: section_id="id-opcional" -->
```

Convenções:

- nomes de arquivo/pasta em `kebab-case`
- classes novas no padrão:
  - `c-componente`
  - `c-componente__elemento`
  - `c-componente--modificador`
- hooks JS no padrão `js-*`

## 4.3 Como integrar no template

### Estado atual (mais comum)

- integre o bloco diretamente em `index.html`
- adicione estilos no arquivo CSS correspondente

### Arquitetura alvo (assembly)

- use include no template:

```html
<!-- INCLUDE: components/common/header -->
<!-- INCLUDE: components/sections/hero -->
```

---

## 5. Modificando Estilos

## 5.1 Onde encontrar variáveis e bases

- base legada de tema: `nicepage.css` (**não editar diretamente**)
- ajustes ativos do projeto: `index.css`
- direção modular:
  - `src/styles/settings/` (tokens/variáveis)
  - `src/styles/global/`
  - `src/styles/components/`

## 5.2 Como modificar estilos de componentes

1. Localize seção/componente alvo.
2. Edite no arquivo de estilo apropriado.
3. Evite sobrescrever seletor global `u-*` sem necessidade.
4. Prefira classes próprias (`c-*`) para novas implementações.

Boas práticas:

- evitar `!important`
- manter especificidade baixa
- preservar tipografia oficial (Montserrat/Raleway)

## 5.3 Sistema de media queries

Breakpoints oficiais do projeto:

- `@media (max-width: 1199px)`
- `@media (max-width: 991px)`
- `@media (max-width: 767px)`
- `@media (max-width: 575px)`

Regras:

- manter ordem do maior para o menor
- não criar novos breakpoints sem necessidade real
- validar em todos os cortes após alteração

---

## 6. Build e Deploy

## 6.1 Comandos disponíveis

No `package.json`:

- `npm run clean`: remove `dist/`
- `npm run build`: limpa e gera `dist/` por cópia de arquivos
- `npm run dev`: servidor local em `:8080`
- `npm run preview`: servidor local em `:4173`

## 6.2 Processo de build

Fluxo recomendado antes de publicar:

1. `npm run build`
2. `npm run preview`
3. validar páginas, links, imagens e responsividade

## 6.3 Deploy (instruções básicas)

Como é um site estático:

1. Gere artefato com `npm run build`
2. Publique o conteúdo da pasta `dist/` na hospedagem estática
3. Garanta presença de arquivos de infra necessários (ex.: `CNAME`, quando aplicável)
4. Valide URL final em ambiente publicado

> O detalhe exato do deploy depende do provedor (GitHub Pages, Netlify, servidor próprio etc.). O padrão sempre começa com `dist/` atualizado.

---

## 7. Troubleshooting

## 7.1 Problemas comuns e soluções

### 1) `npm run dev` não inicia

Possíveis causas:

- Python 3 ausente
- porta 8080 ocupada

Soluções:

```bash
python3 --version
lsof -i :8080
```

Feche processo conflitante ou altere temporariamente a porta no script.

### 2) Build sem arquivos esperados em `dist/`

Possível causa:

- arquivo/pasta não incluído no comando de cópia do script `build`

Solução:

- revisar script `build` em `package.json`
- incluir novos arquivos/pastas adicionados ao projeto

### 3) Mudança visual não aparece

Possíveis causas:

- cache do navegador
- edição feita no arquivo errado
- conflito com estilos `u-*`/vendor

Soluções:

- recarregar com hard refresh (`Ctrl+F5`)
- confirmar se alterou `index.css`/arquivo correto
- aumentar escopo de seletor de forma controlada

### 4) Layout quebra em mobile

Possíveis causas:

- regra fora dos breakpoints oficiais
- valores fixos sem responsividade

Soluções:

- ajustar nos breakpoints `1199/991/767/575`
- revisar `width`, `min-height`, `margin/padding`

### 5) Imagens não carregam

Possíveis causas:

- caminho relativo incorreto
- arquivo ausente na origem
- arquivo não copiado no build

Soluções:

- validar caminho no HTML/CSS
- confirmar existência em `images/` ou `src/assets/images/`
- confirmar presença em `dist/` após build

---

## Checklist rápido de entrega

Antes de abrir PR ou publicar:

- [ ] alteração no arquivo correto
- [ ] validação desktop/tablet/mobile
- [ ] build executado com sucesso
- [ ] preview validado localmente
- [ ] documentação atualizada (quando necessário)

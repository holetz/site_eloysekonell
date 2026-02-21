# Componentes (`src/components`)

## 1. Introdução

Os componentes são blocos de interface reutilizáveis (ou seções isoladas) usados para montar a página final a partir do template principal em `src/templates/index.html`.

Neste projeto, os componentes estão organizados em duas categorias:

- `common/`: elementos compartilhados (ex.: cabeçalho e rodapé).
- `sections/`: seções de conteúdo da landing page (hero, serviços, etc.).

A composição acontece via marcadores `<!-- INCLUDE: ... -->` no template e o build (`tools/build.js`) resolve esses includes para gerar `dist/index.html`.

---

## 2. Inventário de Componentes

### Resumo (8 componentes)

| Componente                | Propósito                                               | HTML                                          | CSS                                        | Dependências principais                                                                                                                                                                                                                           |
| ------------------------- | ------------------------------------------------------- | --------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `common/header`           | Cabeçalho com identidade visual (logo).                 | `src/components/common/header.html`           | `src/styles/components/header.css`         | `src/assets/images/logos/logo_rosa_claro.webp`                                                                                                                                                                                                    |
| `common/footer`           | Rodapé com contato e redes sociais.                     | `src/components/common/footer.html`           | `src/styles/components/footer.css`         | `images/logo_rosa_claro.webp`, links externos (Instagram/LinkedIn), `mailto:`, `tel:`                                                                                                                                                             |
| `sections/hero`           | Seção principal com mensagem de valor.                  | `src/components/sections/hero.html`           | `src/styles/components/hero.css`           | Imagem de fundo em `images/748493f83d3d6662b5f20686347e95fd3cd4cf9a447b18decbf387a02c662c2e39bc55efe636720c269bd50a96cf30d221bda470a768e5b521ff38_1280.jpg`                                                                                       |
| `sections/services`       | Grade com 6 serviços oferecidos.                        | `src/components/sections/services.html`       | `src/styles/components/services.css`       | Ícones: `images/1527217-7ea7f5b0.png`, `images/4871993-abbb1986.png`, `images/10435989-de396283.png`, `images/12692524-5df3893d.png`, `images/404723-43dc86df.png`, `images/2617778-5b3bef14.png`                                                 |
| `sections/about-carousel` | Carrossel institucional (2 slides) com imagem de apoio. | `src/components/sections/about-carousel.html` | `src/styles/components/about-carousel.css` | `images/-min.jpg`                                                                                                                                                                                                                                 |
| `sections/about-details`  | Seção “Sobre nós” + cards de valores.                   | `src/components/sections/about-details.html`  | `src/styles/components/about-details.css`  | `images/WhatsAppImage2025-02-02at17.08.20_dfd1ac38.jpg` (via `background-image` no CSS)                                                                                                                                                           |
| `sections/partners`       | Grade de logos de parceiros (9 empresas).               | `src/components/sections/partners.html`       | `src/styles/components/partners.css`       | `images/logo_datarunk.png`, `images/logo_dgsis.png`, `images/logo_grupo_top.png`, `images/logo_guion.png`, `images/logo_nuvme.png`, `images/logo_straas.png`, `images/logo_colablife.png`, `images/logo_techlinker.webp`, `images/logo_mtech.png` |
| `sections/cta`            | Chamada para ação com botão de contato via WhatsApp.    | `src/components/sections/cta.html`            | `src/styles/components/cta.css`            | `images/3781677-5236b077.png`, link externo `https://api.whatsapp.com/...`                                                                                                                                                                        |

### Observações importantes do inventário

- Todos os CSS de componente são importados por `src/styles/main.css`.
- Hoje, `header.css` e `footer.css` estão sem regras específicas (apenas comentário), mas seguem o mesmo padrão de mapeamento 1:1 com os componentes.
- Os componentes usam classes legadas `u-*` (base Nicepage), então mudanças de classe devem ser feitas com cautela para não quebrar o layout.

---

## 3. Estrutura de Componente

### 3.1 Padrão de comentários META

Todo componente HTML deve começar com metadados, seguindo este formato:

```html
<!-- COMPONENT: nome-do-componente -->
<!-- META: description="Descrição curta e objetiva" -->
<!-- META: section_id="id-da-secao" -->
<!-- META: dependencies="lista de assets/dependências" -->
```

Campos recomendados:

- `COMPONENT`: nome canônico (`header`, `about-carousel`, etc.).
- `description`: responsabilidade principal do componente.
- `section_id`: id da seção quando aplicável.
- `dependencies`: imagens, ícones, links externos e outras dependências relevantes.

### 3.2 Convenções de nomenclatura

- Pasta de categoria: `common` ou `sections`.
- Nome do componente em _kebab-case_ (`about-carousel`, `about-details`).
- Arquivo HTML: `src/components/{categoria}/{nome}.html`.
- Arquivo CSS: `src/styles/components/{nome}.css`.
- IDs de seção: manter IDs estáveis (evitar trocar sem necessidade, pois pode impactar âncoras/estilo/scripts).

### 3.3 Como documentar um componente

Sempre registrar, no mínimo:

1. **Propósito**: o que resolve na interface.
2. **Arquivos**: HTML + CSS relacionados.
3. **Dependências**: imagens, ícones, links externos, script específico.
4. **Pontos de atenção**: classes críticas, IDs, comportamento responsivo.

Modelo rápido:

```markdown
### sections/exemplo

- Propósito: ...
- HTML: src/components/sections/exemplo.html
- CSS: src/styles/components/exemplo.css
- Dependências: images/arquivo.png
- Atenção: usa id="sec-xxxx" para ancoragem
```

---

## 4. Criando Novo Componente

### 4.1 Checklist passo a passo

1. Definir categoria (`common` ou `sections`).
2. Criar HTML em `src/components/{categoria}/{nome}.html`.
3. Adicionar comentários META no topo do HTML.
4. Criar CSS em `src/styles/components/{nome}.css`.
5. Importar o CSS em `src/styles/main.css`.
6. Inserir include no template principal `src/templates/index.html`:
   - `<!-- INCLUDE: components/{categoria}/{nome} -->`
7. Garantir caminhos de assets corretos (`images/...`, `assets/...`, etc.).
8. Executar build e validar visualmente em `dist/index.html`.
9. Atualizar este README com o novo componente.

### 4.2 Template de componente

```html
<!-- COMPONENT: nome-do-componente -->
<!-- META: description="Descrição do componente" -->
<!-- META: section_id="sec-xxxx" -->
<!-- META: dependencies="images/exemplo.png" -->

<section class="u-section-x" id="sec-xxxx">
  <div class="u-sheet">
    <!-- conteúdo -->
  </div>
</section>
```

Template CSS inicial:

```css
/* Componente: Nome (.u-section-x) */

.u-section-x {
  background-image: none;
}

@media (max-width: 767px) {
  .u-section-x {
    /* ajustes mobile */
  }
}
```

### 4.3 Como integrar no template principal

Em `src/templates/index.html`, adicionar o marcador na ordem desejada da página:

```html
<!-- INCLUDE: components/sections/nome-do-componente -->
```

O `tools/build.js` resolve os includes e copia assets referenciados para `dist/` durante o build.

---

## 5. Modificando Componente Existente

### 5.1 Boas práticas

- Alterar somente o componente alvo (evitar mudanças globais desnecessárias).
- Preservar metadados `COMPONENT`/`META` atualizados.
- Evitar renomear classes `u-*` sem verificar impacto no CSS correspondente.
- Se adicionar dependência (imagem/ícone/link), registrar no `META: dependencies`.
- Manter consistência de nomenclatura e caminhos relativos.

### 5.2 Como testar

1. Rodar build local:
   - `npm run build`
2. Para validação de produção (minificação + sourcemap):
   - `npm run build:prod`
3. Servir `dist/` localmente:
   - `npm run preview`
4. Conferir:
   - renderização desktop/mobile,
   - carregamento de imagens/ícones,
   - links externos, `mailto:` e `tel:`,
   - console do navegador sem erros.

### 5.3 Como fazer build

Comandos disponíveis no projeto:

- Build simples: `npm run build`
- Build minificado: `npm run build:min`
- Build produção: `npm run build:prod`
- Build direto (equivalente usado em validações): `node tools/build.js --minify --sourcemap`

---

## Referência rápida de composição

Ordem atual no template principal:

1. `components/common/header`
2. `components/sections/hero`
3. `components/sections/services`
4. `components/sections/about-carousel`
5. `components/sections/about-details`
6. `components/sections/partners`
7. `components/sections/cta`
8. `components/common/footer`

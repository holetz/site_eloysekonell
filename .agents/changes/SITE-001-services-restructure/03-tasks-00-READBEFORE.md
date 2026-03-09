# LEIA ANTES DE QUALQUER TASK — SITE-001

> Este arquivo deve ser lido por QUALQUER agente antes de iniciar qualquer task deste conjunto.

---

## Contexto do projeto

**Site**: Eloyse Konell — site institucional estático (HTML/CSS/JS, sem framework frontend)  
**Stack**: HTML puro + CSS componentizado + JS ESM + jQuery 1.9.1 (vendor) + Nicepage (vendor)  
**Build**: `npm run build` → executa `tools/build.js` que resolve `<!-- INCLUDE: path -->` em `src/templates/index.html` e gera `dist/`  

Arquivos de produção saem de `src/` → `dist/`. **Nunca edite `docs/` diretamente** (legado).

---

## Arquivos-chave desta mudança

| Arquivo | O que fazer |
|---------|-------------|
| `src/components/sections/services.html` | **Reescrita completa** — novo HTML de flip cards |
| `src/styles/components/services.css` | **Reescrita completa** — CSS do flip card |
| `src/scripts/main.js` | **Adição** de `initServiceCards()` |

---

## Regras invioláveis

1. **NÃO editar** `nicepage.css`, `nicepage.js` nem arquivos em `src/vendor/`.
2. **NÃO remover** o `id="carousel_23e7"` nem a classe `u-section-2` da `<section>` principal
   (podem existir âncoras ou referências externas que dependem desses valores).
3. **NÃO usar** Font Awesome, Bootstrap, ou qualquer dependência JS/CSS externa nova.
4. **Usar** classes com prefixo `c-` para todos os novos elementos (convenção BEM do projeto).
   Classes `u-*` são do Nicepage — não criar novas, apenas manter as existentes onde necessário.
5. **Todos os SVGs** devem ser **inline** no HTML, outline style, viewBox="0 0 24 24".

---

## Estrutura HTML esperada (resumo)

```html
<section class="u-align-center u-clearfix u-grey-10 u-section-2" id="carousel_23e7">
  <!-- banner dark existente (u-group-1) — NÃO alterar -->
  <div class="u-container-style u-expanded-width u-group u-palette-3-dark-2 u-group-1">
    <div class="u-container-layout u-container-layout-1"></div>
  </div>

  <!-- NOVO wrapper de conteúdo -->
  <div class="c-services">

    <!-- Grupo 1 -->
    <div class="c-services__group">
      <h3 class="c-services__group-title">LIDERANÇA ALTA PERFORMANCE</h3>
      <div class="c-services__grid">
        <!-- 4x .c-flip-card -->
        <div class="c-flip-card" tabindex="0" role="button" aria-expanded="false" aria-label="[título]">
          <div class="c-flip-card__inner">
            <div class="c-flip-card__front">
              <span class="c-flip-card__icon"><!-- SVG inline --></span>
              <h4 class="c-flip-card__title">Título do Serviço</h4>
              <!-- pills opicionais -->
              <div class="c-flip-card__pills">
                <span class="c-flip-card__pill">Tag 1</span>
              </div>
            </div>
            <div class="c-flip-card__back">
              <p class="c-flip-card__intro">Parágrafo introdutório...</p>
              <ul class="c-flip-card__bullets">
                <li>Bullet 1</li>
              </ul>
              <a href="#block-2" class="c-flip-card__cta">Quero saber mais</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grupo 2 — idêntico em estrutura -->
  </div>
</section>
```

---

## JavaScript — padrão de módulo esperado

O arquivo `src/scripts/main.js` segue o padrão ESM com `initSiteModules()`.
Adicionar `initServiceCards()` seguindo o mesmo padrão de `initAboutCarousel()`:
- Retornar objeto `{ destroy() {} }`
- Ser chamado dentro de `initSiteModules()`
- Incluído no objeto de retorno de `initSiteModules()`

---

## CSS — variáveis de token disponíveis

```css
--color-palette-1: #645d3b;   /* dourado escuro */
--color-palette-2: #31331f;   /* quase preto */
--color-palette-3: #d9bba8;   /* bege claro */
--color-palette-4: #ba8b68;   /* terracota */
--color-palette-5: #d5cdbc;   /* bege neutro */
--color-white: #ffffff;
--color-text-default: #202425;
--font-family-heading: Montserrat, sans-serif;
--font-family-body: Raleway, sans-serif;
```

---

## Como rodar o build

```bash
npm run build
```

Saída em `dist/`. Para preview:

```bash
npm run preview
# abre http://localhost:2603
```

---

## Arquivo PROGRESS.md

Cada task deve atualizar o `PROGRESS.md` na pasta `.agents/changes/SITE-001-services-restructure/`.
Se o arquivo não existir, crie-o com a tabela padrão antes de marcar a primeira task.

Formato da tabela:

| Task | Descrição | Status |
|------|-----------|--------|
| Task 01 | HTML dos flip cards | ⬜ Pendente |
| Task 02 | CSS do flip card | ⬜ Pendente |
| Task 03 | JavaScript initServiceCards | ⬜ Pendente |
| Task 04 | Commit message | ⬜ Pendente |

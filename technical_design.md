# Design Técnico: Reestruturação do Site Eloyse Konell

## 1. Visão Geral e Decisões Arquiteturais

### Filosofia

O objetivo principal é transformar um export monolítico do Nicepage em uma arquitetura baseada em componentes de fácil manutenção. Esta estrutura imita padrões de frameworks modernos (como React ou Vue) mas utiliza tecnologias web nativas (HTML/CSS/JS) para garantir simplicidade e longevidade sem dependências complexas de build.

### Decisões Chave

1.  **Separação Fonte-Distribuição**: Introdução clara entre código fonte (`src/`) e código de produção (`dist/`).
2.  **Organização por Componentes**: O código será organizado por "o que é" (componentes funcionais) em vez de apenas "que linguagem é" (scripts vs styles).
3.  **Assembly Leve**: Um script Node.js simples será usado para injetar parciais HTML em um layout principal. Isso resolve o problema de repetição de código (header/footer) sem o overhead de um framework pesado.
4.  **Sistema de Variáveis CSS**: Implementação de um `theme.css` para centralizar cores, fontes e espaçamento, tornando alterações de design via IA mais seguras e rápidas.

---

## 2. Estrutura de Diretórios Final

Transitionaremos de uma estrutura plana para uma hierarquia semântica.

```text
/home/holetz/repos/site_eloysekonell/
├── src/                      # Código fonte (editável)
│   ├── assets/               # Assets estáticos organizados
│   │   ├── images/           # Imagens otimizadas
│   │   ├── fonts/            # Fontes locais
│   │   └── docs/             # PDFs e documentos (antiga pasta 'files/')
│   ├── components/           # Unidades modulares de UI
│   │   ├── common/           # Compartilhados (Header, Footer, Botões)
│   │   ├── sections/         # Seções de Página (Hero, Sobre, Serviços)
│   │   └── layout/           # Esqueletos base de HTML
│   ├── styles/               # Estilos globais
│   │   ├── settings/         # Variáveis, config
│   │   └── global.css        # Reset, tipografia base
│   ├── scripts/              # Lógica de aplicação global
│   └── templates/            # Templates base das páginas
├── public/                   # Arquivos estáticos puros (ex: robots.txt, favicon)
├── dist/                     # Site de Produção Gerado (Não editar diretamente)
├── tools/                    # Scripts de build e utilitários
│   └── build.js              # Script de montagem
└── package.json              # Rastreamento de dependências de desenvolvimento
```

**Convenções de Nomenclatura:**

- Pastas: `kebab-case` (ex: `contact-form`)
- Arquivos: `kebab-case` (ex: `contact-form.html`, `contact-form.css`)
- IDs de Componentes (HTML): `kebab-case` globalmente únicos.
- Classes CSS: BEM (`block__element--modifier`).

---

## 3. Arquitetura de Componentes

Cada componente será autocontido em seu próprio diretório dentro de `src/components/`.

**Estrutura de um Diretório de Componente (`src/components/sections/hero/`):**

- `hero.html`: O fragmento HTML.
- `hero.css`: Estilos específicos desta seção.
- `hero.js`: Comportamento específico (opcional).

**Padrão de Fragmento HTML (`hero.html`):**

```html
<!-- COMPONENT: section-hero -->
<!-- Propósito: Apresentação principal da home page -->
<section id="hero" class="c-hero">
  <div class="c-hero__container">
    <h1 class="c-hero__title">
      <!-- CONTENT:Main-Title -->Eloyse Konell<!-- /CONTENT -->
    </h1>
    <p class="c-hero__subtitle">Psicóloga & Consultora</p>
  </div>
</section>
```

**Sistema de Includes:**
O script de build procurará comentários de controle para injeção de conteúdo.
_Uso em `src/templates/index.html`:_

```html
<body>
  <!-- INCLUDE: components/common/header -->
  <main>
    <!-- INCLUDE: components/sections/hero -->
    <!-- INCLUDE: components/sections/about -->
  </main>
  <!-- INCLUDE: components/common/footer -->
</body>
```

---

## 4. Arquitetura CSS

Adotaremos uma metodologia BEM simplificada para evitar vazamento de estilos, mantendo a compatibilidade legado onde necessário.

**Camadas:**

1.  **Settings (`src/styles/settings/theme.css`)**: Custom Properties (Variáveis CSS).
    ```css
    :root {
      --color-primary: #8aa6c1;
      --color-text: #111111;
      --font-heading: "Roboto", sans-serif;
      --spacing-md: 1.5rem;
    }
    ```
2.  **Base (`src/styles/global.css`)**: Resets e padrões de elementos.
3.  **Componentes (`src/components/**/\*.css`)\*\*: Estilos escopados.

**Padrão CSS de Componente (Prefixo `c-`):**

```css
/* Block */
.c-hero {
  background-color: var(--color-primary);
  padding: var(--spacing-md);
}

/* Element */
.c-hero__title {
  font-family: var(--font-heading);
}

/* Modifier */
.c-hero--dark {
  background-color: #000;
}
```

**Tratamento de Legado (Nicepage):**
O `nicepage.css` é monolítico. Vamos mantê-lo ligado mas tratado como uma biblioteca "Vendor". Não editaremos ele diretamente. Sobrescrevemos regras específicas em nossos CSS de componentes usando seletores de maior especificidade se necessário, mas preferencialmente usando nossas próprias classes `c-*`.

---

## 5. JavaScript

**Modularização:**

- **Core (`main.js`)**: Gerencia inicialização e eventos globais.
- **Scripts de Componente**: Exportam funções de inicialização.

**Padrão:**

```javascript
// src/components/common/contact-form/contact-form.js

export function initContactForm() {
  const form = document.querySelector(".js-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    // Lógica de envio
  });
}
```

**Ponto de Entrada (`src/scripts/app.js`):**

```javascript
import { initContactForm } from "../components/common/contact-form/contact-form.js";

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
});
```

---

## 6. Sistema de Build/Assembly

Criaremos um script simples `tools/build.js` usando bibliotecas padrão do Node.js.

**Processo de Build:**

1.  **Clean**: Limpa a pasta `dist/`.
2.  **Copy Assets**: Copia recursivamente `src/assets` para `dist/assets`.
3.  **Assemble HTML**:
    - Lê `src/templates/*.html`.
    - Substitui `<!-- INCLUDE: path/to/component -->` pelo conteúdo do arquivo HTML do componente.
    - Resolve caminhos de assets (ex: `../assets/` -> `./assets/`).
4.  **Bundle CSS**:
    - Concatena `src/styles/**/*.css` e todos os `src/components/**/*.css` em `dist/css/style.css`.
5.  **Finalização**: Move arquivos da raiz `public/` para `dist/`.

**Ambiente:**

- **Dev**: `npm run dev` (Monitora arquivos e reconstrói).
- **Prod**: `npm run build` (Gera versão final otimizada).

---

## 7. Documentação e Guias

**Estrutura do `README.md`:**

1.  **Visão Geral do Projeto**: O que é o site.
2.  **Mapa de Diretórios**: Explicação `src` vs `dist`.
3.  **Desenvolvimento**: Como rodar `npm install` e `npm start`.
4.  **Guia de Componentes**: Lista de componentes disponíveis.

**AI_GUIDE.md (Guia para Agentes de IA):**
Arquivo específico para orientar futuras IAs na manutenção do site.

- "Para alterar o esquema de cores, edite `src/styles/settings/theme.css`."
- "Para adicionar uma nova seção, crie a pasta em `src/components/sections/` e adicione a tag include no template."
- "Nunca edite arquivos dentro de `dist/`."

---

## 8. Estratégia de Migração

Realizaremos uma **Migração Estranguladora (Strangler Fig)**:

1.  **Setup Inicial**: Criar estrutura de diretórios e scripts de build sem deletar nada antigo.
2.  **Extração Incremental**:
    - Escolher uma seção do `index.html` (ex: Footer).
    - Limpar classes desnecessárias do HTML.
    - Mover para `src/components/common/footer/footer.html`.
    - Substituir código original no novo template por `<!-- INCLUDE -->`.
3.  **Validação Visual**: Rodar build e verificar se a seção renderiza igual.
4.  **Repetição**: Fazer isso para todas as 8 seções planejadas.
5.  **Limpeza**: Arquivar arquivos antigos e apontar domínio para `dist/`.

**Compatibilidade:**

- Manteremos referências ao `nicepage.css` e `jquery` no `<head>` dos templates novos até que todas as dependências visuais e lógicas sejam portadas para o novo sistema modular.
- Caminhos de imagens serão atualizados gradualmente.

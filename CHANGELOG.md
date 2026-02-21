# Changelog

Todas as mudanças relevantes deste projeto são documentadas neste arquivo.

## [2.0.0] - 2026-02-21

### 🚀 Reestruturação Completa (Major Release)

Versão focada em modularidade, manutenibilidade e preparação para desenvolvimento assistido por IA.

### ✨ Adicionado
- **Estrutura Modular:** Código fonte movido para `src/` com separação clara de responsabilidades.
- **Componentes:** HTML fragmentado em `src/components/` (`common/`, `sections/`).
- **CSS Organizado:** Estilos reestruturados em `src/styles/` seguindo metodologia ITCSS simplificada.
- **Build System:** Scripts personalizados em `tools/build.js` e comandos NPM (`build`, `dev`, `watch`).
- **Assets Management:** Centralização de imagens e fontes em `src/assets/`.
- **Documentação:** Criação da pasta `docs/` com guias completos (Architecture, Components, AI Guidelines, etc.).
- **Template:** Adicionado `src/components/TEMPLATE.html` para padronizar novos componentes.

### 🔄 Modificado
- **Fluxo de Desenvolvimento:** Desenvolvimento agora ocorre em `src/` e build gera `dist/`. Não se edita mais a raiz diretamente.
- **README.md:** Atualizado para refletir a nova estrutura e instruções de uso.
- **package.json:** Scripts e metadados atualizados para suportar o novo fluxo de build.

### ⚠️ Breaking Changes
- Arquivos na raiz (`index.html`, `index.css`) tornaram-se obsoletos para desenvolvimento direto. Devem ser gerados via build.
- Caminhos de imagens e assets foram alterados para a estrutura `src/assets`.

---

## [1.0.0] - Versão original Nicepage

### Base inicial

- Exportação original em estrutura plana com página principal em `index.html`.
- Estilos e scripts legados em `index.css`, `nicepage.css`, `nicepage.js` e `jquery-1.9.1.min.js`.
- Assets públicos organizados em pastas de raiz como `images/`, `files/`, `intlTelInput/` e `linktree/`.

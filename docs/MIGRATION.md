# Guia de Migração (v1.x → v2.0.0)

Este documento orienta a migração da estrutura legada (export Nicepage) para a estrutura modular adotada na versão 2.0.0.

## 1) Objetivo da migração

- Reduzir acoplamento entre HTML/CSS/JS.
- Facilitar manutenção contínua por seções/componentes.
- Melhorar previsibilidade de alterações de layout e conteúdo.
- Padronizar processo de build para publicação em `dist/`.

## 2) Mapeamento de arquivos (onde estava → onde ficou)

### Estrutura e páginas

- `index.html` (raiz) → base legada mantida; evolução estrutural em `src/templates/`.
- Blocos reutilizáveis no HTML único → `src/components/common/`.
- Seções da página principal no HTML único → `src/components/sections/`.

### Estilos

- `index.css` (global monolítico) → separação em `src/styles/settings/`, `src/styles/global/` e `src/styles/components/`.
- Regras visuais de bloco/seção → CSS de componente (arquitetura alvo).
- `nicepage.css` → mantido como legado/vendor, sem edição direta.

### Scripts

- Scripts acoplados à página principal → `src/scripts/` (global) e scripts por componente (arquitetura alvo).
- `nicepage.js` e `jquery-1.9.1.min.js` → mantidos como legado durante transição.

### Assets e arquivos públicos

- `images/` (raiz) → organização progressiva em `src/assets/images/`.
- `files/` (raiz) → organização progressiva em `src/assets/docs/`.
- Arquivos estáticos de publicação → saída em `dist/` após `npm run build`.

## 3) Breaking changes

## Impacto em produção (site publicado)

- Não há breaking change obrigatório para navegação do usuário final no estado atual, pois o legado continua suportado.

## Impacto para desenvolvimento/manutenção

- O ponto de manutenção recomendado muda do arquivo monolítico para estrutura modular em `src/`.
- Alterações novas devem priorizar componentes e estilos segmentados, evitando expandir `index.html`/`index.css` sem necessidade.
- `dist/` passa a ser artefato de build e não fonte de edição manual.

## 4) Como adaptar customizações existentes

1. Localize a customização atual no legado (`index.html`, `index.css` ou scripts da raiz).
2. Classifique a mudança como:
   - **Componente compartilhado** → migrar para `src/components/common/`.
   - **Seção específica da página** → migrar para `src/components/sections/`.
3. Extraia o HTML para um componente dedicado, preservando comportamento visual.
4. Mova/reescreva o CSS para área adequada em `src/styles/` (preferindo estilo por componente).
5. Mantenha dependências legadas (`nicepage.css`, `nicepage.js`, jQuery) apenas quando necessário para compatibilidade.
6. Gere artefato com `npm run build` e valide o resultado em `dist/`.
7. Faça validação visual desktop/mobile antes de publicar.

## 5) Checklist de migração

- [ ] Inventariar customizações ativas no legado (`index.html`, `index.css`, scripts).
- [ ] Definir prioridade de extração por seção/componente.
- [ ] Migrar estrutura HTML para `src/components/common` e `src/components/sections`.
- [ ] Migrar estilos para `src/styles` (settings/global/components).
- [ ] Manter `nicepage.css` como vendor sem edições diretas.
- [ ] Garantir que não há edição manual em `dist/`.
- [ ] Executar `npm run build` sem erros.
- [ ] Validar layout e interações em desktop e mobile.
- [ ] Atualizar documentação após cada etapa relevante.

## 6) Estratégia recomendada

A migração ideal é incremental (seção por seção), mantendo paridade visual a cada passo. Isso reduz risco de regressão e permite evolução contínua sem interromper o site em produção.

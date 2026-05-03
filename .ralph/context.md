# Context — revisao-design-frontend (runtime brief)

## Architecture summary
Site institucional **Astro 4 SSG** estático (eloysekonell.com.br), CSS puro em `src/styles/global.css`, deploy via GitHub Actions → `docs/` → Pages. Sem testes automatizados; sem framework CSS; tudo zero-runtime. A change é uma **refatoração visual ampla** focada em formalizar tokens de design, consolidar componentes, corrigir 3 dores explícitas (espaçamentos magic-number, ícones-emoji em /servicos, reveal animation tardia) e fazer pass de a11y + Core Web Vitals. Lote único, sem mudança de stack.

## Critical constraints
- **Não** alterar `astro.config.mjs` (`outDir: './docs'` é mandatório para Pages).
- **Não** mexer em `public/CNAME`, `public/robots.txt`, `public/llms.txt`, `src/data/credenciais.ts`, ou em qualquer JSON-LD/schema/sitemap.
- **Não** alterar copy/headlines/descrições/frontmatter de blog/cases — escopo é só visual.
- **Não** introduzir dependências novas (sem libs de a11y, sem Tailwind, sem icon library). `package.json` intocado.
- **Não** trocar as fontes (Cormorant Garamond + Manrope ficam).
- **Não** trocar os 10 hex da paleta (sand/taupe/olive/bronze) — apenas ajustar uso/hierarquia.
- Cases continuam com `draft: true` por default. Não desligar.
- Zero base64 inline. Imagens: `src/assets/` via `astro:assets` ou `public/`.

## Decisões fechadas (não reabrir)
- Spacing scale **4px base** (13 tokens: 4/8/12/16/20/24/32/40/56/72/96/120/160).
- Botões: **3 variantes canônicas** (`.btn`, `.btn-ghost`, `.link-arrow`).
- Ícones em /servicos: **SVG line 1.5px stroke `currentColor`** em `src/assets/icons/`.
- Reveal: mantém fade+translateY; só corrige timing (`threshold: 0`, `rootMargin: '0px 0px 15% 0px'`).
- h1: weight `300 → 400`, `letter-spacing: -0.015em`.
- Outline foco: `var(--bronze)` 2px offset 3px via `:focus-visible`.

## Testing approach
Sem testes automatizados. Cada task valida com (1) `npm run build` limpo, (2) smoke visual em `npm run dev` em 3 páginas (home, /sobre, /servicos/desenvolvimento-de-liderancas). Step 11 faz inspeção manual em matriz 13 páginas × 4 viewports (375/768/1280/1920) + Lighthouse final (target Performance ≥ 95, Accessibility ≥ 95, LCP < 2.5s, CLS < 0.1). Para regressão: comparar DevTools side-by-side com versão anterior.

## Commit conventions
Conventional commits, escopo entre parênteses:
- `feat(design): ...` — adições de tokens, ícones, skip link.
- `refactor(buttons|spacing|typography|visual|sobre): ...` — consolidações.
- `fix(reveal): ...` — correções pontuais.
- `perf(cwv): ...` — Core Web Vitals.
- `chore(a11y|visual): ...` — passes de qualidade.
- `docs(claude): ...` — atualização de CLAUDE.md.

## Workflow por task
1. Mark 🔄 em `.ralph/state.json` (`status: "in_progress"`).
2. Editar **somente** os arquivos listados em `files:` no frontmatter do task.
3. `npm run build` deve passar limpo após cada task.
4. Smoke visual rápido em 3 páginas representativas.
5. Mark ✅ em `state.json`, registrar hash em `commit:`.
6. Commit conventional.

## Padrões não-óbvios a espelhar
- `:where()` para `:focus-visible` global (baixa especificidade — não conflita com estilos de componentes).
- SVG icons via `import x from '...?raw'` no frontmatter Astro + `set:html={x}` no template + `aria-hidden="true"`.
- Tokens são **aditivos** no Step 01; substituições acontecem nos Steps 04–06. Ordem importa.
- Paddings de seção (140px) = `var(--space-13)` (160px) com tolerância +20px aceitável; gaps internos têm tolerância ±2px.
- BlogLayout/CaseLayout recebem efeito cascata via `global.css`; não editar diretamente.

## Riscos a vigiar
- **Step 06 (spacing)** é o de maior risco visual: aproximação de tokens pode distorcer ritmo. Se ±4px não couber, comentar exceção no código.
- **Step 04 (buttons)** toca 14 arquivos: working file-by-file com build entre cada um.
- **Step 09 (sobre.astro)**: migrar prematuramente regras única-uso piora cohesion global. Critério: só migrar regra com 2+ contextos de uso possíveis.

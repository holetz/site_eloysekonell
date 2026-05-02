---
id: "26"
phase: 6
complexity: high
depends_on: ["23", "24"]
files: ["src/components/Hero.astro", "src/components/Nav.astro", "src/components/Clients.astro", "src/layouts/BlogLayout.astro", "src/styles/global.css", "src/assets/photos/eloyse-hero.jpg", "src/assets/photos/eloyse-portrait.jpg", "src/assets/photos/eloyse-study.jpg", "src/assets/logos/logo_datarunk.png", "src/assets/logos/logo_dgsis.png", "src/assets/logos/logo_grupo_top.png", "src/assets/logos/logo_guion.png", "src/assets/logos/logo_mtech.png", "src/assets/logos/logo_nuvme.png", "src/assets/logos/logo_possibilitar.png", "src/assets/logos/logo_rosa_claro.webp", "src/assets/logos/logo_straas.png", "src/assets/logos/logo_techlinker.webp"]
---

# Task 26 — Image migration: componentes que permanecem

## Objective

Migrar `<img>` cru e `background-image` CSS para `<Image>` do Astro (`astro:assets`) onde viável. Converter para WebP/AVIF. Preservar CLS < 0,1 reservando dimensões.

## Detailed Steps

1. Marcar `status: 🔄` para id "26".

2. **Mover assets de `public/images/` para `src/assets/`:**
   - Criar `src/assets/photos/` e `src/assets/logos/` se ainda não existirem.
   - **Mover** (não copiar — para evitar duplicação no bundle):
     - `public/images/photos/eloyse-hero.jpg` → `src/assets/photos/eloyse-hero.jpg`
     - `public/images/photos/eloyse-portrait.jpg` → `src/assets/photos/eloyse-portrait.jpg`
     - `public/images/photos/eloyse-study.jpg` → `src/assets/photos/eloyse-study.jpg`
     - `public/images/logos/logo_*.{png,webp}` → `src/assets/logos/logo_*.{png,webp}`
   - **Manter em `public/`**: `og-cover.jpg` (referenciado por meta tags absolutas), `logo.png` (favicon — depende do uso), portfólio PDF, `llms.txt`, `robots.txt`, `CNAME`.

3. **Atualizar componentes para usar `<Image>`:**

   **Hero.astro** (foto hero — atualmente CSS `background-image`):
   - Se viável, refatorar para `<img>`/`<Image>` posicionado absolutamente com overlay. Se inviável (overlay/efeitos exigem background-image), manter `background-image` mas referenciar **WebP gerado** via path importado:
     ```astro
     ---
     import heroImg from '../assets/photos/eloyse-hero.jpg';
     ---
     <style is:global define:vars={{ heroBg: `url('${heroImg.src}')` }}>
       .hero-bg { background-image: var(--heroBg); }
     </style>
     ```
   - **Reservar `width`/`height`** explicitamente para impedir CLS.
   - `loading="eager"` (LCP).

   **Nav.astro** (logo):
   - `import logo from '../assets/logos/logo_principal.png';` (se logo for movido) ou continuar referenciando `/images/logo.png`.
   - Aplicar `<Image src={logo} alt="Eloyse Konell" width={...} height={...} />`.

   **Clients.astro** (12 logos):
   - `import` de cada logo de `src/assets/logos/`.
   - Renderizar via `<Image>` com `widths={[120, 240]}`, `formats={['avif','webp']}`, `loading="lazy"` (já está fora do viewport inicial).

   **BlogLayout.astro** (cover image — atualmente CSS background com URL externa Unsplash):
   - **Manter como está** (Unsplash externo está fora do escopo §6 da spec).
   - Garantir que tem `width`/`height` ou `aspect-ratio` para CLS.

4. **Limpar `src/styles/global.css`:**
   - Remover `background-image: url('/images/photos/...')` que migraram.
   - Manter regras de `background-image` que ainda fazem sentido (Hero, BlogLayout cover).

5. **Configurar Astro para AVIF/WebP:**
   - `astro.config.mjs` já tem suporte default de `astro:assets`. Confirmar que não precisa adicionar `image: { service: ... }`.
   - Se algum componente usar `<Picture>`, configurar fallbacks corretos.

6. Rodar `npm run build`. Verde.

7. **Verificação CLS** (smoke):
   - `npm run preview` + Chrome DevTools Performance → conferir que LCP element é a foto hero e CLS < 0,1.
   - Lighthouse local em `/`, `/sobre/`, `/servicos/desenvolvimento-de-liderancas/`. Score Performance ≥85 desejável.

8. Commit: `perf: migrar imagens para astro:assets com WebP/AVIF`.

9. Marcar `status: ✅`.

## Acceptance Criteria

- [ ] Fotos `eloyse-*` migradas para `src/assets/photos/` e usadas via `<Image>` (ou via import + bg-image otimizada).
- [ ] Logos de clientes migrados para `src/assets/logos/` e usados via `<Image>` em `Clients.astro`.
- [ ] CLS local < 0,1 nas 3 páginas testadas.
- [ ] LCP local < 2,5s na home.
- [ ] Build verde.
- [ ] **Não regride** o visual (smoke comparativo).

## Testing

- Build + preview + Lighthouse spot-check.
- Comparar visual antes/depois — sem regressão.

## Notes

- **Páginas novas (S08-S20)** já podem ter sido criadas usando `<img>` com path `/images/photos/...` (fallback antes da migração). Esta task substitui essas referências por imports após a migração — confira tasks `sobre.astro`, `metodologia.astro` etc. e atualize.
- Se a migração quebrar visualmente algum componente (ex: hero com efeitos complexos), priorizar **fallback funcional** (manter `background-image`, mas com WebP como fonte) sobre adoção pura do `<Image>`.
- Considerar usar `astro:assets` `getImage()` para gerar URLs WebP dinamicamente em CSS bg-image quando refatorar não vale a pena.

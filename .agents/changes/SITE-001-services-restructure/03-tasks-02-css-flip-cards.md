> ## 🔴 INSPECTOR FEEDBACK — 2026-03-08
>
> **Status**: INCOMPLETE — do NOT proceed to Task 03 until this task is fixed and re-inspected.
>
> ### Failures
>
> **1. Missing `@media (max-width: 575px)` breakpoint** ❌
> The acceptance criteria explicitly require breakpoints at 991px, 767px, **and 575px**.
> The implementation contains only 991px and 767px. The 575px breakpoint is completely absent.
> Per the spec, this block is required:
> ```css
> @media (max-width: 575px) {
>   .c-services {
>     width: 340px;
>   }
> }
> ```
>
> **2. Duplicate / stray CSS content in the file** ❌
> Starting around line 248, the file contains orphaned CSS declarations (`letter-spacing: 0.06em;`,
> `text-decoration: none;`, etc.) floating outside any selector, followed by a duplicate copy of
> section N (`.c-flip-card__cta:hover`) and section O (both `@media` blocks) with garbled
> UTF-8 encoding. This indicates the agent appended a partial second write to the file.
> The file must be cleaned so each rule appears exactly once.
>
> ### Passed Criteria (for reference)
> All 10 structural/functional criteria pass: perspective, transform-style, transitions,
> backface-visibility, rotateY states, grid layout, pills, CTA button, 767px responsive,
> Nicepage compat rules. Build also passes. Only the above two items need fixing.

# Task 02: CSS dos Flip Cards — `services.css`

**Depends on**: Task 01 (class names defined in HTML)
**Estimated complexity**: Medium
**Type**: Feature

## Objective

Reescrever completamente `src/styles/components/services.css` implementando o sistema
de flip card 3D, layout em grade 2×2 por grupo, pills coloridas, e responsividade.

## ⚠️ Important information

Before coding, Read FIRST -> Load [03-tasks-00-READBEFORE.md](03-tasks-00-READBEFORE.md)

## Files to Modify/Create

- `src/styles/components/services.css` — reescrita completa

## Detailed Steps

1. Update `PROGRESS.md` to mark this task as 🔄 In Progress.

2. Read `src/styles/settings/variables.css` to know all available CSS tokens.

3. Read `src/styles/components/services.css` to understand the current structure (for reference only).

4. Read `03-tasks-00-READBEFORE.md` for CSS conventions.

5. Rewrite `src/styles/components/services.css` with the following sections IN ORDER:

   **A. Section wrapper — preserve Nicepage structural rules**
   ```css
   /* Mantém compatibilidade estrutural com nicepage */
   .u-section-2 {
     background-image: none;
   }
   .u-section-2 .u-group-1 {
     height: auto;
     min-height: 228px;
     margin-top: 0;
     margin-bottom: 0;
   }
   .u-section-2 .u-container-layout-1 {
     padding: 0 30px;
   }
   ```

   **B. Services container**
   ```css
   .c-services {
     width: 929px;
     max-width: 100%;
     margin: -168px auto 60px;
     padding: 0 10px;
   }
   ```

   **C. Group**
   ```css
   .c-services__group {
     margin-bottom: 56px;
   }
   .c-services__group-title {
     font-family: var(--font-family-heading);
     font-size: 0.75rem;
     font-weight: 700;
     letter-spacing: 0.12em;
     text-transform: uppercase;
     color: var(--color-palette-1);
     margin: 0 0 20px;
     padding-bottom: 10px;
     border-bottom: 2px solid var(--color-palette-3);
   }
   ```

   **D. Grid**
   ```css
   .c-services__grid {
     display: grid;
     grid-template-columns: repeat(2, 1fr);
     gap: 16px;
   }
   ```

   **E. Flip card container**
   ```css
   .c-flip-card {
     perspective: 1200px;
     min-height: 260px;
     cursor: pointer;
     outline: none;
   }
   .c-flip-card:focus-visible {
     outline: 2px solid var(--color-palette-1);
     outline-offset: 3px;
     border-radius: 8px;
   }
   ```

   **F. Flip card inner (the rotating element)**
   ```css
   .c-flip-card__inner {
     position: relative;
     width: 100%;
     height: 100%;
     min-height: 260px;
     transform-style: preserve-3d;
     transition: transform 0.5s ease;
   }
   .c-flip-card--flipped .c-flip-card__inner {
     transform: rotateY(180deg);
   }
   ```

   **G. Front and back shared styles**
   ```css
   .c-flip-card__front,
   .c-flip-card__back {
     position: absolute;
     inset: 0;
     -webkit-backface-visibility: hidden;
     backface-visibility: hidden;
     background-color: var(--color-white);
     border-radius: 8px;
     box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
     padding: 28px 24px;
     display: flex;
     flex-direction: column;
   }
   ```

   **H. Back — rotated and content styled**
   ```css
   .c-flip-card__back {
     transform: rotateY(180deg);
     justify-content: space-between;
   }
   ```

   **I. Front content**
   ```css
   .c-flip-card__icon {
     color: var(--color-palette-1);
     display: block;
     margin-bottom: 16px;
   }
   .c-flip-card__title {
     font-family: var(--font-family-heading);
     font-size: 1rem;
     font-weight: 600;
     color: var(--color-text-default);
     margin: 0 0 12px;
     line-height: 1.35;
   }
   .c-flip-card__pills {
     display: flex;
     flex-wrap: wrap;
     gap: 6px;
     margin-top: auto;
   }
   .c-flip-card__pill {
     display: inline-block;
     background-color: var(--color-palette-3);
     color: var(--color-palette-2);
     font-family: var(--font-family-body);
     font-size: 0.7rem;
     font-weight: 600;
     padding: 3px 10px;
     border-radius: 20px;
     letter-spacing: 0.04em;
   }
   ```

   **J. Back content**
   ```css
   .c-flip-card__intro {
     font-family: var(--font-family-body);
     font-size: 0.875rem;
     font-style: italic;
     color: var(--color-palette-2);
     line-height: 1.5;
     margin: 0 0 14px;
   }
   .c-flip-card__bullets {
     font-family: var(--font-family-body);
     font-size: 0.8125rem;
     color: var(--color-text-default);
     line-height: 1.5;
     padding-left: 16px;
     margin: 0 0 20px;
     flex-grow: 1;
   }
   .c-flip-card__bullets li {
     margin-bottom: 8px;
   }
   .c-flip-card__bullets li:last-child {
     margin-bottom: 0;
   }
   .c-flip-card__cta {
     display: inline-block;
     align-self: flex-start;
     background-color: var(--color-palette-1);
     color: var(--color-white);
     font-family: var(--font-family-heading);
     font-size: 0.75rem;
     font-weight: 700;
     letter-spacing: 0.06em;
     text-transform: uppercase;
     padding: 10px 20px;
     border-radius: 50px;
     text-decoration: none;
     transition: background-color 0.2s ease;
     margin-top: auto;
   }
   .c-flip-card__cta:hover,
   .c-flip-card__cta:focus {
     background-color: var(--color-palette-2);
   }
   ```

   **K. Responsive breakpoints**
   ```css
   @media (max-width: 1199px) {
     .c-services {
       width: 100%;
     }
   }

   @media (max-width: 991px) {
     .c-services {
       width: 720px;
     }
     .c-services__grid {
       grid-template-columns: repeat(2, 1fr);
     }
   }

   @media (max-width: 767px) {
     .c-services {
       width: 540px;
       margin-top: -120px;
     }
     .c-services__grid {
       grid-template-columns: 1fr;
     }
     .c-flip-card__inner,
     .c-flip-card {
       min-height: 220px;
     }
     .c-services__group-title {
       font-size: 0.7rem;
     }
   }

   @media (max-width: 575px) {
     .c-services {
       width: 340px;
     }
   }
   ```

6. Validate: no `u-text-*`, `u-list-*`, `u-repeater-*` selectors remain (those are the OLD classes — they must all be removed).

7. Update `PROGRESS.md` to mark this task as ✅ Completed.

8. Commit: `feat: add flip card CSS with 3D transform and responsive grid (SITE-001 task 02)`

## Acceptance Criteria

- [ ] File `src/styles/components/services.css` rebuilt with only `c-*` and minimal `u-*` structural rules
- [ ] `.c-flip-card__inner` has `transform-style: preserve-3d` and `transition: transform 0.5s ease`
- [ ] `.c-flip-card--flipped .c-flip-card__inner` has `transform: rotateY(180deg)`
- [ ] Both front and back have `-webkit-backface-visibility: hidden` and `backface-visibility: hidden`
- [ ] `.c-flip-card__pill` styled as small rounded badge with palette-3 background
- [ ] `.c-flip-card__cta` styled as rounded button matching site palette
- [ ] `@media` breakpoints for 991px, 767px, 575px present
- [ ] No old `.u-text-*` or `.u-repeater-*` selectors remain

## Testing

- Run `npm run build` and open `dist/index.html`
- Verify both groups render with correct grid layout
- Verify flip animation at 0.5s on click in browser DevTools
- Verify responsiveness at 320px, 768px, 1200px widths

## Notes

- The negative `margin-top: -168px` on `.c-services` is intentional: it creates the visual
  overlap between the dark banner and the card grid (same visual as the current layout).
- Do NOT add `overflow: hidden` to `.c-flip-card` or `.c-flip-card__inner` —
  it will break the 3D transform.
- The `min-height` on both `.c-flip-card` and `.c-flip-card__inner` must match.

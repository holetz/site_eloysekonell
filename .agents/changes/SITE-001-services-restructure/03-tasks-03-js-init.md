# Task 03: JavaScript — `initServiceCards()` em `main.js`

**Depends on**: Task 01, Task 02
**Estimated complexity**: Low
**Type**: Feature

## Objective

Adicionar a função `initServiceCards()` ao `src/scripts/main.js` para gerenciar o estado
do flip card (toggle de classe + ARIA) via clique e teclado.

## ⚠️ Important information

Before coding, Read FIRST -> Load [03-tasks-00-READBEFORE.md](03-tasks-00-READBEFORE.md)

## Files to Modify/Create

- `src/scripts/main.js` — adição de função e integração ao `initSiteModules()`

## Detailed Steps

1. Update `PROGRESS.md` to mark this task as 🔄 In Progress.

2. Read the full content of `src/scripts/main.js` to understand the existing module pattern.

3. Add the following function BEFORE the `initSiteModules` export:

```javascript
/**
 * Inicializa o comportamento de flip nos cards de serviços.
 *
 * @returns {{ destroy: () => void }}
 */
function initServiceCards() {
  const cards = Array.from(document.querySelectorAll(".c-flip-card"));

  function toggleCard(card) {
    const isFlipped = card.classList.toggle("c-flip-card--flipped");
    card.setAttribute("aria-expanded", String(isFlipped));
  }

  function handleClick(event) {
    const card = event.currentTarget;
    // Prevent CTA link click from also flipping the card back
    if (event.target.closest(".c-flip-card__cta")) {
      return;
    }
    toggleCard(card);
  }

  function handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard(event.currentTarget);
    }
  }

  cards.forEach((card) => {
    card.addEventListener("click", handleClick);
    card.addEventListener("keydown", handleKeydown);
  });

  return {
    destroy() {
      cards.forEach((card) => {
        card.removeEventListener("click", handleClick);
        card.removeEventListener("keydown", handleKeydown);
      });
    },
  };
}
```

4. Modify `initSiteModules()` to call `initServiceCards()`:
   - Add `let serviceCardsController = null;` alongside the other controller declarations at the top of the file.
   - Inside `initSiteModules()`, add: `serviceCardsController = initServiceCards();`
   - Add `serviceCards: serviceCardsController` to the return object.

5. Modify `destroySiteModules()` to clean up:
   ```javascript
   if (serviceCardsController && typeof serviceCardsController.destroy === "function") {
     serviceCardsController.destroy();
   }
   serviceCardsController = null;
   ```

6. Run `npm run build` and verify no JS errors in browser console.

7. Update `PROGRESS.md` to mark this task as ✅ Completed.

8. Commit: `feat: add initServiceCards JS module with ARIA and keyboard support (SITE-001 task 03)`

## Acceptance Criteria

- [ ] `initServiceCards()` function added to `main.js`
- [ ] Click on `.c-flip-card` toggles `.c-flip-card--flipped` class
- [ ] Click on `.c-flip-card__cta` does NOT trigger card flip (event guard present)
- [ ] `aria-expanded` attribute updates on each toggle
- [ ] Enter and Space keys trigger flip
- [ ] `destroy()` removes both event listeners from all cards
- [ ] `initSiteModules()` calls `initServiceCards()` and includes it in return value
- [ ] `destroySiteModules()` calls `serviceCardsController.destroy()`

## Testing

- Open `dist/index.html` in browser
- Click a card: should flip with 3D animation
- Click the flipped card: should flip back
- Click the "Quero saber mais" button: should NOT flip the card, should scroll to `#block-2`
- Tab to a card, press Enter: should flip
- Tab to a flipped card, press Space: should flip back
- Inspect `aria-expanded` attribute in DevTools before and after flip

## Notes

- The `.c-flip-card__cta` guard (`event.target.closest(...)`) is critical — without it,
  clicking the CTA button would first trigger the anchor navigation AND then the card flip,
  creating a confusing UX.
- The `event.preventDefault()` for Space key prevents page scroll.
- All event handling is done via `addEventListener` — no jQuery dependency.

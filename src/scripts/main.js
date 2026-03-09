/**
 * main.js
 * Entry point principal para inicialização de módulos globais.
 */

import { initAboutCarousel } from "./carousel.js";
import { initForms } from "./forms.js";

let carouselController = null;
let formsController = null;
let serviceCardsController = null;

function onDomReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }

  callback();
}

function setupGlobalEventListeners() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest('a[href^="#"]');
    if (!target) {
      return;
    }

    const hash = target.getAttribute("href");
    if (!hash || hash === "#") {
      return;
    }

    const section = document.querySelector(hash);
    if (!section) {
      return;
    }

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

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

/**
 * Inicializa os módulos globais do site.
 *
 * @param {Object} options - Configurações opcionais.
 * @param {Object} [options.carousel] - Configuração para o módulo de carousel.
 * @param {Object} [options.forms] - Configuração para o módulo de formulários.
 * @returns {{carousel: Object|null, forms: Object|null, serviceCards: Object|null}}
 */
export function initSiteModules(options = {}) {
  carouselController = initAboutCarousel(options.carousel || {});
  formsController = initForms(options.forms || {});
  serviceCardsController = initServiceCards();

  setupGlobalEventListeners();

  return {
    carousel: carouselController,
    forms: formsController,
    serviceCards: serviceCardsController,
  };
}

/**
 * Finaliza módulos ativos (útil para reinit em ambientes dinâmicos).
 */
export function destroySiteModules() {
  if (carouselController && typeof carouselController.destroy === "function") {
    carouselController.destroy();
  }

  if (formsController && typeof formsController.destroy === "function") {
    formsController.destroy();
  }

  if (serviceCardsController && typeof serviceCardsController.destroy === "function") {
    serviceCardsController.destroy();
  }
  serviceCardsController = null;

  carouselController = null;
  formsController = null;
}

onDomReady(() => {
  initSiteModules();
});

window.EKSite = {
  initSiteModules,
  destroySiteModules,
};

/**
 * main.js
 * Entry point principal para inicialização de módulos globais.
 */

import { initAboutCarousel } from "./carousel.js";
import { initForms } from "./forms.js";

let carouselController = null;
let formsController = null;

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
 * Inicializa os módulos globais do site.
 *
 * @param {Object} options - Configurações opcionais.
 * @param {Object} [options.carousel] - Configuração para o módulo de carousel.
 * @param {Object} [options.forms] - Configuração para o módulo de formulários.
 * @returns {{carousel: Object|null, forms: Object|null}}
 */
export function initSiteModules(options = {}) {
  carouselController = initAboutCarousel(options.carousel || {});
  formsController = initForms(options.forms || {});

  setupGlobalEventListeners();

  return {
    carousel: carouselController,
    forms: formsController,
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

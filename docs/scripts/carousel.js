/**
 * carousel.js
 * Lógica do carrossel "about-carousel" com compatibilidade para markup Nicepage.
 */

const DEFAULT_OPTIONS = {
  selector: "#carousel-64a0",
  autoPlay: true,
  autoPlayInterval: 5000,
  pauseOnHover: true,
  startIndex: 0,
};

function getJQuery() {
  return window.jQuery || window.$ || null;
}

function toArray(list) {
  return Array.prototype.slice.call(list || []);
}

/**
 * Inicializa o carrossel da seção "Sobre".
 *
 * @param {Object} userOptions - Opções de inicialização.
 * @param {string} [userOptions.selector='#carousel-64a0'] - Seletor do container do carrossel.
 * @param {boolean} [userOptions.autoPlay=true] - Ativa rotação automática.
 * @param {number} [userOptions.autoPlayInterval=5000] - Intervalo do autoplay em ms.
 * @returns {{next: Function, prev: Function, goTo: Function, startAutoPlay: Function, stopAutoPlay: Function, getCurrentIndex: Function, destroy: Function}|null}
 */
export function initAboutCarousel(userOptions = {}) {
  const options = { ...DEFAULT_OPTIONS, ...userOptions };
  const root = document.querySelector(options.selector);

  if (!root) {
    return null;
  }

  const inner = root.querySelector(".u-carousel-inner");
  const slides = toArray(root.querySelectorAll(".u-carousel-item"));
  const indicators = toArray(root.querySelectorAll("[data-u-slide-to]"));
  const prevButton = root.querySelector('[data-u-slide="prev"]');
  const nextButton = root.querySelector('[data-u-slide="next"]');

  if (!inner || slides.length === 0) {
    return null;
  }

  let currentIndex = Math.min(
    Math.max(options.startIndex, 0),
    slides.length - 1,
  );
  let autoPlayTimer = null;

  const emitChange = () => {
    const detail = {
      index: currentIndex,
      slide: slides[currentIndex],
      total: slides.length,
    };

    root.dispatchEvent(new CustomEvent("ek:carousel:change", { detail }));

    const jq = getJQuery();
    if (jq) {
      jq(root).trigger("ek.carousel.change", [detail]);
    }
  };

  const render = () => {
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle("u-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    indicators.forEach((indicator, index) => {
      const isActive = index === currentIndex;
      indicator.classList.toggle("u-active", isActive);
      indicator.setAttribute("aria-current", isActive ? "true" : "false");
    });

    emitChange();
  };

  const goTo = (index) => {
    if (slides.length === 0) {
      return;
    }

    const normalizedIndex =
      ((index % slides.length) + slides.length) % slides.length;
    currentIndex = normalizedIndex;
    render();
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  const stopAutoPlay = () => {
    if (autoPlayTimer) {
      window.clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();

    if (!options.autoPlay || slides.length < 2) {
      return;
    }

    const intervalFromMarkup = Number.parseInt(root.dataset.interval, 10);
    const interval =
      Number.isFinite(intervalFromMarkup) && intervalFromMarkup > 0
        ? intervalFromMarkup
        : options.autoPlayInterval;

    autoPlayTimer = window.setInterval(next, interval);
  };

  const handlePrevClick = (event) => {
    event.preventDefault();
    prev();
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    next();
  };

  const indicatorHandlers = indicators.map((indicator) => {
    const handler = (event) => {
      event.preventDefault();
      const targetIndex = Number.parseInt(
        indicator.getAttribute("data-u-slide-to") || "0",
        10,
      );
      goTo(Number.isFinite(targetIndex) ? targetIndex : 0);
    };

    indicator.addEventListener("click", handler);
    return { indicator, handler };
  });

  if (prevButton) {
    prevButton.addEventListener("click", handlePrevClick);
  }

  if (nextButton) {
    nextButton.addEventListener("click", handleNextClick);
  }

  if (options.pauseOnHover) {
    root.addEventListener("mouseenter", stopAutoPlay);
    root.addEventListener("mouseleave", startAutoPlay);
    root.addEventListener("focusin", stopAutoPlay);
    root.addEventListener("focusout", startAutoPlay);
  }

  render();
  startAutoPlay();

  return {
    next,
    prev,
    goTo,
    startAutoPlay,
    stopAutoPlay,
    getCurrentIndex: () => currentIndex,
    destroy() {
      stopAutoPlay();

      if (prevButton) {
        prevButton.removeEventListener("click", handlePrevClick);
      }

      if (nextButton) {
        nextButton.removeEventListener("click", handleNextClick);
      }

      indicatorHandlers.forEach(({ indicator, handler }) => {
        indicator.removeEventListener("click", handler);
      });

      if (options.pauseOnHover) {
        root.removeEventListener("mouseenter", stopAutoPlay);
        root.removeEventListener("mouseleave", startAutoPlay);
        root.removeEventListener("focusin", stopAutoPlay);
        root.removeEventListener("focusout", startAutoPlay);
      }
    },
  };
}

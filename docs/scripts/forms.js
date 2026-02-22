/**
 * forms.js
 * Validação de formulários e integração com intlTelInput.
 */

const FORM_DEFAULTS = {
  formSelector: "form",
  requiredMessage: "Este campo é obrigatório.",
  emailMessage: "Informe um e-mail válido.",
  phoneMessage: "Informe um telefone válido.",
  telSelector:
    'input[type="tel"], .u-form-phone > input, input[data-country-code]',
  initialCountry: "br",
};

const formState = new WeakMap();

function getIntlTelInputFactory() {
  return window.intlTelInput || null;
}

function getIntlUtilsPath() {
  const meta = document.querySelector("meta[data-intl-tel-input-cdn-path]");
  const basePath = meta
    ? meta.getAttribute("data-intl-tel-input-cdn-path")
    : "intlTelInput/";
  return `${basePath}utils.js`;
}

function createErrorNode(message) {
  const node = document.createElement("span");
  node.className = "ek-form-error";
  node.textContent = message;
  return node;
}

function clearError(field) {
  field.removeAttribute("aria-invalid");
  const existing = field.parentElement
    ? field.parentElement.querySelector(".ek-form-error")
    : null;
  if (existing) {
    existing.remove();
  }
}

function setError(field, message) {
  clearError(field);
  field.setAttribute("aria-invalid", "true");
  const errorNode = createErrorNode(message);

  if (field.parentElement) {
    field.parentElement.appendChild(errorNode);
  }
}

function validateField(field, intlInstance, options) {
  const fieldType = (field.getAttribute("type") || "").toLowerCase();
  const value = (field.value || "").trim();

  if (field.hasAttribute("required") && !value) {
    setError(field, options.requiredMessage);
    return false;
  }

  if (fieldType === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError(field, options.emailMessage);
      return false;
    }
  }

  if (fieldType === "tel" && value && intlInstance) {
    if (!intlInstance.isValidNumber()) {
      setError(field, options.phoneMessage);
      return false;
    }
  }

  clearError(field);
  return true;
}

function getFields(form) {
  return Array.from(form.querySelectorAll("input, select, textarea")).filter(
    (field) => {
      if (field.disabled) {
        return false;
      }

      const type = (field.getAttribute("type") || "").toLowerCase();
      return type !== "hidden" && type !== "submit" && type !== "button";
    },
  );
}

function getFormData(form, telInstances) {
  const formData = new FormData(form);
  const payload = {};

  formData.forEach((value, key) => {
    payload[key] = value;
  });

  telInstances.forEach((instance, input) => {
    const inputName = input.getAttribute("name");
    if (inputName && typeof instance.getNumber === "function") {
      payload[inputName] = instance.getNumber();
    }
  });

  return payload;
}

function createIntlInstance(input, options) {
  const intlFactory = getIntlTelInputFactory();

  if (!intlFactory || input.dataset.ekIntlReady === "true") {
    return null;
  }

  const countryCode = (
    input.getAttribute("data-country-code") || options.initialCountry
  ).toLowerCase();

  const instance = intlFactory(input, {
    initialCountry: countryCode,
    autoPlaceholder: "aggressive",
    utilsScript: getIntlUtilsPath(),
  });

  input.dataset.ekIntlReady = "true";
  return instance;
}

function bindFieldRealtimeValidation(form, fields, telInstances, options) {
  const listeners = [];

  fields.forEach((field) => {
    const validateOnInput = () => {
      const instance = telInstances.get(field);
      validateField(field, instance, options);
    };

    field.addEventListener("blur", validateOnInput);
    field.addEventListener("input", validateOnInput);

    listeners.push(() => {
      field.removeEventListener("blur", validateOnInput);
      field.removeEventListener("input", validateOnInput);
    });
  });

  formState.set(form, listeners);
}

/**
 * Valida um formulário com base nas regras padrão do projeto.
 *
 * @param {HTMLFormElement} form - Formulário alvo.
 * @returns {boolean} true se válido; false se inválido.
 */
export function validateForm(form) {
  if (!form) {
    return false;
  }

  const state = formState.get(form);
  const telInstances = (state && state.telInstances) || new Map();
  const options = (state && state.options) || FORM_DEFAULTS;
  const fields = getFields(form);

  let isFormValid = true;
  fields.forEach((field) => {
    const isValid = validateField(field, telInstances.get(field), options);
    if (!isValid) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

/**
 * Inicializa validação e submit handlers dos formulários da página.
 *
 * @param {Object} userOptions - Opções de inicialização.
 * @param {string} [userOptions.formSelector='form'] - Seletor para localizar formulários.
 * @param {(payload: Object, form: HTMLFormElement) => void} [userOptions.onSubmit] - Callback de submit válido.
 * @returns {{destroy: Function, formsCount: number}}
 */
export function initForms(userOptions = {}) {
  const options = { ...FORM_DEFAULTS, ...userOptions };
  const forms = Array.from(document.querySelectorAll(options.formSelector));

  forms.forEach((form) => {
    const telInputs = Array.from(form.querySelectorAll(options.telSelector));
    const telInstances = new Map();

    telInputs.forEach((input) => {
      const instance = createIntlInstance(input, options);
      if (instance) {
        telInstances.set(input, instance);
      }
    });

    const fields = getFields(form);
    bindFieldRealtimeValidation(form, fields, telInstances, options);

    const submitHandler = (event) => {
      event.preventDefault();

      let isFormValid = true;
      fields.forEach((field) => {
        const isValid = validateField(field, telInstances.get(field), options);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        return;
      }

      const payload = getFormData(form, telInstances);
      form.dispatchEvent(
        new CustomEvent("ek:form:submit", { detail: payload }),
      );

      if (typeof options.onSubmit === "function") {
        options.onSubmit(payload, form);
      }
    };

    form.addEventListener("submit", submitHandler);

    const state = formState.get(form) || [];
    state.push(() => {
      form.removeEventListener("submit", submitHandler);
    });
    state.telInstances = telInstances;
    state.options = options;

    formState.set(form, state);
  });

  return {
    formsCount: forms.length,
    destroy() {
      forms.forEach((form) => {
        const listeners = formState.get(form) || [];
        listeners.forEach((cleanup) => {
          if (typeof cleanup === "function") {
            cleanup();
          }
        });

        const telInstances = listeners.telInstances || new Map();
        telInstances.forEach((instance, input) => {
          if (instance && typeof instance.destroy === "function") {
            instance.destroy();
          }
          if (input.dataset) {
            delete input.dataset.ekIntlReady;
          }
        });

        formState.delete(form);
      });
    },
  };
}

/**
 * Obtém dados serializados de um formulário.
 *
 * @param {HTMLFormElement} form - Formulário alvo.
 * @returns {Object} payload chave/valor.
 */
export function serializeForm(form) {
  if (!form) {
    return {};
  }

  const state = formState.get(form);
  const telInstances = (state && state.telInstances) || new Map();
  return getFormData(form, telInstances);
}

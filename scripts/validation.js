// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputEls) {
  return !inputEls.every((inputEl) => inputEl.validity.valid);
}

// disableButton

// enableButton

function toggleButtonState(
  inputEls,
  submitButtonSelector,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputEls)) {
    disableButton(submitButtonSelector, { inactiveButtonClass });
    return;
  }

  enableButton(submitButtonSelector, { inactiveButtonClass });
}

function disableButton(submitButtonSelector, { inactiveButtonClass }) {
  submitButtonSelector.classList.add(inactiveButtonClass);
  submitButtonSelector.disabled = true;
}

function enableButton(submitButtonSelector, { inactiveButtonClass }) {
  submitButtonSelector.classList.remove(inactiveButtonClass);
  submitButtonSelector.disabled = false;
}

function resetValidation(formEl, options) {
  const inputEls = Array.from(formEl.querySelectorAll(options.inputSelector));
  const submitButtonSelector = formEl.querySelector(
    options.submitButtonSelector
  );

  inputEls.forEach((inputEl) => {
    hideInputError(formEl, inputEl, options);
    checkInputValidity(formEl, inputEl, options);
  });

  toggleButtonState(inputEls, submitButtonSelector, options);
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButtonSelector = formEl.querySelector(".modal__button");

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButtonSelector, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    // look for all input inside of form
    // loop through all the inputs to see if all are valid
    // if input is not valid
    // get validation message
    // add error class to input
    // display error message
    // disable message
    // if all inputs are valid
    // enable button
    // reset error messages
  });
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(options);

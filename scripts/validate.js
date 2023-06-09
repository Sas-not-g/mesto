const enableValidation = settings => {
  Array.from(document.querySelectorAll(settings['formSelector'])).forEach(form => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(
      form,
      Array.from(form.querySelectorAll(settings['inputSelector'])),
      form.querySelector(settings['submitButtonSelector']),
      settings['inactiveButtonClass'],
      settings['inputErrorClass'],
      settings['errorClass']
    );
  });
};

const setEventListeners = (
  form,
  inputs,
  submitButton,
  buttonInactiveClass,
  inputErrorClass,
  errorClass
) => {
  toggleButtonState(inputs, submitButton, buttonInactiveClass);
  inputs.forEach(input => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, inputErrorClass, errorClass);
      toggleButtonState(inputs, submitButton, buttonInactiveClass);
    });
  });
};

const checkInputValidity = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    showInputError(input, form.querySelector(`.${input.name}-error`), inputErrorClass, errorClass);
  } else {
    hideInputError(input, form.querySelector(`.${input.name}-error`), inputErrorClass, errorClass);
  }
};

const showInputError = (input, errorElement, inputErrorClass, errorClass) => {
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (input, errorElement, inputErrorClass, errorClass) => {
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

const toggleButtonState = (inputs, submitButton, buttonInactiveClass) => {
  if (hasInvalidInput(inputs)) {
    submitButton.classList.add(buttonInactiveClass);
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.classList.remove(buttonInactiveClass);
    submitButton.removeAttribute('disabled', '');
  }
};

const hasInvalidInput = inputs => {
  return inputs.some(input => {
    return !input.validity.valid;
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

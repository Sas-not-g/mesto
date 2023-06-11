import { validationConfig } from './constants.js';

const enableValidation = settings => {
  Array.from(document.querySelectorAll(settings.formSelector)).forEach(form => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(
      form,
      Array.from(form.querySelectorAll(settings.inputSelector)),
      form.querySelector(settings.submitButtonSelector),
      settings.inactiveButtonClass,
      settings.inputErrorClass,
      settings.errorClass
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
    disableButton(submitButton, buttonInactiveClass);
  } else {
    enableButton(submitButton, buttonInactiveClass);
  }
};

function disableButton(button, classToBeAdded) {
  button.classList.add(classToBeAdded);
  button.setAttribute('disabled', '');
}

function enableButton(button, classToBeRemoved) {
  button.classList.remove(classToBeRemoved);
  button.removeAttribute('disabled', '');
}

const hasInvalidInput = inputs => {
  return inputs.some(input => {
    return !input.validity.valid;
  });
};

enableValidation(validationConfig);

export { disableButton };
export { enableButton };

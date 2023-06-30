export class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    (this._inputs = Array.from(this._form.querySelectorAll(config.inputSelector))),
      (this._submitButton = this._form.querySelector(config.submitButtonSelector));
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, this._form.querySelector(`.${input.name}-error`));
    } else {
      this._hideInputError(input, this._form.querySelector(`.${input.name}-error`));
    }
  }

  _showInputError(input, errorElement) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', '');
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled', '');
  }

  _hasInvalidInput() {
    return this._inputs.some(input => {
      return !input.validity.valid;
    });
  }
}

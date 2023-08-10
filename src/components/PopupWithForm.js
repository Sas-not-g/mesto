import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__button_type_submit');
    this._submitButtonContent = this._submitButton.textContent;
    this._form = this._popup.querySelector('.popup__form');
    this._submit = submit;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._renderLoading = this._renderLoading.bind(this);
  }

  _getInputValues() {
    this._inputValues = Object.values(this._inputs);
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._submit(this._getInputValues());
    });
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
      console.log(this._submitButton.textContent, this._submitButtonContent);
    } else {
      this._submitButton.textContent = this._submitButtonContent;
    }
  }

  setInputValues(data) {
    this._inputs.forEach(input => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

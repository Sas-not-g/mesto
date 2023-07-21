import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submit = submit;
    this._inputs = this._popup.querySelectorAll('.popup__input');
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

  close() {
    super.close();
    this._form.reset();
  }
}

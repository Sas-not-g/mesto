import Popup from './Popup.js';

export default class popupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__button_type_submit');
    this.close = this.close.bind(this);
  }

  open(cardThis) {
    this.cardThis = cardThis;
    this.addEventListeners();
    super.open();
  }

  addEventListeners() {
    this._submitButton.addEventListener('click', this.cardThis._deleteCard);
    this._submitButton.addEventListener('click', this.close);
  }

  close() {
    super.close();
    this._submitButton.removeEventListener('click', this.close);
    this._submitButton.removeEventListener('click', this.cardThis._deleteCard);
  }
}

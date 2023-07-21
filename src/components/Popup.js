export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._cancelButton = this._popup.querySelector('.popup__button_type_cancel');
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._cancelButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.close();
    }
  }
}

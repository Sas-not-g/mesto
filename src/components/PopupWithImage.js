import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { link, name }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._link = link;
    this._name = name;
    this._image = this._popup.querySelector('.popup__picture');

    this._pictureCaption = this._popup.querySelector('.popup__picture-caption');
  }

  open() {
    super.setEventListeners();
    super.open();
    this._image.src = this._link;
    this._image.alt = this._name;

    this._pictureCaption.textContent = this._name;
  }
}

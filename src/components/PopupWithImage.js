import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__picture');
    this._pictureCaption = this._popup.querySelector('.popup__picture-caption');
    this.open = this.open.bind(this);
  }

  open({ name, link }) {
    super.open();
    this._image.src = link;
    this._image.alt = name;

    this._pictureCaption.textContent = name;
  }
}

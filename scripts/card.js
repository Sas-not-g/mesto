import { popupPicture, popupImageElement, popupPictureCaption, openPopup } from './index.js';

export class Card {
  constructor(cardData, cardTemplate) {
    this._cardData = cardData;
    this._gridCard = document.querySelector(cardTemplate).content.cloneNode(true);
    this._gridCardImage = this._gridCard.querySelector('.photo-grid__picture');
    this._gridCardLike = this._gridCard.querySelector('.photo-grid__like-button');
    this._gridCardDelete = this._gridCard.querySelector('.photo-grid__delete-button');
  }

  createCard() {
    this._addEventListeners();

    this._gridCardImage.setAttribute('src', this._cardData.link);
    this._gridCardImage.setAttribute('alt', this._cardData.name);

    this._gridCard.querySelector('.photo-grid__description').textContent = this._cardData.name;

    return this._gridCard;
  }

  _addEventListeners() {
    this._gridCardImage.addEventListener('click', () =>
      this._openPicture(this._cardData.link, this._cardData.name)
    );
    this._gridCardLike.addEventListener('click', () => this._like());
    this._gridCardDelete.addEventListener('click', this._deleteCard);
  }

  _like() {
    this._gridCardLike.classList.toggle('photo-grid__like-button_active');
  }

  _deleteCard(event) {
    event.target.closest('.photo-grid__element').remove();
  }

  _openPicture() {
    popupImageElement.src = this._cardData.link;
    popupImageElement.alt = this._cardData.name;
    popupPictureCaption.textContent = this._cardData.name;

    openPopup(popupPicture);
  }
}

export class Card {
  constructor(
    cardData,
    cardTemplate,
    popupImage,
    popupPictureCaption,
    popupPicture,
    handleCardClick,
    openDeletePopup,
    closeDeletePopup,
    deleteCardFromServer,
    setLike,
    removeLike,
    userId
  ) {
    this._cardData = cardData;
    this._cardLikes = this._cardData.likes;
    this._amountOfLikes = this._cardLikes.length;
    this._cardId = this._cardData._id;
    this._thisUserId = userId;
    this._userId = this._cardData.owner._id;
    this._gridCard = document.querySelector(cardTemplate).content.cloneNode(true);
    this._gridCardImage = this._gridCard.querySelector('.photo-grid__picture');
    this._gridCardLike = this._gridCard.querySelector('.photo-grid__like-button');
    this._gridCardLikeCounter = this._gridCard.querySelector('.photo-grid__like-counter');
    this._gridCardDelete = this._gridCard.querySelector('.photo-grid__delete-button');
    this._popupImage = popupImage;
    this._popupPictureCaption = popupPictureCaption;
    this._popupPicture = popupPicture;
    this._handleCardClick = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._closeDeletePopup = closeDeletePopup;
    this._deleteCardFromServer = deleteCardFromServer;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._deleteCard = this._deleteCard.bind(this);
    this._changeLikes = this._changeLikes.bind(this);
  }

  createCard() {
    this._addEventListeners();
    this._setInitialLikes();

    this._gridCardImage.setAttribute('src', this._cardData.link);
    this._gridCardImage.setAttribute('alt', this._cardData.name);

    if (this._userId != this._thisUserId) {
      this._gridCardDelete.remove();
    } else {
      this._gridCardDelete.addEventListener('click', evt => {
        this._cardEvent = evt;
        this._openDeletePopup(this);
      });
    }

    this._gridCard.querySelector('.photo-grid__description').textContent = this._cardData.name;

    return this._gridCard;
  }

  _addEventListeners() {
    this._gridCardImage.addEventListener('click', () => this._openPicture());
    this._gridCardLike.addEventListener('click', () => this._handleLikeClick());
  }

  _setInitialLikes() {
    this._cardLikes.forEach(like => {
      if (like._id == this._thisUserId) {
        this._toggleLike();
      }
    });
    this._gridCardLikeCounter.textContent = this._amountOfLikes;
  }

  _handleLikeClick() {
    if (this._gridCardLike.classList.contains('photo-grid__like-button_active')) {
      this._removeLike(this._cardId)
        .then(this._changeLikes)
        .catch(err => console.error(err));
    } else {
      this._setLike(this._cardId)
        .then(this._changeLikes)
        .catch(err => console.error(err));
    }
  }

  _changeLikes(res) {
    this._amountOfLikes = res.likes.length;
    this._toggleLike();
  }

  _toggleLike() {
    this._gridCardLike.classList.toggle('photo-grid__like-button_active');
    this._gridCardLikeCounter.textContent = this._amountOfLikes;
  }

  _deleteCard() {
    this._deleteCardFromServer(this._cardId)
      .then(() => {
        this._cardEvent.target.closest('.photo-grid__element').remove();
        this._closeDeletePopup();
      })
      .catch(err => console.error(err));
  }

  _openPicture() {
    this._handleCardClick({ name: this._cardData.name, link: this._cardData.link });
  }
}

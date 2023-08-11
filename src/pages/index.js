import './index.css';

import { validationConfig as config } from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';

const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const avatarChangeButton = document.querySelector('.profile__icon');
const popupPictureCaption = document.querySelector('.popup__picture-caption');
const popupPicture = document.querySelector('.popup_type_picture');
const popupImageElement = document.querySelector('.popup__picture');
const formPopupAdd = document.querySelector('.popup_type_add').querySelector('.popup__form');
const formPopupEdit = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const formPopupAvatar = document
  .querySelector('.popup_type_edit-avatar')
  .querySelector('.popup__form');

const cards = new Section({ renderer: createNewCard }, '.photo-grid');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: 'd8bbc101-a274-46e9-a640-da9ddbf514a8',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userProfileData, initialCards]) => {
    userData.setUserInfo(userProfileData);
    cards.renderItems(initialCards);
  })
  .catch(err => console.error(err));

const handleCardFormSubmit = formValues => {
  const cardValues = { name: formValues.placeName, link: formValues.placeLink };
  cardFormPopup.renderLoading(true);
  api
    .postNewCard(cardValues)
    .then(res => {
      cards.addFormItem(createNewCard(res));
      cardFormPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => cardFormPopup.renderLoading(false));
};

const cardFormPopup = new PopupWithForm('.popup_type_add', handleCardFormSubmit);
cardFormPopup.setEventListeners();

const editFormPopup = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
editFormPopup.setEventListeners();

const avatarFormPopup = new PopupWithForm('.popup_type_edit-avatar', handleAvatarFormSubmit);
avatarFormPopup.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_picture');
popupImage.setEventListeners();

const popupDeleteCard = new PopupDeleteCard('.popup_type_delete-card');
popupDeleteCard.setEventListeners();

const userData = new UserInfo({
  userNameSelector: '.profile__username',
  userJobSelector: '.profile__job',
  avatarSelector: '.profile__icon-image'
});

function handleAvatarFormSubmit(newAvatarLink) {
  const link = newAvatarLink.avatarLink;
  avatarFormPopup.renderLoading(true);
  api
    .changeAvatar(link)
    .then(() => {
      userData.setAvatar(link);
      avatarFormPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => avatarFormPopup.renderLoading(false));
}

function handleProfileFormSubmit(formValues) {
  const profileValues = { name: formValues.name, about: formValues.about };
  editFormPopup.renderLoading(true);

  api
    .patchUserData(profileValues)
    .then(() => {
      userData.setUserProfileInfo(profileValues);
      editFormPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => editFormPopup.renderLoading(false));
}

function createNewCard(cardValues) {
  const gridElement = new Card(
    cardValues,
    '.cardTemplate',
    popupImageElement,
    popupPictureCaption,
    popupPicture,
    popupImage.open,
    popupDeleteCard.open,
    popupDeleteCard.close,
    api.deleteCard,
    api.setLike,
    api.removeLike,
    userData.userId
  );

  const newCard = gridElement.createCard();
  return newCard;
}

const editForm = new FormValidator(config, formPopupEdit);
editForm.enableValidation();

const addForm = new FormValidator(config, formPopupAdd);
addForm.enableValidation();

const avatarForm = new FormValidator(config, formPopupAvatar);
avatarForm.enableValidation();

editButton.addEventListener('click', () => {
  editForm.resetValidation();
  const editFormStartValues = userData.getUserInfo();
  editFormPopup.setInputValues(editFormStartValues);
  editFormPopup.open();
});

addButton.addEventListener('click', () => {
  addForm.resetValidation();
  cardFormPopup.open();
});

avatarChangeButton.addEventListener('click', () => {
  avatarForm.resetValidation();
  avatarFormPopup.open();
});

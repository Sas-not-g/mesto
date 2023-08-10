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
const userName = document.querySelector('.profile__username');
const avatar = document.querySelector('.profile__icon-image');
const job = document.querySelector('.profile__job');
const popupPictureCaption = document.querySelector('.popup__picture-caption');
const popupPicture = document.querySelector('.popup_type_picture');
const popupImageElement = document.querySelector('.popup__picture');
const formsArray = Array.from(document.querySelectorAll(config.formSelector));

const cards = new Section({ renderer: createNewCard }, '.photo-grid');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: 'd8bbc101-a274-46e9-a640-da9ddbf514a8',
    'Content-Type': 'application/json'
  }
});

api
  .getUserData()
  .then(res => res.json())
  .then(res => {
    userName.textContent = res.name;
    job.textContent = res.about;
    avatar.src = res.avatar;
  });

api
  .getInitialCards()
  .then(res => res.json())
  .then(res => {
    cards.renderItems(res);
  });

const handleCardFormSubmit = formValues => {
  const cardValues = { name: formValues[0].value, link: formValues[1].value };
  cardFormPopup._renderLoading(true);
  api
    .postNewCard(cardValues)
    .then(res => res.json())
    .then(res => {
      cards.addFormItem(createNewCard(res));
      cardFormPopup.close();
      cardFormPopup._renderLoading(false);
    });
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
  userJobSelector: '.profile__job'
});

function handleAvatarFormSubmit(newAvatarLink) {
  const link = newAvatarLink[0].value;
  avatarFormPopup._renderLoading(true);
  api.changeAvatar(link).then(() => {
    avatar.src = link;
    avatarFormPopup.close();
    avatarFormPopup._renderLoading(false);
  });
}

function handleProfileFormSubmit(formValues) {
  const profileValues = { name: formValues[0].value, about: formValues[1].value };
  editFormPopup._renderLoading(true);

  api.patchUserData(profileValues).then(() => {
    userData.setUserInfo(profileValues);
    editFormPopup.close();
    editFormPopup._renderLoading(false);
  });
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
    api.deleteCard,
    api.setLike,
    api.removeLike
  );

  const newCard = gridElement.createCard();
  return newCard;
}

const editForm = new FormValidator(config, formsArray[0]);
editForm.enableValidation();

const addForm = new FormValidator(config, formsArray[1]);
addForm.enableValidation();

const avatarForm = new FormValidator(config, formsArray[2]);
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

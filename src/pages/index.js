import './index.css';

import { initialCards, validationConfig as config } from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const userName = document.querySelector('.profile__username');
const job = document.querySelector('.profile__job');
const formName = document.querySelector('.popup__input_type_name');
const formJob = document.querySelector('.popup__input_type_job');
const grid = document.querySelector('.photo-grid');
const popupPictureCaption = document.querySelector('.popup__picture-caption');
const popupPicture = document.querySelector('.popup_type_picture');
const popupImageElement = document.querySelector('.popup__picture');

const newCards = new Section({ items: initialCards, renderer: createNewCard }, '.photo-grid');
newCards.renderItems();

const handleCardFormSubmit = formValues => {
  const cardValues = { name: formValues[0].value, link: formValues[1].value };
  grid.prepend(createNewCard(cardValues));
  cardFormPopup.close();
};

const cardFormPopup = new PopupWithForm('.popup_type_add', handleCardFormSubmit);
cardFormPopup.setEventListeners();

const editFormPopup = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
editFormPopup.setEventListeners();

const userData = new UserInfo({
  userNameSelector: '.profile__username',
  userJobSelector: '.profile__job'
});

function handleProfileFormSubmit(formValues) {
  const profileValues = { name: formValues[0].value, job: formValues[1].value };

  userData.setUserInfo(profileValues);

  userName.textContent = formName.value;
  job.textContent = formJob.value;
  editFormPopup.close();
}

function createNewCard(formValues) {
  const popupForCard = new PopupWithImage('.popup_type_picture', {
    link: formValues.link,
    name: formValues.name
  });

  const gridElement = new Card(
    formValues,
    '.cardTemplate',
    popupImageElement,
    popupPictureCaption,
    popupPicture,
    popupForCard.open.bind(popupForCard)
  );
  const newCard = gridElement.createCard();
  return newCard;
}

Array.from(document.querySelectorAll(config.formSelector)).forEach(form => {
  const newForm = new FormValidator(config, form);
  newForm.enableValidation();
});

editButton.addEventListener('click', () => {
  const editFormStartValues = userData.getUserInfo();
  formName.value = editFormStartValues.name;
  formJob.value = editFormStartValues.job;
  editFormPopup.open();
});

addButton.addEventListener('click', () => cardFormPopup.open());

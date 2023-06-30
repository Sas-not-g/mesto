import { initialCards, validationConfig as config } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const editButton = document.querySelector('.profile__button_type_edit');
const cancelButtons = document.querySelectorAll('.popup__button_type_cancel');
const addButton = document.querySelector('.profile__button_type_add');
const userName = document.querySelector('.profile__username');
const job = document.querySelector('.profile__job');
const formName = document.querySelector('.popup__input_type_name');
const formJob = document.querySelector('.popup__input_type_job');
const formPlace = document.querySelector('.popup__input_type_place-name');
const formLink = document.querySelector('.popup__input_type_place-link');
const grid = document.querySelector('.photo-grid');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const profileForm = popupEdit.querySelector('.popup__form');
const cardForm = popupAdd.querySelector('.popup__form');
const cardTemplateSelector = '.cardTemplate';
const popupPictureCaption = document.querySelector('.popup__picture-caption');
const popupPicture = document.querySelector('.popup_type_picture');
const popupImageElement = document.querySelector('.popup__picture');

initialCards.forEach(card => {
  grid.append(createNewCard(card, cardTemplateSelector));
});

function setEditFormValuesOnLaunch() {
  formName.value = userName.textContent;
  formJob.value = job.textContent;
}

function openPopup(chosenPopup) {
  chosenPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  userName.textContent = formName.value;
  job.textContent = formJob.value;
  closePopup(popupEdit);
}

function handleCardFormSubmit(event) {
  event.preventDefault();
  const placeFormValues = {
    name: formPlace.value,
    link: formLink.value
  };
  grid.prepend(createNewCard(placeFormValues, cardTemplateSelector));

  closePopup(popupAdd);
  event.target.reset();
}

function createNewCard(formValues, templateSelector) {
  const gridElement = new Card(
    formValues,
    templateSelector,
    popupImageElement,
    popupPictureCaption,
    popupPicture,
    openPopup
  );
  const newCard = gridElement.createCard();
  return newCard;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

const closePopupByOverlayClick = evt => {
  if (evt.target.classList.contains('popup')) closePopup(evt.currentTarget);
};

function closePopupByEscape(evt) {
  if (evt.key == 'Escape') closePopup(document.querySelector('.popup_opened'));
}

setEditFormValuesOnLaunch();

document
  .querySelectorAll('.popup')
  .forEach(popup => popup.addEventListener('click', closePopupByOverlayClick));

cancelButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener('click', () => {
  setEditFormValuesOnLaunch();
  openPopup(popupEdit);
});

Array.from(document.querySelectorAll(config.formSelector)).forEach(form => {
  const newForm = new FormValidator(config, form);
  newForm.enableValidation();
});

addButton.addEventListener('click', () => openPopup(popupAdd));

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

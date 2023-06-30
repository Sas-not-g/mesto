import { initialCards } from './constants.js';
import { Card } from './card.js';
import { validationConfig as config } from './constants.js';
import { FormValidator } from './formValidator.js';

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
export const popupPictureCaption = document.querySelector('.popup__picture-caption');
export const popupPicture = document.querySelector('.popup_type_picture');
export const popupImageElement = document.querySelector('.popup__picture');

initialCards.forEach(card => {
  const gridElement = new Card(card, cardTemplateSelector);
  const newCard = gridElement.createCard();
  grid.append(newCard);
});

function setEditFormValuesOnLaunch() {
  formName.value = userName.textContent;
  formJob.value = job.textContent;
}

export function openPopup(chosenPopup) {
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
  const gridElement = new Card(placeFormValues, '.cardTemplate');
  const newCard = gridElement.createCard();
  grid.prepend(newCard);

  closePopup(popupAdd);
  event.target.reset();
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

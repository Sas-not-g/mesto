import { initialCards } from './constants.js';
import { validationConfig } from './constants.js';
import { disableButton } from './validate.js';
import { enableButton } from './validate.js';

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
const cardSubmitButton = popupAdd.querySelector('.popup__button_type_submit');
const profileSubmitButton = popupEdit.querySelector('.popup__button_type_submit');
const popupPicture = document.querySelector('.popup_type_picture');
const popupImageElement = document.querySelector('.popup__picture');
const profileForm = popupEdit.querySelector('.popup__form');
const cardForm = popupAdd.querySelector('.popup__form');
const popupPictureCaption = document.querySelector('.popup__picture-caption');
const gridCardTemplateContent = document.querySelector('.cardTemplate').content;

initialCards.forEach(card => {
  const gridElement = createCard(card);
  grid.append(gridElement);
});

function setEditFormValuesOnLaunch() {
  formName.value = userName.textContent;
  formJob.value = job.textContent;
}

function createCard(card) {
  const gridCard = gridCardTemplateContent.cloneNode(true);
  const gridCardImage = gridCard.querySelector('.photo-grid__picture');
  const gridCardLike = gridCard.querySelector('.photo-grid__like-button');
  const gridCardDelete = gridCard.querySelector('.photo-grid__delete-button');
  gridCardImage.addEventListener('click', () => openPicture(card.link, card.name));
  gridCardLike.addEventListener('click', like);
  gridCardDelete.addEventListener('click', deleteCard);

  gridCardImage.setAttribute('src', card.link);
  gridCardImage.setAttribute('alt', card.name);
  gridCard.querySelector('.photo-grid__description').textContent = card.name;

  return gridCard;
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
  const gridElement = createCard(placeFormValues);
  grid.prepend(gridElement);
  closePopup(popupAdd);
  event.target.reset();
  disableButton(cardSubmitButton, validationConfig.inactiveButtonClass);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

function like(event) {
  event.target.classList.toggle('photo-grid__like-button_active');
}

function deleteCard(event) {
  event.target.closest('.photo-grid__element').remove();
}

function openPicture(cardLink, cardName) {
  popupImageElement.src = cardLink;
  popupImageElement.alt = cardName;
  popupPictureCaption.textContent = cardName;
  openPopup(popupPicture);
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
  enableButton(profileSubmitButton, validationConfig.inactiveButtonClass);
  setEditFormValuesOnLaunch();
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => openPopup(popupAdd));

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

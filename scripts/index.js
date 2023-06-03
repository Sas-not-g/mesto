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
const popupPicture = document.querySelector('.popup_type_picture');
const popupImageElement = document.querySelector('.popup__picture');
const profileForm = popupEdit.querySelector('.popup__form');
const cardForm = popupAdd.querySelector('.popup__form');
const popupPictureCaption = document.querySelector('.popup__picture-caption');
const gridCardTemplateContent = document.querySelector('.cardTemplate').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(card => {
  const gridElement = createCard(card);
  grid.append(gridElement);
});

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
  console.log(card.name);
  gridCard.querySelector('.photo-grid__description').textContent = card.name;

  return gridCard;
}

function openPopup(chosenPopup) {
  chosenPopup.classList.add('popup_opened');
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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

cancelButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener('click', () => {
  formName.value = userName.textContent;
  formJob.value = job.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => openPopup(popupAdd));

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

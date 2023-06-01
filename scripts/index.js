const editButton = document.querySelector('.profile__button_type_edit');
const saveButton = document.querySelectorAll('.popup__form');
const cancelButton = document.querySelectorAll('.popup__button_type_cancel');
const addButton = document.querySelector('.profile__button_type_add');
const popup = document.querySelector('.popup');
let username = document.querySelector('.profile__username');
let job = document.querySelector('.profile__job');
let formName = document.querySelector('.popup__input_type_name');
let formJob = document.querySelector('.popup__input_type_job');
let formPlace = document.querySelector('.popup__input_type_place-name');
let formLink = document.querySelector('.popup__input_type_place-link');
const grid = document.querySelector('.photo-grid');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPicture = document.querySelector('.popup_type_picture');
const popupImageElement = document.querySelector('.popup__picture');
const popupPictureCaption = document.querySelector('.popup__picture-caption');

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
  const photoGridElement = document.createElement('li');
  const photoGridImage = document.createElement('img');
  const descriptionBar = document.createElement('div');
  const descriptionTitle = document.createElement('h2');
  const photoGridLike = document.createElement('button');
  const photoGridDelete = document.createElement('button');

  photoGridElement.classList.add('photo-grid__element');
  photoGridImage.classList.add('photo-grid__picture');
  descriptionBar.classList.add('photo-grid__description-bar');
  descriptionTitle.classList.add('photo-grid__description');
  photoGridLike.classList.add('photo-grid__like-button');
  photoGridDelete.classList.add('photo-grid__delete-button');

  photoGridImage.setAttribute('src', card.link);
  photoGridImage.setAttribute('alt', card.name);

  descriptionTitle.textContent = card.name;
  photoGridLike.setAttribute('type', 'button');
  photoGridDelete.setAttribute('type', 'button');

  descriptionBar.append(descriptionTitle, photoGridLike);
  photoGridElement.append(photoGridDelete, photoGridImage, descriptionBar);
  grid.append(photoGridElement);
});

function openPopup(chosenPopup) {
  chosenPopup.classList.add('popup_opened');
  formName.value = username.textContent;
  formJob.value = job.textContent;
}

function submit(event) {
  event.preventDefault();
  let clicked_button = event.target;
  let parentPopup = clicked_button.closest('.popup');
  if (parentPopup.classList.contains('popup_type_edit')) {
    username.textContent = formName.value;
    job.textContent = formJob.value;
  }
  if (parentPopup.classList.contains('popup_type_add')) {
    addCard();
  }

  parentPopup.classList.remove('popup_opened');
}

function cancel(event) {
  let clickedButton = event.target;
  clickedButton.closest('.popup').classList.remove('popup_opened');
}

function like(event) {
  let clicked_element = event.target;
  if (clicked_element.classList.contains('photo-grid__like-button')) {
    if (clicked_element.classList.contains('photo-grid__like-button_active')) {
      clicked_element.classList.remove('photo-grid__like-button_active');
    } else {
      clicked_element.classList.add('photo-grid__like-button_active');
    }
  }
}

function deleteCard(event) {
  let clicked_element = event.target;
  if (clicked_element.classList.contains('photo-grid__delete-button')) {
    clicked_element.closest('.photo-grid__element').remove();
  }
}

function openPicture(event) {
  let clicked_element = event.target;
  if (clicked_element.classList.contains('photo-grid__picture')) {
    popupImageElement.src = clicked_element.src;
    popupPictureCaption.textContent = clicked_element.parentNode.querySelector(
      '.photo-grid__description'
    ).textContent;
    openPopup(popupPicture);
  }
}

function addCard() {
  const photoGridElement = document.createElement('li');
  const photoGridImage = document.createElement('img');
  const descriptionBar = document.createElement('div');
  const descriptionTitle = document.createElement('h2');
  const photoGridLike = document.createElement('button');
  const photoGridDelete = document.createElement('button');

  photoGridElement.classList.add('photo-grid__element');
  photoGridImage.classList.add('photo-grid__picture');
  descriptionBar.classList.add('photo-grid__description-bar');
  descriptionTitle.classList.add('photo-grid__description');
  photoGridLike.classList.add('photo-grid__like-button');
  photoGridDelete.classList.add('photo-grid__delete-button');

  photoGridImage.setAttribute('src', formLink.value);
  photoGridImage.setAttribute('alt', formPlace.value);

  descriptionTitle.textContent = formPlace.value;
  photoGridLike.setAttribute('type', 'button');
  photoGridDelete.setAttribute('type', 'button');

  descriptionBar.append(descriptionTitle, photoGridLike);
  photoGridElement.append(photoGridDelete, photoGridImage, descriptionBar);
  grid.prepend(photoGridElement);
}

saveButton.forEach(button => button.addEventListener('submit', submit));
cancelButton.forEach(button => button.addEventListener('click', cancel));
editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));
grid.addEventListener('click', like);
grid.addEventListener('click', deleteCard);
grid.addEventListener('click', openPicture);

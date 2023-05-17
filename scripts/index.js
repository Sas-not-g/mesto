let editButton = document.querySelector('.profile__button_type_edit');
let saveButton = document.querySelector('.popup__form');
let cancelButton = document.querySelector('.popup__button_type_cancel');
let popup = document.querySelector('.popup');
let username = document.querySelector('.profile__username');
let job = document.querySelector('.profile__job');
let formName = document.querySelector('.popup__input_type_name');
let formJob = document.querySelector('.popup__input_type_job');

function openPopup() {
  popup.classList.add('popup_opened');
  formName.value = username.textContent;
  formJob.value = job.textContent;
}

function submit(evt) {
  evt.preventDefault();
  username.textContent = formName.value;
  job.textContent = formJob.value;
  cancel();
}

function cancel() {
  popup.classList.remove('popup_opened');
}
saveButton.addEventListener('submit', submit);
cancelButton.addEventListener('click', cancel);
editButton.addEventListener('click', openPopup);

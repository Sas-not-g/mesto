let editButton = document.querySelector('.button_type_edit');
let saveButton = document.querySelector('.button_type_submit');
let cancelButton = document.querySelector('.button_type_cancel');
let likeButtons = document.querySelector('.like-button');
let popup = document.querySelector('.popup');
let grid = document.querySelector('.photo-grid');

function openPopup() {
  popup.classList.add('popup_opened');

  let name = document.querySelector('.profile__username');
  let job = document.querySelector('.profile__job');
  let formName = document.querySelector('.popup__input_type_name');
  let formJob = document.querySelector('.popup__input_type_job');

  formName.value = name.innerText;
  formJob.value = job.innerText;

  function Submit() {
    name.innerText = formName.value;
    job.innerText = formJob.value;
    popup.classList.remove('popup_opened');
  }

  function Cancel() {
    popup.classList.remove('popup_opened');
  }
  saveButton.addEventListener('click', Submit);
  cancelButton.addEventListener('click', Cancel);
}

grid.addEventListener('click', function (event) {
  let clicked_element = event.target;
  if (clicked_element.classList.contains('button_type_like')) {
    if (clicked_element.classList.contains('button_condition_active')) {
      clicked_element.classList.remove('button_condition_active');
      clicked_element.setAttribute('src', 'images/like_disabled.svg');
    } else {
      clicked_element.classList.add('button_condition_active');
      clicked_element.setAttribute('src', 'images/like_filled.svg');
    }
  }
});

editButton.addEventListener('click', openPopup);

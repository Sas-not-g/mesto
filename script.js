let editButton = document.querySelector('.button_type_edit');
let saveButton = document.querySelector('.popup__submit-button');
let cancelButton = document.querySelector('.popup__cancel-button');
let likeButtons = document.querySelector('.like-button');
let popup = document.querySelector('.popup');
let grid = document.querySelector('.photo-grid');

function openPopup() {
  popup.classList.remove('disabled');

  let name = document.querySelector('.profile__username');
  let job = document.querySelector('.profile__user-job');
  let formName = document.querySelector('.input_type_name');
  let formJob = document.querySelector('.input_type_job');

  formName.value = name.innerText;
  formJob.value = job.innerText;

  function Submit() {
    name.innerText = formName.value;
    job.innerText = formJob.value;
    popup.classList.add('disabled');
  }

  function Cancel() {
    popup.classList.add('disabled');
  }
  saveButton.addEventListener('click', Submit);
  cancelButton.addEventListener('click', Cancel);
}

grid.addEventListener('click', function (event) {
  let clicked_element = event.target;
  if (clicked_element.classList.contains('like-button')) {
    console.log('like');

    if (clicked_element.classList.contains('active')) {
      clicked_element.classList.remove('active');
      clicked_element.setAttribute('src', 'pictures/like_disabled.svg');
    } else {
      clicked_element.classList.add('active');
      clicked_element.setAttribute('src', 'pictures/like_filled.svg');
    }
  }
});

editButton.addEventListener('click', openPopup);

const popupOpenButton=document.querySelector('.profile__editButton');
const popupCloseButton = document.querySelector('.popup__close');
const popup=document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
let nameInput=document.querySelector('.profile__title');
let jobInput=document.querySelector('.profile__text');
let namePopupItemOne=document.querySelector('.popup__itemOne');
let namePopupItemTwo=document.querySelector('.popup__itemTwo');

function togglePopup(event) {
  popup.classList.toggle('popup_opened');
    namePopupItemOne.value=nameInput.innerText;
    namePopupItemTwo.value=jobInput.innerText;
}

function closePopupOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
      popup.classList.remove('popup_opened');
  }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.textContent=namePopupItemOne.value;
    jobInput.textContent=namePopupItemTwo.value;
    popup.classList.remove('popup_opened');
}

popup.addEventListener('click', closePopupOnOverlayClick);
popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

const popupOpenButton=document.querySelector('.profile__editButton');
const popupCloseButton = document.querySelector('.popup__close');
const popup=document.querySelector('.popup');
const formElement = document.querySelector('.popup__save');
let nameInput=document.querySelector('.profile__title');
let jobInput=document.querySelector('.profile__text');
let namePopupName=document.querySelector('.popup__itemOne');
let namePopupName1=document.querySelector('.popup__itemTwo');

function togglePopup(event) {
  popup.classList.toggle('popup_opened');
    namePopupName.value=nameInput.innerText;
    namePopupName1.value=jobInput.innerText;
}

function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
      popup.classList.remove('popup_opened');
  }
}

popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
popup.addEventListener('click', closePopupOnOverlayClick);

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.textContent=namePopupName.value;
    jobInput.textContent=namePopupName1.value;
    popup.classList.remove('popup_opened');

}

formElement.addEventListener('click', formSubmitHandler);

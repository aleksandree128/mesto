const popupOpenButton=document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup=document.querySelector('.popup');
const formElement = document.querySelector('.popup__name');
let nameInput=document.querySelector('.profile__title');
let jobInput=document.querySelector('.profile__text');
let namePopupItemOne=document.querySelector('.popup__item_name');
let namePopupItemTwo=document.querySelector('.popup__item_about-name');

function togglePopup(event) {
    if(popup.classList.toggle('popup_opened')===true)
    {
        namePopupItemOne.value=nameInput.innerText;
        namePopupItemTwo.value=jobInput.innerText;
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.textContent=namePopupItemOne.value;
    jobInput.textContent=namePopupItemTwo.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);


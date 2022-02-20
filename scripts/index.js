import {initialCards, validatorConfig, newCardModalWindow, newImageModalWindow, profileModalWindow} from "./constance.js";
import {FormValidator} from "./FormValidator.js";
import {openPopup} from "./utils.js";
import {Card} from "./Card.js";

//профиль
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");

//формы

const profileForm = profileModalWindow.querySelector(".popup__name");
const addCardForm = newCardModalWindow.querySelector(".popup__name");

//кнопки

const editProfileButton = document.querySelector(".profile__edit-button");
const closeEditModalButton = profileModalWindow.querySelector(".popup__close");
const addCardButton = document.querySelector(".profile__add-button");
const closeAddCardModalButton = newCardModalWindow.querySelector(".popup__close");
const closeOpenImageButton = newImageModalWindow.querySelector(".popup__close");
const popups = document.querySelectorAll(".popup");
//инпуты

const inputCardName = document.querySelector(".popup__item_type_card-name");
const inputCardLink = document.querySelector(".popup__item_type_card-link");

const inputProfileTitle = document.querySelector(".popup__item_type_name");
const inputProfileText = document.querySelector(".popup__item_type_about-name");

const cardsContainer = document.querySelector(".elements__lists");
const cardTemplateSelector = ".card";

const editFormValidator=new FormValidator(validatorConfig, profileForm);
const addCardFormValidator=new FormValidator(validatorConfig, addCardForm);

editFormValidator.enableValidation()
addCardFormValidator.enableValidation()

function disableToggleButton(form) {
    const button=form.querySelector('.popup__save')
    button.classList.add('popup__save_disabled');
    button.setAttribute("disabled", "");
}

function closePopup(modal) {
    modal.classList.remove("popup_opened");
    document.removeEventListener("keydown", keyClose);
}

export function keyClose(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closePopup(popup);
        }
    });
});

function addCard(cardData) {
    const card=new Card(cardData, cardTemplateSelector)
    const cardElement = card.createCard();
    cardsContainer.prepend(cardElement);
}
initialCards.forEach(addCard);


//клики
editProfileButton.addEventListener("click", () =>
    openPopupEdit(profileModalWindow)
);
closeEditModalButton.addEventListener("click", () =>
    closePopup(profileModalWindow)
);
addCardButton.addEventListener("click", () => openPopup(newCardModalWindow));
closeAddCardModalButton.addEventListener("click", () =>
    closePopup(newCardModalWindow)
);
closeOpenImageButton.addEventListener("click", () => closePopup(newImageModalWindow));

//закгрузка формы профиля
profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileTitle.textContent = inputProfileTitle.value;
    profileText.textContent = inputProfileText.value;

    closePopup(profileModalWindow);
});

function openPopupEdit(profileModalWindow) {
    inputProfileTitle.value = profileTitle.textContent.trim();
    inputProfileText.value = profileText.textContent.trim();
    openPopup(profileModalWindow);
}

//загрузка картинок
addCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    addCard({
        name: inputCardName.value,
        link: inputCardLink.value,
    });
    closePopup(newCardModalWindow);
    addCardForm.reset();
    disableToggleButton(addCardForm);
});

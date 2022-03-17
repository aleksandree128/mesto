import {FormValidator} from "../components/FormValidator";

export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const validatorConfig ={
    formSelector: ".popup__name",
    inputSelector: ".popup__item",
    buttonSaveSelector: ".popup__save",
    errorVisibleClass: "popup__input-error_visible",
    errorSelector: ".popup__input-error",
    inputErrorClass: "popup__item_type_error",
    inactiveButtonClass: "popup__save_disabled",
};

const profileModalWindow = document.querySelector(".popup_type_edit");
const newCardModalWindow = document.querySelector(".popup_type_add-card");

const profileFormValidator = profileModalWindow.querySelector(".popup__name");
const editCardFormValidator = newCardModalWindow.querySelector(".popup__name");
export const editProfileButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");

export const inputProfileTitle = document.querySelector(".popup__item_type_name");
export const inputProfileText = document.querySelector(".popup__item_type_about-name");

export const cardTemplateSelector = ".card";

export const editFormValidator=new FormValidator(validatorConfig, profileFormValidator);
export const addCardFormValidator=new FormValidator(validatorConfig, editCardFormValidator);


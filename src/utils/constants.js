import {FormValidator} from "../components/FormValidator";
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
const inputProfileAvatar=document.querySelector(".popup_type_update-avatar")

const profileFormValidator = profileModalWindow.querySelector(".popup__name");
const editCardFormValidator = newCardModalWindow.querySelector(".popup__name");
const avatarUpdateValidator=inputProfileAvatar.querySelector(".popup__name")


export const editFormValidator=new FormValidator(validatorConfig, profileFormValidator);
export const addCardFormValidator=new FormValidator(validatorConfig, editCardFormValidator);
export const updateAvatarValidator=new FormValidator(validatorConfig, avatarUpdateValidator)

export const editProfileButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");
export const profileAvatarButton = document.querySelector('.profile__avatar-button');

export const inputProfileTitle = document.querySelector(".popup__item_type_name");
export const inputProfileText = document.querySelector(".popup__item_type_about-name");

export const cardTemplateSelector = ".card";



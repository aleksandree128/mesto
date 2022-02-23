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

export const validatorConfig ={
    formSelector: ".popup__name",
    inputSelector: ".popup__item",
    buttonSaveSelector: ".popup__save",
    errorVisibleClass: "popup__input-error_visible",
    errorSelector: ".popup__input-error",
    inputErrorClass: "popup__item_type_error",
    inactiveButtonClass: "popup__save_disabled",
};

export function closePopup(modal) {
    modal.classList.remove("popup_opened");
    document.removeEventListener("keydown", keyClose);
}

export function keyClose(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

export let cardImageLink=document.querySelector(".popup__image-link");
export let cardImageAlt=document.querySelector(".popup__image-link");
export const profileModalWindow = document.querySelector(".popup_type_edit");
export const newCardModalWindow = document.querySelector(".popup_type_add-card");
export const newImageModalWindow = document.querySelector(".popup_type_image");

import { openPopup } from "./utils.js";
import { newImageModalWindow } from "./constance.js";

export class Card {
    constructor(cardData, cardTemplateSelector) {
        this._cardData = cardData;
        this._template = document.querySelector(cardTemplateSelector).content;
    }

    _likeClickHandler = () => {
        this._cardLike.classList.toggle("elements__like_black");
    };
    _deleteHandler = () => {
        this._cardDelete.closest(".elements__list").remove();
    };

    _openPopupImage = () => {
        document.querySelector(".popup__place-title").textContent =
            this._cardText.textContent;
        document.querySelector(".popup__image-link").src = this._cardImage.src;
        document.querySelector(".popup__image-link").alt = this._cardImage.alt;
        openPopup(newImageModalWindow);
    };

    _setEventListener() {
        this._cardDelete.addEventListener("click", this._deleteHandler);
        this._cardLike.addEventListener("click", this._likeClickHandler);
        this._cardImage.addEventListener("click", this._openPopupImage);
    }
    createCard() {
        this._cardElement = this._template.cloneNode(true);
        this._cardImage = this._cardElement.querySelector(".elements__photo");
        this._cardText = this._cardElement.querySelector(".elements__text");
        this._cardDelete = this._cardElement.querySelector(
            ".elements__delete-button"
        );
        this._cardLike = this._cardElement.querySelector(".elements__like");
        this._cardText.textContent = this._cardData.name;
        this._cardImage.src = `${this._cardData.link}`;
        this._cardImage.alt = `${this._cardData.name}`;
        this._setEventListener();
        return this._cardElement;
    }
}

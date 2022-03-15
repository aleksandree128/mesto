
export class Card {
    constructor(cardData, cardTemplateSelector, handleImageClick) {
        this._cardData = cardData;
        this._template = document.querySelector(cardTemplateSelector).content.querySelector(".elements__list");
        this._handlImageClick=handleImageClick;
    }

    _likeClickHandler = () => {
        this._cardLike.classList.toggle("elements__like_black");
    };

    _deleteHandler = () => {
        this._cardElement.remove();
        this._cardElement=null;
    };

    _setEventListener() {
        this._deleteButton.addEventListener("click", this._deleteHandler);
        this._cardLike.addEventListener("click", this._likeClickHandler);
        this._cardImage.addEventListener("click", this._handlImageClick);
    }

    createCard() {
        this._cardElement = this._template.cloneNode(true);
        this._cardImage = this._cardElement.querySelector(".elements__photo");
        this._cardText = this._cardElement.querySelector(".elements__text");
        this._deleteButton = this._cardElement.querySelector(
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
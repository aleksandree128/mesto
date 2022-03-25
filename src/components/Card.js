
export class Card {
    constructor(cardData, cardTemplateSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
        this._cardData = cardData;
        this._template = document.querySelector(cardTemplateSelector).content.querySelector(".elements__list");
        this._handlImageClick=handleImageClick;
        this._handleDeleteClick=handleDeleteClick
        this._cardId = cardData._id;
        this._userId = cardData.userId;
        this._ownerId = cardData.ownerId;
        this._handleLikeClick=handleLikeClick;
        this._likes=cardData.likes
    }
    getId() {
        return this._cardId;
    }

    deleteCard = () => {
        this._cardElement.remove();
        this._cardElement=null;
    };

    _setEventListener() {
        this._deleteButton.addEventListener("click", this._handleDeleteClick);
        this._cardLike.addEventListener("click", this._handleLikeClick);
        this._cardImage.addEventListener("click", this._handlImageClick);
    }
    isLiked(){
        const userHasLikeCard=this._likes.find(user=>user._id===this._userId)
        return userHasLikeCard
    }
    setLikes(newLikes){
        this._likes=newLikes
        this._likeCountElement.textContent=this._likes.length
        if(this.isLiked()){
            this._fillLike()
        }else {
            this._emptylLike()
        }
    }
    _fillLike(){
        this._cardLike.classList.add("elements__like_black");
    }
    _emptylLike(){

        this._cardLike.classList.remove("elements__like_black");
    }
    createCard() {
        this._cardElement = this._template.cloneNode(true);
        this._cardImage = this._cardElement.querySelector(".elements__photo");
        this._cardText = this._cardElement.querySelector(".elements__text");
        this._deleteButton = this._cardElement.querySelector(
            ".elements__delete-button"
        );
        this._likeCountElement=this._cardElement.querySelector('.elements__like-count')
        if (this._ownerId !== this._userId) {
            this._deleteButton.style.display = 'none'
        }
        this._cardLike = this._cardElement.querySelector(".elements__like");
        this._cardText.textContent = this._cardData.name;
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = `${this._cardData.name}`;
        this.setLikes(this._likes)
        this._setEventListener();
        return this._cardElement;
    }
}

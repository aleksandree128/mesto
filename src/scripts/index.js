import {initialCards, profileModalWindow, newCardModalWindow, validatorConfig} from "./constance.js";
import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";
import {Section} from "./Section.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js";
//import "../page/index.css"
//формы

const profileFormValidator = profileModalWindow.querySelector(".popup__name");
const editCardFormValidator = newCardModalWindow.querySelector(".popup__name");

//кнопки

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
//инпуты

const inputProfileTitle = document.querySelector(".popup__item_type_name");
const inputProfileText = document.querySelector(".popup__item_type_about-name");

const cardsContainer = document.querySelector(".elements__lists");
const cardTemplateSelector = ".card";

const editFormValidator=new FormValidator(validatorConfig, profileFormValidator);
const addCardFormValidator=new FormValidator(validatorConfig, editCardFormValidator);

editFormValidator.enableValidation()
addCardFormValidator.enableValidation()

function disableToggleButton(form) {
    const button=form.querySelector('.popup__save')
    button.classList.add('popup__save_disabled');
    button.setAttribute("disabled", "");
}

//рендер картинок
function addCard(cardData) {
    const card=new Card(cardData, cardTemplateSelector, ()=>{
        imagePopup.open(cardData.name, cardData.link)
    })
    const cardElement = card.createCard();
    cardsContainer.prepend(cardElement);
}

//клики
editProfileButton.addEventListener("click", () =>
    openPopupEdit(profileModalWindow)
);

addCardButton.addEventListener("click", () => addCardPopup.open());


//закгрузка формы профиля
const profileForm = (data) => {
    const {popup__input_name, popup__input_about_name} = data
    userInfo.setUserInfo(popup__input_name, popup__input_about_name)
    editProfilePopup.close()
};

function openPopupEdit() {

    const data = userInfo.getUserInfo()
    inputProfileTitle.value = data.title.trim();
    inputProfileText.value = data.job.trim();
    editProfilePopup.open()
}

//добавление картинок
const addCardForm= (cardData) =>{

    const card=addCard({
        name: cardData['popup__input_name'],
        link: cardData['popup__input_about-name']
    });
    section.addItem(card)
    addCardPopup.close()
    disableToggleButton(editCardFormValidator);
};

const section=new Section({items: initialCards, renderer:addCard}, '.elements__lists')
const imagePopup=new PopupWithImage('.popup_type_image')
const addCardPopup=new PopupWithForm('.popup_type_add-card',addCardForm)
const editProfilePopup=new PopupWithForm('.popup_type_edit',profileForm)
const userInfo=new UserInfo({profileNameSelector:'.profile__title', profileJobSelector:'.profile__text'})
section.renderItems();
imagePopup.setEventListeners()
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners()


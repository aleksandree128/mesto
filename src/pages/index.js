import {
    initialCards,
    editProfileButton,
    addCardButton,
    inputProfileText,
    inputProfileTitle,
    cardTemplateSelector,
    editFormValidator,
    addCardFormValidator,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../pages/index.css";

editProfileButton.addEventListener("click", () => openPopupEdit());
addCardButton.addEventListener("click", () => {addCardFormValidator.disableButton(); addCardPopup.open()});

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//закгрузка формы профиля
const handleProfileFormSubmit = (data) => {
    const { popup__input_name, popup__input_about_name } = data;
    userInfo.setUserInfo(popup__input_name, popup__input_about_name);
    editProfilePopup.close();
};

function openPopupEdit() {
    const data = userInfo.getUserInfo();
    inputProfileTitle.value = data.title.trim();
    inputProfileText.value = data.job.trim();
    editProfilePopup.open();
}

function createCard(item) {
    const card = new Card(item, cardTemplateSelector, () => {
        imagePopup.open(item.name, item.link);
    });
    const cardElement = card.createCard();
    return cardElement;
}

function addCard(cardData) {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
}

function handleAddCardSubmit(item){
    addCard(item)
    addCardPopup.close();

}

const section = new Section(
    { items: initialCards, renderer: addCard },
    ".elements__lists"
);
const imagePopup = new PopupWithImage(".popup_type_image");
const addCardPopup = new PopupWithForm(".popup_type_add-card", handleAddCardSubmit);
const editProfilePopup = new PopupWithForm(
    ".popup_type_edit",
    handleProfileFormSubmit
);
const userInfo = new UserInfo({
    profileNameSelector: ".profile__title",
    profileJobSelector: ".profile__text",
});

section.renderItems();
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();

import {
    editProfileButton,
    addCardButton,
    inputProfileText,
    inputProfileTitle,
    cardTemplateSelector,
    profileFormValidator,
    editCardFormValidator,
    profileAvatarButton,
    avatarUpdateValidator,
    validatorConfig
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "../pages/index.css";
import { api } from "../components/Api.js";
import {FormValidator} from "../components/FormValidator";

const editFormValidator=new FormValidator(validatorConfig, profileFormValidator);
const addCardFormValidator=new FormValidator(validatorConfig, editCardFormValidator);
const updateAvatarValidator=new FormValidator(validatorConfig, avatarUpdateValidator)

updateAvatarValidator.enableValidation();
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

let userId;

api.getProfile().then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    userId = res._id;
});

api.getInitialCards().then((cardList) => {
    cardList.forEach((data) => {
        const card = createCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            _id: data._id,
            userId: userId,
            ownerId: data.owner._id,
        });
        section.addItem(card);
    });
});

editProfileButton.addEventListener("click", () => openPopupEdit());
addCardButton.addEventListener("click", () => {
    addCardFormValidator.disableButton();

    addCardPopup.open();
});

profileAvatarButton.addEventListener("click", () => {
    updateAvatarValidator.disableButton();
    updateAvatar.open();
});

//закгрузка формы профиля
const handleProfileFormSubmit = (data) => {
    const { popup__input_name, popup__input_about_name } = data;
    editProfilePopup.isLoading(true);
    api
        .editProfile(popup__input_name, popup__input_about_name)
        .then((res) => {
            userInfo.setUserInfo(popup__input_name, popup__input_about_name);
            editProfilePopup.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            editProfilePopup.isLoading(false);
        });

};

function openPopupEdit() {
    const data = userInfo.getUserInfo();
    inputProfileTitle.value = data.title.trim();
    inputProfileText.value = data.job.trim();
    editProfilePopup.open();
}

function createCard(data) {
    const card = new Card(
        {
        name: data.name,
        link: data.link,
        likes: data.likes,
        _id: data._id,
        userId: userId,
        ownerId: data._id},cardTemplateSelector,
        ()=>{
            imagePopup.open(data.name, data.link);
        },
        ()=>{
            deleteCard.open();
            deleteCard.changeSubmitHandler(() => {
                api
                    .deleteCard(card.getId())
                    .then((res) => {
                        card.deleteCard();
                        deleteCard.close();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            });
        },() => {
            if (card.isLiked()) {
                api
                    .deleteLike(card.getId())
                    .then((res) => {
                        card.setLikes(res.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                api
                    .addLike(card.getId())
                    .then((res) => {

                        card.setLikes(res.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

    )
    const cardElement = card.createCard();
    return cardElement;
}

function addCard(cardData) {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
}

const handleAddCardSubmit = (item) => {
    addCardPopup.isLoading(true);
    api
        .addCards(item.name, item.link)
        .then((res) => {
            addCard(res);
            addCardPopup.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            addCardPopup.isLoading(false);
        });
};

const section = new Section(
    { items: [], renderer: addCard },
    ".elements__lists"
);
const imagePopup = new PopupWithImage(".popup_type_image");
const addCardPopup = new PopupWithForm(
    ".popup_type_add-card",
    handleAddCardSubmit
);

const editProfilePopup = new PopupWithForm(
    ".popup_type_edit",
    handleProfileFormSubmit
);

const updateAvatar = new PopupWithForm(".popup_type_update-avatar", (item) => {
    updateAvatar.isLoading(true);
    api
        .updateAvatar(item.link)
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about, res.avatar);
            updateAvatar.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            updateAvatar.isLoading(false);
        });
});

const userInfo = new UserInfo({
    profileNameSelector: ".profile__title",
    profileJobSelector: ".profile__text",
    userAvatar: ".profile__avatar",
});

const deleteCard = new PopupWithForm(".popup_type_delete-card");

section.renderItems();
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteCard.setEventListeners();
updateAvatar.setEventListeners();




const initialCards = [
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

//профиль
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");

//модалки

const profileModalWindow = document.querySelector(".popup_type_edit");
const newCardModalWindow = document.querySelector(".popup_type_add-card");
const newImageModalWindow = document.querySelector(".popup_type_image");
//формы

const profileForm = profileModalWindow.querySelector(".popup__name");
const addCardForm = newCardModalWindow.querySelector(".popup__name");

//кнопки

const editProfileButton = document.querySelector(".profile__edit-button");
const closeEditModalButton = profileModalWindow.querySelector(".popup__close");
const addCardButton = document.querySelector(".profile__add-button");
const closeAddCardModalButton =
    newCardModalWindow.querySelector(".popup__close");
const closeOpenImageButton = newImageModalWindow.querySelector(".popup__close");
const popups = document.querySelectorAll(".popup");
//инпуты

const inputCardName = document.querySelector(".popup__item_type_card-name");
const inputCardLink = document.querySelector(".popup__item_type_card-link");

const inputProfileTitle = document.querySelector(".popup__item_type_name");
const inputProfileText = document.querySelector(".popup__item_type_about-name");

const list = document.querySelector(".elements__lists");
const cardTemplate = document.querySelector(".card").content;

function disableToggleButton(form) {
    const button=form.querySelector('.popup__save')
    button.classList.add('popup__save_disabled');
    button.setAttribute("disabled", "");
}

function openPopup(modal) {
    modal.classList.add("popup_opened");
    document.addEventListener("keydown", keyClose);
}

function closePopup(modal) {
    modal.classList.remove("popup_opened");
    document.removeEventListener("keydown", keyClose);
}

function keyClose(evt) {
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
closeOpenImageButton.addEventListener("click", () => openPopup(newImageModalWindow));

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

//удаление картинок
function deleteHandler(e) {
    e.target.closest(".elements__list").remove();
}

//добавление картинок
function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".elements__photo");
    const cardText = cardElement.querySelector(".elements__text");
    const cardDelete = cardElement.querySelector(".elements__delete-button");
    const cardLike = cardElement.querySelector(".elements__like");
    cardText.textContent = cardData.name;
    cardImage.src = `${cardData.link}`;
    cardImage.alt = `${cardData.name}`;
    cardDelete.addEventListener("click", deleteHandler);
    cardLike.addEventListener("click", likeClickHandler);
    //поставить лайки
    function likeClickHandler() {
        cardLike.classList.toggle("elements__like_black");
    }
    //откртытие картинок
    function openPopupImage(openImageModal) {
        document.querySelector(".popup__place-title").textContent =
            cardText.textContent;
        document.querySelector(".popup__image-link").src = cardImage.src;
        document.querySelector(".popup__place-title").alt = cardImage.alt;
        openPopup(openImageModal);
    }
    cardImage.addEventListener("click", () => openPopupImage(newImageModalWindow));

    return cardElement;
}

function addCard(cardData) {
    const cardElement = createCard(cardData);
    list.prepend(cardElement);
}
initialCards.forEach(addCard);

enableValidation({
    formSelector: ".popup__name",
    inputSelector: ".popup__item",
    buttonSaveSelector: ".popup__save",
    errorVisibleClass: "popup__input-error_visible",
    errorSelector: ".popup__input-error",
    inputErrorClass: "popup__item_type_error",
    inactiveButtonClass: "popup__save_disabled",
});

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
const addCardModal = document.querySelector(".popup_type_add-card");
const openImageModal = document.querySelector(".popup_type_image");
//формы

const profileForm = profileModalWindow.querySelector(".popup__name");
const addCardForm = addCardModal.querySelector(".popup__name");

//кнопки

const editProfileButton = document.querySelector(".profile__edit-button");
const closeEditModalButton = profileModalWindow.querySelector(".popup__close");
const addCardButton = document.querySelector(".profile__add-button");
const closeAddCardModalButton = addCardModal.querySelector(".popup__close");
const closeOpenImageButton = openImageModal.querySelector(".popup__close");
//инпуты

const inputCardName = document.querySelector(".popup__item_type_card-name");
const inputCardLink = document.querySelector(".popup__item_type_card-link");

const inputProfileTitle = document.querySelector(".popup__item_type_name");
const inputProfileText = document.querySelector(".popup__item_type_about-name");

const list = document.querySelector(".elements__lists");
const cardTemplate = document.querySelector(".card").content;

function toggleModal(modal) {
    modal.classList.toggle("popup_opened");
}

//клики
editProfileButton.addEventListener("click", () =>
    openPopupEdit(profileModalWindow)
);
closeEditModalButton.addEventListener("click", () =>
    toggleModal(profileModalWindow)
);
addCardButton.addEventListener("click", () => toggleModal(addCardModal));
closeAddCardModalButton.addEventListener("click", () =>
    toggleModal(addCardModal)
);
closeOpenImageButton.addEventListener("click", () =>
    toggleModal(openImageModal)
);

//загрузка картинок
addCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    addCard({
        name: inputCardName.value,
        link: inputCardLink.value,
    });
    toggleModal(addCardModal);
    addCardForm.reset();
});

//закгрузка формы профиля
profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileTitle.textContent = inputProfileTitle.value;
    profileText.textContent = inputProfileText.value;

    toggleModal(profileModalWindow);
});

function openPopupEdit(profileModalWindow) {
    inputProfileTitle.value = profileTitle.textContent.trim();
    inputProfileText.value = profileText.textContent.trim();
    toggleModal(profileModalWindow);
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
        toggleModal(openImageModal);
    }
    cardImage.addEventListener("click", () => openPopupImage(openImageModal));

    return cardElement;
}

function addCard(cardData) {
    const cardElement = createCard(cardData);
    list.prepend(cardElement);
}
initialCards.forEach(addCard);

import './pages/index.css';
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openModal, closePopup, addCloseButtonListeners, addPopupEventListeners } from './components/modal.js';
import { enableValidation, clearValidation } from "./components/validation.js";
import { fetchUserData, fetchCards, updateUserData, addCard, deleteCard, updateAvatar } from './components/api.js';

let currentUser;

// Контейнер для карточек
const placesList = document.querySelector('.places__list');

// Элементы профиля
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileImageElement = document.querySelector('.profile__image');

// Попапы
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
const avatarPopup = document.querySelector('.popup_type_avatar');

// Поля ввода в попапе редактирования профиля
const editProfileForm = editProfileModal.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

// Поля ввода в попапе добавления карточки
const addCardFormElement = addCardModal.querySelector('.popup__form');
const cardNameInput = addCardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardFormElement.querySelector('.popup__input_type_url');

// Поля ввода в попапе обновления аватара
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');

// Кнопки открытия попапов
const editProfileButtonElement = document.querySelector('.profile__edit-button');
const addCardButtonElement = document.querySelector('.profile__add-button');
const avatarEditButtonElement = document.querySelector('.profile__image');

// Элементы попапа с изображением
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    openModal(imagePopup);
}

// Глобальная переменная для кнопок отправки форм
const submitButtons = {
    editProfile: editProfileForm.querySelector('.popup__button'),
    addCard: addCardFormElement.querySelector('.popup__button'),
    avatar: avatarForm.querySelector('.popup__button')
};

// Глобальная переменная для аватара
const avatarImageElement = document.querySelector('.profile__avatar');

// Функция рендеринга карточек
function renderCards(cards) {
    cards.forEach(card => {
        const cardElement = createCard(card, handleDeleteCard, handleLikeCard, openImagePopup, currentUser);
        placesList.appendChild(cardElement);
    });
}

// Функция отображения данных пользователя
function renderUserData(userData) {
    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    avatarImageElement.src = userData.avatar;
    currentUser = userData;
}

// Функция для обработки кнопки с состоянием загрузки
function toggleButtonState(button, isLoading) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
        button.disabled = true;
        button.classList.add('button_loading');
    } else {
        button.textContent = 'Сохранить';
        button.disabled = false;
        button.classList.remove('button_loading');
    }
}

// Функция загрузки данных с сервера
async function fetchData() {
    try {
        const [userData, cardsData] = await Promise.all([fetchUserData(), fetchCards()]);
        renderUserData(userData);
        renderCards(cardsData);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

// Обработчик открытия попапа редактирования профиля
editProfileButtonElement.addEventListener('click', () => {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileDescriptionElement.textContent;
    clearValidation(editProfileForm, validationConfig);
    openModal(editProfileModal);
});

// Обработчик открытия попапа добавления карточки
addCardButtonElement.addEventListener('click', () => {
    addCardFormElement.reset();
    clearValidation(addCardFormElement, validationConfig);
    openModal(addCardModal);
});

// Обработчик открытия попапа редактирования аватара
avatarEditButtonElement.addEventListener('click', () => {
    avatarInput.value = '';
    clearValidation(avatarForm, validationConfig);
    openModal(avatarPopup);
});

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value.trim();
    const description = jobInput.value.trim();
    toggleButtonState(submitButtons.editProfile, true);

    updateUserData({ name, about: description })
        .then(updatedUserData => {
            renderUserData(updatedUserData);
            closePopup(editProfileModal);
        })
        .catch(error => {
            console.error('Ошибка при обновлении профиля:', error);
        })
        .finally(() => {
            toggleButtonState(submitButtons.editProfile, false);
        });
}
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Обработчик отправки формы добавления карточки
function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const cardName = cardNameInput.value.trim();
    const cardLink = cardLinkInput.value.trim();
    if (!cardName || !cardLink) return;
    toggleButtonState(submitButtons.addCard, true);
    const newCard = { name: cardName, link: cardLink };
    addCard(newCard)
        .then(addedCard => {
            const cardElement = createCard(addedCard, handleDeleteCard, handleLikeCard, openImagePopup, currentUser);
            placesList.prepend(cardElement);
            addCardFormElement.reset();
            closePopup(addCardModal);
        })
        .catch(error => {
            console.error('Ошибка при добавлении карточки:', error);
        })
        .finally(() => {
            toggleButtonState(submitButtons.addCard, false);
        });
}
addCardFormElement.addEventListener('submit', handleAddCardSubmit);

// Обработчик отправки формы обновления аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const avatarUrl = avatarInput.value.trim();
    if (!avatarUrl) {
        alert('Введите URL для аватара');
        return;
    }
    toggleButtonState(submitButtons.avatar, true);
    updateAvatar(avatarUrl)
        .then(updatedUserData => {
            profileImageElement.src = updatedUserData.avatar;
            closePopup(avatarPopup);
        })
        .catch(error => {
            console.error('Ошибка при обновлении аватара:', error);
            alert('Ошибка при обновлении аватара');
        })
        .finally(() => {
            toggleButtonState(submitButtons.avatar, false);
        });
}
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Добавляем обработчики закрытия попапов
addPopupEventListeners();
addCloseButtonListeners();

// Включаем валидацию
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

document.addEventListener("DOMContentLoaded", () => enableValidation(validationConfig));

// Загружаем данные с сервера
fetchData();






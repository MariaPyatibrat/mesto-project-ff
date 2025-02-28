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
const avatarPopup = document.querySelector('.popup_type_avatar'); // Добавлен попап для аватара

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
const avatarEditButtonElement = document.querySelector('.profile__image'); // Кнопка редактирования аватара

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

function handleDeleteCardClick(cardElement, cardId) {
    openModal(confirmDeletePopup);
    confirmDeletePopup.querySelector('.popup__button').onclick = () => {
        deleteCard(cardId) // Используем cardId для удаления через API
            .then(() => {
                cardElement.remove(); // Удаляем карточку из DOM
                closePopup(confirmDeletePopup); // Закрываем попап
            })
            .catch(error => {
                console.error('Ошибка при удалении карточки:', error);
            });
    };
}

// Функция рендеринга карточек
function renderCards(cards) {
    const fragment = document.createDocumentFragment();
    cards.forEach(card => {
        const cardElement = createCard(card, handleDeleteCard, handleLikeCard, openImagePopup, currentUser);
        fragment.appendChild(cardElement);
    });
    placesList.appendChild(fragment);
}

// Функция отображения данных пользователя
function renderUserData(userData) {
    profileNameElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;

    const avatarImageElement = document.querySelector('.profile__avatar');
    avatarImageElement.src = userData.avatar;
    currentUser = userData;
}

// Функция для обработки кнопки с состоянием загрузки
function toggleButtonState(button, isLoading) {
    if (isLoading) {
        button.textContent = 'Сохранение...';  // Изменение текста на "Сохранение..."
        button.disabled = true;  // Отключаем кнопку, чтобы предотвратить многократные клики
        button.classList.add('button_loading');  // Добавление класса для отображения индикатора загрузки
    } else {
        button.textContent = 'Сохранить';  // Восстанавливаем исходный текст
        button.disabled = false;  // Включаем кнопку обратно
        button.classList.remove('button_loading');  // Убираем класс индикатора загрузки
    }
}

// Запросы к API
Promise.all([fetchUserData(), fetchCards()])
    .then(([userData, cardsData]) => {
        renderUserData(userData);
        renderCards(cardsData);
    })
    .catch(error => {
        console.error('Ошибка загрузки данных:', error);
    });

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
    avatarInput.value = ''; // Очистить поле ввода
    clearValidation(avatarForm, validationConfig); // Очистить валидацию
    openModal(avatarPopup);  // Открываем попап для изменения аватара
});

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value.trim();
    const description = jobInput.value.trim();

    const submitButton = editProfileForm.querySelector('.popup__button');  // Кнопка отправки формы

    toggleButtonState(submitButton, true);  // Устанавливаем состояние загрузки кнопки

    updateUserData({ name, about: description })
        .then(updatedUserData => {
            renderUserData(updatedUserData);
            closePopup(editProfileModal);
        })
        .catch(error => {
            console.error('Ошибка при обновлении профиля:', error);
        })
        .finally(() => {
            toggleButtonState(submitButton, false);  // Возвращаем кнопку в исходное состояние
        });
}
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Обработчик отправки формы добавления карточки
function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const cardName = cardNameInput.value.trim();
    const cardLink = cardLinkInput.value.trim();

    if (!cardName || !cardLink) return;

    const submitButton = addCardFormElement.querySelector('.popup__button');

    toggleButtonState(submitButton, true);

    const newCard = { name: cardName, link: cardLink };
    addCard(newCard)
        .then(addedCard => {
            const cardElement = createCard(addedCard, handleDeleteCardClick, handleLikeCard, openImagePopup, currentUser);
            placesList.prepend(cardElement);
            addCardFormElement.reset();
            closePopup(addCardModal);
        })
        .catch(error => {
            console.error('Ошибка при добавлении карточки:', error);
        })
        .finally(() => {
            toggleButtonState(submitButton, false);
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

    const submitButton = avatarForm.querySelector('.popup__button');  // Кнопка отправки формы

    toggleButtonState(submitButton, true);  // Устанавливаем состояние загрузки кнопки

    updateAvatar(avatarUrl)
        .then(updatedUserData => {
            // Обновляем аватар в профиле
            renderUserData(updatedUserData);

            // Закрываем попап после успешного обновления
            closePopup(avatarPopup);
        })
        .catch(error => {
            console.error('Ошибка при обновлении аватара:', error);
            alert('Ошибка при обновлении аватара');
        })
        .finally(() => {
            toggleButtonState(submitButton, false);  // Возвращаем кнопку в исходное состояние
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






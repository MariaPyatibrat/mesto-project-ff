import './pages/index.css';
import initialCards from './scripts/cards';
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openModal, closePopup, addCloseButtonListeners, addPopupEventListeners } from './components/modal.js';

// Контейнер для карточек
const placesList = document.querySelector('.places__list') ;

// Модальные окна
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');

// Переменные для работы с попапами изображений
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_type_image');

// Функция для открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    openModal(imagePopup);
}

// Функция вывода всех карточек на страницу
function renderCards(cards) {
    cards.forEach(card => {
        const cardElement = createCard(card, handleDeleteCard, handleLikeCard, openImagePopup);
        placesList.appendChild(cardElement);
    });
}

// Выводим карточки из массива на страницу
renderCards(initialCards);

// Открытие попапов
const editProfileButtonElement = document.querySelector('.profile__edit-button');
const addCardButtonElement = document.querySelector('.profile__add-button');

// Открытие попапа для редактирования профиля
editProfileButtonElement.addEventListener('click', () => {
    openModal(editProfileModal);
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileDescriptionElement.textContent;
});

// Открытие попапа для добавления новой карточки
addCardButtonElement.addEventListener('click', () => {
    openModal(addCardModal);
});

// Находим форму и поля формы для добавления новой карточки
const addCardFormElement = addCardModal.querySelector('.popup__form');
const cardNameInput = addCardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardFormElement.querySelector('.popup__input_type_url');

// Обработчик «отправки» формы добавления карточки
function handleAddCardSubmit(evt) {
    evt.preventDefault();

    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;

    // Создаем новую карточку и добавляем её в список
    const newCard = {
        name: cardName,
        link: cardLink
    };

    const cardElement = createCard(newCard, handleDeleteCard, handleLikeCard, openImagePopup);
    placesList.prepend(cardElement);

    // Закрытие попапа и сброс формы
    closePopup(addCardModal);
    addCardFormElement.reset();
}

// Прикрепляем обработчик к форме добавления карточки
addCardFormElement.addEventListener('submit', handleAddCardSubmit);

// Находим элементы профиля для редактирования
const profileNameElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

// Находим форму и поля формы для редактирования профиля
const editProfileForm = editProfileModal.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const description = jobInput.value;

    profileNameElement.textContent = name;
    profileDescriptionElement.textContent = description;

    closePopup(editProfileModal);
    editProfileForm.reset();
}

// Прикрепляем обработчик к форме редактирования профиля
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Добавляем обработчики для попапов
addPopupEventListeners();
addCloseButtonListeners();




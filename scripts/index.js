// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// Контейнер для карточек
const placesList = document.querySelector('.places__list');

// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(data, onDelete) {

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    deleteButton.addEventListener('click', () => onDelete(cardElement));

    return cardElement;
}

// Функция удаления карточки
function handleDeleteCard(cardElement) {
    cardElement.remove();
}

// Функция вывода всех карточек на страницу
function renderCards(cards) {
    cards.forEach(card => {
        const cardElement = createCard(card, handleDeleteCard);
        placesList.appendChild(cardElement);
    });
}

// Выводим карточки из массива на страницу
renderCards(initialCards);

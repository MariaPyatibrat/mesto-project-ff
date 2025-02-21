// Создание карточки
export function createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    likeButton.addEventListener('click', () => handleLikeCard(likeButton));
    deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
    cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

    return cardElement;
}

// Функция для обработки лайка
export function handleLikeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

// Функция для обработки удаления карточки
export function handleDeleteCard(cardElement) {
    cardElement.remove();
}






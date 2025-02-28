import { deleteCard } from './api.js';

export function createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick, currentUser) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    if (cardData.likes.some(like => like._id === currentUser._id)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        handleLikeCard(likeButton, cardData._id);
    });

    if (cardData.owner._id === currentUser._id) {
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', () => handleDeleteCard(cardElement, cardData._id));
    } else {
        deleteButton.style.display = 'none';
    }

    cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

    return cardElement;
}


export function handleLikeCard(likeButton, cardId) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    const url = `https://nomoreparties.co/v1/wff-cohort-33/cards/likes/${cardId}`;

    const method = isLiked ? 'DELETE' : 'PUT';

    fetch(url, {
        method: method,
        headers: {
            authorization: '6231fe1d-051f-4195-aa77-acbceeb27b47',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(updatedCard => {
            const likeCountElement = likeButton.closest('.card').querySelector('.card__like-count');
            likeCountElement.textContent = updatedCard.likes.length;
            likeButton.classList.toggle('card__like-button_is-active', !isLiked);
        })
        .catch(error => {
            console.error('Ошибка при постановке/удалении лайка:', error);
        });
}


// Функция для обработки удаления карточки
export function handleDeleteCard(cardElement, cardId) {
    if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
        deleteCard(cardId)
            .then(() => {
                cardElement.remove();
            })
            .catch(error => {
                console.error('Ошибка при удалении карточки:', error);
            });
    }
}







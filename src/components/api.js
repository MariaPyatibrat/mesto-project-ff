// Базовый конфиг для запросов
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers: {
        authorization: '6231fe1d-051f-4195-aa77-acbceeb27b47',
        'Content-Type': 'application/json'
    }
};

// Функция проверки ответа сервера
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
};

// Функция для получения данных о пользователе
export const fetchUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(checkResponse);
};

// Функция для получения списка карточек
export const fetchCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(checkResponse);
};

// Функция для обновления данных пользователя
export const updateUserData = (userData) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(userData)
    }).then(checkResponse);
};

// Функция для обновления аватара пользователя
export const updateAvatar = (avatarUrl) => {

    const validUrlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/;
    if (!validUrlPattern.test(avatarUrl)) {
        return Promise.reject("Неверный формат URL аватара.");
    }

    console.log('Обновляем аватар с URL:', avatarUrl);

    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarUrl })
    })
        .then(checkResponse)
        .catch(error => {
            console.error('Ошибка при обновлении аватара:', error);
            return Promise.reject(error);
        });
};

// Функция для добавления новой карточки с индикатором загрузки
export const addCard = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(cardData)
    })
        .then(checkResponse)
        .catch(error => {
            console.error('Ошибка при добавлении карточки:', error);
            return Promise.reject(error);
        });
};



// Функция для удаления карточки через API
export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse)
        .catch((error) => {
            console.error('Ошибка при удалении карточки:', error);
            return Promise.reject(error);
        });
};




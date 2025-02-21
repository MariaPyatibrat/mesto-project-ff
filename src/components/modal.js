// Открытие попапа
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
}

// Закрытие попапа
export function closePopup(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

// Закрытие попапа по клавише Escape
function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// Закрытие попапов по клику на оверлей
function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

// Закрытие попапа при нажатии на кнопку-крестик
function handleCloseButtonClick(evt) {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
}

// Добавление обработчиков для кнопок закрытия
export function addCloseButtonListeners() {
    const closeButtons = document.querySelectorAll('.popup__close');
    closeButtons.forEach(button => {
        button.addEventListener('click', handleCloseButtonClick);
    });
}

// Добавление обработчиков для попапов
export function addPopupEventListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.addEventListener('mousedown', handleOverlayClick);
    });
}






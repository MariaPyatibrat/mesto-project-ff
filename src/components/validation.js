export function validateField(input, inputRegex, errorMessage, config) {
    const errorElement = document.querySelector(`#${input.name}-error`);

    // Проверка на незаполненность
    if (!input.value.trim()) {
        errorElement.textContent = "Вы пропустили это поле.";
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Проверка на минимальную длину
    if (input.value.trim().length < 2) {
        errorElement.textContent = `Минимальное количество символов: 2. Длина текста сейчас: ${input.value.trim().length} символов`;
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Проверка на максимальную длину
    const maxLength = input.name === "place-name" ? 30 : 200;  // Длина для поля "place-name" 30 символов
    if (input.value.trim().length > maxLength) {
        errorElement.textContent = `Максимальная длина: ${maxLength} символов. Длина текста сейчас: ${input.value.trim().length} символов`;
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Проверка на соответствие регулярному выражению
    if (inputRegex && !inputRegex.test(input.value)) {
        errorElement.textContent = errorMessage || "Некорректный ввод.";
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Если все проверки пройдены
    errorElement.textContent = "";
    input.classList.remove(config.inputErrorClass);
    return true;
}

export function validateUrl(input, config) {
    const errorElement = document.querySelector(`#${input.name}-error`);

    // Проверка на незаполненность
    if (!input.value.trim()) {
        errorElement.textContent = "Вы пропустили это поле.";
        input.classList.add(config.inputErrorClass);
        return false;
    }

    const urlPattern = /^(https?:\/\/[^\s]+)$/;
    if (!urlPattern.test(input.value)) {
        errorElement.textContent = "Введите адрес сайта";
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Если все проверки пройдены
    errorElement.textContent = "";
    input.classList.remove(config.inputErrorClass);
    return true;
}

export function validateForm(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    let isValid = true;

    inputs.forEach((input) => {
        let regex;
        let errorMessage;

        // Валидация для поля "Название"
        if (input.name === "place-name") {
            regex = /^[A-Za-zА-Яа-яЁё\- ]{2,30}$/;
            errorMessage = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
        }

        // Валидация для поля "Ссылка на картинку"
        if (input.name === "link") {
            if (!validateUrl(input, config)) {
                isValid = false;
            }
            return;
        }

        // Проверка поля "Название"
        if (!validateField(input, regex, errorMessage, config)) {
            isValid = false;
        }
    });

    // Активация / деактивация кнопки "Сохранить"
    submitButton.disabled = !isValid;
    submitButton.classList.toggle(config.inactiveButtonClass, !isValid);
}

export function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        // Инициализация формы с неактивной кнопкой по умолчанию
        const submitButton = form.querySelector(config.submitButtonSelector);
        submitButton.disabled = true;
        submitButton.classList.add(config.inactiveButtonClass);

        // Проверка полей при вводе данных
        form.addEventListener("input", () => validateForm(form, config));
    });
}

export function clearValidation(form, config) {
    const inputs = form.querySelectorAll(config.inputSelector);
    inputs.forEach((input) => {
        const errorElement = document.querySelector(`#${input.name}-error`);
        if (errorElement) {
            errorElement.textContent = "";
        }
        input.classList.remove(config.inputErrorClass);
    });

    const submitButton = form.querySelector(config.submitButtonSelector);
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
}









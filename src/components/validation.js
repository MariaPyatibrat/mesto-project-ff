export function validateField(input, inputRegex, errorMessage, config) {
    const errorElement = document.querySelector(`#${input.name}-error`);

    // Проверка на незаполненность
    if (!input.value.trim()) {
        errorElement.textContent = "Вы пропустили это поле.";
        errorElement.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Проверка на минимальную длину
    if (input.value.trim().length < 2) {
        errorElement.textContent = `Минимальное количество символов: 2. Длина текста сейчас: ${input.value.trim().length} символов`;
        errorElement.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Проверка на максимальную длину
    const maxLength = input.name === "place-name" ? 30 : 200;
    if (input.value.trim().length > maxLength) {
        errorElement.textContent = `Максимальная длина: ${maxLength} символов. Длина текста сейчас: ${input.value.trim().length} символов`;
        errorElement.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Проверка на соответствие регулярному выражению
    if (inputRegex && !inputRegex.test(input.value)) {
        errorElement.textContent = errorMessage || "Некорректный ввод.";
        errorElement.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Если все проверки пройдены
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
    return true;
}

export function validateUrl(input, config) {
    const errorElement = document.querySelector(`#${input.name}-error`);

    // Проверка на незаполненность
    if (!input.value.trim()) {
        errorElement.textContent = "Вы пропустили это поле.";
        errorElement.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
        return false;
    }

    const urlPattern = /^(https?:\/\/[^\s]+)$/;
    if (!urlPattern.test(input.value)) {
        errorElement.textContent = "Введите адрес сайта";
        errorElement.classList.add(config.errorClass);
        input.classList.add(config.inputErrorClass);
        return false;
    }

    // Если все проверки пройдены
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
    return true;
}

export function validateForm(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    let isValid = true;

    inputs.forEach((input) => {
        let regex = null;
        let errorMessage = null;

        if (input.name === "place-name" || input.name === "name") {
            regex = /^[A-Za-zА-Яа-яЁё\- ]+$/;
            errorMessage = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
        }

        if (input.name === "link") {
            if (!validateUrl(input, config)) {
                isValid = false;
            }
            return;
        }

        if (!validateField(input, regex, errorMessage, config)) {
            isValid = false;
        }
    });

    submitButton.disabled = !isValid;
    submitButton.classList.toggle(config.inactiveButtonClass, !isValid);
}

export function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach((form) => {
        form.addEventListener("input", () => validateForm(form, config));
        validateForm(form, config); // Проверка формы при загрузке
    });
}

export function clearValidation(form, config) {
    const inputs = form.querySelectorAll(config.inputSelector);
    inputs.forEach((input) => {
        const errorElement = document.querySelector(`#${input.name}-error`);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove(config.errorClass);
        }
        input.classList.remove(config.inputErrorClass);
    });

    const submitButton = form.querySelector(config.submitButtonSelector);
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
}










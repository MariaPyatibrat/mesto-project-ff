export function validateField(input, errorMessage, config) {
    const errorElement = document.querySelector(`#${input.name}-error`);
    const value = input.value.trim();

    if (!input.validity.valid) {
        errorElement.textContent = input.validity.patternMismatch ? errorMessage : input.validationMessage;
        showError(input, errorElement, config);
        return false;
    }

    clearError(input, errorElement, config);
    return true;
}

// Функция для показа ошибки
function showError(input, errorElement, config) {
    errorElement.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
}

// Функция для очистки ошибки
function clearError(input, errorElement, config) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
}

// Функция для изменения состояния кнопки отправки
export function toggleSubmitButtonState(button, inputs, config) {
    const isValid = inputs.every((input) => input.validity.valid);
    button.disabled = !isValid;
    button.classList.toggle(config.inactiveButtonClass, !isValid);
}

// Функция для инициализации валидации
export function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(config.inputSelector));
        const submitButton = form.querySelector(config.submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                const errorMessage = input.getAttribute('data-error-message');
                validateField(input, errorMessage, config);
                toggleSubmitButtonState(submitButton, inputs, config);
            });
        });

        toggleSubmitButtonState(submitButton, inputs, config);
    });
}

// Функция для очистки ошибок валидации и сброса состояния кнопки
export function clearValidation(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputs.forEach((input) => {
        const errorElement = document.querySelector(`#${input.name}-error`);
        if (errorElement) {
            clearError(input, errorElement, config);
        }
    });

    toggleSubmitButtonState(submitButton, inputs, config);
}




















function submitForm(evt) {
    evt.preventDefault();
}

function showInputError(
    input,
    errorContainer,
    { inputErrorClass, errorVisibleClass }
) {
    input.classList.add(inputErrorClass);
    errorContainer.classList.add(errorVisibleClass);
    errorContainer.textContent = input.validationMessage;
}

function hidenInvalidInput(
    input,
    errorContainer,
    { inputErrorClass, errorVisibleClass }
) {
    input.classList.remove(inputErrorClass);
    errorContainer.classList.remove(errorVisibleClass);
    errorContainer.textContent = "";
}

function toggleButton(form, { buttonSaveSelector, inactiveButtonClass }) {
    const button = form.querySelector(buttonSaveSelector);
    const isFormValid = form.checkValidity();
    if (isFormValid) {
        button.classList.remove(inactiveButtonClass);
        button.removeAttribute("disabled");
    } else {
        button.classList.add(inactiveButtonClass);
        button.setAttribute("disabled", "");
    }
}

function validateInput(form, input, classes) {
    const errorContainer = form.querySelector(`#error-${input.id}`);
    if (input.validity.valid) {
        hidenInvalidInput(input, errorContainer, classes);
    } else {
        showInputError(input, errorContainer, classes);
    }
    toggleButton(form, classes);
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach((form) => {
        form.addEventListener("submit", submitForm);

        const inputs = form.querySelectorAll(inputSelector);

        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                validateInput(form, input, rest);
            });
        });
        toggleButton(form, rest);
    });
}

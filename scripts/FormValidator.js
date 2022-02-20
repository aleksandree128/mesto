export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
    }

    _submitForm(evt) {
        evt.preventDefault();
    }

    _showInputError(input) {
        const { inputErrorClass } = this._settings;
        input.classList.add(inputErrorClass);
        this._errorContainer.classList.add();
        this._errorContainer.textContent = input.validationMessage;
    }

    _hidenInvalidInput(input) {
        const { inputErrorClass } = this._settings;
        input.classList.remove(inputErrorClass);
        this._errorContainer.classList.remove();
        this._errorContainer.textContent = "";
    }

    _toggleButton() {
        const { buttonSaveSelector, inactiveButtonClass } = this._settings;
        const button = this._form.querySelector(buttonSaveSelector);
        const isFormValid = this._form.checkValidity();
        if (isFormValid) {
            button.classList.remove(inactiveButtonClass);
            button.removeAttribute("disabled");
        } else {
            button.classList.add(inactiveButtonClass);
            button.setAttribute("disabled", "");
        }
    }

    _validateInput(input) {
        this._errorContainer = this._form.querySelector(`#error-${input.id}`);
        if (input.validity.valid) {
            this._hidenInvalidInput(input, this._errorContainer);
        } else {
            this._showInputError(input, this._errorContainer);
        }
        this._toggleButton();
    }

    enableValidation() {
        this._form.addEventListener("submit", this._submitForm);
        const inputs = this._form.querySelectorAll(this._settings.inputSelector);
        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._validateInput(input);
            });
        });
        this._toggleButton();
    }
}

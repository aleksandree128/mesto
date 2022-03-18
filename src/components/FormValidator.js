export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._button = this._form.querySelector(this._settings.buttonSaveSelector);
        this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
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
        const {inactiveButtonClass } = this._settings;
        const isFormValid = this._form.checkValidity();
        if (isFormValid) {
            this._button.classList.remove(inactiveButtonClass);
            this._button.removeAttribute("disabled");
        } else {
            this.disableButton()
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

    disableButton = () => {
        const { inactiveButtonClass } = this._settings
        this._button.classList.add(inactiveButtonClass);
        this._button.disabled = true;
    };

    enableValidation() {
        this._form.addEventListener("submit", this._submitForm);
        this._inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._validateInput(input);
            });
        });
        this._toggleButton();
    }
}

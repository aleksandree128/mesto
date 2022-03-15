import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._form=this._popup.querySelector('.popup__name')

        this._handleSubmit=handleSubmit;
    }

    _getInputValue(){
        const inputs=[...this._form.querySelectorAll('.popup__item')]
        const values={}
        inputs.forEach((input)=>{
            values[input.name]=input.value
        })
        return values
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',()=>{
            this._handleSubmit(this._getInputValue())
        })
    }

    close() {
        super.close();
        this._form.reset()
    }

}
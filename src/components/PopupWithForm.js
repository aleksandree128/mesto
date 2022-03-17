import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._form=this._popup.querySelector('.popup__name')
        this._inputList=[...this._form.querySelectorAll('.popup__item')]
        this._handleSubmit=handleSubmit;
    }

    _getInputValue(){
        const values={}
        this._inputList.forEach((input)=>{
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
import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit=handleSubmit;
        this._form=this._popup.querySelector('.popup__name')
        this._buttonSumbit=this._form.querySelector('.popup__save')
        this._inputList=[...this._form.querySelectorAll('.popup__item')]
    }

    _getInputValue(){
        const values={}
        this._inputList.forEach((input)=>{
            values[input.name]=input.value
        })
        return values
    }
    changeSubmitHandler(newSubmitHendler) {
        this._handleSubmit = newSubmitHendler;
    }
    isLoading(isLoading){
        if(isLoading){
            this._buttonSumbit.textContent='Сохранение...'
        }else {
            this._buttonSumbit.textContent=this._buttonSumbit
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',(e)=>{
            e.preventDefault()
            this._handleSubmit(this._getInputValue())
        })
    }

    close() {
        super.close();
        this._form.reset()
    }

}
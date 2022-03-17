import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(text, link) {
        this._title=this._popup.querySelector('.popup__place-title')
        this._image=this._popup.querySelector('.popup__image-link')
        this._image.src=link
        this._title.textContent=text
        this._image.alt=text

        super.open()
    }
}

import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(text, link) {
        const title=this._popup.querySelector('.popup__place-title')
        const image=this._popup.querySelector('.popup__image-link')
        image.src=link
        title.textContent=text

        super.open()
    }
}

export class Section {
    constructor({items, renderer}, containSelector) {
        this._container=document.querySelector(containSelector)
        this._initialCards=items
        this._renderer=renderer

    }

    addItem(element){
        this._container.prepend(element)
    }
    renderItems() {
        this._initialCards.forEach(card => this._renderer(card))

    }


}
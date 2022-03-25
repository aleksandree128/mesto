export class Section {
    constructor({items, renderer}, containSelector) {
        this._container=document.querySelector(containSelector)
        this._renderer=renderer

    }

    addItem(element){
        this._container.prepend(element)
    }
    renderItems(card){
        card.reverse().forEach((item)=>{
            this._renderer(item)
        })
       }


}
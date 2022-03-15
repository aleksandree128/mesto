export class Section {
    constructor({items, renderer}, containSelector) {
        this._container=document.querySelector(containSelector)
        this._items=items
        this._renderer=renderer

    }
    renderItems() {
        this._items.forEach(data=>{
            this._renderer(data)
        })
    }
    addItem(element){
        this._container.append(element)
    }

}
import {keyClose} from "./constance.js";

export function openPopup(modal) {
    modal.classList.add("popup_opened");
    document.addEventListener("keydown", keyClose);
}
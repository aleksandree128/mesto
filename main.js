(()=>{"use strict";class e{constructor(e,t){this._form=t,this._settings=e,this._button=this._form.querySelector(this._settings.buttonSaveSelector),this._inputs=Array.from(this._form.querySelectorAll(this._settings.inputSelector))}_submitForm(e){e.preventDefault()}_showInputError(e){const{inputErrorClass:t}=this._settings;e.classList.add(t),this._errorContainer.classList.add(),this._errorContainer.textContent=e.validationMessage}_hidenInvalidInput(e){const{inputErrorClass:t}=this._settings;e.classList.remove(t),this._errorContainer.classList.remove(),this._errorContainer.textContent=""}_toggleButton(){const{inactiveButtonClass:e}=this._settings;this._form.checkValidity()?(this._button.classList.remove(e),this._button.removeAttribute("disabled")):this.disableButton()}_validateInput(e){this._errorContainer=this._form.querySelector(`#error-${e.id}`),e.validity.valid?this._hidenInvalidInput(e,this._errorContainer):this._showInputError(e,this._errorContainer),this._toggleButton()}disableButton=()=>{const{inactiveButtonClass:e}=this._settings;this._button.classList.add(e),this._button.disabled=!0};enableValidation(){this._form.addEventListener("submit",this._submitForm),this._inputs.forEach((e=>{e.addEventListener("input",(()=>{this._validateInput(e)}))})),this._toggleButton()}}const t={formSelector:".popup__name",inputSelector:".popup__item",buttonSaveSelector:".popup__save",errorVisibleClass:"popup__input-error_visible",errorSelector:".popup__input-error",inputErrorClass:"popup__item_type_error",inactiveButtonClass:"popup__save_disabled"},s=document.querySelector(".popup_type_edit"),i=document.querySelector(".popup_type_add-card"),r=document.querySelector(".popup_type_update-avatar"),o=s.querySelector(".popup__name"),n=i.querySelector(".popup__name"),a=r.querySelector(".popup__name"),l=new e(t,o),c=new e(t,n),_=new e(t,a),d=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),u=document.querySelector(".profile__avatar-button"),p=document.querySelector(".popup__item_type_name"),m=document.querySelector(".popup__item_type_about-name");class v{constructor(e,t,s,i,r){this._cardData=e,this._template=document.querySelector(t).content.querySelector(".elements__list"),this._handlImageClick=s,this._handleDeleteClick=i,this._cardId=e.id,this._userId=e.userId,this._ownerId=e.ownerId,this._handleLikeClick=r,this._likes=e.likes}getId(){return this._cardId}deleteCard=()=>{this._cardElement.remove(),this._cardElement=null};_setEventListener(){this._deleteButton.addEventListener("click",this._handleDeleteClick),this._cardElement.addEventListener("click",this._handleLikeClick),this._cardImage.addEventListener("click",this._handlImageClick)}isLiked(){return this._likes.find((e=>e._id===this._userId))}setLikes(e){this._likes=e,this._cardElement.querySelector(".elements__like-count").textContent=this._likes.length,this.isLiked()?this._fillLike():this._emptylLike()}_fillLike(){this._cardLike.classList.add("elements__like_black")}_emptylLike(){this._cardLike.classList.remove("elements__like_black")}createCard(){return this._cardElement=this._template.cloneNode(!0),this._cardImage=this._cardElement.querySelector(".elements__photo"),this._cardText=this._cardElement.querySelector(".elements__text"),this._deleteButton=this._cardElement.querySelector(".elements__delete-button"),this._ownerId!==this._userId&&(this._deleteButton.style.display="none"),this._cardLike=this._cardElement.querySelector(".elements__like"),this._cardText.textContent=this._cardData.name,this._cardImage.src=this._cardData.link,this._cardImage.alt=`${this._cardData.name}`,this.setLikes(this._likes),this._setEventListener(),this._cardElement}}class k{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){const e=this._popup.querySelector(".popup__close");this._popup.addEventListener("click",(t=>{(t.target.classList.contains("popup_opened")||t.target===e)&&this.close(this._popup)}))}}class b extends k{constructor(e,t){super(e),this._handleSubmit=t,this._form=this._popup.querySelector(".popup__name"),this._buttonSumbit=this._form.querySelector(".popup__save"),this._inputList=[...this._form.querySelectorAll(".popup__item")]}_getInputValue(){const e={};return this._inputList.forEach((t=>{e[t.name]=t.value})),e}changeSubmitHandler(e){this._handleSubmit=e}isLoading(e){this._buttonSumbit.textContent=e?"Сохранение...":this._buttonSumbit}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit(this._getInputValue())}))}close(){super.close(),this._form.reset()}}const g=new class{constructor({baseUrl:e,headers:t}){this._headers=t,this._baseUrl=e}getProfile(){return fetch("https://nomoreparties.co/v1/cohort-37/users/me",{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(e.status))).catch(console.log)}getInitialCards(){return fetch("https://mesto.nomoreparties.co/v1/cohort-37/cards",{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(e.status))).catch(console.log)}editProfile(e,t){return fetch("https://mesto.nomoreparties.co/v1/cohort-37/users/me",{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((e=>e.ok?e.json():Promise.reject(e.status))).catch(console.log)}addCards(e,t){return fetch("https://mesto.nomoreparties.co/v1/cohort-37/cards",{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((e=>e.ok?e.json():Promise.reject(e.status))).catch(console.log)}deleteCard(e){return fetch(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(e.status))).catch(console.log)}deleteLike(e){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(e.status))).catch(console.log)}addLike(e){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(e.status))).catch(console.log)}updateAvatar(e){return fetch("https://mesto.nomoreparties.co/v1/cohort-37/users/me/avatar",{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>e.ok?e.json():Promise.reject(e.status))).catch(console.log)}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-37",headers:{authorization:"09b0089e-e02a-4b71-a1dc-982ec8809360","Content-Type":"application/json"}});let L;function y(e){const t=new v(e,".card",(()=>{S.open(e.name,e.link)}),(()=>{w.open(),w.changeSubmitHandler((()=>{g.deleteCard(t.getId()).then((e=>{t.deleteCard(),w.close()})).catch((e=>{console.log(`Ошибка: ${e}`)}))}))}),(()=>{t.isLiked()?g.deleteLike(t.getId()).then((e=>{t.setLikes(e.likes)})).catch((e=>{console.log(e)})):g.addLike(t.getId()).then((e=>{t.setLikes(e.likes)})).catch((e=>{console.log(e)}))}));return t.createCard()}function f(e){const t=y(e);E.addItem(t)}_.enableValidation(),l.enableValidation(),c.enableValidation(),g.getProfile().then((e=>{j.setUserInfo(e.name,e.about,e.avatar),L=e._id})),g.getInitialCards().then((e=>{e.forEach((e=>{const t=y({name:e.name,link:e.link,id:e._id,likes:e.likes,userId:L,ownerId:e.owner._id});E.addItem(t)}))})),d.addEventListener("click",(()=>function(){const e=j.getUserInfo();p.value=e.title.trim(),m.value=e.job.trim(),I.open()}())),h.addEventListener("click",(()=>{c.disableButton(),C.open()})),u.addEventListener("click",(()=>{_.disableButton(),q.open()}));const E=new class{constructor({items:e,renderer:t},s){this._container=document.querySelector(s),this._initialCards=e,this._renderer=t}addItem(e){this._container.prepend(e)}renderItems(){this._initialCards.forEach((e=>this._renderer(e)))}}({items:[],renderer:f},".elements__lists"),S=new class extends k{constructor(e){super(e),this._title=this._popup.querySelector(".popup__place-title"),this._image=this._popup.querySelector(".popup__image-link")}open(e,t){this._image.src=t,this._title.textContent=e,this._image.alt=e,super.open()}}(".popup_type_image"),C=new b(".popup_type_add-card",(e=>{C.isLoading(!0),g.addCards(e.name,e.link).then((e=>{f(e),C.close()})).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>{C.isLoading(!1)}))})),I=new b(".popup_type_edit",(e=>{const{popup__input_name:t,popup__input_about_name:s}=e;I.isLoading(!0),g.editProfile(t,s).then((e=>{j.setUserInfo(e.popup__input_name,e.popup__input_about_name)})).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>{I.isLoading(!1)})),I.close()})),q=new b(".popup_type_update-avatar",(e=>{q.isLoading(!0),g.updateAvatar(e.link).then((e=>{j.setUserInfo(e.name,e.about,e.avatar),q.close()})).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>{q.isLoading(!1)}))})),j=new class{constructor({profileNameSelector:e,profileJobSelector:t,userAvatar:s}){this._nameElement=document.querySelector(e),this._jobElement=document.querySelector(t),this._userAvatar=document.querySelector(s)}getUserInfo(){return{title:this._nameElement.textContent,job:this._jobElement.textContent,avatar:this._userAvatar.textContent}}setUserInfo(e,t,s){this._nameElement.textContent=e,this._jobElement.textContent=t,s&&(this._userAvatar.src=s)}}({profileNameSelector:".profile__title",profileJobSelector:".profile__text",userAvatar:".profile__avatar"}),w=new b(".popup_type_delete-card");E.renderItems(),S.setEventListeners(),C.setEventListeners(),I.setEventListeners(),w.setEventListeners(),q.setEventListeners()})();
(()=>{"use strict";const e={formSelector:".popup__name",inputSelector:".popup__item",buttonSaveSelector:".popup__save",errorVisibleClass:"popup__input-error_visible",errorSelector:".popup__input-error",inputErrorClass:"popup__item_type_error",inactiveButtonClass:"popup__save_disabled"},t=document.querySelector(".popup_type_edit"),s=document.querySelector(".popup_type_add-card"),i=document.querySelector(".popup_type_update-avatar"),r=t.querySelector(".popup__name"),n=s.querySelector(".popup__name"),o=i.querySelector(".popup__name"),a=document.querySelector(".profile__edit-button"),l=document.querySelector(".profile__add-button"),_=document.querySelector(".profile__avatar-button"),c=document.querySelector(".popup__item_type_name"),h=document.querySelector(".popup__item_type_about-name");class d{constructor(e,t,s,i,r){this._cardData=e,this._template=document.querySelector(t).content.querySelector(".elements__list"),this._handlImageClick=s,this._handleDeleteClick=i,this._cardId=e._id,this._userId=e.userId,this._ownerId=e.ownerId,this._handleLikeClick=r,this._likes=e.likes}getId(){return this._cardId}deleteCard=()=>{this._cardElement.remove(),this._cardElement=null};_setEventListener(){this._deleteButton.addEventListener("click",this._handleDeleteClick),this._cardLike.addEventListener("click",this._handleLikeClick),this._cardImage.addEventListener("click",this._handlImageClick)}isLiked(){return this._likes.find((e=>e._id===this._userId))}setLikes(e){this._likes=e,this._likeCountElement.textContent=this._likes.length,this.isLiked()?this._fillLike():this._emptylLike()}_fillLike(){this._cardLike.classList.add("elements__like_black")}_emptylLike(){this._cardLike.classList.remove("elements__like_black")}createCard(){return this._cardElement=this._template.cloneNode(!0),this._cardImage=this._cardElement.querySelector(".elements__photo"),this._cardText=this._cardElement.querySelector(".elements__text"),this._deleteButton=this._cardElement.querySelector(".elements__delete-button"),this._likeCountElement=this._cardElement.querySelector(".elements__like-count"),this._ownerId!==this._userId&&(this._deleteButton.style.display="none"),this._cardLike=this._cardElement.querySelector(".elements__like"),this._cardText.textContent=this._cardData.name,this._cardImage.src=this._cardData.link,this._cardImage.alt=`${this._cardData.name}`,this.setLikes(this._likes),this._setEventListener(),this._cardElement}}class u{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){const e=this._popup.querySelector(".popup__close");this._popup.addEventListener("mousedown",(t=>{(t.target.classList.contains("popup_opened")||t.target===e)&&this.close(this._popup)}))}}class p extends u{constructor(e,t){super(e),this._handleSubmit=t,this._form=this._popup.querySelector(".popup__name"),this._buttonSumbit=this._form.querySelector(".popup__save"),this._inputList=[...this._form.querySelectorAll(".popup__item")]}_getInputValue(){const e={};return this._inputList.forEach((t=>{e[t.name]=t.value})),e}changeSubmitHandler(e){this._handleSubmit=e}isLoading(e){this._buttonSumbit.textContent=e?"Сохранение...":"Сохранить"}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit(this._getInputValue())}))}close(){super.close(),this._form.reset()}}const m=new class{constructor({baseUrl:e,headers:t}){this._headers=t,this._baseUrl=e}_checkResponse(e){return e.ok?e.json():Promise.reject(e.status)}getProfile(){return fetch(`${this._baseUrl}/users/me`,{headers:this._headers}).then((e=>this._checkResponse(e)))}getInitialCards(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then((e=>this._checkResponse(e)))}editProfile(e,t){return fetch(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((e=>this._checkResponse(e)))}addCards(e,t){return fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((e=>this._checkResponse(e)))}deleteCard(e){return fetch(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>this._checkResponse(e)))}deleteLike(e){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then((e=>this._checkResponse(e)))}addLike(e){return fetch(`${this._baseUrl}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then((e=>this._checkResponse(e)))}updateAvatar(e){return fetch(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((e=>this._checkResponse(e)))}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-37",headers:{authorization:"09b0089e-e02a-4b71-a1dc-982ec8809360","Content-Type":"application/json"}});class k{constructor(e,t){this._form=t,this._settings=e,this._button=this._form.querySelector(this._settings.buttonSaveSelector),this._inputs=Array.from(this._form.querySelectorAll(this._settings.inputSelector))}_submitForm(e){e.preventDefault()}_showInputError(e){const{inputErrorClass:t}=this._settings;e.classList.add(t),this._errorContainer.classList.add(),this._errorContainer.textContent=e.validationMessage}_hidenInvalidInput(e){const{inputErrorClass:t}=this._settings;e.classList.remove(t),this._errorContainer.classList.remove(),this._errorContainer.textContent=""}_toggleButton(){const{inactiveButtonClass:e}=this._settings;this._form.checkValidity()?(this._button.classList.remove(e),this._button.removeAttribute("disabled")):this.disableButton()}_validateInput(e){this._errorContainer=this._form.querySelector(`#error-${e.id}`),e.validity.valid?this._hidenInvalidInput(e,this._errorContainer):this._showInputError(e,this._errorContainer),this._toggleButton()}disableButton=()=>{const{inactiveButtonClass:e}=this._settings;this._button.classList.add(e),this._button.disabled=!0};enableValidation(){this._form.addEventListener("submit",this._submitForm),this._inputs.forEach((e=>{e.addEventListener("input",(()=>{this._validateInput(e)}))})),this._toggleButton()}}const b=new k(e,r),v=new k(e,n),L=new k(e,o);let y;function g(e){const t=function(e){const t=new d({name:e.name,link:e.link,likes:e.likes,_id:e._id,userId:y,ownerId:e.owner._id},".card",(()=>{f.open(e.name,e.link)}),(()=>{w.open(),w.changeSubmitHandler((()=>{m.deleteCard(t.getId()).then((()=>{t.deleteCard(),w.close()})).catch((e=>{console.log(`Ошибка: ${e}`)}))}))}),(()=>{t.isLiked()?m.deleteLike(t.getId()).then((e=>{t.setLikes(e.likes)})).catch((e=>{console.log(e)})):m.addLike(t.getId()).then((e=>{t.setLikes(e.likes)})).catch((e=>{console.log(e)}))}));return t.createCard()}(e);E.addItem(t)}L.enableValidation(),b.enableValidation(),v.enableValidation(),Promise.all([m.getProfile(),m.getInitialCards()]).then((([e,t])=>{q.setUserInfo(e.name,e.about,e.avatar),y=e._id,E.renderItems(t)})).catch((e=>{console.log(`Ошибка: ${e}`)})),a.addEventListener("click",(()=>function(){const e=q.getUserInfo();c.value=e.title.trim(),h.value=e.job.trim(),C.open()}())),l.addEventListener("click",(()=>{v.disableButton(),S.open()})),_.addEventListener("click",(()=>{L.disableButton(),I.open()}));const E=new class{constructor({items:e,renderer:t},s){this._container=document.querySelector(s),this._renderer=t}addItem(e){this._container.prepend(e)}renderItems(e){e.reverse().forEach((e=>{this._renderer(e)}))}}({items:[],renderer:g},".elements__lists"),f=new class extends u{constructor(e){super(e),this._title=this._popup.querySelector(".popup__place-title"),this._image=this._popup.querySelector(".popup__image-link")}open(e,t){this._image.src=t,this._title.textContent=e,this._image.alt=e,super.open()}}(".popup_type_image"),S=new p(".popup_type_add-card",(e=>{S.isLoading(!0),m.addCards(e.name,e.link).then((e=>{g(e),S.close()})).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>{S.isLoading(!1)}))})),C=new p(".popup_type_edit",(e=>{const{popup__input_name:t,popup__input_about_name:s}=e;C.isLoading(!0),m.editProfile(t,s).then((e=>{q.setUserInfo(t,s),C.close()})).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>{C.isLoading(!1)}))})),I=new p(".popup_type_update-avatar",(e=>{I.isLoading(!0),m.updateAvatar(e.link).then((e=>{q.setUserInfo(e.name,e.about,e.avatar),I.close()})).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>{I.isLoading(!1)}))})),q=new class{constructor({profileNameSelector:e,profileJobSelector:t,userAvatar:s}){this._nameElement=document.querySelector(e),this._jobElement=document.querySelector(t),this._userAvatar=document.querySelector(s)}getUserInfo(){return{title:this._nameElement.textContent,job:this._jobElement.textContent,avatar:this._userAvatar.textContent}}setUserInfo(e,t,s){this._nameElement.textContent=e,this._jobElement.textContent=t,s&&(this._userAvatar.src=s)}}({profileNameSelector:".profile__title",profileJobSelector:".profile__text",userAvatar:".profile__avatar"}),w=new p(".popup_type_delete-card");f.setEventListeners(),S.setEventListeners(),C.setEventListeners(),w.setEventListeners(),I.setEventListeners()})();
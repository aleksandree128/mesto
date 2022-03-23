export class UserInfo {
    constructor({profileNameSelector, profileJobSelector, userAvatar}) {
        this._nameElement=document.querySelector(profileNameSelector)
        this._jobElement=document.querySelector(profileJobSelector)
        this._userAvatar=document.querySelector(userAvatar)

    }
    getUserInfo(){
        return {
            title: this._nameElement.textContent,
            job: this._jobElement.textContent,
            avatar: this._userAvatar.textContent
        }
    }

    setUserInfo(title, job, avatar){
        this._nameElement.textContent=title
        this._jobElement.textContent=job
        if(avatar) {
            this._userAvatar.src = avatar
        }
    }
}

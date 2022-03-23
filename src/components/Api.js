class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }
    getProfile() {
        return fetch("https://nomoreparties.co/v1/cohort-37/users/me", {
            headers: this._headers,
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .catch(console.log);
    }
    getInitialCards() {
        return fetch("https://mesto.nomoreparties.co/v1/cohort-37/cards", {
            headers: this._headers,
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .catch(console.log);
    }
    editProfile(name, about) {
        return fetch("https://mesto.nomoreparties.co/v1/cohort-37/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .catch(console.log);
    }

    addCards(name, link) {
        return fetch("https://mesto.nomoreparties.co/v1/cohort-37/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .catch(console.log);
    }

    deleteCard(id) {
        // console.log(id)
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .catch(console.log);
    }

    deleteLike(id) {
        //  console.log(id)
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .catch(console.log);
    }

    addLike(id) {
        //   console.log(id)
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .catch(console.log);
    }

    updateAvatar(item) {
        return fetch(
            "https://mesto.nomoreparties.co/v1/cohort-37/users/me/avatar",
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: item,
                }),
            }
        )
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .catch(console.log);
    }
}

export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-37",
    headers: {
        authorization: "09b0089e-e02a-4b71-a1dc-982ec8809360",
        "Content-Type": "application/json",
    },
});

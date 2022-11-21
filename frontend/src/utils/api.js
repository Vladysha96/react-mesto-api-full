class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getJsonOrError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers,
        }).then(this._getJsonOrError);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers,
        }).then(this._getJsonOrError);
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._getJsonOrError);
    }

    changeProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._getJsonOrError);
    }

    changeAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            credentials: 'include',
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._getJsonOrError);
    }

    deleteCard(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            credentials: 'include',
            method: "DELETE",
            headers: this._headers,
        }).then(this._getJsonOrError);
    }

    putLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            credentials: 'include',
            method: "PUT",
            headers: this._headers,
        }).then(this._getJsonOrError);
    }

    deleteLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            credentials: 'include',
            method: "DELETE",
            headers: this._headers,
        }).then(this._getJsonOrError);
    }

    changeLikeCardStatus(card, isLiked) {
        return isLiked ? this.putLikeCard(card._id) : this.deleteLikeCard(card._id)
    }
}

export const api = new Api({
    baseUrl: "https://vladysha96.backend.nomoredomains.icu",
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
});

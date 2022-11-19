class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
    }

    _checkResult(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers,
        }).then(this._checkResult);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers,
        }).then(this._checkResult);
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._checkResult);
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._checkResult);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResult);
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            credentials: 'include',
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
        }).then(this._checkResult);
    }

    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._checkResult);
    }
}

const api = new Api({
    baseUrl: 'https://vladysha96.backend.nomoredomains.icu',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

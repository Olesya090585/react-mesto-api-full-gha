export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getUserData(token) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers, 
        Authorization: `Bearer ${token}`
      }
    });
    return this._checkRequest(res);
  }

  async editUserInfo(data, token) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers, 
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._checkRequest(res);
  }

  async updateAvatar(data, token) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers, 
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._checkRequest(res);
  }

  async getInitialCards(token) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers, 
        Authorization: `Bearer ${token}`,
      }
    });
    return this._checkRequest(res);
  }

  async addNewCard(data, token) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers, 
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._checkRequest(res);
  }

  async deleteCard(cardId, token) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers, 
        Authorization: `Bearer ${token}`,
      },
    });
    return this._checkRequest(res);
  }

  //метод удаления лайка
  async deleteLikeCard(cardId, token) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers, 
        Authorization: `Bearer ${token}`,
      },
    });
    return this._checkRequest(res);
  }

  //метод добавления лайка
  async addLikeCard(cardId, token) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers, 
        Authorization: `Bearer ${token}`,
      },
    });
    return this._checkRequest(res);
  }
}
const api = new Api({
  baseUrl: "https://api.mesto.ovarnakova.nomoreparties.co/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;

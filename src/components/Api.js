export default class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
    this.setLike = this.setLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    });
  }

  getUserData() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    });
  }

  patchUserData(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  postNewCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-72/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'd8bbc101-a274-46e9-a640-da9ddbf514a8'
      }
    });
  }

  changeAvatar(newAvatarLink) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: newAvatarLink
      })
    });
  }

  setLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    });
  }

  removeLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    });
  }
}

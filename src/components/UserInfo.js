export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, avatarSelector }) {
    this._user = document.querySelector(userNameSelector);
    this._about = document.querySelector(userJobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userData = { name: this._user.textContent, about: this._about.textContent };
    return this._userData;
  }

  setUserProfileInfo(data) {
    this._user.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserInfo(data) {
    this.setAvatar(data.avatar);
    this.userId = data._id;
    this.setUserProfileInfo({ name: data.name, about: data.about });
  }

  setAvatar(link) {
    this._avatar.src = link;
  }
}

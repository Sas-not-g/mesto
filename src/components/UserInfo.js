export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._user = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    this._userData = { name: this._user.textContent, job: this._job.textContent };
    return this._userData;
  }

  setUserInfo(data) {
    this._user.textContent = data.name;
    this._job.textContent = data.job;
  }
}

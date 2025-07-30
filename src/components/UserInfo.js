export default class UserInfo {
  constructor({ nameSelector, aboutSelector,avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

 getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  setUserInfo({ name, about }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._aboutElement.textContent = about;
  }


  setUserAvatar(avatarUrl) {
  const avatarImg = document.querySelector('.profile__photo');
  if (avatarImg) avatarImg.src = avatarUrl;
}
}



export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.gallery__img');
    this._titleElement = this._element.querySelector('.gallery__card-text');
    this._likeButton = this._element.querySelector('.gallery__card-button');
    this._deleteButton = this._element.querySelector('.gallery__card-trash-button');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('gallery__card-button_active');
    });

    this._deleteButton.addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });
  }
}
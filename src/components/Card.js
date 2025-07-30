export default class Card {
  constructor({ data, userId, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._ownerId = typeof data.owner === 'object' ? data.owner._id : data.owner;
    this._cardId = data._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._isLiked = data.isLiked || false; // ← NUEVO
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

    this._renderLikeState();
    this._setEventListeners();

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }

    return this._element;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  }

  _renderLikeState() {
    if (this._isLiked) {
      this._likeButton.classList.add('gallery__card-button_active');
    } else {
      this._likeButton.classList.remove('gallery__card-button_active');
    }
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    this._renderLikeState();
  }

  isLiked() {
    if (!Array.isArray(this._likes)) return false;

    return this._likes.some(user => {
      if (typeof user === 'string') {
        return user === this._userId;
      }

      if (typeof user === 'object' && user !== null) {
        return user._id === this._userId;
      }

      return false;
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  getId() {
    return this._cardId;
  }

  getCardElement() {
    return this._element;
  }
}

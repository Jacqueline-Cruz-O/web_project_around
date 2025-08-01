import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.gallery__popup-img');
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;

    super.open();
  }
}



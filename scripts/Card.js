export class Card{
   constructor({ name, link }, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);
    return template.querySelector(".gallery__card");
  }

  _setEventListeners(cardElement) {
    cardElement.querySelector(".gallery__card-button").addEventListener("click", (evt) => {
      evt.target.classList.toggle("active");
    });

    cardElement.querySelector(".gallery__card-trash-button").addEventListener("click", () => {
      cardElement.remove();
    });

    cardElement.querySelector(".gallery__img").addEventListener("click", () => {
      const popupImg = document.querySelector(".gallery__popup");
      const popupImage = popupImg.querySelector(".gallery__popup-img");
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupImg.classList.add("open");
    });
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const image = cardElement.querySelector(".gallery__img");
    const title = cardElement.querySelector(".gallery__card-text");

    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;

    this._setEventListeners(cardElement);
    return cardElement;
  }
}


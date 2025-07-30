export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  // Método para abrir el popup
  open() {
    this._popup.classList.add('openPopup');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClick);
  }

  // Método para cerrar el popup
  close() {
    this._popup.classList.remove('openPopup');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClick);
  }

  // Cierra el popup si se presiona ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Cierra el popup si se hace clic fuera del contenido
  _handleOverlayClick(evt) {
    const isImagePopup = this._popup.classList.contains('gallery__popup');

    if (isImagePopup) {
      const clickedInsideImageOrButton =
        evt.target.classList.contains('gallery__popup-img') ||
        evt.target.classList.contains('gallery__popup-button');

      if (!clickedInsideImageOrButton) {
        this.close();
      }
    } else {
      if (evt.target === this._popup) {
        this.close();
      }
    }
  }

  // Asigna eventos de cerrar con botón
  setEventListeners() {
    const closeButton = this._popup.querySelector(
      '.popup__button-close, .popup__add-button-close, .gallery__popup-button'
    );
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }
  }
}

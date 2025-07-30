import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('form');
    this._inputList = Array.from(this._form.querySelectorAll('input'));
    this._submitButton = this._form.querySelector('button[type="submit"]');
    this._submitButtonOriginalText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true); // Usamos el nuevo método aquí

      const result = this._handleFormSubmit(this._getInputValues());

      if (result instanceof Promise) {
        result
          .then(() => this.close())
          .catch((err) => console.error('Error en el submit:', err))
          .finally(() => {
            this.renderLoading(false); // Restauramos el texto
          });
      } else {
        this.close();
        this.renderLoading(false);
      }
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setResetValidation(resetFunction) {
    this._resetValidation = resetFunction;
  }

  open() {
    if (this._resetValidation) {
      this._resetValidation();
    }
    super.open();
  }

  // ✅ MÉTODO NUEVO
  renderLoading(isLoading, loadingText = 'Guardando...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonOriginalText;
    }
  }
}

//validación formularios

function showInputError(inputElement, config) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
}

function hideInputError(inputElement, config) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass);
}


function checkInputValidity(inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, config);
  } else {
    hideInputError(inputElement, config);
  }
}

function toggleButtonState(inputs, button, config) {
  const allValid = inputs.every((input) => input.validity.valid);
  button.disabled = !allValid;

  if (config.useCustomStyles) {
    button.style.backgroundColor = allValid ? "#000" : "#fff";
    button.style.color = allValid ? "#fff" : "#C4C4C4";
    button.style.cursor = allValid ? "pointer" : "default";
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

export { enableValidation };

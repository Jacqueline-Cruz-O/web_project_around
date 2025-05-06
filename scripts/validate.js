// validación de formularios

function showInputError(errorElement) {
  errorElement.classList.add("popup__form-input-error_active");
}

function hideInputError(errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("popup__form-input-error_active");
}

function checkInputValidity(inputElement, errorElement) {
  if (!inputElement.validity.valid) {
    showInputError(errorElement);
    return false;
  } else {
    hideInputError(errorElement);
    return true;
  }
}

function toggleButtonState(inputs, button) {
  const allValid = inputs.every((input) => input.validity.valid);
  button.disabled = !allValid;
  button.style.backgroundColor = allValid ? "#000" : "#fff";
  button.style.color = allValid ? "#fff" : "#C4C4C4";
  button.style.cursor = allValid ? "pointer" : "default";
}

function resetFormErrors(inputs, errors, button) {
  inputs.forEach((input, index) => {
    input.value = "";
    hideInputError(errors[index]);
  });
  toggleButtonState(inputs, button);
}

const nameError = document.getElementById("name-error");
const aboutError = document.getElementById("about-error");
const editInputs = [nameInput, aboutInput];
const editErrors = [nameError, aboutError];

editInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    checkInputValidity(input, editErrors[index]);
    toggleButtonState(editInputs, buttonSubmit);
  });
});

const placeError = document.getElementById("place-error");
const urlError = document.getElementById("url-error");
const addInputs = [placeInput, urlInput];
const addErrors = [placeError, urlError];

addInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    checkInputValidity(input, addErrors[index]);
    toggleButtonState(addInputs, createButton);
  });
});

enableValidation({
  formSelector: ".popup__form, .popup__form-add",
  inputSelector: "input",
  submitButtonSelector: ".popup__button-save, .popup__button-create",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});

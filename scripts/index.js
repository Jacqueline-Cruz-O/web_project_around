import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {
  openPopup,
  closePopup,
  closePopupOnOutsideClick,
  handleImageClick
} from './utils.js';

// Tarjetas iniciales
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

// Elementos del DOM
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__info-edit-button");
const closeButton = document.querySelector(".popup__button-close");

const popupAdd = document.querySelector(".popup__add");
const addButton = document.querySelector(".profile__info-add-button");
const closeAddButton = document.querySelector(".popup__add-button-close");

const popupImg = document.querySelector(".gallery__popup");
const popupImgCloseBtn = document.querySelector(".gallery__popup-button");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__form-input-name");
const aboutInput = document.querySelector(".popup__form-input-about");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-details");

const formAddElement = document.querySelector(".popup__form-add");
const placeInput = document.querySelector(".popup__form-input-place");
const urlInput = document.querySelector(".popup__form-input-url");

const gallery = document.querySelector(".gallery");
const cardTemplateSelector = "#card-template";

// Botones abrir/cerrar popups
editButton?.addEventListener("click", () => openPopup(popup, "openPopup"));
closeButton?.addEventListener("click", () => closePopup(popup, "openPopup"));

addButton?.addEventListener("click", () => openPopup(popupAdd, "openPopup__add"));
closeAddButton?.addEventListener("click", () => closePopup(popupAdd, "openPopup__add"));

popupImgCloseBtn?.addEventListener("click", () => closePopup(popupImg, "open"));

// Cerrar popups al hacer clic fuera
closePopupOnOutsideClick(popup, "openPopup");
closePopupOnOutsideClick(popupAdd, "openPopup__add");
closePopupOnOutsideClick(popupImg, "open");

// Cerrar popups con Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopup(popup, "openPopup");
    closePopup(popupAdd, "openPopup__add");
    closePopup(popupImg, "open");
  }
});

// Función para agregar tarjeta
function addCardToGallery(name, link) {
  const card = new Card({ name, link }, cardTemplateSelector, handleImageClick).generateCard();
  gallery.prepend(card);
}

// Inicializar tarjetas iniciales
initialCards.forEach(({ name, link }) => addCardToGallery(name, link));

// Evento: actualizar perfil
formElement?.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (nameInput && aboutInput) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
    closePopup(popup, "openPopup");
    nameInput.value = "";
    aboutInput.value = "";
  }
});

// Evento: agregar nueva tarjeta
formAddElement?.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (placeInput && urlInput) {
    addCardToGallery(placeInput.value, urlInput.value);
    closePopup(popupAdd, "openPopup__add");
    placeInput.value = "";
    urlInput.value = "";
  }
});

// Validación de formularios
const config = {
  inputSelector: "input",
  submitButtonSelector: "button[type='submit']",
  errorClass: "popup__form-input-error_active"
};

const formProfileValidator = new FormValidator(config, formElement);
formProfileValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();
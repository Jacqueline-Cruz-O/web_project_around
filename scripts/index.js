import Card from '../components/Card.js';
import { Section } from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';


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
const editButton = document.querySelector(".profile__info-edit-button");
const addButton = document.querySelector(".profile__info-add-button");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__form-input-name");
const aboutInput = document.querySelector(".popup__form-input-about");

const formAddElement = document.querySelector(".popup__form-add");
const placeInput = document.querySelector(".popup__form-input-place");
const urlInput = document.querySelector(".popup__form-input-url");

// Popup imagen
const imagePopup = new PopupWithImage('.gallery__popup');
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// Sección galería
const gallerySection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', handleCardClick);
    const cardElement = card.generateCard();
    gallerySection.addItem(cardElement);
  }
}, '.gallery');

gallerySection.renderItems();

// Info del usuario
const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  aboutSelector: '.profile__info-details'
});

// Popup de editar perfil
const editPopup = new PopupWithForm('.popup', (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.about
  });
  editPopup.close();
});
editPopup.setEventListeners();

// Popup de agregar tarjeta
const addPopup = new PopupWithForm('.popup__add', (formData) => {
  const newCardData = {
    name: formData.name,
    link: formData.url
  };
  const card = new Card(newCardData, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  gallerySection.addItem(cardElement);
  addPopup.close();
});
addPopup.setEventListeners();

// Validaciones
const config = {
  inputSelector: "input",
  submitButtonSelector: "button[type='submit']",
  errorClass: "popup__form-input-error_active"
};

const formProfileValidator = new FormValidator(config, formElement);
formProfileValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();

// Botón editar perfil
editButton.addEventListener('click', () => {
  nameInput.value = "";
  aboutInput.value = "";
  formProfileValidator.resetValidation(); // Limpia errores y desactiva botón
  editPopup.open();
});

// Botón agregar tarjeta
addButton.addEventListener('click', () => {
  formAddElement.reset(); // Limpia campos
  formAddValidator.resetValidation();
  addPopup.open();
});
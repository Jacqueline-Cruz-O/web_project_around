// Tarjetas iniciales
const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

// Pop up perfil
const popup = document.querySelector (".popup");
const editButton =document.querySelector (".profile__info-edit-button");
const closeButton = document.querySelector(".popup__button-close");

function handleOpenPopup() {
  if (popup) {
    popup.classList.add("openPopup");
  }
}

function handleClosePopup() {
  if (popup) {
    popup.classList.remove("openPopup");
  }
}

if (editButton) editButton.addEventListener("click", handleOpenPopup);
if (closeButton) closeButton.addEventListener("click", handleClosePopup);


// formulario perfil
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__form-input-name");
const aboutInput = document.querySelector(".popup__form-input-about");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-details");


if (formElement) {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (nameInput && aboutInput && profileName && profileDescription) {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = aboutInput.value;
    }
    handleClosePopup();
    placeInput.value = "";
    urlInput.value = "";
  });
}

// pop up agregar tarjeta
const popupAdd = document.querySelector(".popup__add");
const addButton = document.querySelector(".profile__info-add-button");
const closeAddButton = document.querySelector(".popup__add-button-close");

function handleOpenPopupAdd() {
  if (popupAdd) {
    popupAdd.classList.add("openPopup__add");
  }
}

function handleClosePopupAdd() {
  if (popupAdd) {
    popupAdd.classList.remove("openPopup__add");
  }
}

if (addButton) addButton.addEventListener("click", handleOpenPopupAdd);
if (closeAddButton) closeAddButton.addEventListener("click", handleClosePopupAdd);


// ----------- CREAR TARJETA -----------
function createCard(name, link) {
  const card = document.createElement("div");
  card.classList.add("gallery__card");

  const image = document.createElement("img");
  image.classList.add("gallery__img");
  image.src = link;
  image.alt = name;

  image.addEventListener("click", () => {
    const popupImg = document.querySelector(".gallery__popup");
    const popupImage = popupImg?.querySelector(".gallery__popup-img");

    if (popupImg && popupImage) {
      popupImage.src = link;
      popupImage.alt = name;
      popupImg.classList.add("open");
    }
  });

  const cardBottom = document.createElement("div");
  cardBottom.classList.add("gallery__card-description");

  const description = document.createElement("h2");
  description.classList.add("gallery__card-text");
  description.textContent = name;

  const likeButton = document.createElement("button");
  likeButton.classList.add("gallery__card-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("active");
  });

  const trashButton = document.createElement("button");
  trashButton.classList.add("gallery__card-trash-button");
  trashButton.addEventListener("click", () => {
    card.remove();
  });

  cardBottom.appendChild(description);
  cardBottom.appendChild(likeButton);
  cardBottom.appendChild(trashButton);

  card.appendChild(image);
  card.appendChild(cardBottom);

  return card;
}
// boton me gusta

const trashButton = document.querySelectorAll(".gallery__card-trash-button");
const galleryCard = document.querySelector(".gallery__card");
trashButton.forEach(button => {
button.addEventListener('click', (event) => {
  const card = event.target.closest('.gallery__card');
  card.remove();
});
});

const likeButton = document.querySelectorAll(".gallery__card-button").forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("active");
});
});

// agregar a la galeria
function addCardToGallery(name, link) {
  const gallery = document.querySelector(".gallery");
  const card = createCard(name, link);
  gallery?.prepend(card);
}


// formulario agregar tarjtea
const formAddElement = document.querySelector(".popup__form-add");
const placeInput = document.querySelector(".popup__form-input-place");
const urlInput = document.querySelector(".popup__form-input-url");

formAddElement?.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (placeInput && urlInput) {
    addCardToGallery(placeInput.value, urlInput.value);
    handleClosePopupAdd();
    placeInput.value = "";
    urlInput.value = "";
  }
});

// imagen ampliada
const popupImg = document.querySelector(".gallery__popup");
const closeBtn = document.querySelector(".gallery__popup-button");
const galleryImages = document.querySelectorAll(".gallery__img");

galleryImages.forEach((img) => {
img.addEventListener("click", () => {
  if (popupImg) {
    const popupImage = popupImg.querySelector("img");
    if (popupImage) {
      popupImage.src = img.src;
      popupImage.alt = img.alt;
    }
    popupImg.classList.add("open");
  }
});
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    if (popupImg) {
      popupImg.classList.remove("open");
    }
  });
  }

// cerrar con click externo
function closePopupOnOutsideClick(popupElement, className) {
  document.addEventListener("mousedown", (event) => {
    if (popupElement?.classList.contains(className) && !event.target.closest(`.${className}`)) {
      popupElement.classList.remove(className);
    }
  });
}

closePopupOnOutsideClick(popup, "openPopup");
closePopupOnOutsideClick(popupAdd, "openPopup__add");
closePopupOnOutsideClick(popupImg, "open");

// cerrar con tecla ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelector(".popup.openPopup")?.classList.remove("openPopup");
    document.querySelector(".popup__add.openPopup__add")?.classList.remove("openPopup__add");
    document.querySelector(".gallery__popup.open")?.classList.remove("open");
  }
});

// llamada a la validación
import { enableValidation } from './validate.js';

enableValidation({
  formSelector: ".popup__form, .popup__form-add",
  inputSelector: "input",
  submitButtonSelector: "button[type='submit']",
  errorClass: "popup__form-input-error_active",
  useCustomStyles: true
});
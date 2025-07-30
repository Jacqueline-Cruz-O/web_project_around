import Card from '../components/Card.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/Popupwithconfirmation.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import Api from "../components/api.js";


// Instancia de la API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: 'c189f4b0-dcbf-4436-a227-376edc6aea27',
    "Content-Type": 'application/json'
  }
});

// Clase para manejar la info del usuario
const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  aboutSelector: '.profile__info-details',
  avatarSelector: '.profile__photo'
});

// Popup para ver imagen en grande
const popupWithImage = new PopupWithImage('.gallery__popup');
popupWithImage.setEventListeners();

let userId;

// Función para crear una nueva tarjeta
function createCard(data) {
  const card = new Card({
    data,
    userId,
    handleCardClick: (name, link) => popupWithImage.open(name, link),
    handleLikeClick: (cardInstance) => {
      const cardId = cardInstance.getId();
      const wasLiked = cardInstance._isLiked;

      const likeAction = wasLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

      likeAction
        .then((updatedCard) => {
          cardInstance.updateLikes(updatedCard.isLiked);
        })
        .catch((err) => {
          console.error('Error al actualizar like:', err);
        });
    },
    handleDeleteClick: (cardInstance) => {
      popupConfirmDelete.open(cardInstance.getId(), cardInstance.getCardElement());
    }
  }, '#card-template');

  return card.generateCard();
}

// Cargar datos del servidor
let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);

    cardSection = new Section({
      items: initialCards,
      renderer: (item) => {
        const cardElement = createCard(item);
        return cardElement;
      }
    }, '.gallery');

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error('Error al cargar datos iniciales:', err);
  });

// Instancia del popup para editar perfil
const editPopup = new PopupWithForm('.popup', (data) => {
  return api.updateUserInfo(data)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    });
});
editPopup.setEventListeners();

// Instancia del popup para agregar nueva tarjeta
const addPopup = new PopupWithForm('.popup__add', (data) => {
  return api.addCard({ name: data.name, link: data.url })
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardSection.addItem(cardElement);
    });
});
addPopup.setEventListeners();

// Formularios
const editForm = document.querySelector('.popup__form');
const addForm = document.querySelector('.popup__form-add');
const avatarForm = document.querySelector('.popup__form-avatar');

// Validadores
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input-name, .popup__form-input-about, .popup__form-input-place, .popup__form-input-url',
  submitButtonSelector: '.popup__button-save, .popup__button-create',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form-input-error_visible'
};

const editFormValidator = new FormValidator(validationConfig, editForm);
const addFormValidator = new FormValidator(validationConfig, addForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Instancia del popup para cambiar foto de perfil
const popupAvatar = new PopupWithForm('.popup__avatar', (data) => {
  popupAvatar.renderLoading(true, 'Guardando...');
  return api
    .setUserAvatar(data.avatar)
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, about: res.about });
      userInfo.setUserAvatar(res.avatar);
      popupAvatar.close();
    })
    .catch((err) => console.log('Error al actualizar avatar:', err))
    .finally(() => {
      popupAvatar.renderLoading(false, 'Guardar');
    });
});
popupAvatar.setEventListeners();
popupAvatar.setResetValidation(() => avatarFormValidator.resetValidation());

// Botones de la interfaz
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__info-add-button');
const avatarButton = document.querySelector('.profile__avatar-button');

// Abrir popup de editar perfil
editButton.addEventListener('click', () => {
  const currentUser = userInfo.getUserInfo();
  document.querySelector('#name').value = currentUser.name;
  document.querySelector('#about').value = currentUser.about;
  editPopup.open();
});

// Abrir popup para agregar tarjeta
addButton.addEventListener('click', () => {
  addPopup.open();
});

// Abrir popup para editar avatar
avatarButton.addEventListener('click', () => {
  avatarForm.reset(); // Limpiar input antes de mostrar
  popupAvatar.open();
});

// Selección del popup de confirmación
const deletePopupForm = document.querySelector('.popup__delete');

// Instancia del popup de confirmación
const popupConfirmDelete = new PopupWithConfirmation('.popup__delete', (cardId, cardElement) => {
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      popupConfirmDelete.close();
    })
    .catch((err) => console.log('Error al eliminar la tarjeta:', err));
});
popupConfirmDelete.setEventListeners();


  const popup = document.querySelector(".popup");
  const editButton =document.querySelector (".profile__info-edit-button");
  const closeButton = document.querySelector(".popup__button-close");
  const formElement =document.querySelector(".popup__form");
  const nameInput = document.querySelector(".popup__form-input-name");
  const aboutInput = document.querySelector(".popup__form-input-about");
  const profileName = document.querySelector(".profile__info-name");
  const profileDescription = document.querySelector (".profile__info-details");
  const buttonSubmit = document.querySelector(".popup__button-save");
  const popupAdd = document.querySelector(".popup__add");
  const addButton = document.querySelector (".profile__info-add-button");
  const closeAddButton = document.querySelector(".popup__add-button-close");
  const formAddElement =document.querySelector(".popup__form-add");
  const placeInput = document.querySelector(".popup__form-input-place");
  const urlInput = document.querySelector(".popup__form-input-url");
  const placeDescription = document.querySelector(".gallery__card-text")
  const placeImage = document.querySelector(".gallery__img")
  const createButton = document.querySelector(".popup__button-create");
  const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
  ];

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

  if (formElement) {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (nameInput && aboutInput && profileName && profileDescription) {
        profileName.textContent = nameInput.value;
        profileDescription.textContent = aboutInput.value;
      }
      handleClosePopup();
    });
  }

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


  if(formAddElement){
    formAddElement.addEventListener("submit",(evt) =>{
      evt.preventDefault();
      if (placeInput && urlInput && placeDescription && placeImage) {
        placeDescription.textContent = placeInput.value;
        placeImage.src = urlInput.value;
      }
      handleClosePopupAdd();
    })
  }


function createCard(name, link) {
  const card = document.createElement("div");
  card.classList.add("gallery__card");

  const image = document.createElement("img");
  image.classList.add("gallery__img");
  image.src = link;
  image.alt = name;

  const description = document.createElement("p");
  description.classList.add("gallery__card-text");
  description.textContent = name;

  card.appendChild(image);
  card.appendChild(description);

  return card;
}


function addCardToGallery(name, link) {
  const gallery = document.querySelector(".gallery");
  const card = createCard(name, link);
  if (gallery) {
    gallery.prepend(card);
  }
}

if (formAddElement) {
  formAddElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (placeInput && urlInput) {
      const name = placeInput.value;
      const link = urlInput.value;

      addCardToGallery(name, link);

      handleClosePopupAdd();
    }
  });
}


const trashButton = document.querySelectorAll(".gallery__card-trash-button");
const galleryCard = document.querySelector(".gallery__card");
  trashButton.forEach(button => {
  button.addEventListener('click', (event) => {
    const card = event.target.closest('.gallery__card');
    card.remove();
  });
});

document.querySelectorAll(".gallery__card-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
  });
});


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
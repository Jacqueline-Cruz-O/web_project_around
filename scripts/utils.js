function openPopup(popupElement, openClass) {
  popupElement.classList.add(openClass);
}

function closePopup(popupElement, openClass) {
  popupElement.classList.remove(openClass);
}

function closePopupOnOutsideClick(popupElement, className) {
  document.addEventListener("mousedown", (event) => {
    if (popupElement.classList.contains(className) && !event.target.closest(`.${className}`)) {
      popupElement.classList.remove(className);
    }
  });
}

function handleImageClick(name, link) {
  const popupImg = document.querySelector(".gallery__popup");
  const popupImage = popupImg.querySelector(".gallery__popup-img");
  popupImage.src = link;
  popupImage.alt = name;
  openPopup(popupImg, "open");
}

export { openPopup, closePopup, closePopupOnOutsideClick, handleImageClick };
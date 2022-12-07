import "../src/index.css"; // добавьте импорт главного файла стилей
import { setDefaultCards, imgPopup } from "./components/card.js";
import {
  closeButtons,
  closePopup,
  addOverlayClickHandler,
  btnOpenEditProfile,
  openPopupEditProfile,
  editFormElement,
  submitHandlerEditor,
  popupEditProfile,
  btnOpenAddPlace,
  openPopupAddPlace,
  popupAddPlace,
  submitHandlerAdd,
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";

setDefaultCards();

closeButtons.forEach((closeButtons) => {
  const popup = closeButtons.closest(".pop-up");
  closeButtons.addEventListener("click", () => closePopup(popup));
});

document.addEventListener("keydown", (evt) => {
  if (evt.which === 27) {
    const popup = document.querySelector(".pop-up_active");
    closePopup(popup);
  }
});

btnOpenEditProfile.addEventListener("click", openPopupEditProfile);
editFormElement.addEventListener("submit", submitHandlerEditor);

btnOpenAddPlace.addEventListener("click", openPopupAddPlace);
popupAddPlace
  .querySelector("#addPlaceForm")
  .addEventListener("submit", submitHandlerAdd);

addOverlayClickHandler(popupEditProfile);
addOverlayClickHandler(popupAddPlace);
addOverlayClickHandler(imgPopup);

enableValidation();

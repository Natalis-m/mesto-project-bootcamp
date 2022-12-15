import "../src/index.css";
import { setDefaultCards } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { getUser, getGalery } from "./components/api.js";
import {
  closePopup,
  profileAvatarElement,
  profeleNameElement,
  profileDescriptionElement,
  popupEditProfile,
  popupAddPlace,
  openPopupEditImgProfile,
  submitPopupEditImgProfile,
  addOverlayClickHandler,
  openPopupEditProfile,
  submitHandlerEditor,
  openPopupAddPlace,
  submitHandlerAdd,
  imgPopup,
} from "./components/modal.js";

const btnOpenEditProfile = document.querySelector(".profile__edit");
const btnOpenAddPlace = document.querySelector(".profile__add");
const profileEditFormElement = document.getElementById("profileEditForm");
const createCardFormElement = document.getElementById("addPlaceForm");
const closeButtons = document.querySelectorAll(".pop-up__closed");
const btnEditImgProfile = document.querySelector(".profile__avatar-wrapper");
const editImgProfileFormElement = document.getElementById("editImgProfileForm");

btnEditImgProfile.addEventListener("click", openPopupEditImgProfile);
editImgProfileFormElement.addEventListener("submit", submitPopupEditImgProfile);

getUser()
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then((result) => {
    profeleNameElement.textContent = result.name;
    profileDescriptionElement.textContent = result.about;
    profileAvatarElement.src = result.avatar;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

btnOpenEditProfile.addEventListener("click", openPopupEditProfile);
profileEditFormElement.addEventListener("submit", submitHandlerEditor);
btnOpenAddPlace.addEventListener("click", openPopupAddPlace);
createCardFormElement.addEventListener("submit", submitHandlerAdd);
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

addOverlayClickHandler(popupEditProfile);
addOverlayClickHandler(popupAddPlace);
addOverlayClickHandler(imgPopup);
enableValidation();

//галерея карточек со всей их функциональностью
getGalery()
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then((result) => {
    setDefaultCards(result);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

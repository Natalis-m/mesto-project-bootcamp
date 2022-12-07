//общее для попапов
import { imgPopup } from "./card.js";

export const closeButtons = document.querySelectorAll(".pop-up__closed");

// closeButtons.forEach((closeButtons) => {
//   const popup = closeButtons.closest(".pop-up");
//   closeButtons.addEventListener("click", () => closePopup(popup));
// });

export function openPopup(popup) {
  popup.classList.add("pop-up_active");
}
export function closePopup(popup) {
  popup.classList.remove("pop-up_active");
}

export function addOverlayClickHandler(popup) {
  popup.addEventListener("click", (evt) => {
    if (!evt.target.closest(".pop-up__overlay")) {
      closePopup(evt.target.closest(".pop-up"));
    }
  });
}

// document.addEventListener("keydown", (evt) => {
//   if (evt.which === 27) {
//     const popupActive = document.querySelector(".pop-up_active");
//     closePopup(popupActive);
//   }
// });

//поп-ап редактирования
export const popupEditProfile = document.querySelector("#popupEditProfile");
export const btnOpenEditProfile = document.querySelector(".profile__edit");
const profeleName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");

export const editFormElement = document.getElementById("profileEditForm");

// btnOpenEditProfile.addEventListener("click", openPopupEditProfile);
// editFormElement.addEventListener("submit", submitHandlerEditor);

// clickOverlay(popupEditProfile);

export function openPopupEditProfile() {
  openPopup(popupEditProfile);
  inputName.value = profeleName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closedEditProfile() {
  closePopup(popupEditProfile);
}

export function submitHandlerEditor(evt) {
  evt.preventDefault();
  profeleName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closedEditProfile();
}

//поп-ап добавления карточки
export const popupAddPlace = document.querySelector("#popupAddPlace");
export const btnOpenAddPlace = document.querySelector(".profile__add");
// btnOpenAddPlace.addEventListener("click", openPopupAddPlace);

// popupAddPlace
//   .querySelector("#addPlaceForm")
//   .addEventListener("submit", submitHandlerAdd);

// clickOverlay(popupAddPlace);

export function openPopupAddPlace() {
  openPopup(popupAddPlace);
}

function closedAddPlace() {
  closePopup(popupAddPlace);
}

export function submitHandlerAdd(evt) {
  evt.preventDefault();
  const inputAddPlace = document.getElementById("input-add-place");
  const inputSrcPlace = document.getElementById("input-src-place");
  const cardName = inputAddPlace.value;
  const cardImg = inputSrcPlace.value;
  createCard(cardName, cardImg);
  closedAddPlace();
  evt.target.reset();
}

export function openPicture(evt) {
  openPopup(imgPopup);

  const imgSrc = evt.target.src;
  const nameImg = evt.target.alt;

  imgPopup.querySelector(".imgPopup__img").src = imgSrc;
  imgPopup.querySelector(".imgPopup__img").alt = nameImg;
  imgPopup.querySelector(".imgPopup__text").textContent = nameImg;
}

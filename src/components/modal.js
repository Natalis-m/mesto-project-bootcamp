//общее для попапов
import { createCardElement } from "./card.js";
import { updateProfile, createCardApi, updateImgProfile } from "./api.js";

export const profeleNameElement = document.querySelector(".profile__name");
export const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
export const profileAvatarElement = document.querySelector(".profile__avatar");
export const popupEditProfile = document.querySelector("#popupEditProfile");
export const popupAddPlace = document.querySelector("#popupAddPlace");
const inputAddPlace = document.getElementById("input-add-place");
const inputSrcPlace = document.getElementById("input-src-place");
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");
const popupEditImgProfile = document.getElementById("popupEditImgProfile");
const inputLinkImgProfile = document.getElementById("input-src-img-profile");

export function openPopupEditImgProfile() {
  openPopup(popupEditImgProfile);
}
export function submitPopupEditImgProfile(evt) {
  evt.preventDefault();
  updateImgProfile(inputLinkImgProfile)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      profileAvatarElement.src = result.avatar;
      closedEditImgProfile();
      inputLinkImgProfile.value = "";
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

function closedEditImgProfile() {
  closePopup(popupEditImgProfile);
}

export function openPopupEditProfile() {
  openPopup(popupEditProfile);
  inputName.value = profeleNameElement.textContent;
  inputDescription.value = profileDescriptionElement.textContent;
}

export function submitHandlerEditor(evt) {
  evt.preventDefault();
  updateProfile(inputName, inputDescription)
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
      closedEditProfile();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

function closedEditProfile() {
  closePopup(popupEditProfile);
}

export function openPopupAddPlace() {
  openPopup(popupAddPlace);
}

export function submitHandlerAdd(evt) {
  evt.preventDefault();
  createCardApi(inputAddPlace, inputSrcPlace)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      createCardElement(result.name, result.link);
      closedAddPlace();
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

function closedAddPlace() {
  closePopup(popupAddPlace);
}

//открытие картинки
export const imgPopup = document.querySelector(".imgPopup");

export function openPicture(evt) {
  openPopup(imgPopup);
  const imgSrc = evt.target.src;
  const nameImg = evt.target.alt;
  imgPopup.querySelector(".imgPopup__img").src = imgSrc;
  imgPopup.querySelector(".imgPopup__img").alt = nameImg;
  imgPopup.querySelector(".imgPopup__text").textContent = nameImg;
}

/////////////////////////////////////////////////////////////////////

function openPopup(popup) {
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

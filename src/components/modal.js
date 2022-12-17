//общее для попапов
import { createCard, masterUserId } from "./card.js";
import { updateProfile, createCardApi, updateImgProfile } from "./api.js";

export const editImgProfileFormElement =
  document.getElementById("editImgProfileForm");
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

function dataProcessingPopup() {
  const popupActive = document.querySelector(".pop-up_active");
  const formSubmit = popupActive.querySelector(".form__submit");
  formSubmit.textContent = "Сохранение...";
  // formSubmit.textContent = "Сохранить";
}

export function submitPopupEditImgProfile(evt) {
  evt.preventDefault();
  dataProcessingPopup();
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
  dataProcessingPopup();
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
  dataProcessingPopup();

  createCardApi(inputAddPlace, inputSrcPlace)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      createCard(
        result.name,
        result.link,
        masterUserId,
        result._id,
        result.likes
      );
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
  popup.querySelector(".form__submit").textContent = "Сохранить";
}
export function addOverlayClickHandler(popup) {
  popup.addEventListener("click", (evt) => {
    if (!evt.target.closest(".pop-up__overlay")) {
      closePopup(evt.target.closest(".pop-up"));
    }
  });
}

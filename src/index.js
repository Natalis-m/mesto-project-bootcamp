import "../src/index.css";
import { setDefaultCards, renderCard } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import {
  openPopup,
  closePopup,
  addOverlayClickHandler,
} from "./components/modal.js";
import {
  getUser,
  getGalery,
  updateProfile,
  createCardApi,
  updateImgProfile,
} from "./components/api.js";

const btnOpenEditProfile = document.querySelector(".profile__edit");
const btnOpenAddPlace = document.querySelector(".profile__add");
const profileEditFormElement = document.getElementById("profileEditForm");
const createCardFormElement = document.getElementById("addPlaceForm");
const closeButtons = document.querySelectorAll(".pop-up__closed");
const btnEditImgProfile = document.querySelector(".profile__avatar-wrapper");
const inputAddPlace = document.getElementById("input-add-place");
const inputSrcPlace = document.getElementById("input-src-place");
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");
const popupEditImgProfile = document.getElementById("popupEditImgProfile");
const inputLinkImgProfile = document.getElementById("input-src-img-profile");
const editImgProfileFormElement = document.getElementById("editImgProfileForm");
const profeleNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const profileAvatarElement = document.querySelector(".profile__avatar");
const popupEditProfile = document.querySelector("#popupEditProfile");
const popupAddPlace = document.querySelector("#popupAddPlace");
const imgPopup = document.querySelector(".imgPopup");

btnEditImgProfile.addEventListener("click", openPopupEditImgProfile);
editImgProfileFormElement.addEventListener("submit", submitPopupEditImgProfile);
btnOpenEditProfile.addEventListener("click", openPopupEditProfile);
profileEditFormElement.addEventListener("submit", submitHandlerEditor);
btnOpenAddPlace.addEventListener("click", openPopupAddPlace);
createCardFormElement.addEventListener("submit", submitHandlerAdd);
closeButtons.forEach((closeButtons) => {
  const popup = closeButtons.closest(".pop-up");
  closeButtons.addEventListener("click", () => closePopup(popup));
});

addOverlayClickHandler(popupEditProfile);
addOverlayClickHandler(popupAddPlace);
addOverlayClickHandler(imgPopup);
enableValidation();

Promise.all([getUser(), getGalery()])
  .then(([info, initialCards]) => {
    profeleNameElement.textContent = info.name;
    profileDescriptionElement.textContent = info.about;
    profileAvatarElement.src = info.avatar;
    setDefaultCards(initialCards, info._id);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

function openPopupEditImgProfile() {
  openPopup(popupEditImgProfile);
}

function dataProcessingPopup() {
  const popupActive = document.querySelector(".pop-up_active");
  const formSubmit = popupActive.querySelector(".form__submit");
  formSubmit.textContent = "Сохранение...";
}

function submitPopupEditImgProfile(evt) {
  evt.preventDefault();
  dataProcessingPopup();
  updateImgProfile(inputLinkImgProfile)
    .then((result) => {
      profileAvatarElement.src = result.avatar;
      closedEditImgProfile();
      inputLinkImgProfile.value = "";
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditImgProfile.querySelector(".form__submit").textContent =
        "Сохранить";
    });
}

function closedEditImgProfile() {
  closePopup(popupEditImgProfile);
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  inputName.value = profeleNameElement.textContent;
  inputDescription.value = profileDescriptionElement.textContent;
}

function submitHandlerEditor(evt) {
  evt.preventDefault();
  dataProcessingPopup();
  updateProfile(inputName, inputDescription)
    .then((result) => {
      profeleNameElement.textContent = result.name;
      profileDescriptionElement.textContent = result.about;
      closedEditProfile();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditProfile.querySelector(".form__submit").textContent = "Сохранить";
    });
}

function closedEditProfile() {
  closePopup(popupEditProfile);
}

function openPopupAddPlace() {
  openPopup(popupAddPlace);
}

function submitHandlerAdd(evt) {
  evt.preventDefault();
  dataProcessingPopup();

  createCardApi(inputAddPlace, inputSrcPlace)
    .then((result) => {
      renderCard(
        result.name,
        result.link,
        result.owner._id,
        result._id,
        result.likes,
        result.owner._id
      );
    })
    .then(() => {
      closedAddPlace();
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAddPlace.querySelector(".form__submit").textContent = "Сохранить";
    });
}

function closedAddPlace() {
  closePopup(popupAddPlace);
}

export function openPicture(name, link) {
  openPopup(imgPopup);
  imgPopup.querySelector(".imgPopup__img").src = link;
  imgPopup.querySelector(".imgPopup__img").alt = name;
  imgPopup.querySelector(".imgPopup__text").textContent = name;
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const btnOpenEditProfile = document.querySelector(".profile__edit");
const btnOpenAddPlace = document.querySelector(".profile__add");
const popupEditProfile = document.querySelector("#popupEditProfile");
const popupAddPlace = document.querySelector("#popupAddPlace");
const btnCloseEditProfile = popupEditProfile.querySelector(".pop-up__closed");
const btnCloseAddPlace = popupAddPlace.querySelector(".pop-up__closed");
const btnCloseImgPopup = document.querySelector(".imgPopup__closed");
const profileInputName = document.getElementById("profileInputName");
const profileInputDescription = document.getElementById(
  "profileInputDescription"
);
const profeleName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

setDefaultCards();

btnOpenEditProfile.addEventListener("click", openPopupEditProfile);
btnOpenAddPlace.addEventListener("click", openPopupAddPlace);
btnCloseEditProfile.addEventListener("click", closedEditProfile);
btnCloseAddPlace.addEventListener("click", closedAddPlace);
btnCloseImgPopup.addEventListener("click", closedPicture);
popupEditProfile
  .querySelector("#profileEditForm")
  .addEventListener("submit", submitHandlerEditor);
popupAddPlace
  .querySelector("#addPlaceForm")
  .addEventListener("submit", submitHandlerAdd);

document.addEventListener("animationstart", function (e) {
  if (e.animationName === "fadeIn") {
    e.target.classList.add("did-fade-in");
  }
});

document.addEventListener("animationend", function (e) {
  if (e.animationName === "fadeOut") {
    e.target.classList.remove("did-fade-in");
  }
});

function openPopupEditProfile() {
  popupEditProfile.classList.add("pop-up_active");
  profileInputName.value = profeleName.textContent;
  profileInputDescription.value = profileDescription.textContent;
}

function openPopupAddPlace() {
  popupAddPlace.classList.add("pop-up_active");
}

function closedEditProfile() {
  popupEditProfile.classList.remove("pop-up_active");
}

function closedAddPlace() {
  inputNameAddPlace.value = "";
  inputSrcAddPlace.value = "";
  popupAddPlace.classList.remove("pop-up_active");
}

function submitHandlerEditor(evt) {
  evt.preventDefault();
  profeleName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closedEditProfile();
}

function submitHandlerAdd(evt) {
  evt.preventDefault();
  const inputNameAddPlace = document.getElementById("inputNameAddPlace");
  const inputSrcAddPlace = document.getElementById("inputSrcAddPlace");
  const cardName = inputNameAddPlace.value;
  const cardImg = inputSrcAddPlace.value;
  createCard(cardName, cardImg);
  closedAddPlace();
}

function createCard(name, link) {
  const cardTemplate = document.getElementById("card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const galery = document.querySelector(".galery");
  const btnDelete = cardElement.querySelector(".card__delet");
  const picture = cardElement.querySelector(".card__img");

  cardElement.querySelector(".card__img").src = link;
  cardElement.querySelector(".card__img").alt = name;
  cardElement.querySelector(".card__text").textContent = name;
  cardElement.querySelector(".card__like").addEventListener("click", cardLike);
  btnDelete.addEventListener("click", cardDelet);
  picture.addEventListener("click", openPicture);

  galery.prepend(cardElement);
}

function cardDelet(evt) {
  const parentСard = evt.target.closest(".card");
  parentСard.remove();
}

function cardLike(evt) {
  evt.target.classList.toggle("card__like_active");
}

function openPicture(evt) {
  const imgPopup = document.querySelector(".imgPopup");
  const imgSrc = evt.target.src;
  const nameImg = evt.target.alt;
  imgPopup.classList.add("imgPopup_active");
  imgPopup.querySelector(".imgPopup__img").src = imgSrc;
  imgPopup.querySelector(".imgPopup__img").alt = nameImg;
  imgPopup.querySelector(".imgPopup__text").textContent = nameImg;
}

function closedPicture() {
  const imgPopup = document.querySelector(".imgPopup");
  imgPopup.classList.remove("imgPopup_active");
}

function setDefaultCards() {
  for (let card of initialCards) {
    createCard(card.name, card.link);
  }
}

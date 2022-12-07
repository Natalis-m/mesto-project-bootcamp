import { openPicture } from "./modal.js";
//дефолтные карточки
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
export function setDefaultCards() {
  for (const card of initialCards) {
    createCard(card.name, card.link);
  }
}

// попап открытия картинки
export const imgPopup = document.querySelector(".imgPopup");

// clickOverlay(imgPopup);

// function openPicture(evt) {
//   const imgSrc = evt.target.src;
//   const nameImg = evt.target.alt;
//   openPopup(imgPopup);
//   imgPopup.querySelector(".imgPopup__img").src = imgSrc;
//   imgPopup.querySelector(".imgPopup__img").alt = nameImg;
//   imgPopup.querySelector(".imgPopup__text").textContent = nameImg;
// }

// новая карточка
function createCard(name, link) {
  const galery = document.querySelector(".galery");
  const cardElement = getCard(name, link);
  galery.prepend(cardElement);
}

export function getCard(name, link) {
  const cardTemplate = document.getElementById("card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const btnDelete = cardElement.querySelector(".card__delet");
  const picture = cardElement.querySelector(".card__img");

  cardElement.querySelector(".card__img").src = link;
  cardElement.querySelector(".card__img").alt = name;
  cardElement.querySelector(".card__text").textContent = name;
  cardElement.querySelector(".card__like").addEventListener("click", likeCard);
  btnDelete.addEventListener("click", cardDelet);
  picture.addEventListener("click", openPicture);
  return cardElement;
}

function cardDelet(evt) {
  const parentСard = evt.target.closest(".card");
  parentСard.remove();
}

//лайк
function likeCard(evt) {
  evt.target.classList.toggle("card__like_type_active");
}

import { openPicture } from "./modal.js";

const galery = document.querySelector(".galery");

export function setDefaultCards(cards) {
  for (const card of cards) {
    createCardElement(card.name, card.link);
  }
}

function getCard(name, link) {
  const cardTemplate = document.getElementById("card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const btnDelete = cardElement.querySelector(".card__delete");
  const picture = cardElement.querySelector(".card__img");

  picture.src = link;
  picture.alt = name;
  cardElement.querySelector(".card__text").textContent = name;
  cardElement.querySelector(".card__like").addEventListener("click", likeCard);
  btnDelete.addEventListener("click", cardDelet);
  picture.addEventListener("click", openPicture);

  return cardElement;
}

export function createCardElement(name, link) {
  // modal? display
  const cardElement = getCard(name, link);
  galery.prepend(cardElement);
}

function cardDelet(evt) {
  const parentСard = evt.target.closest(".card");
  parentСard.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like_type_active");
}

import { openPicture } from "./modal.js";
import { deleteCardApi, putLikeApi, deleteLikeApi } from "./api.js";

const galery = document.querySelector(".galery");
export const masterUserId = "4eeceb5f1fc9a43e281e9698";

export function setDefaultCards(cards) {
  for (const card of cards) {
    createCard(card.name, card.link, card.owner._id, card._id, card.likes);
  }
}

export function createCard(name, link, ownerId, cardId, likeList) {
  const cardTemplate = document.getElementById("card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const btnDelete = cardElement.querySelector(".card__delete");
  const picture = cardElement.querySelector(".card__img");
  const numberLike = cardElement.querySelector(".card__like-count");

  if (ownerId === masterUserId) {
    btnDelete.classList.add("card__delete_active");
    btnDelete.addEventListener("click", cardDelete);
  }

  cardElement.setAttribute("id", cardId);
  picture.src = link;
  picture.alt = name;
  cardElement.querySelector(".card__text").textContent = name;
  cardElement.querySelector(".card__like").addEventListener("click", likeCard);

  const isMyLike = likeList ? isMyLikeFunc(likeList, masterUserId) : false;
  cardElement.setAttribute("ismylike", isMyLike.toString());
  if (isMyLike) {
    cardElement
      .querySelector(".card__like")
      .classList.add("card__like_type_active");
  }

  numberLike.textContent = likeList.length;
  picture.addEventListener("click", openPicture);
  galery.prepend(cardElement);
}

function isMyLikeFunc(likeList, masterId) {
  return likeList.some((like) => like._id === masterId);
}

function cardDelete(evt) {
  const parentСard = evt.target.closest(".card");
  deleteCardApi(parentСard.id)
    .then((res) => {
      if (res.ok) {
        parentСard.remove();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

function likeCard(evt) {
  const cardElement = evt.target.closest(".card");
  const isMyLike = cardElement.getAttribute("ismylike") === "true";
  const cardId = cardElement.getAttribute("id");
  const likeElement = cardElement.querySelector(".card__like");
  const numberLike = cardElement.querySelector(".card__like-count");

  if (isMyLike) {
    dislike(cardId, likeElement, numberLike);
  } else {
    like(cardId, likeElement, numberLike);
  }
}

function like(cardId, likeElement, numberLike) {
  putLikeApi(cardId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((res) => {
      likeElement.classList.add("card__like_type_active");
      numberLike.textContent = res.likes.length;
    })
    .catch(() => console.log("Error"));
}

function dislike(cardId, likeElement, numberLike) {
  deleteLikeApi(cardId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((res) => {
      likeElement.classList.remove("card__like_type_active");
      numberLike.textContent = res.likes.length;
      // console.log(numberLike);
    })
    .catch(() => console.log("Error"));
}

import { openPicture } from "../index.js";
import {
  deleteCardApi,
  putLikeApi,
  deleteLikeApi,
  getResponseData,
} from "./api.js";

const galery = document.querySelector(".galery");
const cardTemplate = document.getElementById("card").content;

export function setDefaultCards(cards, userId) {
  for (const card of cards) {
    renderCard(
      card.name,
      card.link,
      card.owner._id,
      card._id,
      card.likes,
      userId
    );
  }
}

export function createCard(name, link, ownerId, cardId, likeList, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const btnDelete = cardElement.querySelector(".card__delete");
  const picture = cardElement.querySelector(".card__img");
  const numberLike = cardElement.querySelector(".card__like-count");
  const btnLike = cardElement.querySelector(".card__like");

  //заполнили данные карточки
  picture.src = link;
  picture.alt = name;
  cardElement.querySelector(".card__text").textContent = name;

  //открытие картинки
  picture.addEventListener("click", () => openPicture(name, link));

  //добавили иконку удаления на свои карточки и слушатель лайка
  //удаление (работает)
  if (ownerId === userId) {
    btnDelete.classList.add("card__delete_active");
    btnDelete.addEventListener("click", () => cardDelete(cardElement, cardId));
  }

  btnLike.addEventListener("click", () =>
    likeBtnHandler(cardElement, cardId, likeList, userId)
  );

  const isMyLike = likeList ? isMyLikeFunc(likeList, userId) : false;

  if (isMyLike) {
    cardElement
      .querySelector(".card__like")
      .classList.add("card__like_type_active");
  }

  numberLike.textContent = likeList.length;
  return cardElement;
}

export function renderCard(
  cardName,
  cardLink,
  cardOwnerId,
  cardId,
  cardLikes,
  userId
) {
  const cardElement = createCard(
    cardName,
    cardLink,
    cardOwnerId,
    cardId,
    cardLikes,
    userId
  );

  galery.prepend(cardElement);
}

function isMyLikeFunc(likeList, userId) {
  return likeList.some((like) => like._id === userId);
}

function cardDelete(cardElement, cardId) {
  deleteCardApi(cardId, getResponseData)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

function likeBtnHandler(cardElement, cardId, likeList, userId) {
  const isMyLike = likeList ? isMyLikeFunc(likeList, userId) : false;
  const likeElement = cardElement.querySelector(".card__like");
  const numberLike = cardElement.querySelector(".card__like-count");

  if (isMyLike) {
    dislike(cardId, likeElement, numberLike);
  } else {
    like(cardId, likeElement, numberLike);
  }
}

function like(cardId, likeElement, numberLike) {
  putLikeApi(cardId, getResponseData)
    .then((result) => {
      likeElement.classList.add("card__like_type_active");
      numberLike.textContent = result.likes.length;
    })
    .catch(() => console.log("Error"));
}

function dislike(cardId, likeElement, numberLike) {
  deleteLikeApi(cardId, getResponseData)
    .then((result) => {
      likeElement.classList.remove("card__like_type_active");
      numberLike.textContent = result.likes.length;
    })
    .catch(() => console.log("Error"));
}

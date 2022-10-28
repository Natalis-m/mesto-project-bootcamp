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

setDefaultCards();

function createCard(name, link) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const galery = document.querySelector(".galery");
  cardElement.querySelector(".card__img").src = link;
  cardElement.querySelector(".card__img").alt = name;
  cardElement.querySelector(".card__text").textContent = name;
  galery.append(cardElement);
}

function setDefaultCards() {
  for (let card of initialCards) {
    createCard(card.name, card.link);
  }
//pop-up
const btnEdit = document.querySelector(".profile__edit");
const page = document.querySelector(".page");
const popupTemplate = document.querySelector("#pop-up").content;
const popupElement = popupTemplate.querySelector(".pop-up").cloneNode(true);
const btnClosed = popupElement.querySelector(".pop-up__closed");
const formElement = popupElement.querySelector("#formId");
const nameInput = formElement.querySelector(".form__text_name");
const historyInput = formElement.querySelector(".form__text_history");
const btnAdd = document.querySelector(".profile__add");

btnEdit.addEventListener("click", openEdit);
btnClosed.addEventListener("click", popupClosed);
formElement.addEventListener("submit", formSubmitHandler);
btnAdd.addEventListener("click", openAdd);

function openPopup() {
  popupElement.classList.add("pop-up_active");
  page.prepend(popupElement);
}

function popupClosed() {
  popupElement.classList.remove("pop-up_active");
  popupElement.remove();
  nameInput.value = "";
  historyInput.value = "";
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // заполнили
  const profeleName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");
  //отразили
  profeleName.textContent = nameInput.value;
  profileOccupation.textContent = historyInput.value;
  //окошко закрыли
  popupClosed();
}

function openEdit() {
  popupElement.querySelector(".pop-up__title").textContent =
    "Редактировать профиль";
  popupElement.querySelector(".form__text_name").placeholder = "Ваше имя";
  popupElement.querySelector(".form__text_name").name = "profile_name";
  popupElement.querySelector(".form__text_history").placeholder =
    "Расскажите о себе";
  popupElement.querySelector(".form__text_history").name = "history";
  popupElement.querySelector(".form__save").textContent = "Сохранить";
  openPopup();
}

function openAdd() {
  popupElement.querySelector(".pop-up__title").textContent = "Новое место";
  popupElement.querySelector(".form__text_name").placeholder = "Название";
  popupElement.querySelector(".form__text_name").name = "img_name";
  popupElement.querySelector(".form__text_history").placeholder =
    "Ссылка на картинку";
  popupElement.querySelector(".form__text_history").name = "crs_img";
  popupElement.querySelector(".form__save").textContent = "Создать";
  openPopup();
}

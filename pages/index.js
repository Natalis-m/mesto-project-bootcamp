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
setDefaultCards();
function setDefaultCards() {
  for (const card of initialCards) {
    createCard(card.name, card.link);
  }
}

//общее для попапов
const closeButtons = document.querySelectorAll(".pop-up__closed");

closeButtons.forEach((closeButtons) => {
  const popup = closeButtons.closest(".pop-up");
  closeButtons.addEventListener("click", () => closePopup(popup));
});

function openPopup(popup) {
  popup.classList.add("pop-up_active");
}
function closePopup(popup) {
  popup.classList.remove("pop-up_active");
}

function clickOverlay(popup) {
  popup.addEventListener("click", (evt) => {
    if (!evt.target.closest(".pop-up__overlay")) {
      closePopup(evt.target.closest(".pop-up"));
    }
  });
}

document.addEventListener("keydown", (evt) => {
  if (evt.which === 27) {
    const popupActive = document.querySelector(".pop-up_active");
    closePopup(popupActive);
  }
});

//поп-ап редактирования
const popupEditProfile = document.querySelector("#popupEditProfile");
const btnOpenEditProfile = document.querySelector(".profile__edit");
const profeleName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.getElementById("input-name");
const inputDescription = document.getElementById("input-description");

const editFormElement = document.getElementById("profileEditForm");

btnOpenEditProfile.addEventListener("click", openPopupEditProfile);
editFormElement.addEventListener("submit", submitHandlerEditor);

clickOverlay(popupEditProfile);

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  inputName.value = profeleName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closedEditProfile() {
  closePopup(popupEditProfile);
}

function submitHandlerEditor(evt) {
  evt.preventDefault();
  profeleName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closedEditProfile();
}

//поп-ап добавления карточки
const popupAddPlace = document.querySelector("#popupAddPlace");
const btnOpenAddPlace = document.querySelector(".profile__add");
btnOpenAddPlace.addEventListener("click", openPopupAddPlace);

popupAddPlace
  .querySelector("#addPlaceForm")
  .addEventListener("submit", submitHandlerAdd);

clickOverlay(popupAddPlace);

function openPopupAddPlace() {
  openPopup(popupAddPlace);
}

function closedAddPlace() {
  closePopup(popupAddPlace);
}

function submitHandlerAdd(evt) {
  evt.preventDefault();
  const inputAddPlace = document.getElementById("input-add-place");
  const inputSrcPlace = document.getElementById("input-src-place");
  const cardName = inputAddPlace.value;
  const cardImg = inputSrcPlace.value;
  createCard(cardName, cardImg);
  closedAddPlace();
  evt.target.reset();
}

// попап открытия картинки
const imgPopup = document.querySelector(".imgPopup");

clickOverlay(imgPopup);

function openPicture(evt) {
  const imgSrc = evt.target.src;
  const nameImg = evt.target.alt;
  openPopup(imgPopup);
  imgPopup.querySelector(".imgPopup__img").src = imgSrc;
  imgPopup.querySelector(".imgPopup__img").alt = nameImg;
  imgPopup.querySelector(".imgPopup__text").textContent = nameImg;
}

function closedPicture() {
  closePopup(imgPopup);
}

// новая карточка
function createCard(name, link) {
  const galery = document.querySelector(".galery");
  const cardElement = getCard(name, link);
  galery.prepend(cardElement);
}

function getCard(name, link) {
  const cardTemplate = document.getElementById("card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const btnDelete = cardElement.querySelector(".card__delet");
  const picture = cardElement.querySelector(".card__img");

  cardElement.querySelector(".card__img").src = link;
  cardElement.querySelector(".card__img").alt = name;
  cardElement.querySelector(".card__text").textContent = name;
  cardElement.querySelector(".card__like").addEventListener("click", cardLike);
  btnDelete.addEventListener("click", cardDelet);
  picture.addEventListener("click", openPicture);
  return cardElement;
}

function cardDelet(evt) {
  const parentСard = evt.target.closest(".card");
  parentСard.remove();
}

//лайк
function cardLike(evt) {
  evt.target.classList.toggle("card__like_type_active");
}

//валидация

// Функция, изменяет внешний вид инпута при ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой когда та исправлена
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.textContent = "";
};

// Проверка на валидность всех полей в форме
const setEventListeners = (formElement) => {
  const buttonElement = formElement.querySelector(".form__submit");
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Проверка всех форм и инпутов внутри их, нет - покажем ошибку
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// проверка валидности для подтверждения отправки формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Проверяем на валидность всех форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

// Вызовем функцию
enableValidation();

// Функция меняет состояние кнопки отправки
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit_inactive");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("form__submit_inactive");
    buttonElement.removeAttribute("disabled");
  }
}

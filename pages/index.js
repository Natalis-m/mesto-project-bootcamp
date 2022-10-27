//pop-up
const openEdit = document.querySelector(".profile__edit");
const page = document.querySelector(".page");
const popupTemplate = document.querySelector("#pop-up").content;
const popupElement = popupTemplate.querySelector(".pop-up").cloneNode(true);

openEdit.addEventListener("click", function () {
  popupElement.classList.add("pop-up_active");
  page.prepend(popupElement);
});

const btnClosed = popupElement.querySelector(".pop-up__closed");
btnClosed.addEventListener("click", popupClosed);
function popupClosed() {
  popupElement.classList.remove("pop-up_active");
  popupElement.remove();
  nameInput.value = "";
  historyInput.value = "";
}

const formElement = popupElement.querySelector("#formId");
const nameInput = formElement.querySelector(".form__text_name");
const historyInput = formElement.querySelector(".form__text_history");
formElement.addEventListener("submit", formSubmitHandler);
function formSubmitHandler(evt) {
  console.log("test");
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

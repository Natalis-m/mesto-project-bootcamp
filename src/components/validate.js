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
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

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

// Функция, изменяет внешний вид инпута при ошибке
const showInputError = (formElement, inputElement, errorMessage, selector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selector.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой когда та исправлена
const hideInputError = (formElement, inputElement, selector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selector.inputErrorClass);
  errorElement.textContent = "";
};

// Проверка на валидность всех полей в форме
const setEventListeners = (formElement, selector) => {
  const inputList = Array.from(
    formElement.querySelectorAll(selector.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    selector.submitButtonSelector
  );
  toggleButtonState(buttonElement, inputList, selector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, selector);
      toggleButtonState(buttonElement, inputList, selector);
    });
  });
};

//Проверка всех форм и инпутов внутри их, нет - покажем ошибку
const isValid = (formElement, inputElement, selector) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      selector
    );
  } else {
    hideInputError(formElement, inputElement, selector);
  }
};

// проверка валидности для подтверждения отправки формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Проверяем на валидность всех форм
export const enableValidation = (selector) => {
  const formList = Array.from(document.querySelectorAll(selector.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    //
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, selector);
  });
};

// Функция меняет состояние кнопки отправки
function toggleButtonState(buttonElement, inputList, selector) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selector.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(selector.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

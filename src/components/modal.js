export function openPopup(popup) {
  popup.classList.add("pop-up_active");
  document.addEventListener("keydown", closeByEsc);
}
export function closePopup(popup) {
  popup.classList.remove("pop-up_active");
  document.removeEventListener("keydown", closeByEsc);
}
export function addOverlayClickHandler(popup) {
  popup.addEventListener("click", (evt) => {
    if (!evt.target.closest(".pop-up__overlay")) {
      closePopup(evt.target);
    }
  });
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".pop-up_active");
    closePopup(openedPopup);
  }
}

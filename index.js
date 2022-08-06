const newBank = document.querySelector("[data-creat-bank]");
const modal = document.querySelector("[data-backdrop]");
const btnCloseModal = document.querySelector("[ data-close-modal]");

// newBank.addEventListener("click", openModal);
modal.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

function openModal() {
  modal.classList.toggle("is-hidden");
}
function closeModal(event) {
  if (
    event.target.classList.contains("backdrop") ||
    event.currentTarget.classList.contains("modal-close")
  ) {
    modal.classList.toggle("is-hidden");
  }
}

const divRoot = document.querySelector("#root");
console.log(divRoot);

const divRootChildren = `<div class="mortgage__list box__item"></div>  <div class="mortgage__info box__item"></div>`;

divRoot.insertAdjacentHTML("beforeend", divRootChildren);

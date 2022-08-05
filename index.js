const newBank = document.querySelector("[data-creat-bank]");
const modal = document.querySelector("[data-backdrop]");
const btnCloseModal = document.querySelector("[ data-close-modal]");

newBank.addEventListener("click", openModal);
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

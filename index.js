const banks = [
  {
    id: "435tr34wrt",
    name: "Mono",
    interestRate: 5,
    maxLoan: 500000,
    minPayment: 1000,
    loanTerm: 12,
  },
  {
    id: "asdfw342rew5",
    name: "Privat",
    interestRate: 7,
    maxLoan: 1000000,
    minPayment: 5000,
    loanTerm: 50,
  },
];

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

const divRootChildren = `<div class="mortgage__list box__item">
<h2 class="mortgage__title" data-title="lists-title">List of banks</h2>
</div>
<div class="mortgage__info box__item">
<h2 class="mortgage__title">Loan informations</h2>
</div>`;

divRoot.insertAdjacentHTML("beforeend", divRootChildren);

const banksListUl = document.createElement('ul');
banksListUl.classList.add('mortgage__banks-list')
const divRootChildrenRef = document.querySelector('.mortgage__list')

const renderList = (banks) => {
  const banksMarkup = banks.map(renderItem).join('');
  banksListUl.insertAdjacentHTML("beforeend", banksMarkup);
  divRootChildrenRef.append(banksListUl)
}

const renderItem = (({ name, id }, index) =>
  `<li class="mortgage__banks-item" data-id='${id}'>
                <p class="mortgage__banks-name">${index + 1}. ${name}</p>
                <button type="button" class="mortgage__banks-btn">Edit</button>
                <button type="button" class="mortgage__banks-btn">Close</button>
  </li>`)

renderList(banks);

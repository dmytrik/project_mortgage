let banks = [
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

let isEdit = false

const newBank = document.querySelector("[data-creat-bank]");
const modal = document.querySelector("[data-backdrop]");
const btnCloseModal = document.querySelector("[ data-close-modal]");
const editForm = document.querySelector(".mortgage__form");
let currentBank = {};

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

const divRootChildren = `<div class="mortgage__list box__item">
<h2 class="mortgage__title" data-title="lists-title">List of banks</h2>
</div>
<div class="mortgage__info box__item">
<h2 class="mortgage__title">Loan informations</h2>
<div class="mortgage__info-box" data-info-box></div>
</div>`;

divRoot.insertAdjacentHTML("beforeend", divRootChildren);
const mortgageInfoBox = document.querySelector(".mortgage__info-box");
const banksListUl = document.createElement("ul");
banksListUl.classList.add("mortgage__banks-list");
const divRootChildrenRef = document.querySelector(".mortgage__list");

const createAddBank = document.createElement("button")
createAddBank.setAttribute("type", "button")
createAddBank.textContent = "Create new bank"
createAddBank.classList.add("mortgage__btn-new-bank")
divRootChildrenRef.append(banksListUl, createAddBank);
createAddBank.addEventListener("click", openModal)


const renderList = (banks) => {
  banksListUl.innerHTML = '';
  const banksMarkup = banks.map(renderItem).join("");
  banksListUl.insertAdjacentHTML("beforeend", banksMarkup);
};
const renderItem = ({ name, id }, index) =>
  `<li class="mortgage__banks-item" data-id='${id}'>
                <p class="mortgage__banks-name">${index + 1}. ${name}</p>
                <ul class = 'mortgage__banks-btn-box'>
                  <li><button type="button" class="mortgage__banks-btn btn-edit">Edit</button></li>
                  <li><button type="button" class="mortgage__banks-btn btn-close">Close</button></li>
                </ul>
  </li>`;

renderList(banks);


function openModalBank(bank) {
  modal.classList.toggle("is-hidden");
  if (isEdit) {
    editBank(bank);
    return
  }
}

editForm.addEventListener('submit', getChangedFormValue);


function editBank(bank) {
  console.log(bank);
  const { elements } = editForm;
  console.log(elements);
  for (const key in bank) {
    editForm.elements[key] ? (editForm.elements[key].value = bank[key]) : false;
  }

}



function getChangedFormValue(event) {
  event.preventDefault();
  modal.classList.toggle("is-hidden");

  if (isEdit) {
    for (const key in currentBank) {
      editForm.elements[key] ? (currentBank[key] = editForm.elements[key].value) : false;
    }

    banks.forEach(bank => {
      if (bank.id === currentBank.id) {
        for (const key in currentBank) {
          bank[key] = currentBank[key];
        }
      }
    })
  } else {
    const formData = new FormData(editForm)
    const newBank = {}
    formData.forEach((value, key) => {
      newBank[key] = value
    })
    newBank.id = Date.now().toString()
    banks.push(newBank)
  }

  clearBanks();
  renderList(banks);
  console.log(banks);
}

function clearBanks() {

}

const mortgageItemEl = document.querySelectorAll(".mortgage__banks-item");

banksListUl.addEventListener('click', (e) => {
  if (e.target.nodeName === 'UL') return

  const id = e.target.closest('.mortgage__banks-item').dataset.id
  currentBank = banks.find((bank) => bank.id === id);

  if (e.target.closest('.btn-close')) {
    banks = banks.filter(bank => bank.id !== id);
    renderList(banks);
    console.log(mortgageInfo);
    mortgageInfoBox.innerHTML = '';
    return
  }
  if (e.target.closest(".btn-edit")) {
    isEdit = true
    openModalBank(currentBank)
  }

  if (e.target.closest('.mortgage__banks-item')) {
    takeCurrentBank(currentBank)
  }
})

const mortgageInfo = document.querySelector(".mortgage__info-box");

function takeCurrentBank(bank) {
  const { id, name, interestRate, maxLoan, minPayment, loanTerm } = bank;
  const template = `
    <ul class="mortgage__info-list">
      <li class="mortgage__info-item">
        <p class="mortgage__banks-property info-text">Bank: </p>
        <p class="mortgage__banks-value info-text">${name}</p>
      </li>
      <li class="mortgage__info-item">
        <p class="mortgage__banks-property info-text">
          Interest Rate, % : 
        </p>
        <p class="mortgage__banks-value info-text">${interestRate}</p>
      </li>
      <li class="mortgage__info-item">
        <p class="mortgage__banks-property info-text">Mortgage size, $: </p>
        <p class="mortgage__banks-value info-text">${maxLoan}</p>
      </li>
      <li class="mortgage__info-item">
        <p class="mortgage__banks-property info-text">min Payment, $ :</p>
        <p class="mortgage__banks-value info-text">${minPayment}</p>
      </li>
      <li class="mortgage__info-item">
        <p class="mortgage__banks-property info-text">loan Term, month :</p>
        <p class="mortgage__banks-value info-text">${loanTerm}</p>
      </li>
    </ul>
    `;
  mortgageInfo.innerHTML = template;
}


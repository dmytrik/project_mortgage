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
</div>`;

divRoot.insertAdjacentHTML("beforeend", divRootChildren);

const banksListUl = document.createElement("ul");
banksListUl.classList.add("mortgage__banks-list");
const divRootChildrenRef = document.querySelector(".mortgage__list");

const renderList = (banks) => {
  banksListUl.innerHTML = '';
  const banksMarkup = banks.map(renderItem).join("");
  banksListUl.insertAdjacentHTML("beforeend", banksMarkup);
  divRootChildrenRef.append(banksListUl);
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

const btnEdit = document.querySelectorAll(".btn-edit");
btnEdit.forEach((button) => button.addEventListener("click", editBtn));



function editBtn(evt) {
  modal.classList.toggle("is-hidden");
  const bankId = evt.target.closest(".mortgage__banks-item").dataset.id;
  currentBank = banks.find((bank) => bank.id === bankId);
  editBank(currentBank);
}

function editBank(bank) {
  console.log(bank);
  const { elements } = editForm;
  console.log(elements);
  for (const key in bank) {
  editForm.elements[key] ? (editForm.elements[key].value = bank[key]) : false;
  }
  
}

editForm.addEventListener('submit', getChangedFormValue);

function getChangedFormValue(event) {
  event.preventDefault();
  modal.classList.toggle("is-hidden");
  for (const key in currentBank) {
    editForm.elements[key] ? ( currentBank[key] = editForm.elements[key].value ) : false;
  }
  console.log(currentBank);

  banks.forEach(bank => {
    if (bank.id === currentBank.id) {
      for (const key in currentBank) {
        bank[key] = currentBank[key];
        }
      }
  })
  console.log(banks);
  clearBanks();
  renderList(banks);

}

function clearBanks() {
  
}


// TODO: на наступне заняття!!!!!!!!!!

const btnClose = document.querySelectorAll(".btn-close");

btnClose.forEach((button) => button.addEventListener("click", closeBtn));

function closeBtn(evt) {
  console.log(evt.currentTarget.textContent);
}

const mortgageItemEl = document.querySelectorAll(".mortgage__banks-item");

banksListUl.addEventListener('click', (e) => {
  if(e.target.nodeName === 'UL') return
  if(e.target.closest('.mortgage__banks-item')) {
    if (e.target.nodeName === "BUTTON") {
      return;
    }
    takeCurrentBank(e)
  }
})

// mortgageItemEl.forEach((li) => li.addEventListener("click", takeCurrentBank));

const mortgageInfo = document.querySelector(".mortgage__info");
function takeCurrentBank(e) {
  console.log(e.target.dataset.id)
  if (e.target.nodeName === "BUTTON") {
    return;
  }
  let currentItem = e.target.dataset.id;
  let currentBank = banks.find((bank) => bank.id === currentItem);

  const { name, interestRate, maxLoan, minPayment, loanTerm } = currentBank;
  const template = `<h2 class="mortgage__title">Loan informations</h2>
  <div class="mortgage__info-box" data-info-box>
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



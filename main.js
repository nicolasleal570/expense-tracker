// Get the HTML elements
const $totalBalance = document.getElementById("totalBalance");
const $incomeTotalAmount = document.getElementById("incomeTotalAmount");
const $expenseTotalAmount = document.getElementById("expenseTotalAmount");
const $descriptiveText = document.getElementById("descriptiveText");
const $addNewTransactionForm = document.getElementById("addNewTransactionForm");
const $amountText = document.getElementById("amountText");
const $btnAddTransaction = document.getElementById("btnAddTransaction");
const $historyListContainer = document.getElementById("historyListContainer");

// Function to generate a Random ID
function generateUID() {
  return Math.random().toString(36).slice(2);
}

// Function to format date into the Card
function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[date.getMonth()];
}

// Array of data
const transactions = [
  { id: "1", description: "Item 1", amount: 12.6, date: new Date() },
  { id: "2", description: "Item 2", amount: -10.55, date: new Date() },
  { id: "3", description: "Item 3", amount: 45.0, date: new Date() },
];

/**
 * Append Card elements into the History list of transactions
 */
function addNewTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("div");

  // Add class to the main container
  item.classList.add("card");

  // Inject the HTML for paint the card
  item.innerHTML = `
    <div class="column-1">
        <p>${transaction.date.getDate()}</p>
        <p>${formatDate(transaction.date)}</p>
    </div>
    <div class="column-2">
        <p class="description">${transaction.description}</p>
        <p class="amount ${transaction.amount > 0 ? "income" : "expense"}">
          ${sign}$${Math.abs(transaction.amount).toFixed(2)}
        </p>
    </div>
  `;

  // Inject the card into the history list
  $historyListContainer.appendChild(item);
  updateUIValues();
}

/**
 * Handle the form submit and update the UI
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const { value: descriptiveValue } = $descriptiveText;
  const amountValue = Number.parseFloat($amountText.value);

  // Handle validation
  if (!descriptiveValue || !amountValue) {
    alert("Please, enter a valid description and amount");
    return;
  }

  const transaction = {
    id: generateUID(),
    description: descriptiveValue,
    amount: Number.parseFloat(amountValue),
    date: new Date(),
  };

  transactions.push(transaction);

  addNewTransactionDOM(transaction);

  updateUIValues();

  $descriptiveText.value = "";
  $amountText.value = "";
}

function updateUIValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  // Calculate balance total
  const totalBalance = amounts.reduce((acc, value) => acc + value, 0);

  // Calculate income total
  const incomeTotal = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);

  // Calculate expense total
  const expenseTotal = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);

  // Push HTML values into elements
  $totalBalance.innerText = `$${totalBalance}`;
  $incomeTotalAmount.innerText = `$${incomeTotal}`;
  $expenseTotalAmount.innerText = `$${Math.abs(expenseTotal)}`;
}

/**
 * Function where the app begin
 */
function init() {
  // Clear the history list
  $historyListContainer.innerHTML = "";

  // Print the dummy data into the DOM
  transactions.forEach(addNewTransactionDOM);
}

// Begin the app
init();
document.addEventListener("submit", handleFormSubmit);

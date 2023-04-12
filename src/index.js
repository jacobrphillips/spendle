//==========================================//
//============== VARIABLES =================//
//==========================================//

//Initialise variables for DOM manipulation of HTML elements
const budgetSearchBar = document.getElementById("budget-searchbar");
const budgetSubmit = document.getElementById("budget-submit");
const totalBudgetAmount = document.querySelector(".total-budget-amount");
const expenseNameSearchbar = document.getElementById('expenses-name-searchbar');
const expenseAmountSearchbar = document.getElementById('expenses-amount-searchbar');
const expenseSubmit = document.getElementById("expenses-submit");
const totalExpenseAmount = document.querySelector(".expenses-amount");
const listItemContainer = document.querySelector(".list-item-container");
const calculatorContainer = document.querySelector(".calculator-container");
const totalBalanceAmount = document.querySelector(".balance-amount");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const listAmount = document.querySelector('.list-amount');


//==========================================//
//============== UPDATE MODAL =================//
//==========================================//

const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');
const updateNameSearchbar = document.getElementById('update-expense-name-searchbar');
const updateAmountSearchbar = document.getElementById('update-expense-amount-searchbar');
const updateExpensesSubmit = document.getElementById('update-expenses-submit');
const overlay = document.getElementById('overlay');


//==========================================//
//==== EVENT LISTENER HANDLERS & FETCHES ===//
//==========================================//

let currentExpenseId;

//POST Budget Amount
const setBudgetAmount = async (e) => {
  e.preventDefault();
  const currentBudget = budgetSearchBar.value;
  const data = { budget_total: currentBudget };
  try {
    const response = await fetch("api/budgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    var newBudgetAmount = (totalBudgetAmount.textContent = result.budget_total);
    budgetSearchBar.value = "";

    calculatorColor();
    calculateBalance();
  } catch (error) {
    console.error(error);
  }
};

//POST Expense Name & Amount
const setExpenseInfo = async (e) => {
  e.preventDefault();
  const currentName = expenseNameSearchbar.value;
  const currentAmount = expenseAmountSearchbar.value;
  const data = { expense_name: currentName, expense_amount: currentAmount };
  try {
    const response = await fetch("api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
     currentExpenseId = result.expense_id;

    // Create a new expense list item
    const expenseListItem = document.createElement("div");
    expenseListItem.classList.add("list-item");
    expenseListItem.setAttribute('data-expense-id', `${currentExpenseId}`);


    const expenseListName = document.createElement("h6");
    expenseListName.classList.add("list-name");
    expenseListName.textContent = result.expense_name;
    expenseListItem.appendChild(expenseListName);

    const expenseListAmount = document.createElement("h6");
    expenseListAmount.classList.add("list-amount");
    expenseListAmount.textContent = result.expense_amount;
    expenseListItem.appendChild(expenseListAmount);

    const expenseEditButton = document.createElement("span");
    expenseEditButton.id = "add-button";
    expenseEditButton.setAttribute("data-modal-target", "#modal");
    expenseEditButton.classList.add("material-symbols-outlined");
    expenseEditButton.textContent = "edit_note";
    expenseListItem.appendChild(expenseEditButton);

    expenseEditButton.addEventListener("click", (e) => {
      const expenseId = e.target.parentElement.getAttribute("data-expense-id");
      const modal = document.querySelector("#modal");
      openModal(modal);
      updateNameSearchbar.value = e.target.parentElement.querySelector(".list-name").textContent;
      updateAmountSearchbar.value = e.target.parentElement.querySelector(".list-amount").textContent;
      currentExpenseId = expenseId;
    });
    
    function openModal(modal) {
      if (modal == null) {
        return;
      } else {
        modal.classList.add("active");
        overlay.classList.add("active");
      }
    }
    
    const expenseDeleteButton = document.createElement("span");
    expenseDeleteButton.id = "delete-button";
    expenseDeleteButton.classList.add("material-symbols-outlined");
    expenseDeleteButton.textContent = "delete";
    expenseListItem.appendChild(expenseDeleteButton);

    expenseDeleteButton.addEventListener("click", deleteExpense);

    listItemContainer.appendChild(expenseListItem);

    var expenseName = result.expense_name;
    var expenseAmount = (totalExpenseAmount.textContent =
      result.expense_amount);

    const newTotalExpenseAmount = calculateTotalExpenseAmount();
    totalExpenseAmount.textContent = newTotalExpenseAmount.toFixed(0);

    expenseNameSearchbar.value = "";
    expenseAmountSearchbar.value = "";

    calculatorColor();
    calculateBalance();

  } catch (error) {
    console.error(error);
  }
};



//PATCH for Editing Expense Info
const updateExpenseInfo = async (e) => {
    e.preventDefault();
    var updatedName = updateNameSearchbar.value;
    var updatedAmount = updateAmountSearchbar.value;
    const expenseId = currentExpenseId;
  
    const data = { expense_id: expenseId, expense_name: updatedName, expense_amount: updatedAmount };
    try {
      const response = await fetch(`api/expenses/${expenseId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
  
      // Update the expense's information in the DOM
      const expenseListItem = document.querySelector(`[data-expense-id="${expenseId}"]`);
      expenseListItem.querySelector(".list-name").textContent = result.expense_name;
      expenseListItem.querySelector(".list-amount").textContent = result.expense_amount;

      totalExpenseAmount.textContent = result.expense_amount
  
      const newTotalExpenseAmount = calculateTotalExpenseAmount();
      totalExpenseAmount.textContent = newTotalExpenseAmount.toFixed(0);
  
      updateNameSearchbar.value = "";
      updateAmountSearchbar.value = "";

      calculatorColor();
      calculateBalance();
      
    } catch (error) {
      console.error(error);
    }
  };


//DELETE Expense 
const deleteExpense = async (e) => {
  const expenseId = e.target.parentElement.getAttribute("data-expense-id");
  try {
    const response = await fetch(`api/expenses/${expenseId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      e.target.parentElement.remove();
      const newTotalExpenseAmount = calculateTotalExpenseAmount();
      totalExpenseAmount.textContent = newTotalExpenseAmount.toFixed(0);
      calculatorColor();
      calculateBalance();
    } else {
      throw new Error("Failed to delete expense");
    }
  } catch (error) {
    console.error(error);
  }
};

//==========================================//
//============== EVENT LISTENERS ===========//
//==========================================//

//Event Listeners
budgetSubmit.addEventListener("click", setBudgetAmount);
expenseSubmit.addEventListener("click", setExpenseInfo);
updateExpensesSubmit.addEventListener('click', updateExpenseInfo)



//Event Listener for Edit Modal



  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal)
    });
  });
  
function closeModal(modal) {
  if (modal == null) {
    return;
  } else {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
}

//==========================================//
//============== MATH FUNCTIONS ===========//
//==========================================//

//Calculate total of expense items created
const calculateTotalExpenseAmount = () => {
  let total = 0;
  const expenseAmounts = document.querySelectorAll(".list-amount");
  expenseAmounts.forEach((expenseAmount) => {
    total += Number(expenseAmount.textContent);
  });

  return total;
};


//Changes the Calculator's color based on the expense and budget difference
function calculatorColor() {
  const budgetAmount = Number(totalBudgetAmount.textContent);
  const expenseAmount = Number(totalExpenseAmount.textContent);

  if (expenseAmount > budgetAmount) {
    calculatorContainer.style.backgroundColor = "#ff7676";
    totalExpenseAmount.style.color = "#fff";
  } else if (expenseAmount < budgetAmount) {
    calculatorContainer.style.backgroundColor = "#69DA65";
    totalExpenseAmount.style.color = "#fff";
  } else if (expenseAmount == budgetAmount){
    calculatorContainer.style.backgroundColor = "#76bbff";
    totalExpenseAmount.style.color = "#fff";
  } else {
    calculatorContainer.style.backgroundColor = "#ffc876";
    totalExpenseAmount.style.color = "#fff";
  }
}

//Calculates the difference between the total budget and listed expenses
function calculateBalance() {
  const budgetAmount = Number(totalBudgetAmount.textContent);
  const expenseAmount = Number(totalExpenseAmount.textContent);
  const balanceAmount = budgetAmount - expenseAmount;
  totalBalanceAmount.textContent = balanceAmount;
  highlightNegativeExpense(balanceAmount);
}



function highlightNegativeExpense(balanceAmount) {
  const expenseItems = document.querySelectorAll(".list-item");
  const expenseAmount = Number(totalExpenseAmount.textContent);
  // let currentListAmount = Number(listAmount.textContent);

  expenseItems.forEach((expenseItem) => {
     if (balanceAmount > 0){
      expenseItem.classList.remove("list-item-equal");
      expenseItem.classList.remove("list-item-negative");
      expenseItem.classList.toggle("list-item-positive");
    } else if (balanceAmount < 0) {
      expenseItem.classList.remove("list-item-equal");
      expenseItem.classList.remove("list-item-positive");
      expenseItem.classList.toggle("list-item-negative");
    }  else if (balanceAmount == 0){
      expenseItem.classList.remove("list-item-negative");
      expenseItem.classList.remove("list-item-positive");
      expenseItem.classList.toggle("list-item-equal");
    } 
  });
}


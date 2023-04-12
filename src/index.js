console.log("i work");

//DOM manipulation of HTML elements
const budgetSearchBar = document.getElementById("budget-searchbar");
const budgetSubmit = document.getElementById("budget-submit");
const totalBudgetAmount = document.querySelector(".total-budget-amount");
const expenseNameSearchbar = document.getElementById('expenses-name-searchbar');
const expenseAmountSearchbar = document.getElementById('expenses-amount-searchbar');
const expenseSubmit = document.getElementById('expenses-submit');
const totalExpenseAmount = document.querySelector('.expenses-amount');
const listItemContainer = document.querySelector('.list-item-container');
const calculatorContainer = document.querySelector('.calculator-container');

// //Creates template for list item to by dynamically displayed
// const expenseListItem = document.createElement('div');
// expenseListItem.classList.add('list-item');
// const expenseListName = document.createElement('h6');
// expenseListName.classList.add('list-name');
// const expenseListAmount = document.createElement('h6');
// expenseListAmount.classList.add('list-amount');
// const expenseEditButton = document.createElement('span')
// expenseEditButton.id = 'add-button';
// expenseEditButton.classList.add('material-symbols-outlined'); 
// expenseEditButton.textContent = 'edit_note';
// const expenseDeleteButton = document.createElement('span');
// expenseDeleteButton.id = 'delete-button';
// expenseDeleteButton.classList.add('material-symbols-outlined'); // add a class to the element
// expenseDeleteButton.textContent = 'delete';

// expenseListItem.appendChild(expenseListName);
// expenseListItem.appendChild(expenseListAmount);
// expenseListItem.appendChild(expenseEditButton);
// expenseListItem.appendChild(expenseDeleteButton);

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
    } catch (error) {
      console.error(error);
    }
  }

  //Calculate total of expense items created
  const calculateTotalExpenseAmount = () => {
    let total = 0;
    const expenseAmounts = document.querySelectorAll('.list-amount');
    expenseAmounts.forEach(expenseAmount => {
      total += Number(expenseAmount.textContent);
    });
    return total;
  }

  //POST Expense Name & Amount
  const setExpenseInfo = async (e) => {
    e.preventDefault();
    const currentName = expenseNameSearchbar.value;
    const currentAmount = expenseAmountSearchbar.value;
    const data = { expense_name: currentName, expense_amount: currentAmount };
    try {
        const response = await fetch("api/expenses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log('i worked')
        const result = await response.json();

        // Create a new expense list item
        const expenseListItem = document.createElement('div');
        expenseListItem.classList.add('list-item');

        const expenseListName = document.createElement('h6');
        expenseListName.classList.add('list-name');
        expenseListName.textContent = result.expense_name;
        expenseListItem.appendChild(expenseListName);

        const expenseListAmount = document.createElement('h6');
        expenseListAmount.classList.add('list-amount');
        expenseListAmount.textContent = result.expense_amount;
        expenseListItem.appendChild(expenseListAmount);

        const expenseEditButton = document.createElement('span')
        expenseEditButton.id = 'add-button';
        expenseEditButton.classList.add('material-symbols-outlined');
        expenseEditButton.textContent = 'edit_note';
        expenseListItem.appendChild(expenseEditButton);

        const expenseDeleteButton = document.createElement('span');
        expenseDeleteButton.id = 'delete-button';
        expenseDeleteButton.classList.add('material-symbols-outlined');
        expenseDeleteButton.textContent = 'delete';
        expenseListItem.appendChild(expenseDeleteButton);


        listItemContainer.appendChild(expenseListItem);

        var expenseName = (result.expense_name);
        var expenseAmount = (totalExpenseAmount.textContent = result.expense_amount);

        const newTotalExpenseAmount = calculateTotalExpenseAmount();
        totalExpenseAmount.textContent = newTotalExpenseAmount.toFixed(0);

        expenseNameSearchbar.value = "";
        expenseAmountSearchbar.value = "";

        calculatorColor();
    } catch (error) {
        console.error(error);
    }
}


budgetSubmit.addEventListener("click", setBudgetAmount);
expenseSubmit.addEventListener('click', setExpenseInfo);



function calculatorColor() {
    const expenseAmount = Number(totalExpenseAmount.textContent);
    const budgetAmount = Number(totalBudgetAmount.textContent);
  
    if (expenseAmount > budgetAmount) {
      calculatorContainer.style.backgroundColor = '#ff7676';
      totalExpenseAmount.style.color = '#fff';
    } else if (expenseAmount < budgetAmount) {
      calculatorContainer.style.backgroundColor = '#69DA65';
      totalExpenseAmount.style.color = '#fff';
    } else {
      calculatorContainer.style.backgroundColor = '#ffc876';
      totalExpenseAmount.style.color = '#fff';
    }
  }
  
function calculateBalance()
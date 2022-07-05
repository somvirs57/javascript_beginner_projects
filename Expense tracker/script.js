import incomeObj from './income.js';
import expenseObj from './expense.js';



// incomeTracker.initiate();

class Tracker {
  constructor() {
    this.incomeObj = incomeObj;
    this.expenseObj = expenseObj;
    this.incomeBtn = document.getElementById('incomeBtn');
    this.expenseBtn = document.getElementById('expenseBtn');
    this.summaryBtn = document.getElementById('summaryBtn');
    this.incomeDiv = document.querySelector('.income-container');
    this.expenseDiv = document.querySelector('.expense-container');
    this.summaryDiv = document.querySelector('.summary-container');
    this.tabDivs = [this.incomeDiv, this.expenseDiv, this.summaryDiv];
    this.tabBtns = [this.incomeBtn, this.expenseBtn, this.summaryBtn];

    this.summaryBudgetTableBody = document.getElementById(
      'summaryIncomeBudgetTableBody'
    );
    this.summaryCategoryExpense = document.getElementById(
      'summaryCatExpensesList'
    );

    //event handlers
    this.incomeBtn.addEventListener('click', this.showTab.bind(this));
    this.expenseBtn.addEventListener('click', this.showTab.bind(this));
    this.summaryBtn.addEventListener('click', this.showTab.bind(this));
  }
  showTab(e) {
    const clickedTab = e.target.id;
    const container = clickedTab.split('Btn')[0];
    const containerName = `${clickedTab.split('Btn')[0]}-container`;
    this.tabDivs.forEach(div => {
      if (div.classList.contains(containerName))
        return div.classList.remove('hidden');
      div.classList.add('hidden');
    });

    // add active button class
    this.tabBtns.forEach(btn => {
      if (btn.id === e.target.id) return btn.classList.add('active-tab');
      btn.classList.remove('active-tab');
    });
  }
  getBudgetList() {
    const budgetCategories = this.incomeObj.budgetCategories;
    budgetCategories.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${item.category}</td><td>${item.budget}</td>`;
      this.summaryBudgetTableBody.insertAdjacentElement('beforeBegin', tr);
    });
  }
  getCategoryExpenses() {
    const expenseList = this.expenseObj.getcategoryExpenses();
    const exhaustedDivWidthConstant = 322;
    expenseList.forEach(item => {
      // row element
      const row = document.createElement('tr');
      //cols
      const itemCol = document.createElement('td');
      const exhaustCol = document.createElement('td');
      const totalCol = document.createElement('td');
      // div for showing how much is exhausted from a category
      const exhaustedDiv = document.createElement('div');
      exhaustedDiv.className = 'exhaustionDiv';
      exhaustedDiv.style.width = `${exhaustedDivWidthConstant}px`;
      const innerExhaustionDiv = document.createElement('div');
      innerExhaustionDiv.className = 'innerexhaustionDiv';
      exhaustedDiv.append(innerExhaustionDiv);
      //inner exhaust width calculations
      const exhaustedPercent = item.expense / item.total;
      const innerWidth = exhaustedPercent * exhaustedDivWidthConstant;
      innerExhaustionDiv.style.width = `${innerWidth}px`;

      // putting values into table
      itemCol.textContent = `${item.tag}`;
      exhaustCol.append(exhaustedDiv);
      totalCol.textContent = `${item.expense}/${item.total}`;
      row.append(itemCol, exhaustCol, totalCol);
      this.summaryCategoryExpense.insertAdjacentElement('afterbegin', row);
    });
  }
  getSavings() {
    const income = this.incomeObj.income;
    const expense = this.expenseObj.getTotalExpense();
    const saving = income - expense;
    const savingSpan = document.getElementById('summarySpan');
    savingSpan.textContent = saving;
  }

  initiate() {
    console.log('initiating main tracker');
    this.incomeObj.initiate();
    this.expenseObj.initiate();
    this.getBudgetList();
    this.getCategoryExpenses();
    this.getSavings();
  }
}

const tracker = new Tracker();
tracker.initiate();

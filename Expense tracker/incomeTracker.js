import incomeObj from './income.js';

incomeObj.consoleStorage();

class IncomeTracker {
  constructor() {
    this.income = incomeObj;
    this.savings = this.income.income - this.income.budget;
    this.incomeAddForm = document.getElementById('incomeAddForm');
    this.budgetAddBtn = document.getElementById('budgetAddBtn');
    this.budgetTable = document.getElementById('budgetTable');
    this.incomeBudgetTableBody = document.getElementById(
      'incomeBudgetTableBody'
    );
    this.incomeChart = document.getElementById('incomeChart');
    this.incBudComparisonChart = document.getElementById('incBudCompareChart');
    this.incomeCategories = this.income.getIncomeCategories();
    this.budgetCategories = this.income.getBudgetCategories();
    this.incomeChartTableBody = document.getElementById('incomeChartTableBody');
    this.budgetChartTableBody = document.getElementById('budgetChartTableBody');
    this.savingValue = document.getElementById('estimatedSavingsValue');

    // Event Handlers
    this.incomeAddForm.addEventListener(
      'submit',
      this.addIncomeForm.bind(this)
    );
    this.budgetAddBtn.addEventListener('click', this.addBudgetForm.bind(this));
    this.budgetTable.addEventListener('click', this.removeBudgetRow.bind(this));
  }

  initiate() {
    document.getElementById('incomeValue').textContent = this.income.income;
    document.getElementById('incomeBudgetValue').textContent =
      this.income.budget;
    this.mapBudgetTable();
    this.addIncomeChart();
    this.addBudgetCompareChart();
  }

  addIncomeForm(e) {
    e.preventDefault();

    const newIncomeInput = document.getElementById('newIncomeInput').value;
    const newSourceInput = document.getElementById(
      'newIncomeSourceInput'
    ).value;
    const existingSourceInput = document.getElementById(
      'existingIncomeSourceInput'
    ).value;
    const newSource = newSourceInput || existingSourceInput;
    if (newIncomeInput !== '') {
      this.income.addIncome(newIncomeInput, newSource);
    }
  }

  mapBudgetTable() {
    this.budgetCategories.forEach(item => {
      const tr = document.createElement('tr');
      tr.setAttribute('id', `bRow${item.id}`);
      tr.innerHTML = `<td>${item.category}</td><td>${item.budget}</td>
                        <td><button id="budDelBtn${item.id}" class="del-btn">delete</button></td>`;
      this.incomeBudgetTableBody.insertAdjacentElement('beforeBegin', tr);
    });
  }

  addBudgetForm() {
    const newBudget = document.getElementById('budgetInput').value;
    const newBudgetCategory = document.getElementById(
      'budgetCategoryInput'
    ).value;
    if (newBudget !== '') {
      this.income.addBudget(newBudget, newBudgetCategory);
    }
  }
  removeBudgetRow(e) {
    const btnId = e.target.id;
    if (btnId.includes('budDelBtn')) {
      const id = btnId.split('budDelBtn')[1];
      const budRowId = `bRow${id}`;
      const budRow = document.getElementById(budRowId);
      budRow.remove();
      this.income.removeItem('budget', id);
    }
  }
  addIncomeChart() {
    const incomeLabels = [];
    const incomeData = [];
    this.incomeCategories.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<tr><td>-${item.source}</td><td>${item.income}</td></tr>`;
      this.incomeChartTableBody.insertAdjacentElement('beforeEnd', tr);
      incomeLabels.push(item.source);
      incomeData.push(item.income);
    });
    const data = {
      labels: incomeLabels,
      datasets: [
        {
          data: incomeData,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
        },
      ],
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Income Sources',
          },
        },
      },
    };

    const myChart = new Chart(this.incomeChart, config);
  }
  addBudgetCompareChart() {
    this.budgetCategories.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<tr><td>-${item.category}</td><td>${item.budget}</td></tr>`;
      this.budgetChartTableBody.insertAdjacentElement('beforeEnd', tr);
    });
    this.savingValue.textContent = this.savings;
    const data = {
      labels: ['Income/budget'],
      datasets: [
        {
          label: 'Income',
          data: [this.income.income],
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgb(150, 230, 132)',
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: 'Budget',
          data: [this.income.budget],
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: 'Savings',
          data: [this.savings],
          borderColor: 'rgb(120, 162, 235)',
          backgroundColor: 'rgb(255, 200, 132)',
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    };
    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Income Budget Comparison ',
          },
        },
      },
    };

    const myChart = new Chart(this.incBudComparisonChart, config);
  }
}

const incomeTracker = new IncomeTracker();

export default incomeTracker;

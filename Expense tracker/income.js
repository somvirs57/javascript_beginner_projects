class Income {
  constructor() {
    // initial values
    this.income = this.calculateCategory('income');
    // this.incomeCategories = this.getStorageItem('incomeCategories');
    this.budget = this.calculateCategory('budget'); //add a new method to calc budget from storage values
    // this.budgetCategories = this.getStorageItem('budgetCategories');
    this.savings = this.income - this.budget;
    this.incomeCategories = this.getIncomeCategories();
    this.budgetCategories = this.getBudgetCategories();

    // ui components
    this.incomeAddForm = document.getElementById('incomeAddForm');
    this.budgetAddBtn = document.getElementById('budgetAddBtn');
    this.budgetTable = document.getElementById('budgetTable');
    this.incomeBudgetTableBody = document.getElementById(
      'incomeBudgetTableBody'
    );
    this.incomeChart = document.getElementById('incomeChart');
    this.incBudComparisonChart = document.getElementById('incBudCompareChart');
    this.incomeChartTableBody = document.getElementById('incomeChartTableBody');
    this.budgetChartTableBody = document.getElementById('budgetChartTableBody');
    this.savingValue = document.getElementById('estimatedSavingsValue');
    this.summaryIncomeChart = document.getElementById('SummaryIncomeChart');

    // Event Handlers
    this.incomeAddForm.addEventListener(
      'submit',
      this.addIncomeForm.bind(this)
    );
    this.budgetAddBtn.addEventListener('click', this.addBudgetForm.bind(this));
    this.budgetTable.addEventListener('click', this.removeBudgetRow.bind(this));
  }

  // internal calculations
  calculateCategory(category) {
    if (this.getStorageItem(category + 'Categories')) {
      const categories = this.getStorageItem(category + 'Categories');
      return categories.reduce(
        (acc, curr) => (acc += parseInt(curr[category])),
        0
      );
    } else {
      return 0;
    }
  }

  setStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getStorageItem(item) {
    const localStorageItem = localStorage.getItem(item);
    if (localStorageItem !== null) {
      return JSON.parse(localStorageItem);
    } else {
      return undefined;
    }
  }
  addIncome(newIncome, source) {
    //   instantiating new variables to be pushed into storage
    let newCatArr = [];

    // get Latest id from last saved id
    const lastIncomeCatId = this.getLastCategoryId('incomeCategories');
    const newId = lastIncomeCatId + 1;

    const catObj = {
      id: newId,
      source: source,
      income: newIncome,
    };
    // getting stored values
    const storageIncomeCategories = this.getStorageItem('incomeCategories');
    // categories
    if (storageIncomeCategories) {
      newCatArr = [...storageIncomeCategories, catObj];
    } else {
      newCatArr.push(catObj);
    }

    // changing obj income and categories
    this.incomeCategories = newCatArr;

    // putting new categories into storage
    this.setStorageItem('incomeCategories', newCatArr);
    location.reload(); // to reload the page
  }
  getLastCategoryId(categoryName) {
    const storageCategories = this.getStorageItem(categoryName);
    if (storageCategories) {
      const lastCategory = storageCategories[storageCategories.length - 1];
      return lastCategory.id;
    }
    return 0;
  }

  addBudget(newBudget, newCategory) {
    //   instantiating new variables to be pushed into storage
    let newCatArr = [];

    // get Latest id from last saved id
    const lastBudgetCatId = this.getLastCategoryId('budgetCategories');
    const newId = lastBudgetCatId + 1;

    // new obj
    const catObj = {
      id: newId,
      category: newCategory,
      budget: newBudget,
    };

    // getting stored values
    const storageBudgetCategories = this.getStorageItem('budgetCategories');

    // categories
    if (storageBudgetCategories) {
      newCatArr = [...storageBudgetCategories, catObj];
    } else {
      newCatArr.push(catObj);
    }

    // changing obj categories
    this.budgetCategories = newCatArr;

    // putting new income and categories into storage
    this.setStorageItem('budgetCategories', newCatArr);
    location.reload(); // to reload the page
  }

  getBudgetCategories() {
    if (this.getStorageItem('budgetCategories'))
      return this.getStorageItem('budgetCategories');
    return [];
  }
  getIncomeCategories() {
    if (this.getStorageItem('incomeCategories'))
      return this.getStorageItem('incomeCategories');
    return [];
  }
  removeItem(item, id) {
    const itemCategoryName = item + 'Categories';
    const itemCategory = this.getStorageItem(itemCategoryName);
    const newCategoryArray = itemCategory.filter(item => item.id != id);
    this.setStorageItem(itemCategoryName, newCategoryArray);
    location.reload();
  }

  // ui interactions
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
      this.addIncome(newIncomeInput, newSource);
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
      this.addBudget(newBudget, newBudgetCategory);
    }
  }
  removeBudgetRow(e) {
    const btnId = e.target.id;
    if (btnId.includes('budDelBtn')) {
      const id = btnId.split('budDelBtn')[1];
      const budRowId = `bRow${id}`;
      const budRow = document.getElementById(budRowId);
      budRow.remove();
      this.removeItem('budget', id);
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
            'rgb(1, 142, 203)',
            'rgb(106, 144, 204)',
            'rgb(1, 142, 203)',
            'rgb(102, 55, 221)',
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
    const myChart2 = new Chart(this.summaryIncomeChart, config);
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
          data: [this.income],
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgb(150, 230, 132)',
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: 'Budget',
          data: [this.budget],
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
  initiate() {
    document.getElementById('incomeValue').textContent = this.income;
    document.getElementById('incomeBudgetValue').textContent = this.budget;
    this.mapBudgetTable();
    this.addIncomeChart();
    this.addBudgetCompareChart();
  }
  consoleStorage() {
    console.log(this.income, this.incomeCategories);
    console.log(this.budget, this.budgetCategories);
  }
}
const incomeObj = new Income();

export default incomeObj;

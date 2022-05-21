class Income {
  constructor() {
    this.income = this.calculateCategory('income');
    this.incomeCategories = this.getStorageItem('incomeCategories');
    this.budget = this.calculateCategory('budget'); //add a new method to calc budget from storage values
    this.budgetCategories = this.getStorageItem('budgetCategories');
  }
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
    localStorage.setItem('budget', JSON.stringify(newBud));
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

  consoleStorage() {
    console.log(this.income, this.incomeCategories);
    console.log(this.budget, this.budgetCategories);
  }
}
const incomeObj = new Income();

export default incomeObj;

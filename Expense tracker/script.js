import incomeTracker from './incomeTracker.js';

// incomeTracker.initiate();

class Tracker {
  constructor() {
    this.incomeTracker = incomeTracker;
    this.incomeBtn = document.getElementById('incomeBtn');
    this.expenseBtn = document.getElementById('expenseBtn');
    this.summaryBtn = document.getElementById('summaryBtn');
    this.tabBtns = [this.incomeBtn, this.expenseBtn, this.summaryBtn];

    //event handlers
    this.incomeBtn.addEventListener('click', this.showTab.bind(this));
    this.expenseBtn.addEventListener('click', this.showTab.bind(this));
    this.summaryBtn.addEventListener('click', this.showTab.bind(this));
  }
  showTab(e) {
    this.tabBtns.forEach(btn => {
      if (btn.id === e.target.id) {
        btn.classList.add('active-tab');
      } else {
        btn.classList.remove('active-tab');
      }
    });
  }

  initiate() {
    console.log('initiating main tracker');
    this.incomeTracker.initiate();
  }
}

const tracker = new Tracker();
tracker.initiate();

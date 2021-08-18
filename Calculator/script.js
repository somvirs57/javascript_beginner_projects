'use strict';

// Initiating all buttons and input area
const numberButtons = document.querySelectorAll('.btn');
const opBtns = document.querySelectorAll('.op-btn');
const inputArea = document.querySelector('input');
const clearBtn = document.querySelector('.c');
const acBtn = document.querySelector('.ac');
const equalBtn = document.querySelector('.equal');

// empty string to join all input to
let inputValue = '';

// event listener for number buttons
numberButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    // console.log(this.textContent);
    inputValue = inputValue + this.textContent;
    if (inputArea.value === '0') {
      inputArea.value = '';
      inputArea.value = inputValue;
    } else {
      inputArea.value = inputValue;
    }
  });
});

// event listener for operator buttons
opBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    // console.log(this.textContent);
    inputValue = inputValue + ' ' + this.textContent + ' ';
    inputArea.value = inputValue;
  });
});

// event listener for AC button
acBtn.addEventListener('click', function () {
  inputArea.value = '0';
  inputValue = '';
});

// event listener for C(Clear) button
clearBtn.addEventListener('click', function () {
  if (inputArea.value.length === 1) {
    inputArea.value = '0';
    inputValue = '';
  } else {
    inputValue = inputArea.value.slice(0, -1);
    inputArea.value = inputValue;
  }
});

// event listener for Equal button
equalBtn.addEventListener('click', function () {
  inputArea.value = eval(inputArea.value);
  inputValue = '';
});

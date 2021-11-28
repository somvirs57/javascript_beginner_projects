'use strict';

const btns = document.querySelectorAll('.btn');
const activePlayerSpan = document.querySelector('.active-player');
const notif = document.querySelector('.notif');
const notifWinner = document.querySelector('.winner-notif');
const resetBtn = document.querySelector('.reset-btn');
const playAgainBtn = document.querySelector('.play-agn-btn');

let active = 'X';
activePlayerSpan.textContent = active;

const changeActive = (from_value, to_value) => {
  //   btn.classList.add(`player-${from_value}`);
  active = to_value;
  activePlayerSpan.textContent = to_value;
  activePlayerSpan.classList.add(`player-${to_value}`);
  activePlayerSpan.classList.remove(`player-${from_value}`);
};

const isWinner = V => {
  //   button vlues
  const b0 = btns[0].textContent;
  const b1 = btns[1].textContent;
  const b2 = btns[2].textContent;
  const b3 = btns[3].textContent;
  const b4 = btns[4].textContent;
  const b5 = btns[5].textContent;
  const b6 = btns[6].textContent;
  const b7 = btns[7].textContent;
  const b8 = btns[8].textContent;

  //   winning conditions
  const c1 = b0 === V && b1 === V && b2 === V;
  const c2 = b3 === V && b4 === V && b5 === V;
  const c3 = b6 === V && b7 === V && b8 === V;
  const c4 = b0 === V && b3 === V && b6 === V;
  const c5 = b1 === V && b4 === V && b7 === V;
  const c6 = b2 === V && b5 === V && b8 === V;
  const c7 = b0 === V && b4 === V && b8 === V;
  const c8 = b2 === V && b4 === V && b6 === V;

  if (c1 || c2 || c3 || c4 || c5 || c6 || c7 || c8) {
    return true;
  } else {
    return false;
  }
};

const isStale = () => {
  const btnsArr = Array.from(btns);
  const btn = btnsArr.filter(btn => btn.disabled == false);
  console.log(btn.length);
  if (btn.length === 0) {
    return true;
  } else {
    return false;
  }
};

const showNotif = msg => {
  notif.classList.remove('hidden');
  notifWinner.textContent = msg;
  resetBtn.setAttribute('disabled', true);
  btns.forEach(btn => btn.setAttribute('disabled', true));
};

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = active;
    btn.setAttribute('disabled', true);
    if (active === 'O') {
      if (isWinner(active)) {
        showNotif(`${active} won the game !!`);
      } else {
        if (isStale()) showNotif('Game is Stale');
      }
      btn.classList.add('player-O');
      changeActive('O', 'X');
      //   active = 'X';
      //   activePlayerSpan.textContent = 'X';
      //   activePlayerSpan.classList.add('player-x');
      //   activePlayerSpan.classList.remove('player-o');
    } else {
      if (isWinner(active)) {
        showNotif(`${active} won the game !!`);
      } else {
        if (isStale()) showNotif('Game is Stale');
      }
      btn.classList.add('player-X');
      changeActive('X', 'O');
      //   active = 'O';
      //   activePlayerSpan.textContent = 'O';
      //   activePlayerSpan.classList.add('player-o');
      //   activePlayerSpan.classList.remove('player-x');
    }
  });
});

const resetGame = () => {
  btns.forEach(btn => {
    btn.removeAttribute('disabled');
    btn.textContent = '';
  });
  notif.classList.add('hidden');
  active = 'X';
  activePlayerSpan.textContent = active;
  activePlayerSpan.classList.remove('player-O');
  activePlayerSpan.classList.add(`player-X`);
  btns.forEach(btn => btn.classList.remove('player-O'));
  resetBtn.removeAttribute('disabled');
};

resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

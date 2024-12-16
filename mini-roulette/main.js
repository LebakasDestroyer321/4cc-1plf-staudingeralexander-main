import { PLACE_YOUR_BETS, START_MONEY, MULTIPLIER } from './settings.js';
import * as Helpers from './helpers.js';

const board = document.getElementById('board');
const spinButton = document.querySelector('#spin');
const resetButton = document.querySelector('#reset');
const infoHeadline = document.querySelector('h4');
const creditHeadline = document.querySelector('h3');

let betNumbers = [];
let money = START_MONEY;
let betPhase = true;

function canBet() {
  return money > 0 && betPhase;
}

function createBoard() {
  //code-here
  board.innerHTML = ''; // Reset the board

  for (let i = 0; i <= 36; i++) {
    const numberCell = document.createElement('div');

    if (i === 0) {
      numberCell.classList.add('number-zero');
    } else {
      numberCell.classList.add('number');
      numberCell.classList.add(i % 2 === 0 ? 'even' : 'odd');
    }

    numberCell.dataset.number = i; // Assign the number as a data attribute
    numberCell.textContent = i; // Display the number inside the cell
    board.appendChild(numberCell);
  }


}

board.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('number') || e.target.classList.contains('number-zero')) {
    e.target.classList.add('hover');
  }
   console.log(e.target);
   console.log(e.currentTarget);
});

board.addEventListener('mouseout', (e) => {
  if (e.target.classList.contains('hover')) {
    e.target.classList.remove('hover');
  }
  console.log(e.target);
  console.log(e.currentTarget);
});

board.addEventListener('click', (e) => {
  // code-here
  if (canBet() && (e.target.classList.contains('number') || e.target.classList.contains('number-zero'))) {
    const number = parseInt(e.target.dataset.number, 10);

    if (!betNumbers.includes(number)) {
      betNumbers.push(number);
      e.target.classList.add('bet');
      money -= 10;
      Helpers.setMoney(creditHeadline, money);

      if (money <= 0) {
        betPhase = false;
      }
    }

    spinButton.disabled = false;
    resetButton.disabled = false;
  }

  document.querySelector('spin').addEventListener('click',() =>
  alert('clicked'));
});

spinButton.addEventListener('click', () => {
  const randomNumber = Math.floor(Math.random() * 37);
  const winnerCell = [...board.children].find(cell => parseInt(cell.dataset.number, 10) === randomNumber);

  if (winnerCell) {
    winnerCell.classList.add('winner');
  }

  if (betNumbers.includes(randomNumber)) {
    const winnings = betNumbers.length * MULTIPLIER * 10;
    money += winnings;
    infoHeadline.textContent = `${randomNumber} - Winner`;
  } else {
    infoHeadline.textContent = `${randomNumber} - Casino takes it all`;
  }

  Helpers.setMoney(creditHeadline, money);

  if (money <= 0) {
    Helpers.setMoneyIsOver(infoHeadline);
    betPhase = false;
  }

  betNumbers = [];
});

resetButton.addEventListener('click', () => {
  board.replaceChildren();
  createBoard();
  spinButton.disabled = true;
  resetButton.disabled = true;
  infoHeadline.innerText = PLACE_YOUR_BETS;
  betPhase = true;
  betNumbers = [];
});

infoHeadline.innerText = PLACE_YOUR_BETS;
Helpers.setMoney(creditHeadline, money);
createBoard();

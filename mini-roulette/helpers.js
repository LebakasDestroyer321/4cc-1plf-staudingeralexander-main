export function setMoney(element, money) {
  element.innerText = `Credits: ${money}`;
}

export function setMoneyIsOver(element) {
  element.innerText = 'You lost all your credits, game over!';
}

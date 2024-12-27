// script.js
const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

let firstCard = null;
let secondCard = null;
let score = 0;
let lockBoard = false;
let matches = 0;

const icons = [
  "🍎", "🍎",
  "🍌", "🍌",
  "🍇", "🍇",
  "🍉", "🍉",
  "🍓", "🍓",
  "🍒", "🍒",
  "🍍", "🍍",
  "🥝", "🥝"
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(icons);
  icons.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.icon;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

  if (isMatch) {
    disableCards();
    matches++;
    score++;
    scoreElement.textContent = `Score: ${score}`;

    if (matches === icons.length / 2) {
      restartButton.classList.remove("hidden");
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.textContent = "";
    secondCard.textContent = "";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function restartGame() {
  gameBoard.innerHTML = "";
  score = 0;
  matches = 0;
  scoreElement.textContent = `Score: ${score}`;
  restartButton.classList.add("hidden");
  createBoard();
}

// Initialize the game
createBoard();
restartButton.addEventListener("click", restartGame);

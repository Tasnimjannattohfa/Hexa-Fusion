// script.js
const choices = document.querySelectorAll(".choice");
const playerChoiceElement = document.getElementById("player-choice");
const computerChoiceElement = document.getElementById("computer-choice");
const winnerElement = document.getElementById("winner");
const restartButton = document.getElementById("restart-button");

const options = ["rock", "paper", "scissors"];
let playerChoice = "";
let computerChoice = "";

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    playerChoice = choice.dataset.choice;
    computerChoice = options[Math.floor(Math.random() * options.length)];

    playerChoiceElement.textContent = `Your Choice: ${playerChoice}`;
    computerChoiceElement.textContent = `Computer Choice: ${computerChoice}`;

    determineWinner();
  });
});

function determineWinner() {
  if (playerChoice === computerChoice) {
    winnerElement.textContent = "Winner: It's a Tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    winnerElement.textContent = "Winner: Player Wins!";
  } else {
    winnerElement.textContent = "Winner: Computer Wins!";
  }
}

// Restart the game
restartButton.addEventListener("click", () => {
  playerChoiceElement.textContent = "Player Choice: ";
  computerChoiceElement.textContent = "Computer Choice: ";
  winnerElement.textContent = "Winner: ";
});

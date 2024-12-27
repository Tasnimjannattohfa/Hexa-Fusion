let score = 0;
let timeLeft = 30;
let moleTimeout;
let gameInterval;
let gameStarted = false;

// Create 9 holes for the game board
function createBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.setAttribute('data-id', i);
    hole.addEventListener('click', handleHoleClick);
    gameBoard.appendChild(hole);
  }
}

// Show a mole in a random hole
function showMole() {
  const holes = document.querySelectorAll('.hole');
  const randomIndex = Math.floor(Math.random() * holes.length);
  
  // Remove mole from any hole that has one
  document.querySelectorAll('.hole.mole').forEach(hole => hole.classList.remove('mole'));
  
  // Add mole to a random hole
  holes[randomIndex].classList.add('mole');
}

// Handle the click event when the player hits a mole
function handleHoleClick(event) {
  if (event.target.classList.contains('mole')) {
    score++;
    document.getElementById('score').textContent = score;
    event.target.classList.remove('mole'); // Remove the mole after it’s hit
  }
}

// Countdown timer for the game
function countdown() {
  if (timeLeft > 0) {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
  } else {
    clearInterval(gameInterval);
    clearTimeout(moleTimeout);
    gameStarted = false;
    alert('Game over! Your score is ' + score);
  }
}

// Start a new game
function startNewGame() {
  if (gameStarted) return; // Prevent multiple game starts

  score = 0;
  timeLeft = 30;
  document.getElementById('score').textContent = score;
  document.getElementById('time').textContent = timeLeft;

  createBoard();
  
  gameStarted = true;

  // Start the countdown timer
  gameInterval = setInterval(countdown, 1000);

  // Show a mole every 1 second
  moleTimeout = setInterval(showMole, 1000);
}

// Start the game when the page loads
createBoard();

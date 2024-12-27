const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Rome", "Berlin"],
    correctAnswer: "Paris"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
    correctAnswer: "Shakespeare"
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter"
  },
  {
    question: "What is 5 + 3?",
    answers: ["5", "8", "10", "3"],
    correctAnswer: "8"
  }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;

  const answersContainer = document.getElementById("answers");
  answersContainer.innerHTML = "";

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    button.onclick = () => checkAnswer(answer);
    answersContainer.appendChild(button);
  });
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  const feedbackContainer = document.getElementById("feedback");
  feedbackContainer.innerHTML = "";

  if (selectedAnswer === correctAnswer) {
    score++;
    feedbackContainer.textContent = "Correct!";
    feedbackContainer.style.color = "green";
  } else {
    feedbackContainer.textContent = `Wrong! The correct answer is ${correctAnswer}.`;
    feedbackContainer.style.color = "red";
  }

  currentQuestionIndex++;

  setTimeout(() => {
    feedbackContainer.innerHTML = "";
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endGame();
    }
  }, 2000); // Show feedback for 2 seconds before moving to the next question
}

function endGame() {
  const resultContainer = document.getElementById("result-container");
  const resultText = document.getElementById("result");
  resultText.textContent = `Your score: ${score} / ${questions.length}`;
  resultContainer.style.display = "block";
  document.getElementById("question-container").style.display = "none";
  document.getElementById("answers").style.display = "none";
}

function startNewGame() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("result-container").style.display = "none";
  document.getElementById("question-container").style.display = "block";
  document.getElementById("answers").style.display = "block";
  loadQuestion();
}

// Start the game when the page loads
loadQuestion();

const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game settings
canvas.width = 800;
canvas.height = 400;

// Paddle settings
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 10;

// Ball settings
const ballSize = 10;
const ballSpeed = 4;

let leftPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 0
};

let rightPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: ballSpeed,
    dy: ballSpeed
};

// Score settings
let leftScore = 0;
let rightScore = 0;

// Draw the paddles
function drawPaddle(x, y) {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Draw the ball
function drawBall(x, y) {
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

// Draw the score
function drawScore() {
    ctx.fillStyle = '#FFF';
    ctx.font = '32px Arial';
    ctx.fillText(leftScore, canvas.width / 4, 50);
    ctx.fillText(rightScore, (canvas.width / 4) * 3, 50);
}

// Draw the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles, ball, and score
    drawPaddle(leftPaddle.x, leftPaddle.y);
    drawPaddle(rightPaddle.x, rightPaddle.y);
    drawBall(ball.x, ball.y);
    drawScore();

    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y + ballSize > canvas.height || ball.y - ballSize < 0) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (
        ball.x - ballSize < leftPaddle.x + paddleWidth &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + paddleHeight
    ) {
        ball.dx *= -1;
    }

    if (
        ball.x + ballSize > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + paddleHeight
    ) {
        ball.dx *= -1;
    }

    // Ball out of bounds (reset and update score)
    if (ball.x + ballSize > canvas.width) {
        leftScore++;
        resetBall();
    } else if (ball.x - ballSize < 0) {
        rightScore++;
        resetBall();
    }

    // Move left paddle
    leftPaddle.y += leftPaddle.dy;

    // Constrain left paddle within canvas
    if (leftPaddle.y < 0) leftPaddle.y = 0;
    if (leftPaddle.y + paddleHeight > canvas.height)
        leftPaddle.y = canvas.height - paddleHeight;

    // Computer AI for right paddle
    if (ball.y < rightPaddle.y + paddleHeight / 2) {
        rightPaddle.y -= paddleSpeed / 2; // Move paddle up
    } else if (ball.y > rightPaddle.y + paddleHeight / 2) {
        rightPaddle.y += paddleSpeed / 2; // Move paddle down
    }

    // Constrain right paddle within canvas
    if (rightPaddle.y < 0) rightPaddle.y = 0;
    if (rightPaddle.y + paddleHeight > canvas.height)
        rightPaddle.y = canvas.height - paddleHeight;

    requestAnimationFrame(draw);
}

// Reset the ball to the center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
}

// Button controls for left paddle
const moveUpButton = document.getElementById('move-up');
const moveDownButton = document.getElementById('move-down');

moveUpButton.addEventListener('mousedown', () => {
    leftPaddle.dy = -paddleSpeed;
});
moveDownButton.addEventListener('mousedown', () => {
    leftPaddle.dy = paddleSpeed;
});

document.addEventListener('mouseup', () => {
    leftPaddle.dy = 0;
});

// Start the game
draw();
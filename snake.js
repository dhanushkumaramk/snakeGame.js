const playBoard = document.querySelector(".play-board");
const scoreel = document.querySelector(".score");
const highscoreel = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let GameOver = false;
let setIntervalid;
let score = 0;
//get high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highscoreel.innerHTML = `high Score : ${highScore}`;

controls.forEach((key) => {
  key.addEventListener("click", () =>
    changeDirection({ key: key.dataset.key })
  );
});
// change food position randomly
const changefoodPosition = () => {
  foodX = Math.floor(Math.random() * 30 + 1);
  foodY = Math.floor(Math.random() * 30 + 1);
};
const handleGameOver = () => {
  clearInterval(setIntervalid);
  alert("Game Over! 🆗 Press Ok To Replay");
  location.reload(); // if the  game is over then if the user press ok then page automatically reloaded
};
// change snake head based on arrow
changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  // initGame();
  // console.log(e);
};

// create snake head and food using js
const initGame = () => {
  if (GameOver) return handleGameOver();
  let htmlMarkup = `<div class="food"style="grid-area: ${foodY} / ${foodX}"></div>`;
  // if(snake hits the food then the location of the food will be changed randomly)
  if (snakeX === foodX && snakeY === foodY) {
    changefoodPosition();
    // then snake hits the food will be push into snake body
    // console.log(snakeBody);
    snakeBody.push([foodX, foodY]);
    score++; //score increment by 1

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);

    scoreel.innerHTML = `score: ${score}`;
    highscoreel.innerHTML = `high-score: ${highscore}`;
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]; //used to add the values in the snake forward
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    console.log("Game Over"); // if snake hits the border or outline of the box its trigger the message "Game Over" !
    GameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head"style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    // if the snake body hits on the own body the message trigerred "Game Overed!"
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      GameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};
// changeDirection();
changefoodPosition();
// initGame();
setIntervalid = setInterval(initGame, 145); // 145 is the movement speed of snake => Every 145ms(millisecond)!

document.addEventListener("keydown", changeDirection);

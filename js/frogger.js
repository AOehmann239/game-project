const game = document.getElementById('canvas');
const movement = document.getElementById('movement');
const ctx = game.getContext('2d');
// game.setAttribute('width', getComputedStyle(game)['width']);
// game.setAttribute('height', getComputedStyle(game)['height']);
//should I not use this because all the elements in the game need to be a set size

const grid = 40;
let keys = [];
let score = 0;
const carsArray = [];
const logsArray = [];

//using a constructor to build the various objects in the game
class Frogger {
  constructor(x, y, color, width, height) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = true);
  }
  render = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

class Obstacle {
  constructor(x, y, color, width, height, type) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    // this.speed = speed;
    this.type = type;
  }
  render = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

const frog = new Frogger(280, 560, 'green', 40, 40);
// function createObstacles(){
//     for (let i = 0; i < 2; i++){
//         let x = i * 350;
//         carsArray.push(new Obstacle)
//     }
const car1 = new Obstacle(360, 480, 'red', 160, 60, 'car');
const log1 = new Obstacle(40, 80, 'brown', 100, 40, 'log');

const stopGameLoop = () => {
  clearInterval(gameTime);
};

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keydown', frogMovementHandler);
  gameTime;
});

const gameLoop = () => {
  ctx.clearRect(0, 0, game.width, game.height);
  //   console.log('the frog', frog);
  car1.render();
  log1.render();
  if (frog.alive) {
    frog.render();
    detectHit();
  }
  movement.textContent = frog.x + ', ' + frog.y;
};

const frogMovementHandler = (e) => {
  switch (e.keyCode) {
    case 87: //move from up with w key
      frog.y -= 40;
      break;
    case 65: //move left with a key
      frog.x -= 40;
      break;
    case 83: //move down with s key
      frog.y += 40;
      break;
    case 68: //move right with d key
      frog.x += 40;
      break;
  }
};

const detectHit = () => {
  if (
    car1.x < frog.x + frog.width &&
    car1.x + car1.width > frog.x &&
    car1.y < frog.y + frog.height &&
    car1.y + car1.height > frog.y
  ) {
    frog.alive = false;
    document.getElementById('status').textContent = 'You died :/';
  }
};

let gameTime = setInterval(gameLoop, 60);
/*
--render vs draw
--using a for loop to store the location of objects in an array
and pushing the new location 
--should I be using clear rect in this case?
--levels?? to have the logs be under the frog or just different
hit reg specifications?



Things to do
--make cars move
--make logs move
--proper hit reg





game is running (if frog is alive)
    game is checking for user movement input
        if frog and car share coordinates, hit
        if frog and log share coordinates, frog rides on top?

*/

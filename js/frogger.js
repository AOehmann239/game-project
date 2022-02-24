const game = document.getElementById('canvas');
const movement = document.getElementById('movement');
const ctx = game.getContext('2d');
// game.setAttribute('width', getComputedStyle(game)['width']);
// game.setAttribute('height', getComputedStyle(game)['height']);
//should I not use this because all the elements in the game need to be a set size

const grid = 40;

//using a constructor to build the various objects in the game
class Frogger {
  constructor(x, y, color, width, height) {
    (this.x = x),
      (this.y = y),
      (this.color = color),
      (this.width = width),
      (this.height = height),
      (this.alive = true);
    (this.speed = 10),
      (this.direction = {
        up: false,
        down: false,
        right: false,
        left: false,
      });
  }
  setDirection = function (key) {
    console.log('the key pressed is', key);
    // pressing key(keydown), changes direction from false to true
    if (key.toLowerCase() == 'w') this.direction.up = true;
    if (key.toLowerCase() == 'a') this.direction.left = true;
    if (key.toLowerCase() == 's') this.direction.down = true;
    if (key.toLowerCase() == 'd') this.direction.right = true;
  };
  // this method will 'unset' our direction when the key is lifted(keyup)
  // sets direction to false
  unsetDirection = function (key) {
    console.log('the key pressed is', key);
    // pressing key(keydown), changes direction from false to true
    if (key.toLowerCase() == 'w') this.direction.up = false;
    if (key.toLowerCase() == 'a') this.direction.left = false;
    if (key.toLowerCase() == 's') this.direction.down = false;
    if (key.toLowerCase() == 'd') this.direction.right = false;
  };
  frogMovementHandler = function () {
    // movePlayer will take and look at the direction that is set
    // movePlayer will then send the guy flying in that direction
    // move up
    if (this.direction.up) {
      this.y -= this.speed;
      // because we're tracking 'up' movement, we'll add our top of canvas case
      if (this.y <= 0) {
        this.y = 0;
      }
    }
    // move left
    if (this.direction.left) {
      this.x -= this.speed;
      // bc we're tracking left movement, we need the left edge of the canvas
      if (this.x <= 0) {
        this.x = 0;
      }
    }
    // move down
    if (this.direction.down) {
      this.y += this.speed;
      // bc we're tracking down movement, we need the bottom edge of the canvas
      // but we also need to consider the hero's height
      if (this.y + this.height >= game.height) {
        this.y = game.height - this.height;
      }
    }
    // move right
    if (this.direction.right) {
      this.x += this.speed;
      // bc we're tracking left movement, we need the left edge of the canvas
      if (this.x + this.width >= game.width) {
        this.x = game.width - this.width;
      }
    }
  };
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
  gameTime;
});

const gameLoop = () => {
  ctx.clearRect(0, 0, game.width, game.height);
  //   console.log('the frog', frog);

  if (frog.alive) {
    frog.render();
    detectHit();
  } else {
    stopGameLoop();
  }
  movement.textContent = frog.x + ', ' + frog.y;
  car1.render();
  log1.render();
  frog.frogMovementHandler();
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

document.addEventListener('keydown', (e) => {
  // when the key is pressed, change the direction
  // according to the setDirection HeroCrawler method
  frog.setDirection(e.key);
});

document.addEventListener('keyup', (e) => {
  // now if any of the keys that are released correspond to a movement key
  // change the corresponding direction to false
  if (['w', 'a', 's', 'd'].includes(e.key)) {
    frog.unsetDirection(e.key);
  }
});

let gameTime = setInterval(gameLoop, 60);

/*
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

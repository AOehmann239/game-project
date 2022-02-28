const game = document.getElementById('canvas');
const movement = document.getElementById('movement');
const ctx = game.getContext('2d');
const statusMessage = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
resetButton.style.display = 'none';
const levelUpButton = document.getElementById('levelUpButton');
levelUpButton.style.display = 'none';
const gameLevel = document.getElementById('levelMessage');
let gameSpeed = 1;
const grid = 40;
let carsArray = [];
let level = 1;
//using a constructor to build the frog objects in the game
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
//creating the cars class
class Obstacle {
  constructor(x, y, color, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
  }
  render = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.x = this.x + this.speed * gameSpeed;
    if (this.speed > 0) {
      if (this.x > 600 + this.width) {
        this.x = 0 - this.width;
      }
    } else {
      if (this.x < 0 - this.width) {
        this.x = 600 + this.width;
      }
    }
  };
}
//let create our cars
const initCars = () => {
  //lane 1
  for (let i = 0; i < 2; i++) {
    let x = i * 350;
    carsArray.push(new Obstacle(x, 480, 'red', 160, 80, 1, 'car'));
  }
  //lane 2
  for (let i = 0; i < 3; i++) {
    let x = i * 50;
    carsArray.push(new Obstacle(x, 380, 'orange', 100, 80, 1.3, 'car'));
  }
  //lane 3
  for (let i = 0; i < 4; i++) {
    let x = i * 120;
    carsArray.push(new Obstacle(x, 280, 'blue', 80, 80, 1, 'car'));
  }
  //lane 4
  for (let i = 0; i < 2; i++) {
    let x = i * 250;
    carsArray.push(new Obstacle(x, 180, 'purple', 160, 80, 1.3, 'car'));
  }
  //lane 5
  for (let i = 0; i < 2; i++) {
    let x = i * 300;
    carsArray.push(new Obstacle(x, 80, 'purple', 100, 80, 1.1, 'car'));
  }
};
initCars();
const handleObstacles = () => {
  for (let i = 0; i < carsArray.length; i++) {
    carsArray[i].render();
  }
};

//lets creates our frog
let frog = new Frogger(280, 560, 'green', 40, 40);

const detectHit = () => {
  // we need an if statement that clearly defines the moment of collision
  // that means utilizing the x,y, width, and height of whatever we're detecting
  for (i = 0; i < carsArray.length; i++) {
    if (
      frog.x < carsArray[i].x + carsArray[i].width &&
      frog.x + frog.width > carsArray[i].x &&
      frog.y < carsArray[i].y + carsArray[i].height &&
      frog.y + frog.height > carsArray[i].y
    ) {
      frog.alive = false;
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  gameTime;
});

//loop that runs the game
const gameLoop = () => {
  ctx.clearRect(0, 0, game.width, game.height);
  //   console.log('the frog', frog);

  if (frog.alive) {
    frog.render();
    handleObstacles();
    // detectHit();
    winning();
  } else {
    statusMessage.textContent = 'You died :/';
    resetButton.style.display = '';
    levelUpButton.style.display = 'none';
    clearInterval(gameTime);
  }
  movement.textContent = frog.x + ', ' + frog.y;

  frog.frogMovementHandler();
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

const winning = () => {
  if (frog.y <= 0) {
    statusMessage.textContent = 'You won! \n Live to die another day';
    clearInterval(gameTime);
    levelUpButton.style.display = '';
  }
};

const handleResetButton = () => {
  //   resetButton.style.display = '';
  window.location.reload();
  level = 1;
  gameLevel.textContent = 'Level 1';
};

const handleLevelUpButton = () => {
  //   levelUpButton.style.display = '';
  frog.x = 280;
  frog.y = 560;
  level++;
  gameSpeed++;
  gameLevel.textContent = 'Level ' + level;
  gameTime = setInterval(gameLoop, 60);
};

document
  .getElementById('resetButton')
  .addEventListener('click', handleResetButton);
document
  .getElementById('levelUpButton')
  .addEventListener('click', handleLevelUpButton);

let gameTime = setInterval(gameLoop, 60);

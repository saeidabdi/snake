

const _document = document;

class SnakeC {
  constructor() {
    // this._this = this;
  }
  GAME_SPEED = 100;
  _this = this;
  CANVAS_BORDER_COLOUR = "black";
  CANVAS_BACKGROUND_COLOUR = "white";
  SNAKE_COLOUR = "lightgreen";
  SNAKE_BORDER_COLOUR = "darkgreen";
  FOOD_COLOUR = "red";
  FOOD_BORDER_COLOUR = "darkred";
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
  // The user's score
  score = 0;
  // When set to true the this.snake is changing direction
  changingDirection = false;
  // Food x-coordinate
  foodX;
  // Food y-coordinate
  foodY;
  // Horizontal velocity
  dx = 10;
  // Vertical velocity
  dy = 0;
  // Get the canvas element
  gameCanvas = _document.getElementById("gameCanvas");
  // Return a two dimensional drawing context
  ctx = gameCanvas.getContext("2d");

  /**
   * Main function of the game
   * called repeatedly to advance the game
   */
  main() {
    // If the game ended return early to stop game
    if (this.didGameEnd()) return;
    var _this = this
    setTimeout(function onTick() {
      _this.changingDirection = false;
      _this.clearCanvas();
      _this.drawFood();
      _this.advanceSnake();
      _this.drawSnake();
      // Call game again
      _this.main();
    }, _this.GAME_SPEED);
  }
  /**
   * Change the background colour of the canvas to CANVAS_BACKGROUND_COLOUR and
   * draw a border around it
   */
  clearCanvas() {
    //  Select the colour to fill the drawing
    this.ctx.fillStyle = this.CANVAS_BACKGROUND_COLOUR;
    //  Select the colour for the border of the canvas
    this.ctx.strokestyle = this.CANVAS_BORDER_COLOUR;
    // Draw a "filled" rectangle to cover the entire canvas
    this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    // Draw a "border" around the entire canvas
    this.ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }
  /**
   * Draw the food on the canvas
   */
  drawFood() {
    this.ctx.fillStyle = this.FOOD_COLOUR;
    this.ctx.strokestyle = this.FOOD_BORDER_COLOUR;
    this.ctx.fillRect(this.foodX, this.foodY, 10, 10);
    this.ctx.strokeRect(this.foodX, this.foodY, 10, 10);
  }
  /**
   * Advances the this.snake by changing the x-coordinates of its parts
   * according to the horizontal velocity and the y-coordinates of its parts
   * according to the vertical veolocity
   */
  advanceSnake() {
    // Create the new this.snake's head
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
    // Add the new head to the beginning of this.snake body
    this.snake.unshift(head);
    const didEatFood = this.snake[0].x === this.foodX && this.snake[0].y === this.foodY;
    if (didEatFood) {
      // Increase score
      score += 10;
      // Display score on screen
      _document.getElementById("score").innerHTML = score;
      // Generate new food location
      createFood();
    } else {
      // Remove the last part of this.snake body
      this.snake.pop();
    }
  }
  /**
   * Returns true if the head of the this.snake touched another part of the game
   * or any of the walls
   */
  didGameEnd() {
    for (let i = 4; i < this.snake.length; i++) {
      if (this.snake[i].x === this.snake[0].x && this.snake[i].y === this.snake[0].y) return true;
    }
    const hitLeftWall = this.snake[0].x < 0;
    const hitRightWall = this.snake[0].x > gameCanvas.width - 10;
    const hitToptWall = this.snake[0].y < 0;
    const hitBottomWall = this.snake[0].y > gameCanvas.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
  }
  /**
   * Generates a random number that is a multiple of 10 given a minumum
   * and a maximum number
   * @param { number } min - The minimum number the random number can be
   * @param { number } max - The maximum number the random number can be
   */
  randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }
  /**
   * Creates random set of coordinates for the this.snake food.
   */
  createFood() {
    // Generate a random number the food x-coordinate
    this.foodX = this.randomTen(0, this.gameCanvas.width - 10);
    // Generate a random number for the food y-coordinate
    this.foodY = this.randomTen(0, this.gameCanvas.height - 10);
    // if the new food location is where the this.snake currently is, generate a new food location
    var _this = this;
    this.snake.forEach(function isFoodOnSnake(part) {
      const foodIsoNsnake = part.x == _this.foodX && part.y == _this.foodY;
      if (foodIsoNsnake) _this.createFood();
    });
  }
  /**
   * Draws the this.snake on the canvas
   */
  drawSnake() {
    // loop through the this.snake parts drawing each part on the canvas
    let _this = this;
    // this.snake.forEach(_this.drawSnakePart);
    this.snake.forEach(snakePart => {
      // Set the colour of the this.snake part
      _this.ctx.fillStyle = _this.SNAKE_COLOUR;
      // Set the border colour of the _this.snake part
      _this.ctx.strokestyle = _this.SNAKE_BORDER_COLOUR;
      // Draw a "filled" rectangle to represent the _this.snake part at the coordinates
      // the part is located
      _this.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      // Draw a border around the _this.snake part
      _this.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);

    })
  }
  /**
   * Draws a part of the this.snake on the canvas
   * @param { object } snakePart - The coordinates where the part should be drawn
   */
  drawSnakePart(snakePart) {
    console.log('sss', snakePart);
    // Set the colour of the this.snake part
    _this.ctx.fillStyle = _this.SNAKE_COLOUR;
    // Set the border colour of the _this.snake part
    _this.ctx.strokestyle = _this.SNAKE_BORDER_COLOUR;
    // Draw a "filled" rectangle to represent the _this.snake part at the coordinates
    // the part is located
    _this.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw a border around the _this.snake part
    _this.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }
  /**
   * Changes the vertical and horizontal velocity of the this.snake according to the
   * key that was pressed.
   * The direction cannot be switched to the opposite direction, to prevent the this.snake
   * from reversing
   * For example if the the direction is 'right' it cannot become 'left'
   * @param { object } event - The keydown event
   */
  changeDirection(event) {
    console.log(event);
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    /**
     * Prevent the this.snake from reversing
     * Example scenario:
     * this.snake is moving to the right. User presses down and immediately left
     * and the this.snake immediately changes direction without taking a step down first
     */
    if (this.changingDirection) return;
    this.changingDirection = true;

    const keyPressed = event.keyCode;
    const goingUp = this.dy === -10;
    const goingDown = this.dy === 10;
    const goingRight = this.dx === 10;
    const goingLeft = this.dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
      this.dx = -10;
      this.dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
      this.dx = 0;
      this.dy = -10;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
      this.dx = 10;
      this.dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
      this.dx = 0;
      this.dy = 10;
    }
  }
}

let ObjSnake = new SnakeC();

// Start game
ObjSnake.main();
// Create the first food location
ObjSnake.createFood();
console.log(ObjSnake);
// Call changeDirection whenever a key is pressed
_document.addEventListener("keydown", ObjSnake.changeDirection);
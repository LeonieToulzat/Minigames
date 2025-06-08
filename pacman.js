/*const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 40;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fox = {
    x: tileSize,
    y: tileSize,
    width: tileSize,
    height: tileSize,
    velocityX: 0,
    velocityY: 0,
    normalImage: new Image(),
    movingImage: new Image(),
    currentImage: null
};
fox.normalImage.src = "fox.png";
fox.movingImage.src = "fox_moving.png";
fox.currentImage = fox.normalImage;

const ghosts = [
    { x: 9 * tileSize, y: 9 * tileSize, image: new Image(), direction: "left" },
    { x: 9 * tileSize, y: 1 * tileSize, image: new Image(), direction: "right" },
    { x: 1 * tileSize, y: 9 * tileSize, image: new Image(), direction: "up" }
];
ghosts[0].image.src = "rabbitghost1.png";
ghosts[1].image.src = "rabbitghost2.png";
ghosts[2].image.src = "rabbitghost3.png";

const map = [
    "111111111111",
    "100000000001",
    "101111110101",
    "101000010101",
    "101011010101",
    "101000010101",
    "101111110101",
    "100000000001",
    "111111111111"
];

const foods = [];
const eggs = [];
const walls = [];

for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
        let tile = map[row][col];
        if (tile === "1") {
            walls.push({ x: col * tileSize, y: row * tileSize });
        } else {
            if (Math.random() < 0.3) {
                foods.push({ x: col * tileSize, y: row * tileSize, image: new Image() });
                foods[foods.length - 1].image.src = "chicken.png";
            } else {
                eggs.push({ x: col * tileSize, y: row * tileSize, image: new Image() });
                eggs[eggs.length - 1].image.src = "egg.png";
            }
        }
    }
}

document.addEventListener("keydown", (event) => {
    fox.currentImage = fox.movingImage;
    if (event.code === "ArrowUp") {
        fox.velocityX = 0;
        fox.velocityY = -tileSize;
    } else if (event.code === "ArrowDown") {
        fox.velocityX = 0;
        fox.velocityY = tileSize;
    } else if (event.code === "ArrowLeft") {
        fox.velocityX = -tileSize;
        fox.velocityY = 0;
    } else if (event.code === "ArrowRight") {
        fox.velocityX = tileSize;
        fox.velocityY = 0;
    }
});

document.addEventListener("keyup", () => {
    fox.currentImage = fox.normalImage;
});

function moveGhosts() {
    ghosts.forEach(ghost => {
        const directions = ["left", "right", "up", "down"];
        const dir = directions[Math.floor(Math.random() * directions.length)];
        
        if (dir === "left" && !collision(ghost.x - tileSize, ghost.y)) {
            ghost.x -= tileSize;
        } else if (dir === "right" && !collision(ghost.x + tileSize, ghost.y)) {
            ghost.x += tileSize;
        } else if (dir === "up" && !collision(ghost.x, ghost.y - tileSize)) {
            ghost.y -= tileSize;
        } else if (dir === "down" && !collision(ghost.x, ghost.y + tileSize)) {
            ghost.y += tileSize;
        }
    });
}

function collision(x, y) {
    return walls.some(wall => wall.x === x && wall.y === y);
}

function update() {
    const newX = fox.x + fox.velocityX;
    const newY = fox.y + fox.velocityY;

    if (!collision(newX, newY)) {
        fox.x = newX;
        fox.y = newY;
    }

    foods.forEach((food, index) => {
        if (fox.x === food.x && fox.y === food.y) {
            foods.splice(index, 1);
        }
    });

    eggs.forEach((egg, index) => {
        if (fox.x === egg.x && fox.y === egg.y) {
            eggs.splice(index, 1);
        }
    });

    ghosts.forEach(ghost => {
        if (fox.x === ghost.x && fox.y === ghost.y) {
            alert("Game Over!");
            document.location.reload();
        }
    });

    moveGhosts();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    walls.forEach(wall => {
        ctx.fillStyle = "blue";
        ctx.fillRect(wall.x, wall.y, tileSize, tileSize);
    });

    foods.forEach(food => ctx.drawImage(food.image, food.x, food.y, tileSize, tileSize));
    eggs.forEach(egg => ctx.drawImage(egg.image, egg.x, egg.y, tileSize, tileSize));

    ghosts.forEach(ghost => ctx.drawImage(ghost.image, ghost.x, ghost.y, tileSize, tileSize));
    ctx.drawImage(fox.currentImage, fox.x, fox.y, fox.width, fox.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();*/








/*
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const fox = {
  x: 100,
  y: 100,
  size: 60,
  speed: 4,
  moving: false,
  direction: "right",
  images: {
    idle: new Image(),
    moving: new Image()
  }
};
fox.images.idle.src = "fox.png";
fox.images.moving.src = "fox_moving.png";

const eggImg = new Image();
eggImg.src = "egg.png";
const chickenImg = new Image();
chickenImg.src = "chicken.png";

const ghostImgs = [
  new Image(),
  new Image(),
  new Image()
];
ghostImgs[0].src = "rabbitghost1.png";
ghostImgs[1].src = "rabbitghost2.png";
ghostImgs[2].src = "rabbitghost3.png";

// Objects
let foods = []; // eggs and chickens
let ghosts = [];

let keys = {};
let score = 0;
let gameOver = false;

// Handle keyboard
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  fox.moving = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
  fox.moving = false;
});

// Create food
function spawnFoods() {
  for (let i = 0; i < 20; i++) {
    const type = Math.random() > 0.5 ? "egg" : "chicken";
    foods.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 30,
      type
    });
  }
}

// Create ghosts
function spawnGhosts() {
  for (let i = 0; i < 3; i++) {
    ghosts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 60,
      speed: 1.5 + Math.random() * 2,
      image: ghostImgs[i]
    });
  }
}

// Move fox
function moveFox() {
  if (keys["ArrowUp"]) fox.y -= fox.speed;
  if (keys["ArrowDown"]) fox.y += fox.speed;
  if (keys["ArrowLeft"]) {
    fox.x -= fox.speed;
    fox.direction = "left";
  }
  if (keys["ArrowRight"]) {
    fox.x += fox.speed;
    fox.direction = "right";
  }

  // Keep inside screen
  fox.x = Math.max(0, Math.min(canvas.width - fox.size, fox.x));
  fox.y = Math.max(0, Math.min(canvas.height - fox.size, fox.y));
}

// Collision detection
function isColliding(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

// Update game
function update() {
  if (gameOver) return;

  moveFox();

  // Eat food
  foods = foods.filter((f) => {
    if (isColliding(fox, f)) {
      score += 10;
      return false;
    }
    return true;
  });

  // Move ghosts
  ghosts.forEach((g) => {
    const dx = fox.x - g.x;
    const dy = fox.y - g.y;
    const dist = Math.hypot(dx, dy);
    g.x += (dx / dist) * g.speed;
    g.y += (dy / dist) * g.speed;

    if (isColliding(fox, g)) {
      gameOver = true;
    }
  });
}

// Draw game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw fox
  const foxImg = fox.moving ? fox.images.moving : fox.images.idle;
  ctx.save();
  if (fox.direction === "left") {
    ctx.translate(fox.x + fox.size, fox.y);
    ctx.scale(-1, 1);
    ctx.drawImage(foxImg, 0, 0, fox.size, fox.size);
  } else {
    ctx.drawImage(foxImg, fox.x, fox.y, fox.size, fox.size);
  }
  ctx.restore();

  // Draw food
  foods.forEach((f) => {
    const img = f.type === "egg" ? eggImg : chickenImg;
    ctx.drawImage(img, f.x, f.y, f.size, f.size);
  });

  // Draw ghosts
  ghosts.forEach((g) => {
    ctx.drawImage(g.image, g.x, g.y, g.size, g.size);
  });

  // Draw score
  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.fillText(`Score: ${score}`, 20, 40);

  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "60px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
  }
}

// Loop
function gameLoop() {
  update();
  draw();
  if (!gameOver) {
    requestAnimationFrame(gameLoop);
  }
}

spawnFoods();
spawnGhosts();
gameLoop();
*/








/*
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 40;
canvas.width = 12 * tileSize;
canvas.height = 9 * tileSize;

const fox = {
    x: tileSize,
    y: tileSize,
    width: tileSize,
    height: tileSize,
    normalImage: new Image(),
    movingImage: new Image(),
    currentImage: null,
    direction: null,
    nextDirection: null,
};

fox.normalImage.src = "fox.png";
fox.movingImage.src = "fox_moving.png";
fox.currentImage = fox.normalImage;

const ghosts = [
    { x: 9 * tileSize, y: 9 * tileSize, image: new Image(), direction: "left" },
    { x: 9 * tileSize, y: 1 * tileSize, image: new Image(), direction: "right" },
    { x: 1 * tileSize, y: 9 * tileSize, image: new Image(), direction: "up" }
];

ghosts[0].image.src = "rabbitghost1.png";
ghosts[1].image.src = "rabbitghost2.png";
ghosts[2].image.src = "rabbitghost3.png";

const map = [
    "111111111111",
    "100000000001",
    "101111110101",
    "101000010101",
    "101011010101",
    "101000010101",
    "101111110101",
    "100000000001",
    "111111111111"
];

const foods = [];
const eggs = [];
const walls = [];

for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
        let tile = map[row][col];
        if (tile === "1") {
            walls.push({ x: col * tileSize, y: row * tileSize });
        } else {
            const rand = Math.random();
            if (rand < 0.3) {
                foods.push({ x: col * tileSize, y: row * tileSize, image: new Image() });
                foods[foods.length - 1].image.src = "chicken.png";
            } else {
                eggs.push({ x: col * tileSize, y: row * tileSize, image: new Image() });
                eggs[eggs.length - 1].image.src = "egg.png";
            }
        }
    }
}

document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp": fox.nextDirection = "up"; break;
        case "ArrowDown": fox.nextDirection = "down"; break;
        case "ArrowLeft": fox.nextDirection = "left"; break;
        case "ArrowRight": fox.nextDirection = "right"; break;
    }
});

document.addEventListener("keyup", () => {
    fox.currentImage = fox.normalImage;
});

function moveFox() {
    let dx = 0, dy = 0;

    if (fox.nextDirection) {
        let tempX = fox.x;
        let tempY = fox.y;

        switch (fox.nextDirection) {
            case "up": dy = -tileSize; break;
            case "down": dy = tileSize; break;
            case "left": dx = -tileSize; break;
            case "right": dx = tileSize; break;
        }

        if (!collision(tempX + dx, tempY + dy)) {
            fox.x += dx;
            fox.y += dy;
            fox.direction = fox.nextDirection;
            fox.currentImage = fox.movingImage;
        }

        fox.nextDirection = null;
    }
}

function moveGhosts() {
    ghosts.forEach(ghost => {
        const directions = [
            { dx: -tileSize, dy: 0, dir: "left" },
            { dx: tileSize, dy: 0, dir: "right" },
            { dx: 0, dy: -tileSize, dir: "up" },
            { dx: 0, dy: tileSize, dir: "down" }
        ];

        const validMoves = directions.filter(d =>
            !collision(ghost.x + d.dx, ghost.y + d.dy)
        );

        if (validMoves.length > 0) {
            const move = validMoves[Math.floor(Math.random() * validMoves.length)];
            ghost.x += move.dx;
            ghost.y += move.dy;
        }
    });
}

function collision(x, y) {
    return walls.some(wall => wall.x === x && wall.y === y);
}

function update() {
    moveFox();
    moveGhosts();

    foods.forEach((food, i) => {
        if (fox.x === food.x && fox.y === food.y) {
            foods.splice(i, 1);
        }
    });

    eggs.forEach((egg, i) => {
        if (fox.x === egg.x && fox.y === egg.y) {
            eggs.splice(i, 1);
        }
    });

    ghosts.forEach(ghost => {
        if (fox.x === ghost.x && fox.y === ghost.y) {
            alert("Game Over!");
            document.location.reload();
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    walls.forEach(wall => {
        ctx.fillStyle = "blue";
        ctx.fillRect(wall.x, wall.y, tileSize, tileSize);
    });

    foods.forEach(food => ctx.drawImage(food.image, food.x, food.y, tileSize, tileSize));
    eggs.forEach(egg => ctx.drawImage(egg.image, egg.x, egg.y, tileSize, tileSize));
    ghosts.forEach(ghost => ctx.drawImage(ghost.image, ghost.x, ghost.y, tileSize, tileSize));

    ctx.drawImage(fox.currentImage, fox.x, fox.y, tileSize, tileSize);
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 200); // grid-based speed
}

gameLoop();
*/

document.addEventListener("DOMContentLoaded", () => {
    const scoreDisplay = document.getElementById("score")
    const width = 28
    let score = 0
    const grid = document.querySelector(".grid")

    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

    const squares = []

    //create your board
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement("div")
            square.id = i
            grid.appendChild(square)
            squares.push(square)

            //add layout to the board
            if (layout[i] === 0) {
                squares[i].classList.add("pac-dot")
            }
            if (layout[i] === 1) {
                squares[i].classList.add("wall")
            }
            if (layout[i] === 2) {
                squares[i].classList.add("ghost-lair")
            }
            if (layout[i] === 3) {
                squares[i].classList.add("power-pellet")
            }
        }
    }
    createBoard()

    //create Characters
    // draw pac-man onto the board
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add("pac-man")

    //move pacman
    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove("pac-man")
        // switch (e.keyCode) { deprecated
        switch (e.key) {
            // case 37:
            case "ArrowLeft":
                if (
                    pacmanCurrentIndex % width !== 0 &&
                    !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex -= 1
                }
                if ((pacmanCurrentIndex - 1) === 363) {
                    pacmanCurrentIndex = 391
                }
                break
            case "ArrowUp":
                // case 38:
                if (
                    pacmanCurrentIndex - width >= 0 &&
                    !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")

                ) {
                    pacmanCurrentIndex -= width
                }
                break
            case "ArrowRight":
                // case 39:
                if (
                    pacmanCurrentIndex % width < width - 1 &&
                    !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex += 1
                }
                if (
                    (pacmanCurrentIndex + 1) === 392
                ) {
                    pacmanCurrentIndex = 364
                }
                break
            case "ArrowDown":
                // case 40:
                if (
                    pacmanCurrentIndex + width < width * width &&
                    !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex += width
                }
                break
        }
        squares[pacmanCurrentIndex].classList.add("pac-man")
        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()
    }

    document.addEventListener("keyup", movePacman)

    //what happens when you eat a pac-dot
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove("pac-dot")
        }
    }

    //what happens when you eat a power-pellet
    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
            score += 10
            scoreDisplay.innerHTML = score
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000)
            squares[pacmanCurrentIndex].classList.remove("power-pellet")
        }
    }

    //make the ghosts stop flashing
    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
    }

    //create ghosts using Constructor
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.isScared = false
            this.timerId = NaN

        }
    }

    //all my ghosts
    
    const ghosts = [
        new Ghost("blinky", 348, 250),
        new Ghost("pinky", 376, 400),
        new Ghost("inky", 351, 300),
        new Ghost("clyde", 379, 500),
    ]
    


    //draw my ghosts onto the grid
    
    ghosts.forEach(ghost =>
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost"))

    //move ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    function moveGhost(ghost) {
        const directions = [-1, 1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function () {
            //if next square your ghost is going to go to does not have a ghost and does not have a wall
            if (
                !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
                !squares[ghost.currentIndex + direction].classList.contains("wall")
            ) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
                // else find a new random direction to go in
            } else direction = directions[Math.floor(Math.random() * directions.length)]
            // if the ghost is currently scared
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost")
            }

            //if the ghost is currently scared and pacman is on it
            if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
                ghost.isScared = false
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
                ghost.currentIndex = ghost.startIndex
                score += 100
                scoreDisplay.innerHTML = score
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
            }
            checkForGameOver()
        }, ghost.speed)
    }

    //check for a game over
    function checkForGameOver() {
        if (
            squares[pacmanCurrentIndex].classList.contains("ghost") &&
            !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(function () {
                alert("Game Over")
            }, 500)
        }
    }

    //check for a win - change the winning score to whatever you wish
    function checkForWin() {
        if (score >= 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(function () {
                alert("You have WON!")
            }, 500)
        }
    }
})
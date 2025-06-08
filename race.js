const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isGameOver = false; // New flag to control game state
let spawnInterval;



// Load images
const fox = {
  x: 100,
  y: 100,
  size: 80,
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
  ctx.fillStyle = "white";
  ctx.font = "40px Pixelify Sans";
  ctx.fillText(`Score: ${score}`, 30, 50);


  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Pixelify Sans";
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
  if (isGameOver) return;
}

spawnFoods();
spawnGhosts();
gameLoop();

document.getElementById("buttonhome").addEventListener("click", function() {
    document.location.href = "indexinfinite.php";
});
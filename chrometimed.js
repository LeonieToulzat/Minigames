const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fox = {
    x: 200,
    y: canvas.height - 200,
    width: 150,
    height: 150,
    velocityY: 0,
    jumping: false,
    images: {
        normal: new Image(),
        moving: new Image(),
    },
    currentImage: null
};
fox.images.normal.src = "fox.png";
fox.images.moving.src = "fox_moving.png";
fox.currentImage = fox.images.normal;

const obstacles = [];
const obstacleImages = ["bush.png", "fence.png"];
let speed = 5;
let gameRunning = true;
let score = 0;
let gameOver = false;


let isGameOver = false; // New flag to control game state
let spawnInterval;

let gameDuration = 15; // seconds
let timeLeft = gameDuration;

// Start the countdown
const timerElement = document.getElementById('timer');
const countdown = setInterval(() => {
  timeLeft--;
  timerElement.textContent = `Time left: ${timeLeft}s`;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    endGame();
  }
}, 1000);

// Game logic starts here
//startGame();



function startGame() {
  console.log("Game started");
  //spawnObstacle(); // Save interval ID
  //spawnInterval = setInterval(spawnObstacle(), 1000);
  gameLoop(); // Start game loop
}

function endGame() {
  isGameOver = true; // Prevent gameLoop from continuing
  clearInterval(spawnInterval); // Stop spawning new objects
  console.log("Time's up! Moving to the next game...");
  const username = localStorage.getItem("username"); // or from session
    //const username = $_SESSION['username']
    const gameId = document.body.dataset.gameid; // or hardcode if needed
    console.log( "Saving score for user: " + username + " with score: " + score + " for game ID: " + gameId);

    fetch("dbfile.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `action=save_score&username=${encodeURIComponent(username)}&score=${score}&gameId=${gameId}`
    //body:`action=save_score&score=${score}&gameId=${gameId}`
    })
    
    .then(() => console.log("Saving score for user: " + username + " with score: " + score + " for game ID: " + gameId)) 

    //.then(response => response.text())
    .then(data => console.log("Server response:", data))
    .catch(error => console.error("Error:", error));

  // Optional: Add delay before redirection
  setTimeout(() => {
    window.location.href = "flappyfoxtimed.html"; // Next game
  }, 1000); // Short pause before transition
}



function spawnObstacle() {
    if (speed<=8){
    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
        const obstacle = {
            x: canvas.width + i * 80,
            y: canvas.height - 120,
            width: 60,
            height: 50,
            image: new Image()
        };
        obstacle.image.src = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
        obstacles.push(obstacle);
        }
        setTimeout(spawnObstacle, Math.random() * 2000 + 1200);
    }
    else if (speed<=12) {
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
            const obstacle = {
                x: canvas.width + i * 80,
                y: canvas.height - 120,
                width: 60,
                height: 50,
                image: new Image()
            };
            obstacle.image.src = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
            obstacles.push(obstacle);
        }
        setTimeout(spawnObstacle, Math.random() * 2000 + 1000);
    }
    else if (speed>12) {
        const count = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < count; i++) {
            const obstacle = {
                x: canvas.width + i * 80,
                y: canvas.height - 120,
                width: 60,
                height: 50,
                image: new Image()
            };
            obstacle.image.src = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
            obstacles.push(obstacle);
        }
        setTimeout(spawnObstacle, Math.random() * 2000 + 800);
    }
    //setTimeout(spawnObstacle, Math.random() * 2000 + 1200);
}

function jump() {
    //if (!fox.jumping) {
        fox.velocityY = -25;
        fox.jumping = true;
        fox.currentImage = fox.images.moving;
    //}
}

function update() {
    if (!gameRunning) return;
    
    fox.velocityY += 0.8;
    fox.y += fox.velocityY;
    
    if (fox.y >= canvas.height - 200) {
        fox.y = canvas.height - 200;
        fox.jumping = false;
        fox.currentImage = fox.images.normal;
    }
    
    obstacles.forEach((obstacle, index) => {
        obstacle.x -= speed;
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++;
        }
        
        if (
            fox.x < obstacle.x + obstacle.width - 40 &&
            fox.x + fox.width > obstacle.x &&
            fox.y + fox.height > obstacle.y
        ) {
            gameRunning = false;
            gameOver = true;
            endGame(); // Call endGame when collision occurs
        }
    });
    
    speed += 0.002;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fox.currentImage, fox.x, fox.y, fox.width, fox.height);
    obstacles.forEach(obstacle => ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height));
    ctx.fillStyle = "white";
    ctx.font = "40px Pixelify Sans";
    ctx.fillText("Score: " + score, 30, 50);
    //ctx.fillText("Speed: " + speed, 30, 200);
    if (gameOver) {
        ctx.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
    }
    ctx.fillText("Time left: " + timeLeft, 30, 100);
}

function gameLoop() {
    if (isGameOver) return;
    update();
    draw();
    if (gameRunning) requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") jump();
});

spawnObstacle();
//gameLoop();
startGame();

document.getElementById("buttonhome").addEventListener("click", function() {
    document.location.href = "index.php";
});


/*
const username = localStorage.getItem("username"); // or from session
const gameId = document.body.dataset.gameid; // or hardcode if needed

fetch("/dbgame/dbfile.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `action=save_score&username=${encodeURIComponent(username)}&score=${score}&gameId=${gameId}`
})

.then(response => response.text())
.then(data => console.log("Server response:", data))
.catch(error => console.error("Error:", error));
*/

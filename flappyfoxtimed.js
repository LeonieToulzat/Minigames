const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
  //spawnInterval = setInterval(spawnPipes, 1000); // Save interval ID
  gameLoop(); // Start game loop
}

function endGame() {
  isGameOver = true; // Prevent gameLoop from continuing
  //clearInterval(spawnInterval); // Stop spawning new objects
  console.log("Time's up! Moving to the next game...");

  const username = localStorage.getItem("username"); // or from session
    //const username = $_SESSION['username']
    const gameId = document.body.dataset.gameid; // or hardcode if needed
    console.log( "Saving score for user: " + username + " with score: " + score + " for game ID: " + gameId);

    fetch("/dbgame/dbfile.php", {
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
    window.location.href = "whackarabbittimed.html"; // Next game
  }, 1000); // Short pause before transition
}

const fox = {
    x: 150,
    y: canvas.height / 2,
    width: 150,
    height: 100,
    velocityY: 0,
    gravity: 0.5,
    lift: -8,
    images: {
        image1: new Image(), 
        image2: new Image()
    },
    currentImage: null
};
fox.images.image1.src = "flyingfox1.png";
fox.images.image2.src = "flyingfox2.png";
fox.currentImage = fox.images.image1;

const pipes = [];
const pipeWidth = 80;
const pipeGap = 250;
let speed = 2;
let score = 0;
let gameOver = false;



function spawnPipes() {
    const pipeHeight = Math.floor(Math.random() * (canvas.height / 2)) + 50;
    pipes.push({
        x: canvas.width,
        y: 0,
        width: pipeWidth,
        height: pipeHeight,
        image: new Image(),
        type: "top"
    });
    pipes.push({
        x: canvas.width,
        y: pipeHeight + pipeGap,
        width: pipeWidth,
        height: canvas.height - pipeHeight - pipeGap,
        image: new Image(),
        type: "bottom"
    });

    pipes[pipes.length - 2].image.src = "pipeup.png";
    pipes[pipes.length - 1].image.src = "pipedown.png";
}

function jump(event) {
    if (event.code === "Space") {
        fox.velocityY = fox.lift;
    }
}

function update() {
    //fox.currentImage = fox.images.image1;
    fox.velocityY += fox.gravity;
    fox.y += fox.velocityY;
    

    pipes.forEach((pipe, index) => {
        pipe.x -= speed;

        if (pipe.x + pipe.width < 0) {
            pipes.splice(index, 1);
            score += 0.5;
        }

        if (
            fox.x < pipe.x + pipe.width &&
            fox.x + fox.width > pipe.x &&
            fox.y < pipe.y + pipe.height &&
            fox.y + fox.height > pipe.y
        ) {
            gameOver = true;
            endGame();
        }
    });

    if (fox.y + fox.height >= canvas.height || fox.y <= 0) {
        gameOver = true;
        endGame();
    }

    if (!gameOver) {
        speed += 0.001;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fox.currentImage, fox.x, fox.y, fox.width, fox.height);

    pipes.forEach(pipe => {
        ctx.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height);
    });

    ctx.fillStyle = "white";
    ctx.font = "40px Pixelify Sans";
    ctx.fillText("Score: " + Math.floor(score), 30, 50);

    ctx.fillText("Time left: " + timeLeft, 30, 100);

    if (gameOver) {
        ctx.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
    }
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

function changeImage() {
    if (fox.currentImage === fox.images.image1) {
        fox.currentImage = fox.images.image2;
    }
    else if (fox.currentImage === fox.images.image2) {
        fox.currentImage = fox.images.image1;
    }
}
/*
function changeImage() {
    fox.currentImage = fox.currentImage === fox.images.image1 ? fox.images.image2 : fox.images.image1;
}*/

setInterval(changeImage, 200);
setInterval(spawnPipes, 3000);
window.addEventListener("keydown", jump);
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
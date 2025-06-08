const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const fox = {
    x: canvas.width / 2 - 100,
    y: canvas.height - 200,
    width: 150,
    height: 150,
    images: {
        normal: new Image(),
        moving: new Image(),
        normalleft: new Image(),
        movingleft: new Image()
    },
    currentImage: null
};
fox.images.normal.src = "fox.png";
fox.images.moving.src = "fox_moving.png";
fox.images.normalleft.src = "fox_left.png";
fox.images.movingleft.src = "fox_moving_left.png";
fox.currentImage = fox.images.normal;

const objects = [];
const objectImages = ["egg.png", "chicken.png"];
let score = 0;

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
  spawnInterval = setInterval(spawnObject, 1000); // Save interval ID
  gameLoop(); // Start game loop
}

function endGame() {
  isGameOver = true; // Prevent gameLoop from continuing
  clearInterval(spawnInterval); // Stop spawning new objects
  console.log("Time's up! Moving to the next game...");

  // Send score to PHP
  /*
    fetch('/dbgame/dbfile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=submit_score&score=${score}`
    })
    .then(response => response.text())
    .then(data => {
        console.log("Server response:", data);
        // Optional delay before redirection
        setTimeout(() => {
            window.location.href = "chrometimed.html";
        }, 1000);
    })
    .catch(error => console.error('Error submitting score:', error));*/


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
        window.location.href = "chrometimed.html"; // Next game
    }, 1000); // Short pause before transition
}



function spawnObject() {
    const obj = {
        x: Math.random() * (canvas.width - 50),
        y: -50,
        width: 80,
        height: 80,
        image: new Image()
    };
    obj.image.src = objectImages[Math.floor(Math.random() * objectImages.length)];
    objects.push(obj);
}

function moveFox(event) {
    if (event.key === "ArrowLeft" && fox.x > 0) {
        fox.x -= 30;
        fox.currentImage = fox.images.movingleft;
    } else if (event.key === "ArrowRight" && fox.x < canvas.width - fox.width) {
        fox.x += 30;
        fox.currentImage = fox.images.moving;
    }
}

function stopFox(event) {
    if (event.key === "ArrowLeft") {
        fox.currentImage = fox.images.normalleft;
    } else if (event.key === "ArrowRight") {
        fox.currentImage = fox.images.normal;
    }
}

function update() {
    objects.forEach((obj, index) => {
        obj.y += 5;
        if (
            obj.y + obj.height >= fox.y &&
            obj.x + obj.width >= fox.x &&
            obj.x <= fox.x + fox.width
        ) {
            objects.splice(index, 1);
            score++;
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fox.currentImage, fox.x, fox.y, fox.width, fox.height);
    objects.forEach(obj => ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height));
    ctx.fillStyle = "white";
    ctx.font = "40px Pixelify Sans";
    ctx.fillText("Score: " + score, 30, 50);

    ctx.fillText("Time left: " + timeLeft, 30, 100);
}

function gameLoop() {
    if (isGameOver) return;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

//setInterval(spawnObject, 1000);
window.addEventListener("keydown", moveFox);
window.addEventListener("keyup", stopFox);
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
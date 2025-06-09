const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/*
const fox = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 150,
    width: 100,
    height: 100,
    velocityX: 0,
    velocityY: 0,
    gravity: 0.5,
    jumpPower: -15,
    onGround: false,
    image: new Image()
};
fox.image.src = "fox.png";*/
const fox = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 150,
    width: 100,
    height: 100,
    velocityX: 0,
    velocityY: 0,
    gravity: 0.5,
    jumpPower: -15,
    onGround: false,
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
  //spawnInterval = setInterval(spawnObject, 1000); // Save interval ID
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
    //window.location.href = "chrometimed.html"; // Next game
  }, 1000); // Short pause before transition
}



let lastPlatform = null;

function spawnPlatform(y) {
    const maxHorizontalGap = 250; // how far left/right a platform can be
    const maxVerticalGap = 200;   // how far above the previous platform it can be

    const width = Math.random() * (platformWidthRange[1] - platformWidthRange[0]) + platformWidthRange[0];

    let x;
    if (lastPlatform) {
        const minX = Math.max(0, lastPlatform.x - maxHorizontalGap);
        const maxX = Math.min(canvas.width - width, lastPlatform.x + lastPlatform.width + maxHorizontalGap);
        x = Math.random() * (maxX - minX) + minX;
    } else {
        x = Math.random() * (canvas.width - width);
    }

    const platform = { x, y, width, height: 20, scored:false };
    platforms.push(platform);
    lastPlatform = platform;
}




const platforms = [];
const platformImage = new Image();
platformImage.src = "platform.png";

const platformSpeed = 2;
const platformWidthRange = [100, 300];

// Create platforms
for (let i = 0; i < 6; i++) {
    spawnPlatform(canvas.height - i * 150);
}

// Place fox on the topmost platform
const startingPlatform = platforms[platforms.length - 1]; // use the highest one
fox.x = startingPlatform.x + startingPlatform.width / 2 - fox.width / 2;
fox.y = startingPlatform.y - fox.height;
fox.velocityY = 0;
fox.onGround = true;

let score = 0;
//let isGameOver = false;

/*
for (let i = 0; i < 6; i++) {
    spawnPlatform(canvas.height - i * 150);
}

// Place fox on the topmost platform
const startingPlatform = platforms[0];
fox.x = startingPlatform.x + startingPlatform.width / 2 - fox.width / 2;
fox.y = startingPlatform.y - fox.height;
fox.onGround = true;
*/

/*
for (let i = 0; i < 6; i++) {
    spawnPlatform(canvas.height - i * 150);
}

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        fox.velocityX = -5;
    } else if (event.code === "ArrowRight") {
        fox.velocityX = 5;
    } else if (event.code === "ArrowUp" && fox.onGround) {
        fox.velocityY = fox.jumpPower;
        fox.onGround = false;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
        fox.velocityX = 0;
    }
});*/

const keys = {};
document.addEventListener("keydown", (event) => {
    keys[event.code] = true;

    if (event.code === "ArrowUp" && fox.onGround) {
        fox.velocityY = fox.jumpPower;
        fox.onGround = false;
        fox.currentImage = fox.images.moving;
    }
});

document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});




function update() {
/*
    if (keys["ArrowLeft"] && !keys["ArrowRight"]) {
    fox.velocityX = -5; 
    } else if (keys["ArrowRight"] && !keys["ArrowLeft"]) {
    fox.velocityX = 5;
    } else if (keys["ArrowUp"] && fox.onGround) {
    fox.velocityY = fox.jumpPower;
    } else if (keys["ArrowUp"] && keys["ArrowLeft"]) {
    fox.velocityX = -5;
    fox.velocityY = fox.jumpPower;
    }
    else if (keys["ArrowUp"] && keys["ArrowRight"]) {
    fox.velocityX = 5;
    fox.velocityY = fox.jumpPower;
    } else {
    fox.velocityX = 0;
    }*/
    if (keys["ArrowLeft"] && !keys["ArrowRight"]) {
        fox.velocityX = -5;
        fox.currentImage = fox.images.movingleft;
    } else if (keys["ArrowRight"] && !keys["ArrowLeft"]) {
        fox.velocityX = 5;
        fox.currentImage = fox.images.moving;
    } else {
        fox.velocityX = 0;
        if (fox.currentImage === fox.images.moving) {
            fox.currentImage = fox.images.normal;
        } else if (fox.currentImage === fox.images.movingleft) {
            fox.currentImage = fox.images.normalleft; // Default to left image when not moving
        }
    }
/*
    if (keys["ArrowUp"] && fox.onGround) {
        fox.velocityY = fox.jumpPower;
        fox.onGround = false;
        fox.currentImage = fox.images.moving;
        if (fox.currentImage === fox.images.normalleft) {
            fox.currentImage = fox.images.movingleft; // Keep moving left image if jumping
        } else if (fox.currentImage === fox.images.normal) {
            fox.currentImage = fox.images.moving; // Keep moving right image if jumping
        }
    }*/

    if (keys["ArrowUp"] && fox.onGround) {
    fox.velocityY = fox.jumpPower;
    fox.onGround = false;

    if (keys["ArrowLeft"]) {
        fox.currentImage = fox.images.movingleft;
    } else if (keys["ArrowRight"]) {
        fox.currentImage = fox.images.moving;
    }
}



    fox.velocityY += fox.gravity;
    fox.x += fox.velocityX;
    fox.y += fox.velocityY;

    if (fox.x < 0) fox.x = 0;
    if (fox.x + fox.width > canvas.width) fox.x = canvas.width - fox.width;

    


    fox.onGround = false;

    platforms.forEach((platform, index) => {
        platform.y += platformSpeed;

        if (platform.y > canvas.height) {
            platforms.splice(index, 1);
            spawnPlatform(-20);
            //score++;
        }

        if (
            fox.y + fox.height > platform.y &&
            fox.y + fox.height - fox.velocityY <= platform.y &&
            fox.x + fox.width > platform.x &&
            fox.x < platform.x + platform.width
        ) {
            fox.y = platform.y - fox.height;
            fox.velocityY = 0;
            fox.onGround = true;
            if (!platform.scored) {
                score += 1;
                platform.scored = true;
            }
        }
    });

    if (fox.y > canvas.height) {
        //alert("Game Over!");
        
        //document.location.reload();
        isGameOver=true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fox.currentImage, fox.x, fox.y, fox.width, fox.height);

    platforms.forEach(platform => {
        ctx.drawImage(platformImage, platform.x, platform.y, platform.width, platform.height);
    });
    ctx.fillStyle = "white";
    ctx.font = "40px Pixelify Sans";
    ctx.fillText("Score: " + score, 30, 50);

    ctx.fillText("Time left: " + timeLeft, 30, 100);
}


function gameLoop() {
    if (isGameOver === true) {
        ctx.fillStyle = "white";
        ctx.font = "40px Pixelify Sans";
        ctx.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
        return; // Stop the game loop if GameOver is true
        
    }
    update();
    draw();
    requestAnimationFrame(gameLoop);
    
}

//gameLoop();
platformImage.onload = () => {
    //gameLoop(); // ✅ Start only after image is ready
    startGame(); // Start the game after the platform image is loaded
};

document.getElementById("buttonhome").addEventListener("click", function() {
    window.location.href = "index.php";
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
.catch(error => console.error("Error:", error));*/

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fox = {
    x: 200,
    y: canvas.height - 150,
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
    
    if (fox.y >= canvas.height - 150) {
        fox.y = canvas.height - 150;
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
    ctx.fillText("Speed: " + speed, 30, 200);
    if (gameOver) {
        ctx.fillText("Game Over", canvas.width / 2 - 50, canvas.height / 2);
    }
}

function gameLoop() {
    update();
    draw();
    if (gameRunning) requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") jump();
});

spawnObstacle();
gameLoop();

document.getElementById("buttonhome").addEventListener("click", function() {
    document.location.href = "index.html";
});
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        }
    });

    if (fox.y + fox.height >= canvas.height || fox.y <= 0) {
        gameOver = true;
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
gameLoop();

document.getElementById("buttonhome").addEventListener("click", function() {
    document.location.href = "index.html";
});
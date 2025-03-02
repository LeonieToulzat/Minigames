const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fox = {
    x: canvas.width / 2 - 100,
    y: canvas.height - 150,
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
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

setInterval(spawnObject, 1000);
window.addEventListener("keydown", moveFox);
window.addEventListener("keyup", stopFox);
gameLoop();

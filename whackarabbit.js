const rabbits = document.querySelectorAll(".rabbit");
const fox = document.getElementById("fox");
const scoreDisplay = document.getElementById("score");

let score = 0;
let currentRabbit = null;
let gameSpeed = 1800; 
let gameInterval = null;

const holePositions = [
    { top: 300, left: 300 },
    { top: 300, left: 600 },
    { top: 300, left: 900 },
    { top: 300, left: 1200 },
    { top: 600, left: 300 },
    { top: 600, left: 600 },
    { top: 600, left: 900 },
    { top: 600, left: 1200 }
];

document.querySelectorAll(".hole").forEach((hole, index) => {
    hole.style.top = holePositions[index].top + "px";
    hole.style.left = holePositions[index].left + "px";
    rabbits[index].style.left = "40px"; 
    rabbits[index].style.top = "-100px";
});

document.addEventListener("mousemove", (event) => {
    fox.style.left = event.clientX - fox.width / 2 + "px";
    fox.style.top = event.clientY - fox.height / 2 + "px";
});

function showRabbit() {
    if (currentRabbit) return; 

    const randomIndex = Math.floor(Math.random() * rabbits.length);
    currentRabbit = rabbits[randomIndex];
    currentRabbit.style.display = "block";

    setTimeout(() => {
        if (currentRabbit) {
            currentRabbit.style.display = "none";
            currentRabbit = null;
        }
    }, gameSpeed - 500);
}

function hitRabbit(event) {
    if (currentRabbit && event.target === currentRabbit) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
        currentRabbit.style.display = "none";
        currentRabbit = null;

        if (score % 5 === 0 && gameSpeed > 500) {
            gameSpeed -= 100;
            restartGame();
        }
    }
}

document.addEventListener("mousedown", () => {
    fox.src = "foxhammerdown.png";
});
document.addEventListener("mouseup", () => {
    fox.src = "foxhammerup.png";
});

function restartGame() {
    clearInterval(gameInterval);
    gameInterval = setInterval(showRabbit, gameSpeed);
}

gameInterval = setInterval(showRabbit, gameSpeed);
document.addEventListener("click", hitRabbit);

document.getElementById("buttonhome").addEventListener("click", function() {
    document.location.href = "index.html";
});
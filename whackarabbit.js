const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Charger les images
const foxImages = {
    up: new Image(),
    down: new Image()
};
foxImages.up.src = "foxhammerup.png";
foxImages.down.src = "foxhammerdown.png";

const rabbitImages = [
    new Image(), new Image(), new Image()
];
rabbitImages[0].src = "rabbit1.png";
rabbitImages[1].src = "rabbit2.png";
rabbitImages[2].src = "rabbit3.png";

const holeImage = new Image();
holeImage.src = "hole.png";
holeImage.width = 160;
holeImage.height = 40;

// Positions des trous
const holes = [
    { x: 300, y: 300 }, { x: 600, y: 300 }, { x: 900, y: 300 }, { x: 1200, y: 300 },
    { x: 300, y: 600 }, { x: 600, y: 600 }, { x: 900, y: 600 }, { x: 1200, y: 600 }
];

let score = 0;
let gameSpeed = 1800;
let currentRabbit = null;
let fox = { x: 400, y: 500, width: 250, height: 250, image: foxImages.up };

// Dessiner le jeu
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les trous
    holes.forEach(hole => {
        ctx.drawImage(holeImage, hole.x, hole.y, holeImage.width, holeImage.height);    
    });

    // Dessiner le lapin (si actif)
    if (currentRabbit) {
        ctx.drawImage(currentRabbit.image, currentRabbit.x + 41, currentRabbit.y-135, 80, 137);
    }

    // Dessiner le renard (suivi souris)
    ctx.drawImage(fox.image, fox.x, fox.y, fox.width, fox.height);

    // Afficher le score
    ctx.fillStyle = "white";
    ctx.font = "40px Pixelify Sans";
    ctx.fillText("Score: " + score, 30, 50);

    
}
/*
// Choisir un trou aléatoire pour le lapin
function showRabbit() {
    if (currentRabbit) return; // Pas plus d'un lapin à la fois

    const index = Math.floor(Math.random() * holes.length);
    const rabbitType = Math.floor(Math.random() * 3); // Choisir un lapin au hasard
    currentRabbit = { 
        x: holes[index].x, 
        y: holes[index].y, 
        image: rabbitImages[rabbitType] 
    };

    setTimeout(() => {
        currentRabbit = null;
    }, gameSpeed - 500);
}*/
/*
// Vérifier si le lapin est frappé
canvas.addEventListener("click", (event) => {
    if (currentRabbit) {
        const distX = event.clientX - (currentRabbit.x + 80);
        const distY = event.clientY - (currentRabbit.y + 137);
        if (Math.abs(distX) < 40 && Math.abs(distY) < 40) {
            score++;
            currentRabbit = null;

            // Augmenter la difficulté
            if (score % 5 === 0 && gameSpeed > 500) {
                gameSpeed -= 100;
                restartGame();
            }
        }
    }
});*/
/*
canvas.addEventListener("click", (event) => {
    if (currentRabbit) {
        const distX = event.clientX - (currentRabbit.x + 80);
        const distY = event.clientY - (currentRabbit.y + 137);
        if (Math.abs(distX) < 40 && Math.abs(distY) < 40) {
            score++;
            currentRabbit = null;

            // Increase difficulty
            if (score % 5 === 0 && gameSpeed > 500) {
                gameSpeed -= 100;
                restartGame();
            }
        }
    }
});
*/

let rabbitClickable = true;

canvas.addEventListener("click", (event) => {
    if (currentRabbit && rabbitClickable) {
        const distX = event.clientX - (currentRabbit.x + 80);
        const distY = event.clientY - (currentRabbit.y + 137);
        if (Math.abs(distX) < 40 && Math.abs(distY) < 40) {
            score++;
            rabbitClickable = false; // Prevent multiple clicks
            currentRabbit = null;

            if (score % 5 === 0 && gameSpeed > 500) {
                gameSpeed -= 100;
                restartGame();
            }
        }
    }
});

function showRabbit() {
    if (currentRabbit) return;
    rabbitClickable = true; // Reset clickability
    const index = Math.floor(Math.random() * holes.length);
    const rabbitType = Math.floor(Math.random() * 3);
    currentRabbit = { 
        x: holes[index].x, 
        y: holes[index].y, 
        image: rabbitImages[rabbitType] 
    };

    setTimeout(() => {
        currentRabbit = null;
    }, Math.max(700, gameSpeed - 500));
}


// Déplacer le renard avec la souris
canvas.addEventListener("mousemove", (event) => {
    fox.x = event.clientX - fox.width / 2;
    fox.y = event.clientY - fox.height / 2;
});

// Changer l'image du renard au clic
canvas.addEventListener("mousedown", () => {
    fox.image = foxImages.down;
});

canvas.addEventListener("mouseup", () => {
    fox.image = foxImages.up;
});

// Relancer le jeu avec une vitesse plus rapide
function restartGame() {
    clearInterval(gameInterval);
    gameInterval = setInterval(showRabbit, gameSpeed);
}

// Lancer le jeu
let gameInterval = setInterval(showRabbit, gameSpeed);
function gameLoop() {
    drawGame();
    requestAnimationFrame(gameLoop);
}
gameLoop();


// Bouton Accueil
document.getElementById("buttonhome").addEventListener("click", function() {
    window.location.href = "indexinfinite.php";
});

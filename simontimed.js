const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/*
const chickens = [
    document.getElementById("chicken1"),
    document.getElementById("chicken2"),
    document.getElementById("chicken3"),
    document.getElementById("chicken4")
];*/

/*
const chickens = [
    new Image(), new Image(), new Image(), new Image()
];
chickens[0].src = "chicken.png";
chickens[1].src = "chicken.png";
chickens[2].src = "chicken.png";
chickens[3].src = "chicken.png";


const chickenImages = [
    "chickenblue.png",
    "chickenred.png",
    "chickenyellow.png",
    "chickengreen.png"
];

const sounds = [
    new Audio("sound1.mp3"),
    new Audio("sound2.mp3"),
    new Audio("sound3.mp3"),
    new Audio("sound4.mp3")
];



let sequence = [];
let playerInput = [];
let playing = false;

// Démarrer le jeu
document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    sequence = [];
    playerInput = [];
    playing = true;
    document.getElementById("message").textContent = "Watch and memorize!";
    nextRound();
}

// Ajouter une nouvelle poule à la séquence
function nextRound() {
    playerInput = [];
    sequence.push(Math.floor(Math.random() * 4));
    playSequence();
}

// Jouer la séquence (les poules clignotent)
function playSequence() {
    let index = 0;
    document.getElementById("message").textContent = "Watch and memorize!";

    function highlight() {
        if (index < sequence.length) {
            let i = sequence[index];
            chickens[i].style.backgroundImage = `url(${chickenImages[i]})`;
            sounds[i].play();

            setTimeout(() => {
                chickens[i].style.backgroundImage = "url(chicken.png)";
                index++;
                setTimeout(highlight, 500);
            }, 800);
        } else {
            document.getElementById("message").textContent = "Your turn!";
        }
    }

    highlight();
}

// Vérifier le clic du joueur
chickens.forEach((chicken, i) => {
    chicken.addEventListener("click", () => {
        if (!playing) return;

        playerInput.push(i);
        chickens[i].style.backgroundImage = `url(${chickenImages[i]})`;
        sounds[i].play();

        setTimeout(() => {
            chickens[i].style.backgroundImage = "url(chicken.png)";
        }, 300);

        if (playerInput[playerInput.length - 1] !== sequence[playerInput.length - 1]) {
            endGame();
        } else if (playerInput.length === sequence.length) {
            setTimeout(nextRound, 1000);
        }
    });
});

// Fin du jeu si erreur
function endGame() {
    playing = false;
    document.getElementById("message").textContent = "Game Over";
}*/

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
    sequence = [];
    playerInput = [];
    playing = true;
    ctx.fillText("Watch and memorize!", canvas.width / 2 - 100, canvas.height - 50);
    nextRound();
    //gameLoop(); // Start game loop
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

  playing = false;
    ctx.fillText("Game over", canvas.width / 2 - 100, canvas.height - 50);
  // Optional: Add delay before redirection
  setTimeout(() => {
    window.location.href = "racetimed.html"; // Next game
  }, 1000); // Short pause before transition
}

const chickenImages = [
    new Image(),
    new Image(),
    new Image(),
    new Image()
];
chickenImages[0].src = "chickenblue.png";
chickenImages[1].src = "chickenred.png";
chickenImages[2].src = "chickenyellow.png";
chickenImages[3].src = "chickengreen.png";

const baseChicken = new Image();
baseChicken.src = "chicken.png";

const sounds = [
    new Audio("sound1.mp3"),
    new Audio("sound2.mp3"),
    new Audio("sound3.mp3"),
    new Audio("sound4.mp3")
];

const chickenPositions = [
    { x: canvas.width / 2 - 100, y: canvas.height / 2 - 200 }, // Haut
    { x: canvas.width / 2 + 100, y: canvas.height / 2 }, // Droite
    { x: canvas.width / 2 - 100, y: canvas.height / 2 + 200 }, // Bas
    { x: canvas.width / 2 - 300, y: canvas.height / 2 } // Gauche
];

let sequence = [];
let playerInput = [];
let playing = false;
let activeChicken = null;
let score = 0;

// Démarrer le jeu
document.getElementById("startButton").addEventListener("click", startGame);
/*
function startGame() {
    sequence = [];
    playerInput = [];
    playing = true;
    ctx.fillText("Watch and memorize!", canvas.width / 2 - 100, canvas.height - 50);
    nextRound();
}
*/
// Ajouter une nouvelle poule à la séquence
function nextRound() {
    playerInput = [];
    sequence.push(Math.floor(Math.random() * 4));
    playSequence();
}

// Jouer la séquence (les poules clignotent)
function playSequence() {
    let index = 0;
    ctx.fillText("Watch and memorize!", canvas.width / 2 - 100, canvas.height - 50);
    ctx.fillText(" ", canvas.width / 2 - 100, canvas.height - 50);

    function highlight() {
        if (index < sequence.length) {
            let i = sequence[index];
            activeChicken = i;
            sounds[i].play();
            draw(); // Met à jour le canvas avec la poule active

            setTimeout(() => {
                activeChicken = null;
                draw();
                index++;
                setTimeout(highlight, 500);
            }, 800);
        } else {
            ctx.fillText("Your turn!", canvas.width / 2 - 100, canvas.height - 50);
        }
    }

    highlight();
}

// Vérifier le clic du joueur sur le canvas
canvas.addEventListener("click", (event) => {
    if (!playing) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    for (let i = 0; i < chickenPositions.length; i++) {
        const { x, y } = chickenPositions[i];

        if (
            mouseX >= x && mouseX <= x + 100 &&
            mouseY >= y && mouseY <= y + 100
        ) {
            playerInput.push(i);
            activeChicken = i;
            sounds[i].play();
            draw();

            setTimeout(() => {
                activeChicken = null;
                draw();
            }, 300);

            if (playerInput[playerInput.length - 1] !== sequence[playerInput.length - 1]) {
                endGame();
            } else if (playerInput.length === sequence.length) {
                setTimeout(nextRound, 1000);
                score++;
            }
            break;
        }
    }
});
/*
// Fin du jeu si erreur
function endGame() {
    playing = false;
    ctx.fillText("Game over", canvas.width / 2 - 100, canvas.height - 50);
}*/

// Fonction pour dessiner le jeu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < chickenPositions.length; i++) {
        const { x, y } = chickenPositions[i];

        if (i === activeChicken) {
            ctx.drawImage(chickenImages[i], x, y, 100, 100);
        } else {
            ctx.drawImage(baseChicken, x, y, 100, 100);
        }
    }
    ctx.fillStyle = "white";
    ctx.font = "40px Pixelify Sans";
    ctx.fillText("Score: " + Math.floor(score), 30, 50);

    ctx.fillText("Time left: " + timeLeft, 30, 100);
}
//draw();
//startGame(); // Start the game when the script loads

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
.catch(error => console.error("Error:", error));*/

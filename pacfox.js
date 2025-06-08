const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let score = 0

const fox = {
    x: canvas.width / 2,
    y: canvas.height / 2 + 90,
    row:1,
    col:1,
    width: 30,
    height: 30,
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
    

const ghost = {
        
    width: 20,
    height: 25,
    images: {
        ghost1: new Image(),
        ghost2: new Image(),
        ghost3: new Image(),
        ghost4: new Image()
    },
    currentImage: null
};
ghost.images.ghost1.src = "rabbitghost1.png";
ghost.images.ghost2.src = "rabbitghost2.png";
ghost.images.ghost3.src = "rabbitghost1.png";
ghost.images.ghost4.src = "rabbitghost2.png";

const ghostPositions = [
    { col: 13, row: 12, image: ghost.images.ghost1 },
    { col: 14, row: 12, image: ghost.images.ghost2 },
    { col: 13, row: 13, image: ghost.images.ghost3 },
    { col: 14, row: 13, image: ghost.images.ghost4 }
];
    
const ghosts = [
    { col: 13, row: 12, direction: {x: 0, y: 0}, width: 20, height: 25, image: ghost.images.ghost1 },
    { col: 14, row: 12, direction: {x: 0, y: 0}, width: 20, height: 25, image: ghost.images.ghost2 },
    { col: 13, row: 13, direction: {x: 0, y: 0}, width: 20, height: 25, image: ghost.images.ghost3 },
    { col: 14, row: 13, direction: {x: 0, y: 0}, width: 20, height: 25, image: ghost.images.ghost4 }
];


const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

const tileSize = 30; // Each tile is 40x40 pixels
const width = 28; // Width in number of tiles (used in layout)
const height = 28; // Height in number of tiles

const pacDotImg = new Image();
pacDotImg.src = 'egg.png';

const powerPelletImg = new Image();
powerPelletImg.src = 'chicken.png';

function drawBoard() {
    for (let i = 0; i < layout.length; i++) {
        const x = (i % width) * tileSize + canvas.width / 2 - (width * tileSize) / 2;
        const y = Math.floor(i / width) * tileSize + canvas.height / 2 - (height * tileSize) / 2;
        const value = layout[i];

        switch (value) {
            case 0: // pac-dot
                /*ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(x + tileSize/2, y + tileSize/2, 4, 0, Math.PI * 2);
                ctx.fill();*/
                ctx.drawImage(pacDotImg, x + tileSize/4 - 2.5, y + tileSize/4 - 3.5, 20, 25); //tileSize/2
                break;
            case 1: // wall
                ctx.fillStyle = "blue";
                ctx.fillRect(x, y, tileSize, tileSize);
                break;
            case 2: // ghost-lair
                //ctx.fillStyle = "purple";
                //ctx.fillRect(x, y, tileSize, tileSize);
                break;
            case 3: // power-pellet
                /*ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(x + tileSize/2, y + tileSize/2, 10, 0, Math.PI * 2);
                ctx.fill();*/
                ctx.drawImage(powerPelletImg, x + tileSize/4 - 2.5, y + tileSize/4 - 3.5, 20, 20);
                break;
            // 4: empty — no drawing needed
        }
    }
}

const squares = []

    
drawBoard()
/*
function drawFox() {
    ctx.drawImage(fox.currentImage, fox.x, fox.y, fox.width, fox.height);
}*/
function drawFox() {
    if (fox.currentImage && fox.currentImage.complete) {
        ctx.drawImage(fox.currentImage, fox.x, fox.y, fox.width, fox.height);
    } else {
        fox.currentImage.onload = () => {
            ctx.drawImage(fox.currentImage, fox.x, fox.y, fox.width, fox.height);
        };
    }
}

document.addEventListener("keydown", (e) => {
    const col = Math.floor((fox.x - (canvas.width / 2 - (width * tileSize) / 2))/ tileSize);
    const row = Math.floor((fox.y - (canvas.height / 2 - (height * tileSize) / 2))/ tileSize);
    let newCol = col;
    let newRow = row;
        
    
    switch (e.key) {
        case "ArrowLeft":
            newCol = col - 1;
            fox.currentImage = fox.images.movingleft;
            break;
        case "ArrowRight":
            newCol = col + 1;
            fox.currentImage = fox.images.moving;
            break;
        case "ArrowUp":
            newRow = row - 1;
            if (fox.currentImage === fox.images.movingleft) {
                fox.currentImage = fox.images.movingleft;
            }
            else if (fox.currentImage === fox.images.moving) {
                fox.currentImage = fox.images.moving;
            }
            break;
        case "ArrowDown":
            newRow = row + 1;
            if (fox.currentImage === fox.images.movingleft) {
                fox.currentImage = fox.images.movingleft;
            }
            else if (fox.currentImage === fox.images.moving) {
                fox.currentImage = fox.images.moving;
            }
            break;
    }

    const newIndex = newRow * width + newCol;
    if (layout[newIndex] !== 1 && layout[newIndex] !== 2) {
        fox.x = newCol * tileSize + canvas.width / 2 - (width * tileSize) / 2;
        fox.y = newRow * tileSize + canvas.height / 2 - (height * tileSize) / 2;
        eatItem(); // 👈 Eat the item after moving
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        drawBoard();
        drawFox();
    }
});

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            fox.currentImage = fox.images.normalleft;
            break;
        case "ArrowRight":
            fox.currentImage = fox.images.normal;
            break;
        case "ArrowUp":
            if (fox.currentImage === fox.images.movingleft) {
                fox.currentImage = fox.images.normalleft;
            }
            else if (fox.currentImage === fox.images.moving) {
                fox.currentImage = fox.images.normal;
            }
            break;
        case "ArrowDown":
            if (fox.currentImage === fox.images.movingleft) {
                fox.currentImage = fox.images.normalleft;
            }
            else if (fox.currentImage === fox.images.moving) {
                fox.currentImage = fox.images.normal;
            }
            break;
    }
});
    
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawFox();
    drawGhosts();
    //moveGhosts();
    //requestAnimationFrame(gameLoop);
}
gameLoop();
    
function eatItem() {
    const col = Math.floor((fox.x - (canvas.width / 2 - (width * tileSize) / 2)) / tileSize);
    const row = Math.floor((fox.y - (canvas.height / 2 - (height * tileSize) / 2)) / tileSize);
    const index = row * width + col;

    if (layout[index] === 0) {
        layout[index] = 4; // mark as eaten
        score += 1;
        console.log("Ate pac-dot! Score:", score);
    } else if (layout[index] === 3) {
        layout[index] = 4; // mark as eaten
        score += 10;
        console.log("Ate power-pellet! Score:", score);
    }
}
/*
function drawGhosts() {
    ghostPositions.forEach(g => {
        const x = g.col * tileSize + canvas.width / 2 - (width * tileSize) / 2;
        const y = g.row * tileSize + canvas.height / 2 - (height * tileSize) / 2;
        ctx.drawImage(g.image, x, y, ghost.width, ghost.height);
    });
}*/

function drawGhosts() {
    ghosts.forEach(g => {
        const x = g.col * tileSize + canvas.width / 2 - (width * tileSize) / 2;
        const y = g.row * tileSize + canvas.height / 2 - (height * tileSize) / 2;
        if (g.image.complete) {
            ctx.drawImage(g.image, x, y, tileSize, tileSize);
        }
    });
}
/*
function moveGhosts() {
    const directions = [
        { x: 0, y: -1 }, // up
        { x: 1, y: 0 },  // right
        { x: 0, y: 1 },  // down
        { x: -1, y: 0 }  // left
    ];

    for (let ghost of ghosts) {
        let bestDir = { x: 0, y: 0 };
        let minDistance = Infinity;

        for (let dir of directions) {
            const testCol = ghost.col + dir.x;
            const testRow = ghost.row + dir.y;
            const index = testRow * width + testCol;

            // Only consider valid moves
            if (
                testCol >= 0 && testCol < width &&
                testRow >= 0 && testRow < height &&
                layout[index] !== 1 // not a wall
            ) {
                const foxCol = Math.floor((fox.x - (canvas.width / 2 - (width * tileSize) / 2)) / tileSize);
                const foxRow = Math.floor((fox.y - (canvas.height / 2 - (height * tileSize) / 2)) / tileSize);

                const dx = foxCol - testCol;
                const dy = foxRow - testRow;
                const dist = Math.abs(dx) + Math.abs(dy); // Manhattan distance

                if (dist < minDistance) {
                    minDistance = dist;
                    bestDir = dir;
                }
            }
        }

        // Move in best direction found
        ghost.col += bestDir.x;
        ghost.row += bestDir.y;
        ghost.direction = bestDir;
    }
}*/

/*
function moveGhosts() {
    const directions = [
        { x: 0, y: -1 }, // up
        { x: 1, y: 0 },  // right
        { x: 0, y: 1 },  // down
        { x: -1, y: 0 }  // left
    ];

    const foxCol = Math.floor((fox.x - (canvas.width / 2 - (width * tileSize) / 2)) / tileSize);
    const foxRow = Math.floor((fox.y - (canvas.height / 2 - (height * tileSize) / 2)) / tileSize);

    for (let ghost of ghosts) {
        let bestDir = { x: 0, y: 0 };
        let minDistance = Infinity;

        for (let dir of directions) {
            const testCol = ghost.col + dir.x;
            const testRow = ghost.row + dir.y;
            const index = testRow * width + testCol;

            if (
                testCol >= 0 && testCol < width &&
                testRow >= 0 && testRow < height &&
                layout[index] !== 1
            ) {
                const dx = foxCol - testCol;
                const dy = foxRow - testRow;
                const dist = Math.abs(dx) + Math.abs(dy);

                if (dist < minDistance) {
                    minDistance = dist;
                    bestDir = dir;
                }
            }
        }

        ghost.col += bestDir.x;
        ghost.row += bestDir.y;
    }
}*/
/*
function moveGhosts() {
    for (let ghost of ghosts) {
        const directions = [
            { x: 0, y: -1 }, // up
            { x: 1, y: 0 },  // right
            { x: 0, y: 1 },  // down
            { x: -1, y: 0 }  // left
        ];

        const nextCol = ghost.col + ghost.direction.x;
        const nextRow = ghost.row + ghost.direction.y;
        const nextIdx = nextRow * width + nextCol;

        // If ghost is blocked or hasn't started moving
        const isOutOfBounds = nextCol < 0 || nextCol >= width || nextRow < 0 || nextRow >= height;
        const isWall = !isOutOfBounds && layout[nextIdx] === 1;

        if (
            (!ghost.direction.x && !ghost.direction.y) || isOutOfBounds || isWall
        ) {
            const opposite = { x: -ghost.direction.x, y: -ghost.direction.y };

            const validDirections = directions.filter(dir => {
                const testCol = ghost.col + dir.x;
                const testRow = ghost.row + dir.y;
                const testIdx = testRow * width + testCol;

                const out = testCol < 0 || testCol >= width || testRow < 0 || testRow >= height;
                const wall = !out && layout[testIdx] === 1;

                // Exclude going backward unless no options
                const isOpposite = dir.x === opposite.x && dir.y === opposite.y;
                return !out && !wall && !isOpposite;
            });

            // If no valid direction (except reverse), allow reverse
            if (validDirections.length === 0) {
                const reverseAllowed = directions.filter(dir => {
                    const testCol = ghost.col + dir.x;
                    const testRow = ghost.row + dir.y;
                    const testIdx = testRow * width + testCol;
                    const out = testCol < 0 || testCol >= width || testRow < 0 || testRow >= height;
                    return !out && layout[testIdx] !== 1;
                });
                ghost.direction = reverseAllowed[Math.floor(Math.random() * reverseAllowed.length)] || { x: 0, y: 0 };
            } else {
                ghost.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
            }
        }
/*
        // Finally move ghost
        ghost.col += ghost.direction.x;
        ghost.row += ghost.direction.y;
        setTimeout(() => {
            ghost.col += ghost.direction.x;
            ghost.row += ghost.direction.y;
        }, 1000);
    }
}*/

// Start ghost movement every 500ms
const ghostSpeed = 500;
let ghostMoveTimer;

function startMovingGhosts() {
    ghostMoveTimer = setInterval(() => {
        moveGhosts();
        draw(); // Redraw board and ghosts
    }, ghostSpeed);
}

function stopMovingGhosts() {
    clearInterval(ghostMoveTimer);
}

function moveGhosts() {
    for (let ghost of ghosts) {
        const directions = [
            { x: 0, y: -1 }, // up
            { x: 1, y: 0 },  // right
            { x: 0, y: 1 },  // down
            { x: -1, y: 0 }  // left
        ];

        const nextCol = ghost.col + ghost.direction.x;
        const nextRow = ghost.row + ghost.direction.y;
        const nextIdx = nextRow * width + nextCol;

        const isOutOfBounds = nextCol < 0 || nextCol >= width || nextRow < 0 || nextRow >= height;
        const isWall = !isOutOfBounds && layout[nextIdx] === 1;

        if (
            (!ghost.direction.x && !ghost.direction.y) || isOutOfBounds || isWall
        ) {
            const opposite = { x: -ghost.direction.x, y: -ghost.direction.y };

            const validDirections = directions.filter(dir => {
                const testCol = ghost.col + dir.x;
                const testRow = ghost.row + dir.y;
                const testIdx = testRow * width + testCol;

                const out = testCol < 0 || testCol >= width || testRow < 0 || testRow >= height;
                const wall = !out && layout[testIdx] === 1;

                const isOpposite = dir.x === opposite.x && dir.y === opposite.y;
                return !out && !wall && !isOpposite;
            });

            if (validDirections.length === 0) {
                const reverseAllowed = directions.filter(dir => {
                    const testCol = ghost.col + dir.x;
                    const testRow = ghost.row + dir.y;
                    const testIdx = testRow * width + testCol;
                    const out = testCol < 0 || testCol >= width || testRow < 0 || testRow >= height;
                    return !out && layout[testIdx] !== 1;
                });
                ghost.direction = reverseAllowed[Math.floor(Math.random() * reverseAllowed.length)] || { x: 0, y: 0 };
            } else {
                ghost.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
            }
        }

        // Move ghost
        ghost.col += ghost.direction.x;
        ghost.row += ghost.direction.y;
    }
}

// Use a redraw function to update visuals
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawFox();
    drawGhosts();
}

// Call this when starting the game
startMovingGhosts();


/*
function moveGhosts() {
    for (let ghost of ghosts) {
        const directions = [
            { x: 0, y: -1 }, // up
            { x: 1, y: 0 },  // right
            { x: 0, y: 1 },  // down
            { x: -1, y: 0 }  // left
        ];

        // Pick a new direction only if blocked or not set
        const currentIdx = ghost.row * width + ghost.col;
        const currentTile = layout[currentIdx];

        const nextCol = ghost.col + ghost.direction.x;
        const nextRow = ghost.row + ghost.direction.y;
        const nextIdx = nextRow * width + nextCol;

        // If blocked or first move, choose a new valid random direction
        if (
            !ghost.direction.x && !ghost.direction.y ||
            layout[nextIdx] === 1 || nextCol < 0 || nextCol >= width || nextRow < 0 || nextRow >= height
        ) {
            const validDirections = directions.filter(dir => {
                const testCol = ghost.col + dir.x;
                const testRow = ghost.row + dir.y;
                const testIdx = testRow * width + testCol;
                return (
                    testCol >= 0 && testCol < width &&
                    testRow >= 0 && testRow < height &&
                    layout[testIdx] !== 1
                );
            });

            if (validDirections.length > 0) {
                ghost.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
            } else {
                ghost.direction = { x: 0, y: 0 };
            }
        }

        // Move ghost
        ghost.col += ghost.direction.x;
        ghost.row += ghost.direction.y;
    }
}

/*

//make the ghosts stop flashing
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

//move ghosts randomly
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1, 1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function () {
        //if next square your ghost is going to go to does not have a ghost and does not have a wall
        if (
            !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
            !squares[ghost.currentIndex + direction].classList.contains("wall")
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
            // else find a new random direction to go in
        } else direction = directions[Math.floor(Math.random() * directions.length)]
        // if the ghost is currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        //if the ghost is currently scared and pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
            ghost.isScared = false
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            ghost.currentIndex = ghost.startIndex
            score += 100
            scoreDisplay.innerHTML = score
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
        }
        checkForGameOver()
    }, ghost.speed)
}*/
/*
//check for a game over
function checkForGameOver() {
    if (
        squares[pacmanCurrentIndex].classList.contains("ghost") &&
        !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup", movePacman)
        setTimeout(function () {
            alert("Game Over")
        }, 500)
    }
}

//check for a win - change the winning score to whatever you wish
function checkForWin() {
    if (score >= 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup", movePacman)
        setTimeout(function () {
            alert("You have WON!")
        }, 500)
    }
}*/

ctx.fillStyle = "white";
ctx.font = "40px Pixelify Sans";
ctx.fillText("Score: " + score, 30, 50);

document.getElementById("buttonhome").addEventListener("click", function() {
    document.location.href = "index.php";
});



// Music elements
const backgroundMusic = document.getElementById("background-music");
backgroundMusic.volume = 0.2;
const soundButton = document.getElementById("soundBtn");
const soundIcon = document.getElementById("sound-icon");
const validSound = new Audio("./sounds/valid.wav");
const invalidSound = new Audio("./sounds/invalid.wav");

// Preload to prevent delay in playing sound
validSound.load();
invalidSound.load();

// Layout functionality elements
const aboutButton = document.getElementById("aboutBtn");
const aboutPopup = document.getElementById("aboutPopup");
const howToButton = document.getElementById("howToBtn");
const howToPopup = document.getElementById("howToPopup");
const chooseImageButton = document.getElementById("imageChoiceBtn");
const chooseImagePopup = document.getElementById("choose-image-popup");
const chooseDifficultyButton = document.getElementById("difficultyBtn");
const chooseDifficultyPopup = document.getElementById(
  "choose-difficulty-popup"
);
const closeAboutButton = document.getElementById("closeAboutBtn");
const closeHowToButton = document.getElementById("closeHowToBtn");
const closeChooseImageButton = document.getElementById("closeChooseImageBtn");
const closeDifficultyButton = document.getElementById("closeDifficultyButton");
const startGameButton = document.getElementById("start-game-button");
const howToContent = document.getElementById("how-to-content");
const aboutContent = document.getElementById("about-content");
const chooseImageContent = document.getElementById("choose-image-content");
const difficultyContent = document.getElementById("choose-difficulty-content");

// Game elements
let boardState = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, null], // null represents the blank tile
];

// console.log(`Initial Board State: ${boardState}`);
console.table(boardState);
// let blankTile = { row: 3, col: 3 }; // Initial position of the blank tile

const diffMap = {
  easy: 3,
  normal: 4,
  hard: 5,
};

const images = document.querySelectorAll(".image-container");
const difficulties = document.querySelectorAll(".difficulty-button");
const gameGrid = document.getElementById("game-grid");
const shuffleSlider = document.getElementById("shuffle-slider");
const shuffleValue = document.getElementById("shuffle-value");

// Default image set to "image-1"
let selectedImage = document.querySelector(".image-container.selected");

let selectedImagePath = `./images/${selectedImage.id}.png`;

// Default difficulty set to "normal"
let difficulty = document.querySelector(".difficulty-button.selected-diff");
// let gridSize = diffMap[difficulty.id];

let gridSize = boardState.length;

function resetBlankTile() {
  return { row: gridSize - 1, col: gridSize - 1 };
}

let blankTile = resetBlankTile();

let isSoundOn = true;
let numMoves = parseInt(shuffleSlider.value);

// console.log(`Selected Image: ${selectedImage.id}`);
// console.log(selectedImagePath);
// console.log(selectedImage);
// console.log(difficulty.id);
// console.log(gridSize);

shuffleSlider.addEventListener("input", () => {
  numMoves = parseInt(shuffleSlider.value);
  shuffleValue.textContent = numMoves;
});

images.forEach((img) => {
  img.addEventListener("click", () => {
    if (selectedImage) {
      selectedImage.classList.remove("selected");
    }

    img.classList.add("selected");
    selectedImage = img;
    selectedImagePath = `./images/${selectedImage.id}.png`;

    renderGameboard(boardState);
    chooseImagePopup.classList.add("hide");
    console.log(`${img.id}`);
  });
});

function generateSolvedBoard(gridSize) {
  const board = [];
  let counter = 1;

  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      row.push(counter < gridSize * gridSize ? counter : null); // Use null for blank
      counter++;
    }
    board.push(row);
  }

  return board;
}

difficulties.forEach((diff) => {
  diff.addEventListener("click", () => {
    if (difficulty && difficulty !== diff) {
      difficulty.classList.remove("selected-diff");
    }

    diff.classList.add("selected-diff");
    difficulty = diff;

    const selectedDiff = diff.id;
    gridSize = diffMap[selectedDiff];

    boardState = generateSolvedBoard(gridSize);
    blankTile = resetBlankTile();

    renderGameboard(boardState);
    console.log(`${diff.id}`);
    console.table(boardState);
    chooseDifficultyPopup.classList.add("hide");
  });
});

// Toggle music
soundButton.addEventListener("click", () => {
  if (isSoundOn) {
    soundIcon.src = "./icons/music-off.png";
  } else {
    soundIcon.src = "./icons/music-on.png";
  }

  backgroundMusic.muted = isSoundOn;
  isSoundOn = !isSoundOn;
});

function hideHowToPlay() {
  howToPopup.classList.add("hide");
}

function showHowToPlay() {
  howToPopup.classList.remove("hide");
}

function hideAbout() {
  aboutPopup.classList.add("hide");
}

function showAbout() {
  aboutPopup.classList.remove("hide");
}

function hideChooseImage() {
  chooseImagePopup.classList.add("hide");
}

function showChooseImage() {
  chooseImagePopup.classList.remove("hide");
}

function hideChooseDifficulty() {
  chooseDifficultyPopup.classList.add("hide");
}

function showChooseDifficulty() {
  chooseDifficultyPopup.classList.remove("hide");
}

// Popups
howToButton.addEventListener("click", () => {
  showHowToPlay();
});

closeHowToButton.addEventListener("click", () => {
  hideHowToPlay();
});

aboutButton.addEventListener("click", () => {
  showAbout();
});

closeAboutButton.addEventListener("click", () => {
  hideAbout();
});

chooseImageButton.addEventListener("click", () => {
  showChooseImage();
});

closeChooseImageButton.addEventListener("click", () => {
  hideChooseImage();
});

chooseDifficultyButton.addEventListener("click", () => {
  showChooseDifficulty();
});

closeDifficultyButton.addEventListener("click", () => {
  hideChooseDifficulty();
});

// Hides HOW TO PLAY if user clicks elsewhere
howToPopup.addEventListener("click", (event) => {
  if (!howToContent.contains(event.target)) {
    hideHowToPlay();
  }
});

aboutPopup.addEventListener("click", (event) => {
  if (!aboutContent.contains(event.target)) {
    hideAbout();
  }
});

chooseImagePopup.addEventListener("click", (event) => {
  if (!chooseImageContent.contains(event.target)) {
    hideChooseImage();
  }
});

chooseDifficultyPopup.addEventListener("click", (event) => {
  if (!difficultyContent.contains(event.target)) {
    hideChooseDifficulty();
  }
});

/**
 * GAME LOGIC
 * Start a new game
 *
 * TODO
 * Disable options from affecting gameboard after game starts
 * Reset timer and move count
 */

function shuffle(gridSize, numMoves) {
  const directions = [
    { row: -1, col: 0 }, // Up
    { row: 1, col: 0 }, // Down
    { row: 0, col: -1 }, // Left
    { row: 0, col: 1 }, // Right
  ];

  // Initialize the puzzle in the solved state
  const puzzle = [];
  let blankPosition = resetBlankTile();
  // let blankPosition = { row: gridSize - 1, col: gridSize - 1 }; // Start with blank in the bottom-right

  let counter = 1;
  for (let i = 0; i < gridSize; i++) {
    puzzle.push([]);
    for (let j = 0; j < gridSize; j++) {
      puzzle[i][j] = counter < gridSize * gridSize ? counter : null; // Use null for blank
      counter++;
    }
  }

  let lastMove = null;

  // Perform backward shuffle moves
  for (let move = 0; move < numMoves; move++) {
    const validMoves = directions
      .map((dir) => ({
        row: blankPosition.row + dir.row,
        col: blankPosition.col + dir.col,
        reverse: { row: -dir.row, col: -dir.col },
      }))
      .filter(
        (pos) =>
          pos.row >= 0 &&
          pos.row < gridSize &&
          pos.col >= 0 &&
          pos.col < gridSize &&
          (!lastMove ||
            pos.row !== blankPosition.row + lastMove.row ||
            pos.col !== blankPosition.col + lastMove.col)
      );

    // Pick a random valid move
    const randomMove =
      validMoves[Math.floor(Math.random() * validMoves.length)];

    // Swap the blank with the chosen tile
    puzzle[blankPosition.row][blankPosition.col] =
      puzzle[randomMove.row][randomMove.col];
    puzzle[randomMove.row][randomMove.col] = null;

    // Update the blank position
    blankPosition = { row: randomMove.row, col: randomMove.col };

    // Store the reverse of the move to avoid undoing it next time
    lastMove = randomMove.reverse;
  }

  // Update global boardState and blankTile
  boardState = puzzle; // Update the global board state
  blankTile = blankPosition; // Update the blank tile position
}

function renderGameboard(boardState) {
  // Clear grid
  gameGrid.innerHTML = "";

  // Need to adjust gameGrid when changing difficulty
  gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  boardState.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = rowIndex;
      square.dataset.col = colIndex;

      if (tile !== null) {
        square.textContent = tile;
        square.style.backgroundImage = `url("${selectedImagePath}")`;

        // The size of grid will adjust based on length of puzzle and each tile's size is adjusted
        const gridSize = boardState.length;
        const tileSize = 400 / gridSize;
        const originalRow = Math.floor((tile - 1) / gridSize);
        const originalCol = (tile - 1) % gridSize;

        square.style.backgroundSize = `${400}px ${400}px`;
        square.style.backgroundPosition = `-${originalCol * tileSize}px -${
          originalRow * tileSize
        }px`;
      } else {
        square.classList.add("blank");
      }

      gameGrid.appendChild(square);
    });
  });
}

// Function to check if a tile is adjacent to the blank tile
function isValidMove(row, col) {
  const rowDiff = Math.abs(row - blankTile.row);
  console.log(`Row diff: ${rowDiff}`);

  const colDiff = Math.abs(col - blankTile.col);
  console.log(`Col Diff: ${colDiff}`);

  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

// Function to move a tile
function moveTile(tileElement) {
  const row = parseInt(tileElement.dataset.row);

  const col = parseInt(tileElement.dataset.col);

  console.log(`Clicked: (${row}, ${col})`);

  // Ignore invalid moves and play invalid sound
  if (isValidMove(row, col)) {
    if (isSoundOn) {
      validSound.play();
    }
    
    // Swap tile with the blank space in boardState
    boardState[blankTile.row][blankTile.col] = boardState[row][col];
    boardState[row][col] = null;

    // Update blank tile position
    const prevBlank = { ...blankTile }; // Save current blank position
    blankTile = { row, col }; // Update blank position

    // Animate the tile to the blank position
    tileElement.style.transform = `translate(
    ${(prevBlank.col - col) * 100}%,
    ${(prevBlank.row - row) * 100}%
  )`;

    // After animation, re-render the gameboard
    setTimeout(() => renderGameboard(boardState), 300);
  } else {
    if (isSoundOn) {
      invalidSound.play();
    }
  }
}

// Event listener for tile clicks
gameGrid.addEventListener("click", (event) => {
  const tileElement = event.target;

  if (
    !tileElement.classList.contains("square") ||
    tileElement.classList.contains("blank")
  ) {
    return; // Ignore clicks on non-tiles or the blank tile
  }

  moveTile(tileElement);
});

// Initial render
renderGameboard(boardState);

startGameButton.addEventListener("click", () => {
  backgroundMusic
    .play()
    .then(() => console.log("Background music playing..."))
    .catch((error) => {
      console.log("Error playing music: ", error);
    });

  // Shuffle puzzle based on numMoves
  shuffle(gridSize, numMoves);
  // const shuffledPuzzle = shuffle(gridSize, numMoves);
  // blankTile = { row: gridSize - 1, col: gridSize - 1 };
  console.table(boardState);
  console.log(`Blank Tile Location: (${blankTile.row}, ${blankTile.col})`);

  renderGameboard(boardState);
  // createGameboard(shuffledPuzzle, selectedImagePath);
});

// Music elements
const backgroundMusic = document.getElementById("background-music");
backgroundMusic.volume = 0.2;
const soundButton = document.getElementById("soundBtn");
const soundIcon = document.getElementById("sound-icon");

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
const diffMap = {
  easy: 3,
  normal: 4,
  hard: 5,
};

const images = document.querySelectorAll(".image-container");
const difficulties = document.querySelectorAll(".difficulty-button");
const gameGrid = document.getElementById("game-grid");

// Default image set to "image-1"
let selectedImage = document.querySelector(".image-container.selected");

let selectedImagePath = `./images/${selectedImage.id}.png`;

// Default difficulty set to "normal"
let difficulty = document.querySelector(".difficulty-button.selected-diff");
let gridSize = diffMap[difficulty.id];

let isSoundOn = true;

// console.log(`Selected Image: ${selectedImage.id}`);
// console.log(selectedImagePath);
// console.log(selectedImage);
// console.log(difficulty.id);
// console.log(gridSize);

images.forEach((img) => {
  img.addEventListener("click", () => {
    if (selectedImage) {
      selectedImage.classList.remove("selected");
    }

    img.classList.add("selected");
    selectedImage = img;
    selectedImagePath = `./images/${selectedImage.id}.png`;

    createGameboard(gridSize, selectedImagePath);
    console.log(`${img.id}`);
  });
});

difficulties.forEach((diff) => {
  diff.addEventListener("click", () => {
    if (difficulty && difficulty !== diff) {
      difficulty.classList.remove("selected-diff");
    }

    diff.classList.add("selected-diff");
    difficulty = diff;

    const selectedDiff = diff.id;
    gridSize = diffMap[selectedDiff];

    createGameboard(gridSize, selectedImagePath);
    console.log(`${diff.id}`);
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

function createGameboard(size, image) {
  gameGrid.innerHTML = "";
  gameGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gameGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const totalTiles = size * size;
  const tileSize = 400 / size;

  // console.log(`Total # of tiles: ${totalTiles}`);
  // console.log(`Tile size: ${tileSize}`);

  for (let i = 1; i < totalTiles; i++) {
    const tile = document.createElement("div");
    tile.classList.add("square");
    tile.textContent = i;

    // Map each tile to specific portion of image
    const row = Math.floor((i - 1) / size);
    // console.log(`row: ${row}`);

    const col = (i - 1) % size;
    // console.log(`col: ${col}`);

    const img = `url('${image}')`;
    // console.log(`image: ${img}`);

    tile.style.backgroundImage = `url("${image}")`;
    tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;
    tile.style.backgroundSize = `${400}px ${400}px`;

    console.log(tile);

    gameGrid.appendChild(tile);
  }

  const blankTile = document.createElement("div");
  blankTile.classList.add("square", "blank");
  gameGrid.appendChild(blankTile);
}

/**
 * Start a new game
 *
 * TODO
 * Disable options from affecting gameboard after game starts
 * Reset timer and move count
 */
startGameButton.addEventListener("click", () => {
  backgroundMusic
    .play()
    .then(() => console.log("Background music playing..."))
    .catch((error) => {
      console.log("Error playing music: ", error);
    });

  createGameboard(gridSize, selectedImagePath);
});

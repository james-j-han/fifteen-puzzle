// Music elements
const backgroundMusic = document.getElementById("background-music");
const soundButton = document.getElementById("soundBtn");

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

const images = document.querySelectorAll(".image-container");
const difficulties = document.querySelectorAll(".difficulty-button");

// Game elements
let selectedImage = null;
let difficulty = document.querySelector(".difficulty-button.selected-diff");

images.forEach((img) => {
  img.addEventListener("click", () => {
    if (selectedImage) {
      selectedImage.classList.remove("selected");
    }

    img.classList.add("selected");
    selectedImage = img;
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
    console.log(`${diff.id}`);
    
  })
});

// Toggle music
soundButton.addEventListener(
  "click",
  () => (backgroundMusic.muted = !backgroundMusic.muted)
);

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
});

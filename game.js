// Music elements
const backgroundMusic = document.getElementById("background-music");
const soundButton = document.getElementById("soundBtn");

// Layout functionality elements
const aboutButton = document.getElementById("aboutBtn");
const aboutPopup = document.getElementById("aboutPopup");
const howToButton = document.getElementById("howToBtn");
const howToPopup = document.getElementById("howToPopup");
const closeAboutButton = document.getElementById("closeAboutBtn");
const closeHowToButton = document.getElementById("closeHowToBtn");
const startGameButton = document.getElementById("start-game-button");

// Toggle music
soundButton.addEventListener(
  "click",
  () => (backgroundMusic.muted = !backgroundMusic.muted)
);

// Popups
howToButton.addEventListener("click", () => {
  console.log("How to button clicked!");
  howToPopup.classList.remove("hide");
});

closeHowToButton.addEventListener("click", () => {
  console.log("CLOSE");

  howToPopup.classList.add("hide");
  console.log(howToPopup.classList);
});

aboutButton.addEventListener("click", () => {
  aboutPopup.classList.remove("hide");
});

closeAboutButton.addEventListener("click", () => {
  aboutPopup.classList.add("hide");
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

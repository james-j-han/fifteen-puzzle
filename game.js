const backgroundMusic = document.getElementById('background-music');
const soundButton = document.getElementById('soundBtn');

window.onload = function () {
  backgroundMusic.play();
}

soundButton.addEventListener('click', () => backgroundMusic.muted = !backgroundMusic.muted);
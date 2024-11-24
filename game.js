const chooseImageElement = document.getElementById('choose-image-button');
const chooseDifficultyElement = document.getElementById('choose-difficulty-button');

chooseImageElement.addEventListener('click', () => console.log('Hello World!'));
chooseDifficultyElement.addEventListener('change', () => console.log(chooseDifficultyElement.value));
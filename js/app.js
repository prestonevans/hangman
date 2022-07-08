const main = document.querySelector('main');
const words = ['basketball', 'soccer', 'football', 'baseball'];
let currentWord = words[Math.floor(Math.random() * words.length)];
let currentGuess = '_'.repeat(currentWord.length);
let lives = 6;

createGame();

function createGame() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const paragraph = document.createElement('p');
  paragraph.innerText = currentGuess;
  main.append(paragraph);

  const livesDisplay = document.createElement('p');
  livesDisplay.innerText = lives;
  main.append(livesDisplay);

  alphabet.forEach((letter) => {
    const button = document.createElement('button');
    button.innerText = letter.toUpperCase();
    button.addEventListener('click', handleClick);
    main.append(button);
  });
}

function handleClick(e) {
  const wordDisplay = document.querySelector('p');
  const livesDisplay = document.querySelector('p:nth-of-type(2)');

  e.target.disabled = true;

  if (currentWord.includes(e.target.innerText.toLowerCase())) {
    e.target.classList.add('success');
    currentGuess = updateCurrentGuess(e.target.innerText.toLowerCase());
    wordDisplay.innerText = currentGuess;

    if (currentGuess.toLowerCase() === currentWord.toLowerCase()) {
      const button = document.createElement('button');
      button.innerText = 'Play again?';
      button.addEventListener('click', resetGame);
      main.append(button);
    }
    return;
  }
  e.target.classList.add('failure');
  livesDisplay.innerText = --lives;

  if (lives === 0) {
    alert('you lost');
  }
}

function resetGame() {
  const previousWord = currentWord;
  const main = document.querySelector('main');

  main.innerHTML = '';

  while (previousWord === currentWord) {
    currentWord = words[Math.floor(Math.random() * words.length)];
  }

  currentGuess = '_'.repeat(currentWord.length);
  lives = 6;

  createGame();
}

function updateCurrentGuess(clickedLetter) {
  return currentGuess
    .split('')
    .map((letter, index) => {
      if (currentWord[index] === clickedLetter) {
        return clickedLetter.toUpperCase();
      }
      return letter;
    })
    .join('');
}

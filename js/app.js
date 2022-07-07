const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const main = document.querySelector('main');
const words = ['basketball', 'soccer', 'football', 'baseball'];
let currentWord = words[Math.floor(Math.random() * words.length)];
let currentGuess = '_'.repeat(currentWord.length);
let lives = 6;

const paragraph = document.createElement('p');
paragraph.innerText = currentGuess
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

function handleClick(e) {
    const wordDisplay = document.querySelector('p');
    const livesDisplay = document.querySelector('p:nth-of-type(2)')

    e.target.disabled = true

    if (currentWord.includes(e.target.innerText.toLowerCase())) {
        e.target.classList.add('success')
      currentGuess = currentGuess.split('').map((letter,index) => {
        if(currentWord[index] === e.target.innerText.toLowerCase()) {
            return e.target.innerText
        }
        return letter
      }).join('')
      wordDisplay.innerText = currentGuess
      if(currentGuess.toLowerCase() === currentWord.toLowerCase()) {
          alert('You won')
      }
      return
    }
    e.target.classList.add('failure')
    livesDisplay.innerText = --lives
    if(lives === 0) {
        alert('you lost')
    }
}
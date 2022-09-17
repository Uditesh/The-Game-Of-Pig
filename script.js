'use strict';
const totalScore0 = document.getElementById('score--0');
const totalScore1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceImg0 = document.querySelector('.dice--0');
const diceImg1 = document.querySelector('.dice--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial Conditions
let scores, playGame, currentScore, activePlayer;
const initialState = function () {
  scores = [0, 0];
  playGame = true;
  currentScore = 0;
  activePlayer = 0; // 0 means first player & 1 means second player

  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceImg0.classList.add('hidden');
  diceImg1.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
initialState();

// function that switches the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling functionality
btnRoll.addEventListener('click', function () {
  if (playGame) {
    // 1) Create random roll dice
    const randomDiceNumber0 = Math.floor(Math.random() * 6 + 1);
    const randomDiceNumber1 = Math.floor(Math.random() * 6 + 1);
    // console.log(randomDiceNumber0);

    // 2) Display dice
    diceImg0.classList.remove('hidden');
    diceImg0.src = `dice-${randomDiceNumber0}.png`;
    diceImg1.classList.remove('hidden');
    diceImg1.src = `dice-${randomDiceNumber1}.png`;

    // 3) Check if rolled 1 then switch to another player
    if (randomDiceNumber0 === randomDiceNumber1) {
      switchPlayer();
    } else {
      // Add dice to current score
      currentScore = currentScore + randomDiceNumber0 + randomDiceNumber1;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScore0.textContent = currentScore;
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playGame) {
    // Add current score to active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // If player's score is >= 150 then player wins
    if (scores[activePlayer] >= 150) {
      // Finish the game
      playGame = false;
      diceImg0.classList.add('hidden');
      diceImg1.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialState);

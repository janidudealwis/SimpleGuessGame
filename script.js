"use strict";

let secretNumber = Math.trunc(Math.random() * 30) + 1;
let score = 10;
let highScore = 0;

const clickSound = new Audio("assets/click.wav");
const bgMusic = document.getElementById("bg-music");
const muteBtn = document.getElementById("muteToggle");
const volumeSlider = document.getElementById("volumeSlider");

// Music setup
bgMusic.volume = 1;
bgMusic.muted = false;

function enableMusicOnUserInteraction() {
  bgMusic.play().catch((error) => {
    console.warn("Autoplay blocked:", error);
  });

  document.removeEventListener("click", enableMusicOnUserInteraction);
  document.removeEventListener("keydown", enableMusicOnUserInteraction);
}
document.addEventListener("click", enableMusicOnUserInteraction);
document.addEventListener("keydown", enableMusicOnUserInteraction);

// Mute toggle
muteBtn.addEventListener("click", () => {
  bgMusic.muted = !bgMusic.muted;
  muteBtn.textContent = bgMusic.muted ? "🔇" : "🔊";
});

// Volume control
volumeSlider.addEventListener("input", () => {
  bgMusic.volume = volumeSlider.value;
});

// Click sound
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Check guess with proper distance logic
document.querySelector(".check-btn").addEventListener("click", function () {
  playClickSound();
  const guess = Number(document.querySelector(".guess-number").value);

  if (!guess) {
    document.querySelector(".message").textContent = "There's no number!";
    return;
  }

  const difference = guess - secretNumber;

  if (guess === secretNumber) {
    document.querySelector(".message").textContent = "Congrats, Correct Number";
    document.querySelector(".secret-number").textContent = secretNumber;

    if (score > highScore) {
      highScore = score;
      document.querySelector(".score-container").innerHTML = `
        <p>score : <span class="score">${score}</span></p>
        <p>high score : <span class="highscore">${highScore}</span></p>
      `;
    }
  } else {
    if (score > 1) {
      if (difference > 3) {
        document.querySelector(".message").textContent = "Too High!";
      } else if (difference > 0) {
        document.querySelector(".message").textContent = "High!";
      } else if (difference < -3) {
        document.querySelector(".message").textContent = "Too Low!";
      } else {
        document.querySelector(".message").textContent = "Low!";
      }

      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lost the game!";
      document.querySelector(".score").textContent = 0;
    }
  }
});

// Reset
document.querySelector(".again-btn").addEventListener("click", function () {
  playClickSound();
  score = 10;
  secretNumber = Math.trunc(Math.random() * 30) + 1;

  document.querySelector(".message").textContent = "Guess my number!";
  document.querySelector(".score").textContent = score;
  document.querySelector(".secret-number").textContent = "?";
  document.querySelector(".guess-number").value = "";

  // Keep high score
  document.querySelector(".score-container").innerHTML = `
    <p>score : <span class="score">${score}</span></p>
    <p>high score : <span class="highscore">${highScore}</span></p>
  `;
});

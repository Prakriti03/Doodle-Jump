import { Game } from './Game';

export const canvas = document.querySelector<HTMLCanvasElement>("#gameCanvas")!;
export const ctx = canvas.getContext("2d")!;

const startScreen = document.getElementById("start-screen")!;
const startButton = document.getElementById("start-button")!;

canvas.height = 500;
canvas.width = 400;

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "flex";
  
  const game = new Game();
  game.start();
  window.addEventListener("keydown", (event) => {
    if (game.isGameOver) return;

    switch (event.key) {
      case "ArrowLeft":
        game.player.moveLeft();
        break;
      case "ArrowRight":
        game.player.moveRight();
        break;
      case " ":
        game.player.jump();
        break;
    }
  });
});







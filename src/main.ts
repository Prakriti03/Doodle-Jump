import { Game } from "./Game";
import { CANVAS_DIMENSIONS } from "./constants";

export const canvas = document.querySelector<HTMLCanvasElement>("#gameCanvas")!;
export const ctx = canvas.getContext("2d")!;

const startScreen = document.getElementById("start-screen")!;
const startButton = document.getElementById("start-button")!;

canvas.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT;
canvas.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "flex";

  const game = new Game();
  game.start();

});
window.addEventListener("keydown", (event) => {
  const game = new Game();
  if (event.key === "Enter") {
    game.start();
  }
});

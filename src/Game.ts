import { Player } from "./Player";
import { Platform, createRandomPlatform } from "./Platform";
import { ctx, canvas } from "./main";
import { Score } from "./Score";

export class Game {
  player: Player;
  platforms: Platform[];
  isGameOver: boolean;
  threshold: number;
  backgroundImg: HTMLImageElement;
  score: Score;

  constructor() {
    this.player = new Player();
    this.platforms = [];
    this.isGameOver = false;
    this.threshold = canvas.height / 2;
    this.backgroundImg = new Image();
    this.backgroundImg.src = "bg.png";
    this.score = new Score(ctx);
  }

  createInitialPlatforms(platformCount: number, canvasHeight: number) {
    let gap = canvasHeight / platformCount;

    for (let i = 0; i < platformCount; i++) {
      let y = canvasHeight - (i + 1) * gap;
      this.platforms.push(createRandomPlatform(y));
    }
  }

  checkCollision() {
    for (let platform of this.platforms) {
      if (
        this.player.posY + this.player.height >= platform.y &&
        this.player.posY + this.player.height <= platform.y + platform.height &&
        this.player.posX + this.player.width > platform.x &&
        this.player.posX < platform.x + platform.width
      ) {
        this.player.hasJumpedOnce = true;
        return platform;
      }
    }
    return null;
  }

  drawGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "48px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.font = "30px Proxima Nova";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(
      "Press Enter to Restart",
      canvas.width / 2,
      canvas.height / 2 + 50
    );
    requestAnimationFrame(this.drawGameOver.bind(this));
  }

  update() {
    if (this.isGameOver) return;

    this.player.velocity += this.player.gravity;
    this.player.posY += this.player.velocity;

    const platform = this.checkCollision();
    if (platform && this.player.velocity > 0) {
      this.player.posY = platform.y - this.player.height;
      this.player.velocity = this.player.jumpStrength;
    }

    if (this.player.hasJumpedOnce && this.player.posY > canvas.height - 60) {
      this.isGameOver = true;
      this.drawGameOver();
      return;
    }

    if (this.player.posY > canvas.height - this.player.height) {
      this.player.posY = canvas.height - this.player.width;
      this.player.isJumping = false;
      this.player.jump();
    }

    if (this.player.posY < this.threshold) {
      let offset = this.threshold - this.player.posY;
      this.player.posY = this.threshold;
      this.platforms.forEach((platform) => {
        platform.y += offset;
      });
      const previousPlatformCount = this.platforms.length;

      this.platforms = this.platforms.filter(
        (platform) => platform.y < canvas.height
      );
      let platformsPassed = previousPlatformCount - this.platforms.length;

      if (platformsPassed > 0) {
        this.score.increment();
      }

      while (this.platforms.length < 6) {
        let newY =
          this.platforms.length > 0
            ? this.platforms[this.platforms.length - 1].y -
              Math.floor(Math.random() * 80 + 20)
            : canvas.height - 60;
        this.platforms.push(createRandomPlatform(newY));
      }
    }

    ctx.drawImage(this.backgroundImg, 0, 0, canvas.width, canvas.height);
    if (this.player.posX + this.player.width < 0) this.player.posX = canvas.width;
    if (this.player.posX > canvas.width) this.player.posX = -60;

    this.score.draw();

    this.player.draw();

    this.platforms.forEach((platform) => platform.draw());

    requestAnimationFrame(this.update.bind(this));
  }

  start() {
    window.addEventListener("keydown", (event) => {
      if (this.isGameOver) return;
  
      switch (event.key) {
        case "ArrowLeft":
          this.player.moveLeft();
          break;
        case "ArrowRight":
          this.player.moveRight();
          break;
        case " ":
          this.player.jump();
          break;
      }
    });
    this.createInitialPlatforms(6, canvas.height);
    this.player.doodlerImg.onload = () => {
      console.log("loaded");
      this.backgroundImg.onload = () => {
        this.update();
      };
    };
  }
}

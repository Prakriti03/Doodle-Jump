
import { ctx } from './main';
import { CANVAS_DIMENSIONS } from './constants';

export class Player {
  posX: number;
  posY: number;
  velocity: number;
  gravity: number;
  jumpStrength: number;
  isJumping: boolean;
  hasJumpedOnce: boolean;
  doodlerImg: HTMLImageElement;
  width: number;
  height: number;

  constructor() {
    this.posX = 10;
    this.posY = 300;
    this.velocity = 0;
    this.gravity = 0.4;
    this.jumpStrength = -10;
    this.isJumping = false;
    this.hasJumpedOnce = false;
    this.doodlerImg = new Image();
    this.doodlerImg.src = "blueR.png";
    this.width = 60;
    this.height = 60;
  }

  draw() {
    ctx.drawImage(this.doodlerImg, this.posX, this.posY, this.width, this.height);
  }

  moveLeft() {
    if (this.posX + this.width < 0) { 
      this.posX = CANVAS_DIMENSIONS.CANVAS_WIDTH; 
    }
    this.posX -= 10;
  }

  moveRight() {
    this.posX += 10;
    if (this.posX > CANVAS_DIMENSIONS.CANVAS_WIDTH) { 
      this.posX = -this.width; 
    }
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velocity = this.jumpStrength;
    }
  }
}

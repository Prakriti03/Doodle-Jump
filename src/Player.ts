
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
  doodlerDir : String;

  constructor() {
    this.posX = 10;
    this.posY = 300;
    this.velocity = 0;
    this.gravity = 0.7;
    this.jumpStrength = -15;
    this.isJumping = false;
    this.hasJumpedOnce = false;
    this.doodlerImg = new Image();
    this.width = 60;
    this.height = 60;
    this.doodlerDir = "Straight";
    this.doodlerImg.src = "blueT.png";
  }

  draw() {
    if (this.doodlerDir=="Straight"){
      this.doodlerImg.src = "blueT.png"
    }
    else if (this.doodlerDir==="Left"){
      this.doodlerImg.src = "blueL.png";
    }
    else{
      this.doodlerImg.src = "blueR.png";
    }
    ctx.drawImage(this.doodlerImg, this.posX, this.posY, this.width, this.height);

  }

  moveLeft() {
    this.doodlerDir = "Left";
    if (this.posX + this.width < 0) { 
      this.posX = CANVAS_DIMENSIONS.CANVAS_WIDTH; 
    }
    this.posX -= 5;
  }

  moveRight() {
    this.doodlerDir = "Right";
    this.posX += 5;
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
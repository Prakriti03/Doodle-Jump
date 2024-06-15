import { ctx } from './main';
import { getRandomInt } from './utils';
import { CANVAS_DIMENSIONS, PLAYER_WIDTH } from './constants';

export class Platform {
  x: number;
  y: number;
  height: number;
  width: number;
  platformImg: HTMLImageElement;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.height = 15;
    this.width = 60;
    this.platformImg = new Image();
    this.platformImg.src = 'platform.png';
  }

  draw() {
    ctx.drawImage(this.platformImg, this.x, this.y, this.width, this.height);
  }
}

export function createRandomPlatform(y: number) {
  const x = getRandomInt(PLAYER_WIDTH*2,CANVAS_DIMENSIONS.CANVAS_WIDTH-PLAYER_WIDTH*2);
  return new Platform(x, y);
}
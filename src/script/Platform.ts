import { ctx, canvas } from './main';

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
    this.platformImg.src = '/platform.png';
  }

  draw() {
    ctx.drawImage(this.platformImg, this.x, this.y, this.width, this.height);
  }
}

export function createRandomPlatform(y: number) {
  const x = Math.floor(Math.random() * (canvas.width - 60));
  return new Platform(x, y);
}

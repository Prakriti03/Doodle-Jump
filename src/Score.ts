export class Score {
  ctx: CanvasRenderingContext2D;
  score: number;
  // highScore : number

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.score = 0;
    //   this.highScore = highScore;
  }

  increment() {
    this.score += 10;
    this.draw();
    console.log(this.score);
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Proxima Nova";
    let x = 20,
      y = 30;
    console.log({ x, y });
    this.ctx.fillText(`Score: ${this.score}`, x, y);
    //   this.ctx.fillStyle = "white";
    //   this.ctx.font = "22px Arial"
    //   this.ctx.fillText(`High Score : ${this.highScore}`, 10, 60);
  }
}

import * as p5 from 'p5';

export class Grid {
  p: p5;
  grid: number;

  constructor(p: p5) {
    this.p = p;
    this.grid = 2;
  }

  draw(): void {
    let x = 0;
    this.p.fill('#aaa');
    while (x < this.p.width) {
      this.p.line(this.grid * x, 0, this.grid * x, this.p.height);
      x += 1;
    }

    let y = 0;
    while (y < this.p.height) {
      this.p.line(0, this.grid * y, this.p.width, this.grid * y);
      y += 1;
    }
  }

}

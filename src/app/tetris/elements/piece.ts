
import { PIECES } from '../data-type/pieces';
import { Playfield } from './playfield';
import { ImagesManagerService } from 'src/app/services/images-manager.service';
import * as p5 from 'p5';

export class Piece {

  p: p5;
  type: string;
  cells: any[];
  x: number;
  y: number;
  size: number;
  cellSize: number;
  offset: number;
  dropInterval: number;
  dropBuffer: number;
  images: ImagesManagerService;

  constructor(p: p5, type: string, playfield: Playfield, x?: number, y?: number) {
    this.p = p;
    this.type = type;
    this.cells = PIECES[type];
    this.size = this.cells.length;
    this.cellSize = playfield.cellSize;
    this.offset = playfield.offset;
    this.x = x === undefined ? Math.floor((playfield.cols - this.size) / 2) : x;
    this.y = y || 0;
    this.dropInterval = 500; // in ms
    this.dropBuffer = 0; // time since last drop
    this.images = ImagesManagerService.getInstance();
  }

  update(time): void {
    this.dropBuffer += time;
  }

  timeToFall(): boolean {
    return this.dropBuffer > this.dropInterval;
  }

  resetBuffer(): void {
    this.dropBuffer = 0;
  }

  draw(offsetX: number, offsetY: number): void {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {

        if (this.cells[row][col]) {
          const x = this.x + col;
          const y = this.y + row;

          const cs = this.cellSize;


          const imgFile = this.images.getImage(this.type.toLowerCase());
          this.p.image(imgFile, offsetX + cs * x, offsetY + cs * y);

          //fill(this.isghost ? '#bbb' : this.cells[row][col])
          //this.p.rect(off + cs * x, off + cs * y, cs - 1, cs - 1);
        }

      }
    }
  }

  show(inputX?: number, inputY?: number): void {
    this.x = inputX !== undefined ? inputX : this.x;
    this.y = inputY !== undefined ? inputY : this.y;
    // for each non-null cell in this piece, fill in
    // the specified color and draw the rectangle
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {

        if (this.cells[row][col]) {
          const x = this.x + col;
          const y = this.y + row;

          const cs = this.cellSize;
          const off = this.offset;


          const imgFile = this.images.getImage(this.type.toLowerCase());
          this.p.image(imgFile, off + cs * x, cs * y);

          //fill(this.isghost ? '#bbb' : this.cells[row][col])
          //this.p.rect(off + cs * x, off + cs * y, cs - 1, cs - 1);
        }

      }
    }
  }

  moveDown(): void {
    this.y++;
  }
  moveRight(): void {
    this.x++;
  }
  moveLeft(): void {
    this.x--;
  }
  moveUp(): void {
    this.y--;
  }

  //================================
  // Rotate functions
  //================================

  // rotate clockwise
  rotateCW() {
    let newCells = [];

    for (let col = 0; col < this.size; col++) {

      let newRow = [];
      for (let row = this.size - 1; row >= 0; row--) {
        newRow.push(this.cells[row][col]);
      }
      newCells.push(newRow);

    }
    this.cells = newCells;
  }

  // rotate counter-clockwise
  rotateCCW() {
    let newCells = [];
    for (let col = this.size - 1; col >= 0; col--) {

      let newRow = [];
      for (let row = 0; row < this.size; row++) {
        newRow.push(this.cells[row][col]);
      }
      newCells.push(newRow);

    }
    this.cells = newCells;
  }
}

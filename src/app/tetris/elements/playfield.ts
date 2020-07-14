import * as p5 from 'p5';
import { constants } from 'src/environments/constants';
import { ImagesManagerService } from 'src/app/services/images-manager.service';
import { Piece } from './piece';

export class Playfield {

  p: p5;
  offset = 34;
  rows = 18;
  cols = 10;
  grid = [];
  cellSize = 16; // 16px

  images: ImagesManagerService;

  constructor(p: p5) {
    this.p = p;
    this.resetGrid();
    this.images = ImagesManagerService.getInstance();
  }

  draw(): void {
    this.p.fill('red');
    this.p.rect(this.offset, 0, this.cols * this.cellSize, this.rows * this.cellSize);
  }


  addToGrid(piece: Piece): void {
    //console.log(1, piece);
    for (let row = 0; row < piece.size; row++) {
      for (let col = 0; col < piece.size; col++) {

        if (piece.cells[row][col] !== false) {
          const gridRow = piece.y + row;
          const gridCol = piece.x + col;

          this.grid[gridRow][gridCol] = piece.type;
        }

      }
    }
    //console.log(2, this.grid);
  }

  isValid(piece: Piece): boolean {

    for (let row = 0; row < piece.size; row++) {
      for (let col = 0; col < piece.size; col++) {

        if (piece.cells[row][col] !== false) {

          let gridRow = piece.y + row;
          let gridCol = piece.x + col;

          //console.log(this.grid[gridRow][gridCol]);

          if (gridRow < 0 || gridRow >= this.rows ||
            gridCol < 0 || gridCol >= this.cols ||
            this.grid[gridRow][gridCol] !== false) {
            //  console.log('NOT VALID');
            return false;
          }
        }

      }
    }

    return true;

  }

  clearLines(): number {
    let fullRows = [];
    for (let row = this.rows - 1; row >= 0; row--) {
      // if this row is full
      if (!this.grid[row].includes(false)) {
        fullRows.push(row);
      }
    }
    fullRows.forEach(row => {
      this.grid.splice(row, 1);
      this.grid.unshift(new Array(this.cols).fill(false));
    });
    return fullRows.length;
  }

  show(): void {
    //===========================
    // Draw cells over the big rectangle
    //===========================

    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {

        let cs = this.cellSize;

        //console.log('// this.grid contains the colors of each cell');
        //console.log(this.grid[row][col]);
        //fill();
        // get the image of the block
        //rect(cs * col + this.offset, cs * row + this.offset, cs - 1, cs - 1);
        if (this.grid[row][col] !== false) {
          const imgFile = this.images.getImage(this.grid[row][col].toLowerCase());
          this.p.image(imgFile, cs * col + this.offset, cs * row);
        }

      }
    }
  }

  resetGrid(): void {
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = new Array(this.cols).fill(false);
    }
  }
}

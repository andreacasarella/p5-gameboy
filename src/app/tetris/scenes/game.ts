import { Injectable } from '@angular/core';
import { constants } from '../../../environments/constants';
import { ControlsManagerService } from 'src/app/services/controls-manager.service';
import { ImagesManagerService } from 'src/app/services/images-manager.service';
import { SoundsManagerService } from 'src/app/services/sounds-manager.service';
import { KeyCode } from '../../data-type/key-code';
import { Playfield } from '../elements/playfield';
import { Piece } from '../elements/piece';
import { Wall } from '../elements/wall';
import { Grid } from '../../shared/elements/grid';
import * as p5 from 'p5';


@Injectable()
export class Game {

  paused: boolean = true;
  sounds: SoundsManagerService;

  lines = 0;
  level = 1;
  score = 0;
  scores = [0, 40, 100, 300, 1200]; // calcolare score * livello


  constructor(p: p5) {
    this.p = p;
    this.y = 0;
    this.preload();
    this.setup();
    this.draw();
    const ctrl = ControlsManagerService.getInstance();
    ctrl.control$.subscribe(c => this.handleControlEvents(c));
    console.log('Game');
    this.sounds = SoundsManagerService.getInstance();
  }

  p: p5;
  y: number;
  controls: string[];
  wallImage: p5.Image;
  walls: Wall[] = [];
  playfield: Playfield;

  images: ImagesManagerService;

  fallingPiece: Piece;
  nextPiece: Piece;

  prev = 0;

  private handleControlEvents(controls): void {
    this.controls = controls;
    if (this.controls?.length > 0) {
      this.y = 0;
      if (this.controls.includes(KeyCode.KEY_START)) {
        this.paused = !this.paused;
        if (this.paused) {
          this.sounds.stopSound('theme-a');
          this.sounds.playSound('pause');
        } //else
        // this.sounds.playSound('theme-a', true);
      }
      if (this.controls.includes(KeyCode.KEY_A)) {
        this.sounds.playSound('rotate');
        this.fallingPiece.rotateCCW();
        // if not valid, rotate back
        if (!this.playfield.isValid(this.fallingPiece))
          this.fallingPiece.rotateCW();
      }
      if (this.controls.includes(KeyCode.KEY_B)) {
        this.sounds.playSound('rotate');
        this.fallingPiece.rotateCW();
        // if not valid, rotate back
        if (!this.playfield.isValid(this.fallingPiece))
          this.fallingPiece.rotateCCW();
      }
      if (this.controls.includes(KeyCode.ARROW_UP)) {
        this.sounds.playSound('rotate');
        this.fallingPiece.rotateCW();
        // if not valid, rotate back
        if (!this.playfield.isValid(this.fallingPiece))
          this.fallingPiece.rotateCCW();
      }
      if (this.controls.includes(KeyCode.ARROW_LEFT)) {
        this.sounds.playSound('move');
        this.fallingPiece.moveLeft();
        if (!this.playfield.isValid(this.fallingPiece))
          this.fallingPiece.moveRight();
      }
      if (this.controls.includes(KeyCode.ARROW_RIGHT)) {
        this.sounds.playSound('move');
        this.fallingPiece.moveRight();
        if (!this.playfield.isValid(this.fallingPiece))
          this.fallingPiece.moveLeft();
      }
      if (this.controls.includes(KeyCode.ARROW_DOWN)) {
        this.sounds.playSound('move');
        this.fallingPiece.moveDown();
        if (!this.playfield.isValid(this.fallingPiece))
          this.fallingPiece.moveUp();
      }
    }
  }

  private setup(): void {
    for (let i = 0; i < 3; i++) {
      this.walls.push(new Wall(this.p, i > 0 ? 'wall' : null));
    }
    this.playfield = new Playfield(this.p);
    this.fallingPiece = this.spawnNewPiece();
    this.nextPiece = this.spawnNewPiece();
  }

  private spawnNewPiece(): Piece {
    //const pieces = ['O', 'J', 'L', 'S', 'Z', 'T', 'I'];
    const pieces = ['I'];
    const choice = pieces[Math.floor(Math.random() * pieces.length)];
    return new Piece(this.p, choice, this.playfield);
  }

  private preload(): void {
    this.images = ImagesManagerService.getInstance();
    const wall = this.p.loadImage('./assets/tetris/wall.jpg');
    this.images.addImage('wall', wall);
    const i = this.p.loadImage('./assets/tetris/i.jpg');
    this.images.addImage('i', i);
    const j = this.p.loadImage('./assets/tetris/j.jpg');
    this.images.addImage('j', j);
    const l = this.p.loadImage('./assets/tetris/l.jpg');
    this.images.addImage('l', l);
    const o = this.p.loadImage('./assets/tetris/o.jpg');
    this.images.addImage('o', o);
    const s = this.p.loadImage('./assets/tetris/s.jpg');
    this.images.addImage('s', s);
    const t = this.p.loadImage('./assets/tetris/t.jpg');
    this.images.addImage('t', t);
    const z = this.p.loadImage('./assets/tetris/z.jpg');
    this.images.addImage('z', z);
  }

  private draw(): void {
    this.p.draw = () => {

      this.p.background(constants.CANVAS_COLOR_HEX);

      this.p.noStroke();

      this.showGrid();
      this.drawWalls();

      //this.playfield.draw();

      this.drawScore();
      this.drawLevel();
      this.drawLines();

      //============================
      // Get time passed since last frame
      //============================

      let curr = this.p.millis();
      let delta = curr - this.prev;
      this.prev = curr;


      //============================
      // Update
      //============================

      if (!this.paused)
        this.fallingPiece.update(delta);

      // move down piece and or get next piece
      // if necessary
      if (this.fallingPiece.timeToFall()) {
        this.fallingPiece.resetBuffer();
        this.fallingPiece.moveDown();


        if (!this.playfield.isValid(this.fallingPiece)) {
          this.fallingPiece.moveUp();
          this.playfield.addToGrid(this.fallingPiece);
          this.sounds.playSound('land');
          this.fallingPiece = this.nextPiece;
          //this.playfield.addToGrid(this.fallingPiece);
          this.nextPiece = this.spawnNewPiece();
          //this.p.redraw();
        }

      }

      const lines = this.playfield.clearLines();
      if (lines > 0 && lines < 4) {
        this.sounds.playSound('line');
        this.sounds.playSound('shift');
      } else if (lines === 4) {
        this.sounds.playSound('tetris');
        this.sounds.playSound('shift');
      }
      this.lines += lines;
      this.score += this.scores[lines] * this.level;
      if (this.level !== Math.floor(this.lines / 10) + 1) {
        this.level = Math.floor(this.lines / 10);
        this.sounds.playSound('level');
      }

      this.playfield.show();
      this.fallingPiece.show();

      //this.playfield.draw();
      this.showNextPiece();

    };
  }

  private showGrid(): void {
    const grid = new Grid(this.p);
    grid.draw();
  }

  private drawWalls(): void {
    this.walls[0].draw(0);
    this.walls[1].draw(18);
    this.walls[2].draw(194);
  }

  private drawScore(): void {
    this.p.fill('#272921');
    this.p.rect(212, 0, 108, 22);
    this.p.fill('#6b7353');
    this.p.rect(212, 24, 108, 20);
    this.p.rect(212, 46, 108, 2);
    this.p.fill(constants.CANVAS_COLOR_HEX);
    this.p.rect(220, 8, 92, 26);
    this.p.rect(222, 6, 88, 30);
    this.p.fill('#333');
    this.p.textFont('Early GameBoy');
    this.p.textAlign('left');
    this.p.textSize(17);
    this.p.text('score', 226, 28);
    this.p.textAlign('right');
    this.p.text(this.score, 320, 68);
    this.p.fill('#6b7353');
    this.p.rect(212, 75, 108, 2);
  }

  private drawLevel(): void {
    this.p.fill('#272921');
    this.p.rect(212, 79, 108, 209);
    this.p.fill(constants.CANVAS_COLOR_HEX);
    this.p.rect(220, 90, 92, 48);
    this.p.rect(222, 88, 88, 52);
    this.p.fill('#333');
    this.p.textAlign('left');
    this.p.text('level', 226, 110);
    this.p.textAlign('right');
    this.p.text(this.level, 310, 130);
  }

  private drawLines(): void {
    this.p.fill(constants.CANVAS_COLOR_HEX);
    this.p.rect(220, 150, 92, 48);
    this.p.rect(222, 148, 88, 52);
    this.p.fill('#333');
    this.p.textAlign('left');
    this.p.text('lines', 226, 170);
    this.p.textAlign('right');
    this.p.text(this.lines, 310, 190);
  }

  private showNextPiece(): void {
    this.p.fill(constants.CANVAS_COLOR_HEX);
    this.p.rect(220, 210, 92, 68);
    this.p.rect(222, 208, 88, 72);

    //if (this.nextPiece == null)
    //this.nextPiece = this.spawnNewPiece();
    this.nextPiece.draw(190, 225);
  }

}

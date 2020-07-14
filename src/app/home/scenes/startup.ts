import { Injectable } from '@angular/core';
import { constants } from '../../../environments/constants';
import { ControlsManagerService } from 'src/app/services/controls-manager.service';
import { SoundsManagerService } from 'src/app/services/sounds-manager.service';
import { Grid } from '../../shared/elements/grid';
import * as p5 from 'p5';
import { KeyCode } from 'src/app/data-type/key-code';

export class Startup {

  p: p5;
  y: number;
  controls: string[];

  soundMgr: SoundsManagerService;

  constructor(p: p5) {
    this.p = p;
    this.y = 0;
    this.draw();
    const ctrl = ControlsManagerService.getInstance();
    ctrl.control$.subscribe(c => this.handleControlEvents(c));
    this.soundMgr = SoundsManagerService.getInstance();
  }

  private handleControlEvents(controls): void {
    this.controls = controls;
  }

  private draw(): void {
    this.p.draw = () => {
      this.p.background(constants.CANVAS_COLOR_HEX);

      this.showGrid();

      if (this.controls?.length > 0) {
        this.y = 0;
        if (this.controls.includes(KeyCode.KEY_A)) { }
        if (this.controls.includes(KeyCode.ARROW_UP)) { }
      }

      this.p.textFont('Pretendo');
      this.p.textAlign('center');
      this.p.textSize(24);
      this.p.text('Nintendo', this.p.width / 2, this.y);

      if (this.y === (this.p.height / 2) - 2) {
        this.soundMgr.playSound('startup');
      }

      if (this.y <= this.p.height / 2)
        this.y++;


      //else
      //this.soundMgr.playSound('startup');
    };
  }

  private showGrid(): void {
    const grid = new Grid(this.p);
    // grid.draw();
  }


}

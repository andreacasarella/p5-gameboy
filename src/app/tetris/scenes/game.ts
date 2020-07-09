import { constants } from '../../../environments/constants';
import { ControlsManagerService } from 'src/app/services/controls-manager.service';
import { Injectable } from '@angular/core';

@Injectable()

export class Game {

  p: any;
  y: number;
  controls: string[];

  constructor(p: any) {
    this.p = p;
    this.y = 0;
    this.setup(p);
    this.draw(p);
    const ctrl = ControlsManagerService.getInstance();
    ctrl.control$.subscribe(c => this.handleControlEvents(c));
    //this.mousePressed(p);
    //this.handleControlEvents();

  }

  private handleControlEvents(controls) {
    this.controls = controls;
  }

  /*
  private mousePressed(p: any) {
    p.mousePressed = () => {
      this.y = 0;
      console.log("Mouse Pressed GAME");
    };
  }
  */

  private draw(p: any) {
    p.draw = () => {
      p.background(constants.CANVAS_COLOR_HEX);

      if (this.controls?.length > 0) {
        if (this.controls.includes('a'))
          p.rect(p.width / 2, p.height / 2, 33, 33);
        if (this.controls.includes('up')) {
          p.rect(p.width / 3, p.height / 3, 33, 33);
        }
      }
      // Define game field
      // Define score bar
      // preview next element


      //p.line(0, this.y, p.width, this.y);
      this.y++;

      if (this.y > p.height)
        this.y = 0;
    };
  }

  private setup(p: any) {
    p.setup = () => {
      p.background(constants.CANVAS_COLOR_HEX);
    };
  }
}

import { constants } from '../../../environments/constants';

export class Shuttle {

  p: any;
  y: number;

  constructor(p: any) {
    this.p = p;
    this.y = 0;
    this.setup(p);
    this.draw(p);
    this.mousePressed(p);
  }

  private mousePressed(p: any) {
    p.mousePressed = () => {
      this.y = 0;
      console.log("Mouse Pressed");
    };
  }

  private draw(p: any) {
    p.draw = () => {
      p.background(constants.CANVAS_COLOR_HEX);

      p.line(0, this.y, p.width, this.y);
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

import { Component, OnInit, HostListener } from '@angular/core';
import { ControlsManagerService } from './services/controls-manager.service';

export enum KEY_CODE {
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  DOWN_ARROW = 40,
  A_BUTTON = 65, 
  B_BUTTON = 66, 
  SELECT_BUTTON = 77, // m
  START_BUTTON = 32, // space
}

export enum CTRL {
  UP_ARROW = 'up',
  RIGHT_ARROW = 'right',
  LEFT_ARROW = 'left',
  DOWN_ARROW = 'down',
  A_BUTTON = 'a',
  B_BUTTON = 'b',
  SELECT_BUTTON = 'select',
  START_BUTTON = 'start',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'p5-gameboy';
  private ctrl: ControlsManagerService;

  keys: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.ctrl = ControlsManagerService.getInstance();
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);

  }

  private getCtrls(event: any): string[] {
    let ctrls = [];
    for (let index = 0; index < event.touches.length; index++) {
      ctrls.push(event.touches.item(index)?.target.id);
    }
    return ctrls;
  }

  touch(event: any): void {
    console.log(event)
    this.ctrl.click(this.getCtrls(event));
  }


  @HostListener('document:keydown', ['$event'])
  keyPress(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.UP_ARROW && !this.keys.includes(CTRL.UP_ARROW))  
        this.keys.push(CTRL.UP_ARROW);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW && !this.keys.includes(CTRL.RIGHT_ARROW))  
        this.keys.push(CTRL.RIGHT_ARROW);
    
    if (event.keyCode === KEY_CODE.LEFT_ARROW && !this.keys.includes(CTRL.LEFT_ARROW)) 
        this.keys.push(CTRL.LEFT_ARROW);

    if (event.keyCode === KEY_CODE.DOWN_ARROW && !this.keys.includes(CTRL.DOWN_ARROW)) 
        this.keys.push(CTRL.DOWN_ARROW);

    if (event.keyCode === KEY_CODE.A_BUTTON && !this.keys.includes(CTRL.A_BUTTON)) 
        this.keys.push(CTRL.A_BUTTON);

    if (event.keyCode === KEY_CODE.B_BUTTON && !this.keys.includes(CTRL.B_BUTTON)) 
        this.keys.push(CTRL.B_BUTTON); 
        
    if (event.keyCode === KEY_CODE.SELECT_BUTTON && !this.keys.includes(CTRL.SELECT_BUTTON)) 
        this.keys.push(CTRL.SELECT_BUTTON);   

     if (event.keyCode === KEY_CODE.START_BUTTON && !this.keys.includes(CTRL.START_BUTTON)) 
        this.keys.push(CTRL.START_BUTTON);   

    this.ctrl.click(this.keys);
    event.stopPropagation();
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.UP_ARROW && this.keys.includes(CTRL.UP_ARROW))  
        this.keys = this.keys.filter(p => p != CTRL.UP_ARROW);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW && this.keys.includes(CTRL.RIGHT_ARROW)) 
        this.keys = this.keys.filter(p => p != CTRL.RIGHT_ARROW);
    
    if (event.keyCode === KEY_CODE.LEFT_ARROW && this.keys.includes(CTRL.LEFT_ARROW)) 
        this.keys = this.keys.filter(p => p != CTRL.LEFT_ARROW);

    if (event.keyCode === KEY_CODE.DOWN_ARROW && this.keys.includes(CTRL.DOWN_ARROW)) 
        this.keys = this.keys.filter(p => p != CTRL.DOWN_ARROW);

    if (event.keyCode === KEY_CODE.A_BUTTON && this.keys.includes(CTRL.A_BUTTON)) 
        this.keys = this.keys.filter(p => p != CTRL.A_BUTTON);

    if (event.keyCode === KEY_CODE.B_BUTTON && this.keys.includes(CTRL.B_BUTTON)) 
       this.keys = this.keys.filter(p => p != CTRL.B_BUTTON);
        
    if (event.keyCode === KEY_CODE.SELECT_BUTTON && this.keys.includes(CTRL.SELECT_BUTTON)) 
       this.keys = this.keys.filter(p => p != CTRL.SELECT_BUTTON);

    if (event.keyCode === KEY_CODE.START_BUTTON && this.keys.includes(CTRL.START_BUTTON)) 
        this.keys = this.keys.filter(p => p != CTRL.START_BUTTON);  
    
    this.ctrl.click(this.keys);
    event.stopPropagation();
  }

}

import { Component, OnInit, HostListener } from '@angular/core';
import { ControlsManagerService } from './services/controls-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'p5-gameboy';
  private ctrl: ControlsManagerService;


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
    this.ctrl.click(this.getCtrls(event));
  }

}

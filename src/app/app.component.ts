import { Component, OnInit, HostListener } from '@angular/core';
import { ControlsManagerService } from './services/controls-manager.service';
import { KeyCode } from './data-type/key-code';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'p5-gameboy';
  private ctrl: ControlsManagerService;

  keys: string[] = [];
  keyCodes = KeyCode;

  constructor() { }

  ngOnInit(): void {
    this.ctrl = ControlsManagerService.getInstance();
  }

  private getCtrls(event: any): string[] {
    const ctrls = [];
    for (let index = 0; index < event?.touches?.length; index++) {
      ctrls.push(event.touches.item(index)?.target.id);
    }
    return ctrls;
  }

  touch(event: any): void {
    //console.log(event);
    this.ctrl.click(this.getCtrls(event));
  }

  @HostListener('contextmenu', ['$event'])
  contextMenu(event: any): void {
    event.preventDefault();
  }

  @HostListener('document:keydown', ['$event'])
  keyPress(event: KeyboardEvent): void {

    if (event.code === KeyCode.ARROW_UP && !this.keys.includes(KeyCode.ARROW_UP))
      this.keys.push(KeyCode.ARROW_UP);

    if (event.code === KeyCode.ARROW_RIGHT && !this.keys.includes(KeyCode.ARROW_RIGHT))
      this.keys.push(KeyCode.ARROW_RIGHT);

    if (event.code === KeyCode.ARROW_LEFT && !this.keys.includes(KeyCode.ARROW_LEFT))
      this.keys.push(KeyCode.ARROW_LEFT);

    if (event.code === KeyCode.ARROW_DOWN && !this.keys.includes(KeyCode.ARROW_DOWN))
      this.keys.push(KeyCode.ARROW_DOWN);

    if (event.code === KeyCode.KEY_A && !this.keys.includes(KeyCode.KEY_A))
      this.keys.push(KeyCode.KEY_A);

    if (event.code === KeyCode.KEY_B && !this.keys.includes(KeyCode.KEY_B))
      this.keys.push(KeyCode.KEY_B);

    if (event.code === KeyCode.KEY_SELECT && !this.keys.includes(KeyCode.KEY_SELECT))
      this.keys.push(KeyCode.KEY_SELECT);

    if (event.code === KeyCode.KEY_START && !this.keys.includes(KeyCode.KEY_START))
      this.keys.push(KeyCode.KEY_START);

    this.ctrl.click(this.keys);
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    if (event.code === KeyCode.ARROW_UP && this.keys.includes(KeyCode.ARROW_UP))
      this.keys = this.keys.filter(p => p !== KeyCode.ARROW_UP);

    if (event.code === KeyCode.ARROW_RIGHT && this.keys.includes(KeyCode.ARROW_RIGHT))
      this.keys = this.keys.filter(p => p !== KeyCode.ARROW_RIGHT);

    if (event.code === KeyCode.ARROW_LEFT && this.keys.includes(KeyCode.ARROW_LEFT))
      this.keys = this.keys.filter(p => p !== KeyCode.ARROW_LEFT);

    if (event.code === KeyCode.ARROW_DOWN && this.keys.includes(KeyCode.ARROW_DOWN))
      this.keys = this.keys.filter(p => p !== KeyCode.ARROW_DOWN);

    if (event.code === KeyCode.KEY_A && this.keys.includes(KeyCode.KEY_A))
      this.keys = this.keys.filter(p => p !== KeyCode.KEY_A);

    if (event.code === KeyCode.KEY_B && this.keys.includes(KeyCode.KEY_B))
      this.keys = this.keys.filter(p => p !== KeyCode.KEY_B);

    if (event.code === KeyCode.KEY_SELECT && this.keys.includes(KeyCode.KEY_SELECT))
      this.keys = this.keys.filter(p => p !== KeyCode.KEY_SELECT);

    if (event.code === KeyCode.KEY_START && this.keys.includes(KeyCode.KEY_START))
      this.keys = this.keys.filter(p => p !== KeyCode.KEY_START);

    this.ctrl.click(this.keys);
  }

}

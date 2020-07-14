import { Component, OnInit, OnDestroy } from '@angular/core';
import { SceneManagerService } from '../services/scene-manager.service';
import { SoundsManagerService } from '../services/sounds-manager.service';
import { ControlsManagerService } from 'src/app/services/controls-manager.service';
import { Startup } from './scenes/startup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private p5: any;
  private canvas;

  constructor() {
    const ctrl = ControlsManagerService.getInstance();
    ctrl.control$.subscribe(c => this.handleControlEvents(c));
  }

  private handleControlEvents(controls): void {
    console.log(controls);
  }

  ngOnInit(): void {
    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.canvas = null;
  }

  private createCanvas(): void {
    this.canvas = new p5(this.sketch, document.getElementById('canvas'));
  }

  private sketch(p: any): void {
    p.setup = () => {
      const mgr = SceneManagerService.getInstance(p);
      p.createCanvas(320, 288);
      p.frameRate(59.7);
      console.log(mgr);
      mgr.wire();
      mgr.showScene(Startup);
    };
    p.preload = () => {
      const sounds = SoundsManagerService.getInstance();
      p.soundFormats('mp3');
      sounds.addSound('startup', new p5.SoundFile('./assets/sounds/startup.mp3'));
    };
  }

}

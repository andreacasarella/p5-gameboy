import { Component, OnInit, OnDestroy } from '@angular/core';
import { SceneManagerService } from '../services/scene-manager.service';
import { Game } from './scenes/game';
import { SoundsManagerService } from '../services/sounds-manager.service';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit, OnDestroy {

  private canvas;

  constructor() { }

  ngOnInit(): void {
    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.canvas = null;
  }

  private createCanvas(): void {
    this.canvas = new p5(this.sketch, document.getElementById('canvas'));
    console.log(this.canvas);
  }

  private sketch(p: any): void {
    p.setup = () => {
      const mgr = SceneManagerService.getInstance(p);
      p.createCanvas(320, 288);
      p.frameRate(59.7);
      console.log(mgr);
      mgr.wire();
      mgr.showScene(Game);
    };
    p.preload = () => {
      const sounds = SoundsManagerService.getInstance();
      p.soundFormats('mp3');
      sounds.addSound('theme-a', new p5.SoundFile('./assets/tetris/sounds/theme-a.mp3'));
      sounds.addSound('gameover', new p5.SoundFile('./assets/tetris/sounds/gameover.mp3'));
      sounds.addSound('land', new p5.SoundFile('./assets/tetris/sounds/land.mp3'));
      sounds.addSound('level', new p5.SoundFile('./assets/tetris/sounds/level.mp3'));
      sounds.addSound('line', new p5.SoundFile('./assets/tetris/sounds/line.mp3'));
      sounds.addSound('move', new p5.SoundFile('./assets/tetris/sounds/move.mp3'));
      sounds.addSound('pause', new p5.SoundFile('./assets/tetris/sounds/pause.mp3'));
      sounds.addSound('rotate', new p5.SoundFile('./assets/tetris/sounds/rotate.mp3'));
      sounds.addSound('shift', new p5.SoundFile('./assets/tetris/sounds/shift.mp3'));
      sounds.addSound('tetris', new p5.SoundFile('./assets/tetris/sounds/tetris.mp3'));
    };
  }
}

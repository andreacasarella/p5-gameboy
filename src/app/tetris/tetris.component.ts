import { Component, OnInit, OnDestroy } from '@angular/core';
import { Intro } from './scenes/intro';
import { SceneManagerService } from '../services/scene-manager.service';
import { ControlsManagerService } from '../services/controls-manager.service';
import { Game } from './scenes/game';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit, OnDestroy {

  private canvas;

  constructor() { }

  ngOnDestroy(): void {
    this.canvas = null;
  }

  ngOnInit(): void {
    this.createCanvas();
  }

  private createCanvas(): void {
    this.canvas = new p5(this.sketch, document.getElementById('canvas'));
    console.log(this.canvas)
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
  }




}

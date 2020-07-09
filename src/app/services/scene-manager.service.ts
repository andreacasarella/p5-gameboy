import { Injectable } from '@angular/core';
import * as SceneManager from 'p5.scenemanager';

export class SceneManagerService {

  private static instance: SceneManagerService;

  private mgr: any;

  private constructor(private p: any) {
    this.mgr = new SceneManager(this.p);
  }

  static getInstance(p?: any): SceneManagerService {
    if (this.instance) return this.instance;
    this.instance = new SceneManagerService(p);
    return this.instance;
  }

  wire(): any {
    return this.mgr.wire();
  }

  getScene(): any {
    return this.mgr.scene;
  }

  getScenes(): any {
    return this.mgr.scenes;
  }

  addScene(scene: any): any {
    return this.mgr.addScene(scene);
  }

  findSceneIndex(scene: any): number {
    return this.mgr.findSceneIndex(scene);
  }

  findScene(scene: any): any {
    return this.mgr.findScene(scene);
  }

  isCurrent(scene: any): any {
    return this.mgr.isCurrent(scene);
  }

  showScene(scene: any, args?: any): void {
    this.mgr.showScene(scene, args);
  }

  showNextScene(args?: any): any {
    this.mgr.showNextScene(args);
  }

  draw(): any {
    return this.mgr.draw();
  }

  handleEvent(event: any): void {
    this.mgr.handleEvent(event);
  }

}

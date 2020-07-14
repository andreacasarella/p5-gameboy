import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class ControlsManagerService {

  private static instance: ControlsManagerService;

  private control = new Subject<string[]>();
  control$ = this.control.asObservable();

  private constructor() { }

  static getInstance(p?: any): ControlsManagerService {
    if (this.instance) return this.instance;
    this.instance = new ControlsManagerService();
    return this.instance;
  }

  click(control?: string[]): void {
    //  console.log('emit ', control);
    this.control.next(control);
  }

}

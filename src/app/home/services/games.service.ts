import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class GamesService {

  private static instance: GamesService;

  private game = new Subject<string>();
  game$ = this.game.asObservable();

  private constructor() { }

  static getInstance(p?: any): GamesService {
    if (this.instance) return this.instance;
    this.instance = new GamesService();
    return this.instance;
  }

  play(game?: string): void {
    console.log('go to ', game);
    this.game.next(game);
  }
}

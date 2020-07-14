import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as p5 from 'p5';
import 'p5/lib/addons/p5.sound';

export interface Sound {
  name: string;
  sound: p5.SoundFile;
}

@Injectable({
  providedIn: 'root'
})
export class SoundsManagerService {

  private static instance: SoundsManagerService;

  private sounds: Sound[] = [];

  private constructor() { }

  static getInstance(): SoundsManagerService {
    if (this.instance) return this.instance;
    this.instance = new SoundsManagerService();
    return this.instance;
  }

  addSound(name: string, sound: p5.SoundFile): void {
    this.sounds.push({ name, sound });
    //console.log('sound ', sound);
  }

  stopSound(name: string): void {
    const sound = this.sounds.find(p => p.name === name)?.sound;
    sound.stop();
  }

  playSound(name: string, loop: boolean = false): void {
    //  console.log(name);
    //  console.log(this.sounds.find(p => p.name === name));

    // if it is iOS, we have to have a user interaction to start Web Audio
    // http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
    const iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);

    if (iOS) {
      const soundEffect = new Audio('./assets/sounds/startup.mp3');

      // onClick of first interaction on page before I need the sounds
      //soundEffect.play();

      // later on when you actually want to play a sound at any point without user interaction
      // soundEffect.src = './assets/sounds/startup.mp3';
      soundEffect.play();
    } else {
      const context = new AudioContext();
      context.resume().then(() => {
        const sound = this.sounds.find(p => p.name === name)?.sound;
        sound.setLoop(loop);
        sound.play();
      });

    }
  }




}

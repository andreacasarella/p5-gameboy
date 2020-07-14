import { Injectable } from '@angular/core';
import * as p5 from 'p5';

export interface Image {
  name: string;
  image: p5.Image;
}

export class ImagesManagerService {

  private static instance: ImagesManagerService;

  private images: Image[] = [];

  private constructor() { }

  static getInstance(): ImagesManagerService {
    if (this.instance) return this.instance;
    this.instance = new ImagesManagerService();
    return this.instance;
  }

  addImage(name: string, image: p5.Image): void {
    this.images.push({ name, image });
    // console.log('image ', image);
  }

  getImage(name: string): any {
    return this.images.find(p => p.name === name)?.image;
  }

}

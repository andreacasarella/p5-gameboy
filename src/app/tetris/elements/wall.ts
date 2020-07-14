import * as p5 from 'p5';
import { constants } from 'src/environments/constants';
import { ImagesManagerService } from 'src/app/services/images-manager.service';

export class Wall {
  p: p5;
  y: number;
  width: number;
  height: number;
  img: string;
  images: ImagesManagerService;


  constructor(p: p5, img?: string) {
    this.p = p;
    this.y = 0;
    this.width = 16;
    this.height = this.p.height;
    this.img = img;
    this.images = ImagesManagerService.getInstance();
  }

  draw(x: number): void {
    if (this.img) {
      let y = 0;
      let i = 0;
      while (y < this.p.height) {
        const imgFile = this.images.getImage(this.img);
        this.p.image(imgFile, x, i * imgFile.height);
        i++;
        y += 12;
      }
    } else {
      this.p.fill('black');
      this.p.rect(x, this.y, this.width, this.height);
    }
  }

}

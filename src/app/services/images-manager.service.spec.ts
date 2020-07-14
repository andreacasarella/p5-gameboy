import { TestBed } from '@angular/core/testing';

import { ImagesManagerService } from './images-manager.service';

describe('ImageManagerService', () => {
  let service: ImagesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

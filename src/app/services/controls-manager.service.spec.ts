import { TestBed } from '@angular/core/testing';

import { ControlsManagerService } from './controls-manager.service';

describe('ControlsManagerService', () => {
  let service: ControlsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

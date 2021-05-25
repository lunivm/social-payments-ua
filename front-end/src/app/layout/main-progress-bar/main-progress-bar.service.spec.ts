import { TestBed } from '@angular/core/testing';

import { MainProgressBarService } from './main-progress-bar.service';

describe('MainProgressBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainProgressBarService = TestBed.get(MainProgressBarService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CodeKFKService } from './code-kfk.service';

describe('CodeKFKService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeKFKService = TestBed.get(CodeKFKService);
    expect(service).toBeTruthy();
  });
});

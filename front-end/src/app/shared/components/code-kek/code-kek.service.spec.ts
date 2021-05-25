import { TestBed } from '@angular/core/testing';

import { CodeKEKService } from './code-kek.service';

describe('CodeKEKService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeKEKService = TestBed.get(CodeKEKService);
    expect(service).toBeTruthy();
  });
});

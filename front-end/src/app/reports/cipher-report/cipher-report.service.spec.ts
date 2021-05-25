import { TestBed } from '@angular/core/testing';

import { CipherReportService } from './cipher-report.service';

describe('CipherReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CipherReportService = TestBed.get(CipherReportService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LatestPaymentsService } from './latest-payments.service';

describe('LatestPaymentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LatestPaymentsService = TestBed.get(LatestPaymentsService);
    expect(service).toBeTruthy();
  });
});

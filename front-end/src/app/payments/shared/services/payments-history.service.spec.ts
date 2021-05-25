import { TestBed, inject } from '@angular/core/testing';

import { PaymentsHistoryService } from './payments-history.service';

describe('PaymentsHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentsHistoryService]
    });
  });

  it('should be created', inject([PaymentsHistoryService], (service: PaymentsHistoryService) => {
    expect(service).toBeTruthy();
  }));
});

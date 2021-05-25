import { Payment } from '../../../../../../api-contracts/payment/payment';
import { HistoryFilterModel } from '../history-filter.model';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash/fp';
import { ChangeDetectorRef } from '@angular/core';
import { PaymentsHistoryService } from '../services/payments-history.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompleteSubjectComponent } from '../../../shared/components/common/complete-subject.component';

export class HistoryTableLoaderComponent extends CompleteSubjectComponent {
  public statusTextDescription: string;
  public showLoadingIndicator: boolean = false;

  public payments: Observable<Payment[]>;

  private paymentsSubject = new BehaviorSubject<Payment[]>([]);

  constructor(protected cdRef: ChangeDetectorRef, protected paymentsHistoryService: PaymentsHistoryService) {
    super();
    this.componentSubjects.push(this.paymentsSubject);
    this.payments = this.paymentsSubject.asObservable();
  }


  public onFilterChange(filter: HistoryFilterModel): void {
    this.showLoadingIndicator = true;
    this.statusTextDescription = null;

    this.paymentsHistoryService.requestPayments(filter)
      .subscribe((payments) => {
        if (_.isEmpty(payments)) {
          this.statusTextDescription = 'Не знайдено';
        } else {
          this.statusTextDescription = null;
        }

        this.showLoadingIndicator = false;
        this.paymentsSubject.next(payments);

        this.cdRef.markForCheck();
      });
  }

}

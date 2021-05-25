import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { HistoryTableLoaderComponent } from '../shared/history-table/history-table-loader.component';
import { PaymentsHistoryService } from '../shared/services/payments-history.service';
import { apiDateFormat } from '../../shared/constants/date-formats';
import { HistoryFilterModel } from '../shared/history-filter.model';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { Payment } from '../../../../../api-contracts/payment/payment';

@Component({
  selector: 'sp-paid-actions',
  templateUrl: './paid-actions.component.html',
  styleUrls: ['./paid-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaidActionsComponent extends HistoryTableLoaderComponent {
  public date: Moment = null;
  public reportNumber = '';

  public paymentsFiltered: Observable<Payment[]>;
  public paymentsTotalSum: Observable<number>;

  public get buttonDisabled(): boolean {
    return !(this.date || this.reportNumber);
  }

  public paidFilter = new BehaviorSubject<boolean>(undefined);

  private paidStatusChange = new Subject<boolean>();

  constructor(cdRef: ChangeDetectorRef, paymentsHistoryService: PaymentsHistoryService) {
    super(cdRef, paymentsHistoryService);

    this.setFilteringPipe();

    this.setTotalSumPipe();
    this.setPaidStatusPipe();
  }

  public onFindClick() {
    let filter: HistoryFilterModel = {};

    if (this.date && moment(this.date).isValid()) {
      const date = moment(this.date).format(apiDateFormat);

      filter.datesRange = {
        dateFrom: date,
        dateTo: date
      };
    }

    if (this.reportNumber) {
      filter.reportNumber = this.reportNumber;
    }
    this.paidFilter.next(null);

    this.onFilterChange(filter);
  }

  public onPaidFlagClick(filterVal: boolean) {
    this.paidFilter.next(filterVal);
  }


  public setPaidStatus(paidFlag: boolean) {
    this.paidStatusChange.next(paidFlag);
  }

  private setPaidStatusPipe() {
    this.componentSubscriptions.add(
      this.payments.pipe(
        map((payments: Payment[]) => payments.map(payment => payment._id)),
        switchMap((paymentsIds: string[]) => this.paidStatusChange.asObservable().pipe(
          switchMap((paidStatus: boolean) => this.paymentsHistoryService.setPaidStatus(paidStatus, paymentsIds).pipe(
            catchError(() => of())
          ))
        ))
      ).subscribe(() => {
        this.onFindClick();
        this.cdRef.markForCheck();
      })
    );
  }

  private setTotalSumPipe() {
    this.paymentsTotalSum = this.paymentsFiltered.pipe(
      map(items => items.reduce((acc, item) => acc + item.sum, 0))
    );
  }

  private setFilteringPipe() {
    this.paymentsFiltered = this.payments.pipe(
      switchMap((payments) => this.paidFilter.asObservable().pipe(
        map((paidFlag) => payments.filter(item => paidFlag === null ? true : paidFlag === !!item.paid))
      ))
    )
  }
}

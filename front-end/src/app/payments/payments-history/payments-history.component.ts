import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PaymentsHistoryService } from '../shared/services/payments-history.service';
import { HistoryTableLoaderComponent } from '../shared/history-table/history-table-loader.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'sp-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsHistoryComponent extends HistoryTableLoaderComponent {
  private static readonly filterEmptyMessage = 'Вкажіть параметри пошуку';

  constructor(cdRef: ChangeDetectorRef, paymentsHistoryService: PaymentsHistoryService) {
    super(cdRef, paymentsHistoryService);
    this.statusTextDescription = PaymentsHistoryComponent.filterEmptyMessage;
  }

  public onFilterEmpty() {
    this.statusTextDescription = PaymentsHistoryComponent.filterEmptyMessage;
  }
}

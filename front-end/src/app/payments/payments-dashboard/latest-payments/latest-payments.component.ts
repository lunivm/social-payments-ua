import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { displayDateFormat } from '../../../shared/constants/date-formats';
import { PersonHelper } from '../../../shared/utils/person.helper';
import { LatestPaymentsService } from './latest-payments.service';
import { UnsubscribableComponent } from '../../../shared/components/common/unsubscribable.component';
import { Payment } from '../../../../../../api-contracts/payment/payment';
import { paymentTab } from '../../payments.config';
import { TabbedItemsService } from '../../../layout/tabbed-items/tabbed-items.service';

@Component({
  selector: 'sp-latest-payments',
  templateUrl: './latest-payments.component.html',
  styleUrls: ['./latest-payments.component.scss']
})
export class LatestPaymentsComponent extends UnsubscribableComponent implements OnInit {
  public readonly moment = moment;
  public readonly displayDateFormat = displayDateFormat;
  public readonly PersonHelper = PersonHelper;

  public renderLoading$: Observable<boolean>;

  private renderLoadingSubject = new BehaviorSubject(true);

  constructor(
    public latestPaymentsService: LatestPaymentsService,
    private tabbedItemsService: TabbedItemsService
  ) {
    super();
    this.renderLoading$ = this.renderLoadingSubject.asObservable();
  }

  public ngOnInit() {
    let firstFrame = true;

    this.componentSubscriptions.add(this.latestPaymentsService.items$
      .pipe(
        map((items) => {
          const res = !items.length && !firstFrame;
          firstFrame = false;

          return res;
        })
      )
      .subscribe(
        (renderLoading) => this.renderLoadingSubject.next(renderLoading)
      )
    );

    this.componentSubscriptions.add(this.latestPaymentsService.sourceExhausted$
      .subscribe((exhausted) => {
        if (exhausted) {
          this.renderLoadingSubject.next(false);
          this.renderLoadingSubject.complete();
        }
      })
    );
  }

  public onScrollBottom(): void {
    this.renderLoadingSubject.next(true);
    this.latestPaymentsService.queryNextFrame();
  }

  public onOpenClick(payment: Payment) {
    this.tabbedItemsService.openTab({
      tab: paymentTab,
      inputs: {
        id: payment._id
      }
    });
  }
}

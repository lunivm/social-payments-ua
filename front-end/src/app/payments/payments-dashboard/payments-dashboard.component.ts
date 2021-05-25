import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sp-payments-dashboard',
  templateUrl: './payments-dashboard.component.html',
  styleUrls: ['./payments-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsDashboardComponent implements OnInit {

  constructor() {}

  public ngOnInit() {
  }

}

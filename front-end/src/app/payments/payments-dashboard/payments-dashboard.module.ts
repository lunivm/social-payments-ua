import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { LatestPaymentsService } from './latest-payments/latest-payments.service';
import { PaymentsDashboardComponent } from './payments-dashboard.component';
import { LatestPaymentsComponent } from './latest-payments/latest-payments.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    PerfectScrollbarModule
  ],
  providers: [LatestPaymentsService],
  entryComponents: [PaymentsDashboardComponent],
  declarations: [PaymentsDashboardComponent, LatestPaymentsComponent]
})
export class PaymentsDashboardModule { }

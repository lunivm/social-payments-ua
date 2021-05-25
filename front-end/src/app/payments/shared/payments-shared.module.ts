import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryTableComponent } from './history-table/history-table.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    PerfectScrollbarModule
  ],
  exports: [HistoryTableComponent],
  declarations: [HistoryTableComponent]
})
export class PaymentsSharedModule { }

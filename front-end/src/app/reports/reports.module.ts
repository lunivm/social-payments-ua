import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbedItemsModule } from '../layout/tabbed-items/tabbed-items.module';
import { PeriodReportModule } from './period-report/period-report.module';
import { ReportsComponent } from './reports.component';
import { CipherReportModule } from './cipher-report/cipher-report.module';
import { ReportsDashboardModule } from './reports-dashboard/reports-dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    ReportsDashboardModule,
    PeriodReportModule,
    CipherReportModule,
    TabbedItemsModule
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }

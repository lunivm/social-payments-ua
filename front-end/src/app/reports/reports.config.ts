import { TabbedItemsConfig } from '../layout/tabbed-items/tabbed-items-config.model';
import { PeriodReportComponent } from './period-report/period-report.component';
import { CipherReportComponent } from './cipher-report/cipher-report.component';
import { ReportsDashboardComponent } from './reports-dashboard/reports-dashboard.component';

export const reportsConfig: TabbedItemsConfig = {
  list: [
    {
      title: 'Платежі за період',
      icon: 'event_note',
      component: PeriodReportComponent,
      singleInstance: true
    },
    {
      title: 'Сформувати шифр',
      icon: 'event_note',
      component: CipherReportComponent,
      singleInstance: true
    }
  ],
  pinnedTabs: [
    {
      title: '',
      icon: 'bookmark',
      component: ReportsDashboardComponent
    }
  ]

};

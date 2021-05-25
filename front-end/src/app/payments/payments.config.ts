import { TabbedItemConfig, TabbedItemsConfig } from '../layout/tabbed-items/tabbed-items-config.model';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsDashboardComponent } from './payments-dashboard/payments-dashboard.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';
import { PaidActionsComponent } from './paid-actions/paid-actions.component';

export const paymentsConfig: TabbedItemsConfig = {
  list: [
    {
      title: 'Новий платіж',
      icon: 'note_add',
      component: PaymentComponent
    },
    {
      title: 'Історія платежів',
      icon: 'history',
      component: PaymentsHistoryComponent
    },
    {
      title: 'Оплати',
      icon: 'monetization_on',
      component: PaidActionsComponent,
      singleInstance: true
    }
  ],
  pinnedTabs: [
    {
      title: 'Головна',
      icon: 'bookmark',
      component: PaymentsDashboardComponent
    }
  ]
};

export const paymentTab: TabbedItemConfig = {
  icon: 'description',
  title: 'Платіж',
  component: PaymentComponent
};

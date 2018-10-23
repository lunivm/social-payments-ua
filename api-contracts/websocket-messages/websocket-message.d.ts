import { FinancialInstitutionMessage } from './financial-institution-message';
import { PaymentMessage } from './payment-message';
import { PersonMessage } from './person-message';
import { WebsocketEvent } from './websocket-event';

export interface WebsocketMessageCommon<T> {
  action: WebsocketEvent;
  payload: T;
}

export type WebsocketMessage =
  FinancialInstitutionMessage |
  PersonMessage |
  PaymentMessage
;


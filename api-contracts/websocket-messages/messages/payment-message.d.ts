import { Payment } from '../../payment/payment';
import { WebsocketMessageCommon } from '../websocket-message-common';

export interface PaymentMessage extends WebsocketMessageCommon<Payment> {
  channel: 'payment'
}

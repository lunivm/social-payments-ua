import { FinancialInstitutionMessage } from './messages/financial-institution-message';
import { PaymentMessage } from './messages/payment-message';
import { PersonAccountsMessage } from './messages/person-accounts-message';
import { PersonMessage } from './messages/person-message';
import { StreetMessage } from './messages/street-message';
import { KodeKekMessage } from './messages/kode-kek-message';
import { KodeKfkMessage } from './messages/kode-kfk-message';

export type WebsocketMessage =
  FinancialInstitutionMessage |
  StreetMessage |
  PersonMessage |
  PersonAccountsMessage |
  PaymentMessage |
  KodeKekMessage |
  KodeKfkMessage
;


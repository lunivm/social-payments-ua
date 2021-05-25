import { FinancialInstitution } from '../../financial-institution/financial.institution';
import { WebsocketMessageCommon } from '../websocket-message-common';

export interface FinancialInstitutionMessage extends WebsocketMessageCommon<FinancialInstitution> {
  channel: 'financial-institution';
}
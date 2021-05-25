import { Moment } from 'moment';
import { FinancialInstitution } from '../../../../../api-contracts/financial-institution/financial.institution';

export interface CipherReportParams {
  date: Moment;
  codeKFK: string;
  codeKEK: string;
  reportNumber: string;
  cipherCode: string;
  financialInstitution: FinancialInstitution;
}

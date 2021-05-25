import { FinancialInstitution } from '../../../../../api-contracts/financial-institution/financial.institution';
import { Person } from '../../../../../api-contracts/person/person';

export interface HistoryFilterModel {
  datesRange?: {
    dateFrom?: string;
    dateTo?: string;
  },
  sumRange?: {
    sumFrom?: number;
    sumTo?: number;
  },
  financialInstitution?: FinancialInstitution,
  person?: Person,
  reportNumber?: string;
}

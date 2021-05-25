import { FinancialInstitution } from '../financial-institution/financial.institution';
import { Person } from '../person/person';

export interface Payment {
  _id: string;
  created: string;
  date: string;
  accountNumber?: string;
  codeKFK: string;
  codeKEK: string;
  sum: number;
  description: string;
  person: Person;
  financialInstitution: FinancialInstitution;
  reportNumber: number;
  paid?: boolean;
}

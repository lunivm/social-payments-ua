import {
  Document,
  model,
  Schema
} from 'mongoose';
import { FinancialInstitution } from 'api-contracts/financial-institution/financial.institution';

export const financialInstitutionSchema = new Schema({
  name: {
    type: String,
    required: [true]
  },
  mfo: {
    type: String,
    required: [true]
  },
  edrpou: {
    type: String,
    required: [true]
  }
});

export type FinancialInstitutionModel = FinancialInstitution & Document;

export const FinancialInstitutionModel = model<FinancialInstitutionModel>(
  'FinancialInstitution',
  financialInstitutionSchema,
  'financialInstitutions'
);

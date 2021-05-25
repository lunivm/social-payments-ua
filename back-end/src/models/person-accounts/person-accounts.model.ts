import {
  Document,
  model,
  Schema
} from 'mongoose';
import { PersonAccounts } from 'api-contracts/person-accounts/person-accounts';

const personAccountsModel = new Schema({
  personId: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  financialInstitutions: [
    {
      financialInstitutionId: {
        type: Schema.Types.ObjectId,
        ref: 'FinancialInstitution',
        required: true
      },
      accounts: [
        {
          account: {
            type: String
          }
        }
      ]
    }
  ]
});

export type PersonAccountsModel = PersonAccounts & Document;

export const PersonAccountsModel = model<PersonAccountsModel>('PersonAccounts', personAccountsModel, 'personAccounts');

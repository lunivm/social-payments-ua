import { PersonAccounts } from 'api-contracts/person-accounts/person-accounts';
import { PersonFinancialInstitutions } from 'api-contracts/person-accounts/person-financial-institutions';
import { clientBroadcastService } from '../../services/client-broadcast.service';
import { MongoosePromise } from '../mongoose-promise';
import { PersonAccountInfo } from './person-account-info';
import { PersonAccountsModel } from './person-accounts.model';

export class PersonAccountsModelService {
  public static resolve(personAccountInfo: PersonAccountInfo): Promise<PersonAccounts | PersonAccountsModel> {
    return PersonAccountsModel.findOne({
      personId: personAccountInfo.personId
    })
      .then((personAccount: PersonAccountsModel) => {
        if (personAccount) {
          return PersonAccountsModelService.updatePersonAccount(personAccount, personAccountInfo);
        } else {
          return PersonAccountsModelService
            .createPersonAccount(personAccountInfo)
            .then((personAccount: PersonAccountsModel) => {
              clientBroadcastService.broadcastClients({
                channel: 'person-accounts',
                action: 'create',
                payload: personAccount.toObject()
              });

              return personAccount;
            });
        }
      });
  }

  public static getAll(): MongoosePromise<PersonAccountsModel[]> {
    return PersonAccountsModel
      .find();
  }

  private static createPersonAccount(personAccount: PersonAccountInfo) {
    return PersonAccountsModel.create({
      personId: personAccount.personId,
      financialInstitutions: [
        {
          financialInstitutionId: personAccount.financialInstitutionId,
          accounts: [{
            account: personAccount.account
          }]
        }
      ]
    });
  }

  private static updatePersonAccount(personAccountModel: PersonAccountsModel, personAccount: PersonAccountInfo) {
    const fiIndex = personAccountModel.financialInstitutions.findIndex((item: PersonFinancialInstitutions) => {
      return item.financialInstitutionId.toString() === personAccount.financialInstitutionId;
    });

    if (fiIndex > -1) {
      const accounts = personAccountModel.financialInstitutions[fiIndex].accounts;
      const accountIndex = accounts.findIndex((item: any) => item.account === personAccount.account);

      if (accountIndex > -1) {
        // todo: return
      } else {
        accounts.push({account: personAccount.account});

        return personAccountModel.save();
      }
    } else {
      personAccountModel.financialInstitutions.push({
        financialInstitutionId: personAccount.financialInstitutionId,
        accounts: [{
          account: personAccount.account
        }]
      });

      return personAccountModel.save();
    }
  }
}

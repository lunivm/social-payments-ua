import { FinancialInstitution } from 'api-contracts/financial-institution/financial.institution';
import { clientBroadcastService } from '../../services/client-broadcast.service';
import { MongoosePromise } from '../mongoose-promise';
import { FinancialInstitutionModel } from './financial-institution.model';
//
export class FinancialInstitutionModelService {
  public static resolve(financialInstitution: FinancialInstitution): Promise<FinancialInstitution | FinancialInstitutionModel> {
    if (financialInstitution._id) {
      return Promise.resolve(financialInstitution)
    }

    return FinancialInstitutionModel.find({
      mfo: financialInstitution.mfo,
      edrpou: financialInstitution.edrpou
    })
      .then(
        (fi: FinancialInstitutionModel[]) => {
          if (fi.length) {
            return Promise.resolve(fi[0]);
          } else {
            delete financialInstitution._id;
            return FinancialInstitutionModel
              .create(financialInstitution)
              .then((financialInstitution: FinancialInstitutionModel) => {
                clientBroadcastService.broadcastClients({
                  channel: 'financial-institution',
                  action: 'create',
                  payload: financialInstitution.toObject()
                });

                return financialInstitution;
              });
          }
        }
      );
  }

  public static getAll(): MongoosePromise<FinancialInstitutionModel[]> {
    return FinancialInstitutionModel
      .find();
  }
}

import { FinancialInstitution } from '../../../../api-contracts/financial-institution/financial.institution';
import { Payment } from '../../../../api-contracts/payment/payment';
import { PaymentsFilter } from '../../../../api-contracts/payment/payments-filter';
import { PaymentsLatest } from '../../../../api-contracts/payment/payments-latest';
import { Person } from '../../../../api-contracts/person/person';
import { Street } from '../../../../api-contracts/street/street';
import { clientBroadcastService } from '../../services/client-broadcast.service';
import { FinancialInstitutionModelService } from '../financial-institution/financial-institution.model.service';
import { MongoosePromise } from '../mongoose-promise';
import { PersonAccountsModelService } from '../person-accounts/person-accounts.model.service';
import { PersonModelService } from '../person/person.model.service';
import { StreetModelService } from '../street/street.model.service';
import { PaymentModel } from './payment.model';

export class PaymentModelService {
  public static create(payment: Payment): Promise<PaymentModel> {
    let financialInstitution: FinancialInstitution;
    let person: Person;
    let street: Street;

    return FinancialInstitutionModelService.resolve(payment.financialInstitution)
      .then((financialInstitutionResponse) => {
        financialInstitution = financialInstitutionResponse;
        return StreetModelService.resolve(payment.person.address.street);
      })
      .then((str: Street) => {
        street = str;
        return PersonModelService.resolve(payment.person);
      })
      .then((personResponse) => {
        person = personResponse;
        return PersonAccountsModelService.resolve({
          personId: person._id,
          financialInstitutionId: financialInstitution._id,
          account: payment.accountNumber
        });
      })
      .then(() => {
        payment.financialInstitution = financialInstitution;
        payment.person._id = person._id;
        payment.person.address.street = street;
        delete payment._id;

        return PaymentModel.create(payment);
      })
      .then((payment: PaymentModel) => {
        clientBroadcastService.broadcastClients({
          channel: 'payment',
          action: 'create',
          payload: payment.toObject() as Payment
        });

        return payment;
      });
  }

  public static find(filter: PaymentsFilter): MongoosePromise<PaymentModel[]> {
    return PaymentModel
      .find(filter)
      .sort('-date');
  }

  public static latest(skip: number, take: number): MongoosePromise<PaymentsLatest> {
    return PaymentModel
      .find({})
      .sort('-date')
      .skip(skip)
      .limit(take)
      .lean()
      .then((payments: PaymentModel[]) => ({
          payments: payments
        })
      );
  }
}
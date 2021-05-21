import { FinancialInstitution } from 'api-contracts/financial-institution/financial.institution';
import { Payment } from 'api-contracts/payment/payment';
import { PaymentsFilter } from 'api-contracts/payment/payments-filter';
import { PaymentsLatest } from 'api-contracts/payment/payments-latest';
import { Person } from 'api-contracts/person/person';
import { Street } from 'api-contracts/street/street';
import { clientBroadcastService } from '../../services/client-broadcast.service';
import { FinancialInstitutionModelService } from '../financial-institution/financial-institution.model.service';
import { MongoosePromise } from '../mongoose-promise';
import { PersonAccountsModelService } from '../person-accounts/person-accounts.model.service';
import { PersonModelService } from '../person/person.model.service';
import { StreetModelService } from '../street/street.model.service';
import { UserModel } from '../user/user.model';
import { PaymentModel } from './payment.model';
import { CodeKEKModelService } from '../code-kek/code-kek.model.service';
import { CodeKFKModelService } from '../code-kfk/code-kfk.model.service';
import { PaymentBatchUpdate } from 'api-contracts/payment/payment-batch-update';

export class PaymentModelService {
  private static readonly sorting = '-date -created';

  public static async create(payment: Payment, user: UserModel): Promise<PaymentModel> {
    const paymentResolved = await PaymentModelService.getResolved(payment, user);
    const paymentModel = await PaymentModel.create(paymentResolved);

    clientBroadcastService.broadcastClients({
      channel: 'payment',
      action: 'create',
      payload: paymentModel.toObject() as Payment
    });

    return paymentModel;
  }

  public static async update(payment: Payment, user: UserModel): Promise<PaymentModel> {
    const paymentResolved = await PaymentModelService.getResolved(payment, user);
    const paymentModel = await PaymentModel.findById(payment._id);
    paymentModel.set(paymentResolved);

    await paymentModel.save();

    clientBroadcastService.broadcastClients({
      channel: 'payment',
      action: 'update',
      payload: paymentModel.toObject() as Payment
    });

    return paymentModel;
  }

  public static find(filter: PaymentsFilter): MongoosePromise<PaymentModel[]> {
    return PaymentModel
      .find(filter)
      .sort(PaymentModelService.sorting);
  }

  public static latest(skip: number, take: number): MongoosePromise<PaymentsLatest> {
    return PaymentModel
      .find({})
      .sort(PaymentModelService.sorting)
      .skip(skip)
      .limit(take)
      .lean()
      .then((payments: PaymentModel[]) => ({
          payments: payments
        })
      );
  }

  public static remove(id: string): MongoosePromise<void> {
    return PaymentModel.deleteOne({_id: id})
      .then(() => {
        clientBroadcastService.broadcastClients({
          channel: 'payment',
          action: 'delete',
          payload: {
            _id: id
          } as any
        });
      });
  }

  public static batchUpdate(ids: string[], props: PaymentBatchUpdate) {
    return PaymentModel.updateMany(
      {
        _id: {
          $in: ids
        }
      },
      {
        $set: {
          paid: props.paid
        }
      }
    )
  }

  private static getResolved(payment: Payment, user: UserModel): Promise<Payment> {
    let financialInstitution: FinancialInstitution;
    let person: Person;
    let street: Street;

    return FinancialInstitutionModelService.resolve(payment.financialInstitution)
      .then((financialInstitutionResponse) => {
        financialInstitution = financialInstitutionResponse;
        return StreetModelService.resolve(payment.person.address.street);
      })
      .then((str: Street) => {
        payment.person.address.street = street = str;
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
        return CodeKEKModelService.add(payment.codeKEK)
          .then(() => CodeKFKModelService.add(payment.codeKFK));
      })
      .then(() => {
        payment.financialInstitution = financialInstitution;
        payment.person._id = person._id;
        payment.person.address.street = street;
        payment.created = new Date(Date.now()).toString();
        (payment as PaymentModel).author = user._id;

        return payment;
      });
  }
}

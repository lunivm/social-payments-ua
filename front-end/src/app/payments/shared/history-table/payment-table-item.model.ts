import * as moment from 'moment';
import { Payment } from '../../../../../../api-contracts/payment/payment';
import { displayDateFormat } from '../../../shared/constants/date-formats';
import { PersonHelper } from '../../../shared/utils/person.helper';

export class PaymentTableItemModel {
  public date: string;
  public codeKFK: string;
  public codeKEK: string;
  public reportNumber: number;
  public account: string;
  public orgName: string;
  public mfo: string;
  public edrpou: string;
  public sum: number;
  public fullName: string;
  public identityCode: string;
  public passport: string;
  public address: string;
  public description: string;
  public paid: boolean;

  constructor(public readonly payment: Payment) {
    this.init();
  }

  private init() {
    const item = this.payment;

    this.date = moment(item.date).format(displayDateFormat);
    this.codeKFK = item.codeKFK;
    this.codeKEK = item.codeKEK;
    this.reportNumber = item.reportNumber;
    this.account = item.accountNumber;

    this.orgName = item.financialInstitution.name;
    this.mfo = item.financialInstitution.mfo;
    this.edrpou = item.financialInstitution.edrpou;

    this.sum = item.sum;

    this.fullName = item.person.fullName;
    this.identityCode = item.person.identityCode;
    this.passport = item.person.passportNumber;
    this.address = PersonHelper.getPersonAddress(this.payment.person.address);

    this.description = item.description;
    this.paid = item.paid;
  }
}

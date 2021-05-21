import {
  NextFunction,
  Request,
  Response
} from 'express';
import * as _ from 'lodash';
import moment from 'moment';
import { Payment } from 'api-contracts/payment/payment';
import { PaymentsFilter } from 'api-contracts/payment/payments-filter';
import { PaymentsLatest } from 'api-contracts/payment/payments-latest';
import { PaymentsLatestFilter } from 'api-contracts/payment/payments-latest-filter';
import { HttpError } from '../../../core/http-error';
import { Token } from '../../../core/token/token';
import { PaymentModelService } from '../../../models/payment/payment.model.service';
import { UserModel } from '../../../models/user/user.model';
import { UserModelService } from '../../../models/user/user.model.service';
import { ApiCommonController } from '../api-common.controller';
import { PaymentModel } from '../../../models/payment/payment.model';
import { PaymentBatchUpdate } from 'api-contracts/payment/payment-batch-update';

export class PaymentsController extends ApiCommonController {
  public static getByFilter(req: Request, res: Response, next: NextFunction): void {
    if (_.isEmpty(req.query)) {
      PaymentsController.sendBadRequest(next);
      return;
    }

    PaymentModelService
      .find(PaymentsController.getSearchConditions(req.query as PaymentsFilter))
      .then(...super.promiseResponse<Payment[]>(res, next));
  }

  public static getLatest(req: Request, res: Response, next: NextFunction): void {
    const {skip, take} = req.query as PaymentsLatestFilter;

    if (_.isEmpty(req.query) || !skip || !take) {
      PaymentsController.sendBadRequest(next);
      return;
    }

    PaymentModelService
      .latest(Number(skip), Number(take))
      .then(...super.promiseResponse<PaymentsLatest>(res, next));
  }

  public static create(req: Request, res: Response, next: NextFunction): void {
    UserModelService.findByToken(Token.extractFromRequest(req))
      .then((user: UserModel) => PaymentModelService.create(req.body as Payment, user))
      .then(...super.promiseResponse<Payment>(res, next));
  }

  public static update(req: Request, res: Response, next: NextFunction): void {
    UserModelService.findByToken(Token.extractFromRequest(req))
      .then((user: UserModel) => PaymentModelService.update(req.body as Payment, user))
      .then(...super.promiseResponse<Payment>(res, next));
  }

  public static getPayment(req: Request, res: Response, next: NextFunction): void {
    PaymentModel.findById(req.params.id)
      .then(...super.promiseResponse<Payment>(res, next));
  }

  public static deletePayment(req: Request, res: Response, next: NextFunction): void {
    PaymentModelService.remove(req.params.id)
      .then(...super.promiseResponse<void>(res, next));
  }

  public static groupUpdate(req: Request, res: Response, next: NextFunction): void {
    if (!req.body.ids || !req.body.ids.length || !!!req.body.props) {
      PaymentsController.sendBadRequest(next);
      return;
    }

    PaymentModelService.batchUpdate(req.body.ids as string[], req.body.props as PaymentBatchUpdate)
      .then(...super.promiseEnd(res, next));
  }

  private static sendBadRequest(next: NextFunction) {
    const err = new HttpError('Missed request params');
    err.status = 400;

    return next(err);
  }

  private static getSearchConditions(filter: PaymentsFilter): Object {
    const conditions: any = {
      date: PaymentsController.getDatesRangeFilter(filter.dateFrom, filter.dateTo),
      sum: PaymentsController.getSumRangeFilter(filter.sumFrom, filter.sumTo),
      $text: PaymentsController.getDescriptionFilter(filter.description),
      codeKFK: filter.codeKFK,
      codeKEK: filter.codeKEK,
      reportNumber: filter.reportNumber
    };

    if (filter.personId) {
      conditions['person._id'] = filter.personId;
    } else {
      Object.assign(conditions, PaymentsController.getNestedSchemaFilter(new Map([
        ['person.fullName', filter.personFullName],
        ['person.passportNumber', filter.personPassportNumber],
        ['person.identityCode', filter.personIdentityCode]
      ])));
    }

    if (filter.financialInstitutionId) {
      conditions['financialInstitution._id'] = filter.financialInstitutionId;
    } else {
      Object.assign(conditions, PaymentsController.getNestedSchemaFilter(new Map([
        ['financialInstitution.name', filter.financialInstitutionName],
        ['financialInstitution.mfo', filter.financialInstitutionMfo],
        ['financialInstitution.edrpou', filter.financialInstitutionEdrpou]
      ])));
    }

    return _.omitBy(conditions, (item) => _.isEmpty(item));
  }

  private static getDatesRangeFilter(dateFrom: string, dateTo: string): Object {
    const searchConditions = {};

    // todo: think on this more
    dateFrom = (dateFrom || '').replace(' ', '+');
    dateTo = (dateTo || '').replace(' ', '+');

    if (dateFrom && moment(dateFrom).isValid()) {
      Object.assign(searchConditions, {$gte: moment(dateFrom).startOf('day') as any});
    }

    if (dateTo && moment(dateTo).isValid()) {
      Object.assign(searchConditions, {$lte: moment(dateTo).endOf('day') as any});
    }

    return searchConditions;
  }

  private static getSumRangeFilter(sumFrom: number, sumTo: number): Object {
    const searchConditions = {};

    if (sumFrom) {
      Object.assign(searchConditions, {$gte: sumFrom});
    }

    if (sumTo) {
      Object.assign(searchConditions, {$lte: sumTo});
    }

    return searchConditions;
  }

  private static getDescriptionFilter(description: string): Object {
    if (!description) {
      return null;
    } else {
      return {
        $search: description,
        $language: 'none'
      };
    }
  }

  private static getNestedSchemaFilter(filterToModelFields: Map<string, string>): { [field: string]: Object } {
    const searchConditions: { [field: string]: Object } = {};

    filterToModelFields.forEach((filterFieldVal, modelFieldName) => {
      if (!filterFieldVal) {
        return;
      }

      searchConditions[modelFieldName] = {$regex: filterFieldVal} as Object;
    });

    return searchConditions;
  }
}

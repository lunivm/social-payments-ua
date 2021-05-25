import {
  NextFunction,
  Request,
  Response
} from 'express';
import { PersonAccounts } from 'api-contracts/person-accounts/person-accounts';
import { PersonAccountsModelService } from '../../../models/person-accounts/person-accounts.model.service';
import { ApiCommonController } from '../api-common.controller';

export class PersonAccountsController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    PersonAccountsModelService
      .getAll()
      .then(...super.promiseResponse<PersonAccounts[]>(res, next));
  }
}

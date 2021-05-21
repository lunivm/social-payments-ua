import {
  NextFunction,
  Request,
  Response
} from 'express';
import { Person } from 'api-contracts/person/person';
import { PersonModelService } from '../../../models/person/person.model.service';
import { ApiCommonController } from '../api-common.controller';

export class PersonsController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    PersonModelService
      .getAll()
      .then(...super.promiseResponse<Person[]>(res, next));
  }
}

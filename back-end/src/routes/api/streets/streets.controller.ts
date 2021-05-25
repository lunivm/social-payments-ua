import {
  NextFunction,
  Request,
  Response
} from 'express';
import { Street } from 'api-contracts/street/street';
import { StreetModelService } from '../../../models/street/street.model.service';
import { ApiCommonController } from '../api-common.controller';

export class StreetsController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    StreetModelService
      .getAll()
      .then(...super.promiseResponse<Street[]>(res, next));
  }
}

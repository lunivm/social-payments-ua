import { ApiCommonController } from '../api-common.controller';
import { NextFunction, Request, Response } from 'express';
import { CodeKFKModelService } from '../../../models/code-kfk/code-kfk.model.service';
import { CodeKFK } from 'api-contracts/code-kfk/code-kfk';

export class CodesKfkController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    CodeKFKModelService
      .getAll()
      .then(...super.promiseResponse<CodeKFK[]>(res, next));
  }
}

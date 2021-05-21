import { ApiCommonController } from '../api-common.controller';
import { NextFunction, Request, Response } from 'express';
import { CodeKEKModelService } from '../../../models/code-kek/code-kek.model.service';
import { CodeKEK } from 'api-contracts/code-kek/code-kek';

export class CodesKekController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    CodeKEKModelService
      .getAll()
      .then(...super.promiseResponse<CodeKEK[]>(res, next));
  }
}

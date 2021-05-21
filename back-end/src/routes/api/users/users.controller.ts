import {
  NextFunction,
  Request,
  Response
} from 'express';
import { User } from 'api-contracts/user/user';
import { UserModelService } from '../../../models/user/user.model.service';
import { ApiCommonController } from '../api-common.controller';

export class UsersController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction) {
    super.checkPermission(req)
      .then(UserModelService.getAll)
      .then(...super.promiseResponse<User[]>(res, next));
  }

  public static create(req: Request, res: Response, next: NextFunction) {
    super.checkPermission(req)
      .then(() => UserModelService.create(req.body))
      .then(...super.promiseEnd(res, next));
  }

  public static update(req: Request, res: Response, next: NextFunction) {
    super.checkPermission(req)
      .then(() => UserModelService.update(req.params.id, req.body))
      .then(...super.promiseEnd(res, next));
  }

  public static delete(req: Request, res: Response, next: NextFunction) {
    super.checkPermission(req)
      .then(() => UserModelService.remove(req.params.id))
      .then(...super.promiseEnd(res, next));
  }
}

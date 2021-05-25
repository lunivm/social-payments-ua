import {
  NextFunction,
  Request,
  Response
} from 'express';
import * as _ from 'lodash';
import { HttpError } from '../../core/http-error';
import { UserModelService } from '../../models/user/user.model.service';

export class ApiCommonController {
  protected static promiseResponse<T>(res?: Response, next?: NextFunction): [(val: T) => void, (err: any) => void] {
    return [
      ApiCommonController.promiseResponseHandler<T>(res),
      ApiCommonController.promiseErrorHandler(next)
    ];
  }

  protected static promiseEnd(res: Response, next: NextFunction): [() => void, (err: any) => void] {
    return [
      ApiCommonController.promiseEndHandler(res),
      ApiCommonController.promiseErrorHandler(next)
    ];
  }

  protected static extractToken(req: Request): string {
    return _.get(req, 'headers.authorization', '').replace('Bearer ', '');
  }

  protected static checkPermission(req: Request): Promise<void> {
    return UserModelService
      .isAdmin(ApiCommonController.extractToken(req))
        .then((admin: boolean) => {
          if (!admin) {
            throw Object.assign(new Error(), {status: 403});
          }
        });
  }


  private static promiseEndHandler(res: Response) {
    return () => res.end();
  }

  private static promiseResponseHandler<T>(res: Response) {
    return (val: T) => res.send(val);
  }

  private static promiseErrorHandler(next: NextFunction) {
    return (err: any) => next(err);
  }
}

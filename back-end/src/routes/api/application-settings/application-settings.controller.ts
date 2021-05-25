import { ApiCommonController } from '../api-common.controller';
import { NextFunction, Request, Response } from 'express';
import { ApplicationSettingsModelService } from '../../../models/application-settings/application-settings.model.service';
import { ApplicationSetting } from 'api-contracts/application-setting/application-setting';

export class ApplicationSettingsController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    ApplicationSettingsModelService
      .getAll()
      .then(...super.promiseResponse<ApplicationSetting[]>(res, next));
  }
}

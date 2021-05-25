import { ApplicationSettingsModel } from './application-settings.model';
import { MongoosePromise } from '../mongoose-promise';
import { ApplicationSetting } from 'api-contracts/application-setting/application-setting';

export class ApplicationSettingsModelService {
  public static getAll(): MongoosePromise<ApplicationSetting[]> {
    return ApplicationSettingsModel.find({});
  }
}

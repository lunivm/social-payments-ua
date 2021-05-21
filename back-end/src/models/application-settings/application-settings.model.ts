import { Document, model, Schema } from 'mongoose';
import { ApplicationSetting } from 'api-contracts/application-setting/application-setting';
import { SettingParamName } from 'api-contracts/application-setting/setting-param-name.type';

const paramNames: SettingParamName[] = [
  'territoryCode',
  'edrpou',
  'dbVersion'
];

export const applicationSettingsSchema = new Schema({
  param: {
    type: String,
    enum: paramNames,
    required: true
  },
  data: {
    type: String,
    required: true
  }
});

export type ApplicationSettingsModel = ApplicationSetting & Document;

export const ApplicationSettingsModel = model<ApplicationSettingsModel>('applicationSettings', applicationSettingsSchema, 'applicationSettings');

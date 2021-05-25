import { SettingParamName } from './setting-param-name.type';

export interface ApplicationSetting {
  param: SettingParamName;
  data: string;
}

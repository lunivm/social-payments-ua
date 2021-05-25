import nconf from 'nconf';
import { ConfigKeys } from './config-keys.type';
import { DbConfig } from './db-config';
import { EnvConfig } from './env-config';
import { Logger } from '../logger/logger';
import { LogLevel } from '../logger/log-levels.type';
import { AllowedAppProtocolsType } from './allowed-app-protocols.type';

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
nconf
  .argv()
  .env()
  .file({file: 'config/server.json'});

export class Config {
  public static get db(): DbConfig {
    return {
      uri: nconf.get(ConfigKeys.DbUri)
    };
  }

  public static get env(): EnvConfig {
    return {
      port: nconf.get(ConfigKeys.Port),
      serveStatic: !!nconf.get(ConfigKeys.ServeStatic),
      allowCORS: !!nconf.get(ConfigKeys.AllowCORS),
      protocol: Config.getProtocol(nconf.get(ConfigKeys.Protocol))
    };
  }

  private static getProtocol(value: AllowedAppProtocolsType): AllowedAppProtocolsType {
    const allowedProtocols: AllowedAppProtocolsType[] = ['HTTPS', 'HTTP'];
    const defaultIndex = 0;

    if (allowedProtocols.indexOf(value) >= 0) {
      return value;
    } else {
      Logger.log(LogLevel.error, `Invalid app protocol: ${value}. Set to default ${allowedProtocols[defaultIndex]}`);

      return allowedProtocols[defaultIndex];
    }
  }
}

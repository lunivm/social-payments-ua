import { AllowedAppProtocolsType } from './allowed-app-protocols.type';

export interface EnvConfig {
  serveStatic: boolean;
  port: number | string;
  protocol: AllowedAppProtocolsType;
  allowCORS: boolean;
}

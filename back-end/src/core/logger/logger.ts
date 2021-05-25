import * as core from 'express-serve-static-core';
import morgan from 'morgan';
import * as winston from 'winston';
import { LogLevel } from './log-levels.type';

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/combined.log',
      handleExceptions: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/error.log',
      handleExceptions: true,
      maxsize: 5242880, //5MB
      maxFiles: 5
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: winston.format.cli()
    })
  ]
});

export class Logger {
  private static initiated: boolean = false;

  public static init(app: core.Express): void {
    Logger.initiated = true;

    app.use(morgan('tiny', {
      stream: {
        write: (msg: string) => Logger.log(LogLevel.info, msg)
      }
    }));
  }

  public static log(level: LogLevel, msg: string): void {
    if (!Logger.initiated) {
      throw new Error('Logger is not initiated');
    }

    logger.log(level, msg);
  }
}
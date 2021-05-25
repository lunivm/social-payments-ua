import { Express } from 'express';
import fs from 'fs';
import http, { Server as HttpServer } from 'http';
import https, { Server as HttpsServer } from 'https';
import { Config } from './config/config';
import { LogLevel } from './logger/log-levels.type';
import { Logger } from './logger/logger';

const debug = require('debug')('express-g:server');

type Port = number | string | boolean;

export class WebServer {
  public readonly server: HttpServer | HttpsServer;

  private readonly port: Port;

  private static readonly sslOptions = {
    key: fs.readFileSync('../cert/key.pem'),
    cert: fs.readFileSync('../cert/cert.pem'),
    passphrase: 'spua'
  };

  constructor(private expressApp: Express) {
    this.port = Config.env.port;
    this.server = Config.env.protocol === 'HTTP' ? http.createServer(this.expressApp) : https.createServer(WebServer.sslOptions, this.expressApp);

    this.initPort();
    this.initServer();
  }

  private static normalizePort(val: Port): Port {
    const port = parseInt(val as string, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  private onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof this.port === 'string'
      ? 'Pipe ' + this.port
      : 'Port ' + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private onListening(): void {
    const addr = this.server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
    Logger.log(LogLevel.info, 'Listening on ' + bind);
  }

  private initPort(): void {
    this.expressApp.set('port', WebServer.normalizePort(this.port));
  }

  private initServer(): void {
    this.server.listen(this.port);
    this.server.on('error', this.onError.bind(this));
    this.server.on('listening', this.onListening.bind(this));
  }
}

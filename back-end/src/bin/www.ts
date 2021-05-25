// #!/usr/bin/env node
import { app } from '../app';
import { WebServer } from '../core/web-server';
import { WebsocketServer } from '../core/websocket-server';

// create closure for node server (hook for running under the electron environment)
export const webServer = new WebServer(app);
export const websocketServer = new WebsocketServer(webServer.server);
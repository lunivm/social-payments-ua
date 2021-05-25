import { WebsocketMessage } from 'api-contracts/websocket-messages/websocket-message';
import { websocketServer } from '../bin/www';

/**
  * Proxy for clients broadcast messaging
  * Encapsulate underlying socket for client broadcast messages and provides messaging functionality as service
 */
export class ClientBroadcastService {
  constructor() {}

  public broadcastClients(msg: WebsocketMessage): void {
    websocketServer.broadcast(msg);
  }
}

export const clientBroadcastService = new ClientBroadcastService();

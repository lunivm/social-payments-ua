import { Street } from '../../street/street';
import { WebsocketMessageCommon } from '../websocket-message-common';

export interface StreetMessage extends WebsocketMessageCommon<Street> {
  channel: 'street'
}


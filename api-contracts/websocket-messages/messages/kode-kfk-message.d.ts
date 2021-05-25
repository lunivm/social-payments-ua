import { WebsocketMessageCommon } from '../websocket-message-common';
import { CodeKFK } from '../../code-kfk/code-kfk';

export interface KodeKfkMessage extends WebsocketMessageCommon<CodeKFK> {
  channel: 'code-kfk'
}

import { WebsocketMessageCommon } from '../websocket-message-common';
import { CodeKEK } from '../../code-kek/code-kek';

export interface KodeKekMessage extends WebsocketMessageCommon<CodeKEK> {
  channel: 'code-kek'
}

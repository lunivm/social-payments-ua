import { Person } from '../../person/person';
import { WebsocketMessageCommon } from '../websocket-message-common';

export interface PersonMessage extends WebsocketMessageCommon<Person> {
  channel: 'person'
}

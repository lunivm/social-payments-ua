import { WebsocketEvent } from './websocket-event';

export interface WebsocketMessageCommon<T> {
  action: WebsocketEvent;
  payload: T;
}

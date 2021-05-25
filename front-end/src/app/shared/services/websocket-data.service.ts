import { zip } from 'rxjs/internal/observable/zip';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { WebsocketMessageCommon } from '../../../../../api-contracts/websocket-messages/websocket-message-common';
import { WebsocketChannel } from './websocket-connection/websocket-channel.type';
import { WebsocketConnectionService } from './websocket-connection/websocket-connection.service';
import * as _ from 'lodash';

export abstract class WebsocketDataService<T> {
  protected abstract dataObserver: ReplaySubject<T[]>;
  protected abstract readonly websocketChannel: WebsocketChannel;

  protected constructor(protected websocketConnectionService: WebsocketConnectionService) {}

  protected connectWebsocketChannel() {
    zip(
      this.websocketConnectionService.subscribeChannel(this.websocketChannel),
      this.dataObserver.asObservable()
    )
      .subscribe((params: [WebsocketMessageCommon<T>, T[]]) => {
        const [message, cached] = params;

        switch (message.action) {
          case 'create':
            this.addItem(message, cached);
            break;
          case 'delete':
            this.removeItem(message, cached);
            break;
          case 'update':
            this.updateItem(message, cached);
            break;
          default:
            throw 'websocket channel action not implemented';
        }
      });
  }

  private addItem(message: WebsocketMessageCommon<T>, cached: T[]) {
    this.dataObserver.next([message.payload].concat(cached));
  }

  private removeItem(message: WebsocketMessageCommon<T>, cached: T[]) {
    _.remove(cached, (item) => (item as any)._id === (message.payload as any)._id);
    this.dataObserver.next(cached);
  }

  private updateItem(message: WebsocketMessageCommon<T>, cached: T[]) {
    const item = cached.find((item) => (item as any)._id === (message.payload as any)._id);

    if (!item) {
      return;
    }

    Object.assign(item, message.payload);
    this.dataObserver.next(cached);
  }
}

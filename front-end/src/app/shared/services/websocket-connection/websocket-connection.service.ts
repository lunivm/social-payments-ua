import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  filter,
  map
} from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WebsocketMessage } from '../../../../../../api-contracts/websocket-messages/websocket-message';
import { WebsocketMessageCommon } from '../../../../../../api-contracts/websocket-messages/websocket-message-common';
import { WindowProvider } from '../../providers/window-provider';
import { AuthService } from '../auth.service';
import { WebsocketChannel } from './websocket-channel.type';
import { SpDialogType } from '../../components/dialog/sp-dialog-type.enum';
import { SpDialogService } from '../../components/dialog/sp-dialog.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class WebsocketConnectionService {
  private static readonly reconnectTimeout = 1000; // ms

  public readonly websocketConnect$: Observable<void>;

  /**
   * Subject for informing about the connection happened event
   */
  private websocketConnectSubject = new Subject<void>();

  /**
    * Main socket subject, holds connection with backend
   */
  private socketSubject: WebSocketSubject<WebsocketMessage>;
  private socketSubjectSubscription: Subscription;
  private reconnectOnClose: boolean;

  /**
   * Socket channels messages subject
   */
  private socketChannelsSubject = new Subject<WebsocketMessage>();

  constructor(private window: WindowProvider, private authService: AuthService, private spDialogService: SpDialogService) {
    this.websocketConnect$ = this.websocketConnectSubject.asObservable();
  }

  public connect(reconnectOnClose: boolean = false) {
    this.createSocketSubject();

    if (this.socketSubjectSubscription) {
      // causes websocket close
      this.socketSubjectSubscription.unsubscribe();

      // set auto reconnect to avoid infinite reconnection loop
      this.reconnectOnClose = reconnectOnClose;
    }

    this.socketSubjectSubscription = this.socketSubject.subscribe(
      (msg: WebsocketMessage) => {
        this.socketChannelsSubject.next(msg);
      },
      (err: Event) => {
        console.log('~~~ websocket ERROR', err);

        const text = `Помилка відкриття websocket. readyState ${(err.currentTarget as any).readyState}`;
        this.spDialogService.open(
          {
            type: SpDialogType.Alert,
            title: 'Помилка',
            text
          },
          {
            panelClass: 'sp-login-error-alert'
          });
      },
      () => console.log('~~~ websocket complete')
    );
  }

  public subscribeChannel<T>(channel: WebsocketChannel): Observable<WebsocketMessageCommon<T>> {
    return this.socketChannelsSubject.asObservable()
      .pipe(
        filter((message: WebsocketMessage) => message.channel === channel),
        map((message: WebsocketMessage) => ({
          action: message.action,
          payload: message.payload as any
        }))
      );
  }

  private createSocketSubject() {
    const protocol = this.window.location.protocol.indexOf('https') >= 0 ? 'wss' : 'ws';
    const hostname = this.window.location.hostname;

    if (this.socketSubject) {
      this.socketSubject.unsubscribe();
      this.socketSubject.complete();
    }

    this.socketSubject = new WebSocketSubject({
      url: `${protocol}://${environment.dataQueries.websocket || hostname}`,
      protocol: this.authService.getToken(),
      openObserver: {
        next: this.onWebsocketOpen.bind(this)
      },
      closeObserver: {
        next: this.onWebsocketClose.bind(this)
      }
    });
  }

  private onWebsocketOpen(): void {
    console.log('WEBSOCKET connected');

    // set flag back to enable reconnection in case if server closes connection
    // flag could be set to false in a case of manual reconnection (connect method call) from outside of the module
    this.reconnectOnClose = true;

    // setting timeout to give some time spot for server starting activities in case of connection after server restarts
    setTimeout(() => this.websocketConnectSubject.next(), WebsocketConnectionService.reconnectTimeout);
  }

  private onWebsocketClose(closeEvent: CloseEvent): void {
    console.log('WEBSOCKET closed', closeEvent);

    if (this.reconnectOnClose) {
      console.log('WEBSOCKET reconnect');

      // do not reconnect instantly
      // set auto reconnect to true to reconnect until success connection established
      setTimeout(() => this.connect(true), WebsocketConnectionService.reconnectTimeout);
    }
  }
}

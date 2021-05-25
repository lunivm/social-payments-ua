import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';
import { MainProgressBarService } from '../../../layout/main-progress-bar/main-progress-bar.service';
import { CachedDataService } from '../../services/cached-data.service';
import { CodeKEK } from '../../../../../../api-contracts/code-kek/code-kek';

@Injectable({
  providedIn: 'root'
})
export class CodeKEKService extends CachedDataService<CodeKEK> {
  protected readonly requestUrl = '/codes-kek';
  protected readonly websocketChannel = 'code-kek';
  protected readonly mainProgressBarItemCaption = 'Коди КЕК';

  constructor(
    http: HttpClient,
    mainProgressBarService: MainProgressBarService,
    websocketConnectionService: WebsocketConnectionService
  ) {
    super(http, mainProgressBarService, websocketConnectionService);
  }
}

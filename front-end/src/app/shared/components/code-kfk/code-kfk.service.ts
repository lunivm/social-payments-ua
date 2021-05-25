import { Injectable } from '@angular/core';
import { CachedDataService } from '../../services/cached-data.service';
import { CodeKFK } from '../../../../../../api-contracts/code-kfk/code-kfk';
import { HttpClient } from '@angular/common/http';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';
import { MainProgressBarService } from '../../../layout/main-progress-bar/main-progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CodeKFKService extends CachedDataService<CodeKFK> {
  protected readonly requestUrl = '/codes-kfk';
  protected readonly websocketChannel = 'code-kfk';
  protected readonly mainProgressBarItemCaption = 'Коди КФК';

  constructor(
    http: HttpClient,
    mainProgressBarService: MainProgressBarService,
    websocketConnectionService: WebsocketConnectionService
  ) {
    super(http, mainProgressBarService, websocketConnectionService);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Street } from '../../../../../../api-contracts/street/street';
import { MainProgressBarService } from '../../../layout/main-progress-bar/main-progress-bar.service';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable()
export class StreetService extends CachedDataService<Street> {
  protected readonly requestUrl = '/streets';
  protected readonly websocketChannel = 'street';
  protected readonly mainProgressBarItemCaption = 'Вулиці';

  constructor(
    http: HttpClient,
    mainProgressBarService: MainProgressBarService,
    websocketConnectionService: WebsocketConnectionService
  ) {
    super(http, mainProgressBarService, websocketConnectionService);
  }
}

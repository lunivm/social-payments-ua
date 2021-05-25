import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Person } from '../../../../../../api-contracts/person/person';
import { MainProgressBarService } from '../../../layout/main-progress-bar/main-progress-bar.service';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable()
export class PersonService extends CachedDataService<Person> {
  protected readonly requestUrl = '/persons';
  protected readonly websocketChannel = 'person';
  protected readonly mainProgressBarItemCaption = 'Одержувачі';

  constructor(
    http: HttpClient,
    mainProgressBarService: MainProgressBarService,
    websocketConnectionService: WebsocketConnectionService
  ) {
    super(http, mainProgressBarService, websocketConnectionService);
  }
}

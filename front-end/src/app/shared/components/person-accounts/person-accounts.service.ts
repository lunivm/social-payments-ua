import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PersonAccounts } from '../../../../../../api-contracts/person-accounts/person-accounts';
import { MainProgressBarService } from '../../../layout/main-progress-bar/main-progress-bar.service';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable()
export class PersonAccountsService extends CachedDataService<PersonAccounts> {
  protected readonly requestUrl = '/person-accounts';
  protected readonly websocketChannel = 'person-accounts';
  protected readonly mainProgressBarItemCaption = 'Персональні рахунки';


  constructor(
    http: HttpClient,
    mainProgressBarService: MainProgressBarService,
    websocketConnectionService: WebsocketConnectionService
  ) {
    super(http, mainProgressBarService, websocketConnectionService);
  }

  public getByUserId(id: string): Observable<PersonAccounts> {
    return this.getData({personId: id})
      .pipe(
        map((items) => items[0])
      );
  }
}

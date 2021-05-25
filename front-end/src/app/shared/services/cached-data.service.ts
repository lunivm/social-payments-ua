import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { environment } from '../../../environments/environment';
import { MainProgressBarService } from '../../layout/main-progress-bar/main-progress-bar.service';
import { MainProgressBerItemStatusEnum } from '../../layout/main-progress-bar/main-progress-ber-item-status.enum';
import { WebsocketConnectionService } from './websocket-connection/websocket-connection.service';
import { WebsocketDataService } from './websocket-data.service';

export abstract class CachedDataService<T> extends WebsocketDataService<T> {
  protected dataObserver = new ReplaySubject<T[]>(1);

  protected abstract readonly requestUrl: string;
  protected abstract readonly mainProgressBarItemCaption: string;

  protected constructor(
    protected http: HttpClient,
    protected mainProgressBarService: MainProgressBarService,
    websocketConnectionService: WebsocketConnectionService
  ) {
    super(websocketConnectionService);
  }

  public connect() {
    this.mainProgressBarService.add(this.mainProgressBarItemCaption);

    if (this.dataObserver.hasError) {
      this.dataObserver = new ReplaySubject<T[]>(1);
    }

    this.requestData();
    this.connectWebsocketChannel();
  }

  public getData(filter?: any): Observable<T[]> {
    const obs = this.dataObserver.asObservable();

    return filter ? obs
      .pipe(
        map((items) => _.filter<T>(items, filter)),
        take(1)
      ) : obs;
  }

  public getById(id: string): Observable<T> {
    return this.dataObserver.asObservable()
      .pipe(
        map((items) => _.find<T>(items, {_id: id} as any)),
        take(1)
      );
  }

  private requestData() {
    this.http.get(`${environment.dataQueries.apiEndpoint}${this.requestUrl}`)
      .subscribe(
        (res: T[]) => {
          this.dataObserver.next(res);
          this.mainProgressBarService.setStatus(this.mainProgressBarItemCaption, MainProgressBerItemStatusEnum.Success);
        },
        (err: any) => {
          this.dataObserver.error(err);
          this.mainProgressBarService.setStatus(this.mainProgressBarItemCaption, MainProgressBerItemStatusEnum.Error);
        }
      );
  }
}

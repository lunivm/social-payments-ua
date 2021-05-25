import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { zip } from 'rxjs/internal/observable/zip';
import { Observable } from 'rxjs/Observable';
import {
  concatMap,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  take,
  tap
} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Payment } from '../../../../../../api-contracts/payment/payment';
import { PaymentsLatest } from '../../../../../../api-contracts/payment/payments-latest';
import { PaymentsLatestFilter } from '../../../../../../api-contracts/payment/payments-latest-filter';
import { environment } from '../../../../environments/environment';
import { WebsocketConnectionService } from '../../../shared/services/websocket-connection/websocket-connection.service';
import { WebsocketDataService } from '../../../shared/services/websocket-data.service';

@Injectable()
export class LatestPaymentsService extends WebsocketDataService<Payment> {
  public readonly items$: Observable<Payment[]>;
  public readonly sourceExhausted$: Observable<boolean>;

  protected readonly dataObserver = new ReplaySubject<Payment[]>(1);
  protected readonly websocketChannel = 'payment';

  private static readonly pageSize = 30;
  private static readonly requestUrl = '/payments/latest';
  private static readonly initialPagesCache = 3;

  private initialLoadCompleted: boolean = false;
  private canLoadNextFrame: boolean = true;
  private sourceExhaustedSubject = new ReplaySubject<boolean>(1);

  constructor(
    private http: HttpClient,
    websocketConnectionService: WebsocketConnectionService
  ) {
    super(websocketConnectionService);
    this.items$ = this.dataObserver.asObservable();
    this.sourceExhausted$ = this.sourceExhaustedSubject.asObservable()
      .pipe(
        distinctUntilChanged()
      );
  }

  public connect(): void {
    this.setInitialLoad();

    this.getQueryOptions(true)
      .pipe(
        take(1),
        concatMap(this.getHttpRequest.bind(this))
      )
      .subscribe(
        (res: PaymentsLatest) => this.dataObserver.next(res.payments),
        (err: any) => this.dataObserver.error(err),
        this.completeInitialLoad.bind(this)
      );

    this.connectWebsocketChannel();
  }

  public queryNextFrame(): void {
    if (!this.initialLoadCompleted || !this.canLoadNextFrame) {
      return;
    }

    this.canLoadNextFrame = false;

    zip(
      this.sourceExhausted$
        .pipe(
          take(1),
          // filter if no items available from server anymore
          // stop processing (zip won't proceed and finish if any of items don't emit item)
          filter((exhausted) => !exhausted)
        ),
      this.getQueryOptions()
        .pipe(
          concatMap(this.getHttpRequest.bind(this))
        ),
      this.getCachedItems()
    )
      .pipe(
        map(([exhausted, response, cached]) => ({response, cached})),
        tap(() => this.canLoadNextFrame = true)
      )
      .subscribe(
        ({response, cached}: {response: PaymentsLatest, cached: Payment[]}) => {
          this.dataObserver.next(cached.concat(response.payments));
          this.sourceExhaustedSubject.next(!response.payments.length || response.payments.length < LatestPaymentsService.pageSize);
        }
      );
  }

  private setInitialLoad(): void {
    this.initialLoadCompleted = false;
    this.sourceExhaustedSubject.next(false);
  }

  private completeInitialLoad(): void {
    this.initialLoadCompleted = true;
  }

  private getHttpRequest(options: {params: HttpParams}): Observable<PaymentsLatest> {
    return this.http.get<PaymentsLatest>(`${environment.dataQueries.apiEndpoint}${LatestPaymentsService.requestUrl}`, options);
  }

  private getCachedItems(): Observable<Payment[]> {
    return this.items$
      .pipe(
        take(1)
      );
  }

  private getQueryOptions(initialRequest: boolean = false): Observable<{params: HttpParams}> {
    const frameSize = this.initialLoadCompleted ? LatestPaymentsService.pageSize :
      LatestPaymentsService.pageSize * LatestPaymentsService.initialPagesCache;

    return (initialRequest ? of([]) : this.getCachedItems())
      .pipe(
        map((payments: Payment[]) => payments ? payments.length : 0),
        map((currentBufferSize: number) => {
          const filter: PaymentsLatestFilter & { [key: string]: string } = {
            skip: String(currentBufferSize),
            take: String(frameSize)
          };

          return {
            params: new HttpParams({fromObject: filter})
          };
        })
      );
  }
}

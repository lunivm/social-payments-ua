import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TabItemMessageModel } from './tab-item-message.model';

@Injectable()
export class TabbedItemsService {
  // refactor to one message bus if additional events needed
  public readonly closeActiveTab$: Observable<number | null>;
  public readonly openTab$: Observable<TabItemMessageModel>;

  private closeActiveTabSubject = new Subject<number | null>();
  private openTabSubject = new Subject<TabItemMessageModel>();

  constructor() {
    this.closeActiveTab$ = this.closeActiveTabSubject.asObservable();
    this.openTab$ = this.openTabSubject.asObservable();
  }

  public closeActiveTab(activationTabIndex: number = null): void {
    this.closeActiveTabSubject.next(activationTabIndex);
  }

  public openTab(tabMessage: TabItemMessageModel): void {
    this.openTabSubject.next(tabMessage);
  }
}

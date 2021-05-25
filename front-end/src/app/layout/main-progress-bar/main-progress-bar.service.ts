import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MainProgressBarItemModel } from './main-progress-bar-item.model';
import { MainProgressBerItemStatusEnum } from './main-progress-ber-item-status.enum';

@Injectable()
export class MainProgressBarService {
  public readonly progressItems$: Observable<MainProgressBarItemModel[]>;

  private progressItemsSubject = new Subject<MainProgressBarItemModel[]>();
  private progressItems: MainProgressBarItemModel[] = [];

  constructor() {
    this.progressItems$ = this.progressItemsSubject.asObservable();
  }

  public add(caption: string): void {
    this.progressItems.push({
      caption,
      status: null
    });

    this.triggerProgressItems();
  }

  public setStatus(caption: string, status: MainProgressBerItemStatusEnum): void {
    _.set(
      _.find<MainProgressBarItemModel>(this.progressItems, {caption}),
      'status',
      status
    );
    this.triggerProgressItems();

    this.normalizeProgressItems();
  }

  private triggerProgressItems() {
    this.progressItemsSubject.next(this.progressItems.concat());
  }

  private normalizeProgressItems() {
    if (_.filter(this.progressItems, {status: null}).length === 0) {
      this.progressItems = [];
      this.progressItemsSubject.next([]);
    }
  }
}

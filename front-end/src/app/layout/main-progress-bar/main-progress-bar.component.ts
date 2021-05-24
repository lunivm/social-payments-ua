import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit
} from '@angular/core';
import * as _ from 'lodash';
import { MainProgressBarItemModel } from './main-progress-bar-item.model';
import { MainProgressBarService } from './main-progress-bar.service';

@Component({
  selector: 'sp-main-progress-bar',
  templateUrl: './main-progress-bar.component.html',
  styleUrls: ['./main-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainProgressBarComponent implements OnInit {
  public progressItems: MainProgressBarItemModel[] = [];

  public progress = 0;

  @HostBinding('class.sp-loading-completed')
  public completed = false;

  @HostBinding('style.display')
  public displayBinding = 'block';

  constructor(private cdRef: ChangeDetectorRef, private mainProgressBarService: MainProgressBarService) { }

  public ngOnInit() {
    this.mainProgressBarService.progressItems$
      .subscribe((items: MainProgressBarItemModel[]) => {
        if (!items.length) {
          setTimeout(() => {
            this.setCompleted(true);
            this.cdRef.markForCheck();
          }, 1000);

          return;
        }

        this.setCompleted(false);
        this.progressItems = items;
        this.progress = this.getProgressWidth();
        this.cdRef.markForCheck();
      });
  }

  private setCompleted(completed: boolean) {
    this.completed = completed;
    this.displayBinding = completed ? 'none' : 'block';
  }

  private getProgressWidth(): number {
    const inProgressCount = _.filter(this.progressItems, {status: null}).length;
    const completedCount = this.progressItems.length - inProgressCount;

    return Math.max(Math.ceil((completedCount * 100) / this.progressItems.length), 1);
  }
}

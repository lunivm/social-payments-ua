import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { Moment } from 'moment';
import { PeriodReportRange } from './period-report-range.enum';
import { PeriodReportService } from './period-report.service';

@Component({
  selector: 'sp-period-report',
  templateUrl: './period-report.component.html',
  styleUrls: ['./period-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodReportComponent {
  public readonly PeriodReportRange = PeriodReportRange;

  public selectedRange: PeriodReportRange = null;
  public startDate: Moment = null;
  public endDate: Moment = null;

  public datePeriodDisabled: boolean = true;
  public get buttonDisabled(): boolean {
    return this.selectedRange === null ||
      (this.selectedRange === PeriodReportRange.Period && (!this.startDate || !this.endDate));
  }

  public renderProgressBar: boolean = false;

  constructor(private periodReportService: PeriodReportService) {}

  public selectedRangeChange(val: {value: PeriodReportRange}) {
    this.datePeriodDisabled = val.value !== PeriodReportRange.Period;
  }

  public onGenerateClick() {
    this.periodReportService.requestReport(this.selectedRange, this.startDate, this.endDate);
    this.renderProgressBar = true;
  }
}

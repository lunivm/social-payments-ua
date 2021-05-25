import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { environment } from '../../../environments/environment';
import { TabbedItemsService } from '../../layout/tabbed-items/tabbed-items.service';
import { apiDateFormat } from '../../shared/constants/date-formats';
import { PeriodReportRange } from './period-report-range.enum';
import { ReportCommon } from '../shared/report-common';

@Injectable()
export class PeriodReportService extends ReportCommon {
  private readonly requestUrl = `${environment.dataQueries.reportsEndpoint}/period`;

  constructor(
    tabbedItemsService: TabbedItemsService,
    http: HttpClient
  ) {
    super(tabbedItemsService, http);
  }

  public requestReport(range: PeriodReportRange, startDate?: Moment, endDate?: Moment): void {
    switch (range) {
      case PeriodReportRange.Day:
        startDate = endDate = moment(Date.now());
        break;
      case PeriodReportRange.Month:
        startDate = moment(Date.now()).startOf('month');
        endDate = moment(Date.now()).endOf('month');
        break;
      case PeriodReportRange.Period:
        // leave date range as it is
        break;
      default:
        // do not support other cases
        return;
    }

    this.saveReport(`${this.requestUrl}?startDate=${startDate.format(apiDateFormat)}&endDate=${endDate.format(apiDateFormat)}`);
  }
}

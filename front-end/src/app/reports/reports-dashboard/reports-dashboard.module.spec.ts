import { ReportsDashboardModule } from './reports-dashboard.module';

describe('ReportsDashboardModule', () => {
  let reportsDashboardModule: ReportsDashboardModule;

  beforeEach(() => {
    reportsDashboardModule = new ReportsDashboardModule();
  });

  it('should create an instance', () => {
    expect(reportsDashboardModule).toBeTruthy();
  });
});

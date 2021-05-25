import { CipherReportModule } from './cipher-report.module';

describe('CipherReportModule', () => {
  let cipherReportModule: CipherReportModule;

  beforeEach(() => {
    cipherReportModule = new CipherReportModule();
  });

  it('should create an instance', () => {
    expect(cipherReportModule).toBeTruthy();
  });
});

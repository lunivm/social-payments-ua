import { MainProgressBarModule } from './main-progress-bar.module';

describe('MainProgressBarModule', () => {
  let mainProgressBarModule: MainProgressBarModule;

  beforeEach(() => {
    mainProgressBarModule = new MainProgressBarModule();
  });

  it('should create an instance', () => {
    expect(mainProgressBarModule).toBeTruthy();
  });
});

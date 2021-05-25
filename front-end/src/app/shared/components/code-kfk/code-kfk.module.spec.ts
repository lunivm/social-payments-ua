import { CodeKFKModule } from './code-kfk.module';

describe('CodeKFKModule', () => {
  let codeKfkModule: CodeKFKModule;

  beforeEach(() => {
    codeKfkModule = new CodeKFKModule();
  });

  it('should create an instance', () => {
    expect(codeKfkModule).toBeTruthy();
  });
});

import { CodeKEKModule } from './code-kek.module';

describe('CodeKEKModule', () => {
  let codeKekModule: CodeKEKModule;

  beforeEach(() => {
    codeKekModule = new CodeKEKModule();
  });

  it('should create an instance', () => {
    expect(codeKekModule).toBeTruthy();
  });
});

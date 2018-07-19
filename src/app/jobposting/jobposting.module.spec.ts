import { JobpostingModule } from './jobposting.module';

describe('JobpostingModule', () => {
  let jobpostingModule: JobpostingModule;

  beforeEach(() => {
    jobpostingModule = new JobpostingModule();
  });

  it('should create an instance', () => {
    expect(jobpostingModule).toBeTruthy();
  });
});

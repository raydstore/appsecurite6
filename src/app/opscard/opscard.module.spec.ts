import { OpscardModule } from './opscard.module';

describe('OpscardModule', () => {
  let opscardModule: OpscardModule;

  beforeEach(() => {
    opscardModule = new OpscardModule();
  });

  it('should create an instance', () => {
    expect(opscardModule).toBeTruthy();
  });
});

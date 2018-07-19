import { InstanceModule } from './instance.module';

describe('InstanceModule', () => {
  let instanceModule: InstanceModule;

  beforeEach(() => {
    instanceModule = new InstanceModule();
  });

  it('should create an instance', () => {
    expect(instanceModule).toBeTruthy();
  });
});

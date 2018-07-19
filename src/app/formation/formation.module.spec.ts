import { FormationModule } from './formation.module';

describe('FormationModule', () => {
  let formationModule: FormationModule;

  beforeEach(() => {
    formationModule = new FormationModule();
  });

  it('should create an instance', () => {
    expect(formationModule).toBeTruthy();
  });
});

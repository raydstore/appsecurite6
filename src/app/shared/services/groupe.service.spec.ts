import { TestBed, inject } from '@angular/core/testing';

import { GroupeService } from './groupe.service';

describe('GroupeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupeService]
    });
  });

  it('should be created', inject([GroupeService], (service: GroupeService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ComunalService } from './comunal.service';

describe('ComunalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunalService]
    });
  });

  it('should be created', inject([ComunalService], (service: ComunalService) => {
    expect(service).toBeTruthy();
  }));
});

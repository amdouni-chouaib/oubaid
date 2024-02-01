import { TestBed } from '@angular/core/testing';

import { ApieventService } from './apievent.service';

describe('ApieventService', () => {
  let service: ApieventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApieventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

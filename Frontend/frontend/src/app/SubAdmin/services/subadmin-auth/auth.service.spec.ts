import { TestBed } from '@angular/core/testing';

import { SubadminServiceService } from './auth.service';

describe('SubadminServiceService', () => {
  let service: SubadminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubadminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

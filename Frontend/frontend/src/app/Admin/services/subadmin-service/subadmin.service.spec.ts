import { TestBed } from '@angular/core/testing';

import { RequestServiceService } from './subadmin.service';

describe('RequestServiceService', () => {
  let service: RequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

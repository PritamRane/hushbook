import { TestBed } from '@angular/core/testing';

import { OverallService } from './overall.service';

describe('OverallService', () => {
  let service: OverallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

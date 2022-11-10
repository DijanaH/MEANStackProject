import { TestBed } from '@angular/core/testing';

import { OmiljenaService } from './omiljena.service';

describe('OmiljenaService', () => {
  let service: OmiljenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmiljenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

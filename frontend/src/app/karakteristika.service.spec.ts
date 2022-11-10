import { TestBed } from '@angular/core/testing';

import { KarakteristikaService } from './karakteristika.service';

describe('KarakteristikaService', () => {
  let service: KarakteristikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KarakteristikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

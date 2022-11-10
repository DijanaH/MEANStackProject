import { TestBed } from '@angular/core/testing';

import { DetaljiNekretnineService } from './detalji-nekretnine.service';

describe('DetaljiNekretnineService', () => {
  let service: DetaljiNekretnineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetaljiNekretnineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

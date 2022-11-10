import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrihvatanjeKorisnikaComponent } from './prihvatanje-korisnika.component';

describe('PrihvatanjeKorisnikaComponent', () => {
  let component: PrihvatanjeKorisnikaComponent;
  let fixture: ComponentFixture<PrihvatanjeKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrihvatanjeKorisnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrihvatanjeKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretrazivanjeOglasaComponent } from './pretrazivanje-oglasa.component';

describe('PretrazivanjeOglasaComponent', () => {
  let component: PretrazivanjeOglasaComponent;
  let fixture: ComponentFixture<PretrazivanjeOglasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PretrazivanjeOglasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PretrazivanjeOglasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

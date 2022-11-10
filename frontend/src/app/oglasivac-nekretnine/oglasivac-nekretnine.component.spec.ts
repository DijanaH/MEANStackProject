import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasivacNekretnineComponent } from './oglasivac-nekretnine.component';

describe('OglasivacNekretnineComponent', () => {
  let component: OglasivacNekretnineComponent;
  let fixture: ComponentFixture<OglasivacNekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OglasivacNekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OglasivacNekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosNekretnineComponent } from './unos-nekretnine.component';

describe('UnosNekretnineComponent', () => {
  let component: UnosNekretnineComponent;
  let fixture: ComponentFixture<UnosNekretnineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosNekretnineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosNekretnineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

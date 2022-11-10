import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaprednoPretrazivanjeComponent } from './napredno-pretrazivanje.component';

describe('NaprednoPretrazivanjeComponent', () => {
  let component: NaprednoPretrazivanjeComponent;
  let fixture: ComponentFixture<NaprednoPretrazivanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaprednoPretrazivanjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaprednoPretrazivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

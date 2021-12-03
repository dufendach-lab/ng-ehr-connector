import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatinetRegistrationComponent } from './patinet-registration.component';

describe('PatinetRegistrationComponent', () => {
  let component: PatinetRegistrationComponent;
  let fixture: ComponentFixture<PatinetRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatinetRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatinetRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

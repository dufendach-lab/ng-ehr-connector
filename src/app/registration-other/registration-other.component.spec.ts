import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOtherComponent } from './registration-other.component';

describe('RegistrationOtherComponent', () => {
  let component: RegistrationOtherComponent;
  let fixture: ComponentFixture<RegistrationOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

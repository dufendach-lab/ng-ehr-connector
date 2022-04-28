import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLandingComponent } from './staff-landing.component';

describe('StaffLandingComponent', () => {
  let component: StaffLandingComponent;
  let fixture: ComponentFixture<StaffLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffContainerComponent } from './staff-container.component';

describe('StaffContainerComponent', () => {
  let component: StaffContainerComponent;
  let fixture: ComponentFixture<StaffContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeSleepComponent } from './safe-sleep.component';

describe('SafeSleepComponent', () => {
  let component: SafeSleepComponent;
  let fixture: ComponentFixture<SafeSleepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafeSleepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeSleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPatientDataComponent } from './test-patient-data.component';

describe('TestPatientDataComponent', () => {
  let component: TestPatientDataComponent;
  let fixture: ComponentFixture<TestPatientDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPatientDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPatientDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

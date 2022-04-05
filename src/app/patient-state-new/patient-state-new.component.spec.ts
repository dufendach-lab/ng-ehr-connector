import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStateNewComponent } from './patient-state-new.component';

describe('PatientStateNewComponent', () => {
  let component: PatientStateNewComponent;
  let fixture: ComponentFixture<PatientStateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientStateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientStateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

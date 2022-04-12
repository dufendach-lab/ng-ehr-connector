import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesDiagnosisComponent } from './resources-diagnosis.component';

describe('SafeSleepComponent', () => {
  let component: ResourcesDiagnosisComponent;
  let fixture: ComponentFixture<ResourcesDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesDiagnosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

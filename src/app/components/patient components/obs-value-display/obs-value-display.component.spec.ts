import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsValueDisplayComponent } from './obs-value-display.component';

describe('ObsValueDisplayComponent', () => {
  let component: ObsValueDisplayComponent;
  let fixture: ComponentFixture<ObsValueDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObsValueDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObsValueDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

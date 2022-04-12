import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsValueListComponent } from './obs-value-list.component';

describe('ObsValueListComponent', () => {
  let component: ObsValueListComponent;
  let fixture: ComponentFixture<ObsValueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObsValueListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObsValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

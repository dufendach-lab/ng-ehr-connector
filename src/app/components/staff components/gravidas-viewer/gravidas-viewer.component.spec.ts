import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravidasViewerComponent } from './gravidas-viewer.component';

describe('GravidasViewerComponent', () => {
  let component: GravidasViewerComponent;
  let fixture: ComponentFixture<GravidasViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravidasViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravidasViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

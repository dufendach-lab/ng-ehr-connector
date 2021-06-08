import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravidasDetailEditorComponent } from './gravidas-detail-editor.component';

describe('GravidasDetailEditorComponent', () => {
  let component: GravidasDetailEditorComponent;
  let fixture: ComponentFixture<GravidasDetailEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravidasDetailEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravidasDetailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyEditorDialogComponent } from './pregnancy-editor-dialog.component';

describe('PregnancyEditorDialogComponent', () => {
  let component: PregnancyEditorDialogComponent;
  let fixture: ComponentFixture<PregnancyEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnancyEditorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancyEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

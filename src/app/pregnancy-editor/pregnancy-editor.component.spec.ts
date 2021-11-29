import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyEditorComponent } from './pregnancy-editor.component';

describe('PregnancyEditorComponent', () => {
  let component: PregnancyEditorComponent;
  let fixture: ComponentFixture<PregnancyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnancyEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

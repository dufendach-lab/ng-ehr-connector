import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMomResourceComponent } from './new-mom-resource.component';

describe('NewMomResourceComponent', () => {
  let component: NewMomResourceComponent;
  let fixture: ComponentFixture<NewMomResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMomResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMomResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

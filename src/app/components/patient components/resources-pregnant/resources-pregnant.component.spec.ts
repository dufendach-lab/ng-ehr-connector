import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesPregnantComponent } from './resources-pregnant.component';

describe('ResourcesPregnantComponent', () => {
  let component: ResourcesPregnantComponent;
  let fixture: ComponentFixture<ResourcesPregnantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesPregnantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesPregnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

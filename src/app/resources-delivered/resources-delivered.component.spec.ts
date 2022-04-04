import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesDeliveredComponent } from './resources-delivered.component';

describe('ResourcesDeliveredComponent', () => {
  let component: ResourcesDeliveredComponent;
  let fixture: ComponentFixture<ResourcesDeliveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesDeliveredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

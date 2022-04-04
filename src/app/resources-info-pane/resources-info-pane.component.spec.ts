import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesInfoPaneComponent } from './resources-info-pane.component';

describe('ResourcesInfoPaneComponent', () => {
  let component: ResourcesInfoPaneComponent;
  let fixture: ComponentFixture<ResourcesInfoPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesInfoPaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesInfoPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

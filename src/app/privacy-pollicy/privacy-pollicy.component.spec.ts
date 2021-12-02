import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPollicyComponent } from './privacy-pollicy.component';

describe('PrivacyPollicyComponent', () => {
  let component: PrivacyPollicyComponent;
  let fixture: ComponentFixture<PrivacyPollicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPollicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPollicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

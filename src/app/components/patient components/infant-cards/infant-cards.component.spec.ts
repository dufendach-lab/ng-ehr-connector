import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantCardsComponent } from './infant-cards.component';

describe('InfantCardsComponent', () => {
  let component: InfantCardsComponent;
  let fixture: ComponentFixture<InfantCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfantCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfantCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

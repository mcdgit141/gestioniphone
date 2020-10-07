import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationsSuppressionComponent } from './affectations-suppression.component';

describe('AffectationsSuppressionComponent', () => {
  let component: AffectationsSuppressionComponent;
  let fixture: ComponentFixture<AffectationsSuppressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationsSuppressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationsSuppressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

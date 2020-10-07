import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationsDetailsComponent } from './affectations-details.component';

describe('AffectationsDetailsComponent', () => {
  let component: AffectationsDetailsComponent;
  let fixture: ComponentFixture<AffectationsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

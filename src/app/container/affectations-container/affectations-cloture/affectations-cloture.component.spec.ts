import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationsClotureComponent } from './affectations-cloture.component';

describe('AffectationsClotureComponent', () => {
  let component: AffectationsClotureComponent;
  let fixture: ComponentFixture<AffectationsClotureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationsClotureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationsClotureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

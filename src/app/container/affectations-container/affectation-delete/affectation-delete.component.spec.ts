import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationDeleteComponent } from './affectation-delete.component';

describe('AffectationDeleteComponent', () => {
  let component: AffectationDeleteComponent;
  let fixture: ComponentFixture<AffectationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

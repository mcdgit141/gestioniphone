import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationsListeComponent } from './affectations-liste.component';

describe('AffectationsListeComponent', () => {
  let component: AffectationsListeComponent;
  let fixture: ComponentFixture<AffectationsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationsListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

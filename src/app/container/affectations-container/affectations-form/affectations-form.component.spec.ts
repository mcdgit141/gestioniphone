import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationsFormComponent } from './affectations-form.component';

describe('AffectationsFormComponent', () => {
  let component: AffectationsFormComponent;
  let fixture: ComponentFixture<AffectationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

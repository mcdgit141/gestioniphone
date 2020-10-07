import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursFormComponent } from './utilisateurs-form.component';

describe('UtilisateursFormComponent', () => {
  let component: UtilisateursFormComponent;
  let fixture: ComponentFixture<UtilisateursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateursFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

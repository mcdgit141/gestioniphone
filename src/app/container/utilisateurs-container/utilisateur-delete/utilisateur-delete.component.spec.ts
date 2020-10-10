import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurDeleteComponent } from './utilisateur-delete.component';

describe('UtilisateurDeleteComponent', () => {
  let component: UtilisateurDeleteComponent;
  let fixture: ComponentFixture<UtilisateurDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateurDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

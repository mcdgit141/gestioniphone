import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { HomeComponent } from '../app/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { ContainerComponent } from './container/container.component';
import { AffectationsListeComponent } from './container/affectations-container/affectations-liste/affectations-liste.component';
import { AffectationsFormComponent } from './container/affectations-container/affectations-form/affectations-form.component';
import { UtilisateursFormComponent } from './container/utilisateurs-container/utilisateurs-form/utilisateurs-form.component';
import { AffectationsSuppressionComponent } from './container/affectations-container/affectations-suppression/affectations-suppression.component';
import { AffectationsDetailsComponent } from './container/affectations-container/affectations-details/affectations-details.component';
import { AffectationsClotureComponent } from './container/affectations-container/affectations-cloture/affectations-cloture.component';
import { AffectationDeleteComponent } from './container/affectations-container/affectation-delete/affectation-delete.component';
import { UtilisateurDeleteComponent } from './container/utilisateurs-container/utilisateur-delete/utilisateur-delete.component';
import { Erreur404Component } from '../app/erreur404/erreur404.component';

const routes: Routes = [

//   { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate:[AuthGuard], component: HomeComponent },
  { 
    path: 'container', 
    canActivate:[AuthGuard], 
    component: ContainerComponent,
    children : [
      {path:'', redirectTo: 'liste', pathMatch:'full'},
      {path:'gestion', redirectTo: 'liste', pathMatch:'full'},
      {path:'admin', redirectTo: 'createUser', pathMatch:'full'},
      {path:'liste', canActivate:[AuthGuard], component: AffectationsListeComponent},
     // {path:'cloture', canActivate:[AuthGuard], component: AffectationsClotureComponent, data: {roles: ['ADMIN', 'TYPE2']  }},
      {path:'details/:numeroAffectation', canActivate:[AuthGuard], component: AffectationsDetailsComponent},
      {path:'details/cloture/:numeroAffectation', canActivate:[AuthGuard], component: AffectationsClotureComponent},
      {path:'details/delete/:numeroAffectation', canActivate:[AuthGuard], component: AffectationDeleteComponent},
      {path:'creation', canActivate:[AuthGuard], component: AffectationsFormComponent, data: {roles: ['ADMIN', 'TYPE2']  }},
      {path:'suppression', canActivate:[AuthGuard], component: AffectationsSuppressionComponent, data: {roles: ['ADMIN', 'TYPE2']  }},
      {path:'createUser', canActivate:[AuthGuard], component: UtilisateursFormComponent, data: {roles: ['ADMIN']  }},
      {path:'deleteUser', canActivate:[AuthGuard], component: UtilisateurDeleteComponent, data: {roles: ['ADMIN']  }}

    ] 
  },
  { path: '404', component : Erreur404Component},
  { path: '**', component : Erreur404Component},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

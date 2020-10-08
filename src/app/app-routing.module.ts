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
      {path:'admin', redirectTo: 'user', pathMatch:'full'},
      {path:'liste', component: AffectationsListeComponent},
      {path:'cloture', component: AffectationsClotureComponent, data: {roles: ['ADMIN', 'TYPE2']  }},
      {path:'details', component: AffectationsDetailsComponent},
      {path:'creation', component: AffectationsFormComponent, data: {roles: ['ADMIN', 'TYPE2']  }},
      {path:'suppression', component: AffectationsSuppressionComponent, data: {roles: ['ADMIN', 'TYPE2']  }},
      {path:'user', component: UtilisateursFormComponent}

    ] 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

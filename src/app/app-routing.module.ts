import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { HomeComponent } from '../app/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { AffectationsClotureComponent } from './container/affectations-container/affectations-cloture/affectations-cloture.component';
import { AffectationsListeComponent } from './container/affectations-container/affectations-liste/affectations-liste.component';
import { AffectationsDetailsComponent } from './container/affectations-container/affectations-details/affectations-details.component';

const routes: Routes = [

//   { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate:[AuthGuard], component: HomeComponent },
  { path: 'test1', canActivate:[AuthGuard], component: AffectationsClotureComponent,   
           data: {roles: ['ADMIN', 'TYPE1']  } },
  { path: 'test2', canActivate:[AuthGuard], component: AffectationsListeComponent,   data: {
   roles: ['TYPE1']  } },
  { path: 'test3', canActivate:[AuthGuard], component: AffectationsDetailsComponent,   data: {
   roles: ['TYPE2']  } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

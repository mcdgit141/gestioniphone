import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms' 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AffectationsClotureComponent } from './container/affectations-container/affectations-cloture/affectations-cloture.component';
import { AffectationsDetailsComponent } from './container/affectations-container/affectations-details/affectations-details.component';
import { AffectationsFormComponent } from './container/affectations-container/affectations-form/affectations-form.component';
import { AffectationsListeComponent } from './container/affectations-container/affectations-liste/affectations-liste.component';
import { AffectationsSuppressionComponent } from './container/affectations-container/affectations-suppression/affectations-suppression.component';
import { UtilisateursFormComponent } from './container/utilisateurs-container/utilisateurs-form/utilisateurs-form.component';
import { SidebarComponent } from './container/sidebar/sidebar.component';
import { JwtInterceptor } from './services/interceptors/jwt.interceptor';
import { ContainerComponent } from './container/container.component';
import { UtilisateurDeleteComponent } from './container/utilisateurs-container/utilisateur-delete/utilisateur-delete.component';
import { AffectationDeleteComponent } from './container/affectations-container/affectation-delete/affectation-delete.component';
import { Erreur404Component } from './erreur404/erreur404.component';
import { HttperrInterceptor } from './services/interceptors/httperr.interceptor';
import { GlobalErrorHandler } from './services/ErrorHandler/GlobalErrorHandler';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AffectationsClotureComponent,
    AffectationsDetailsComponent,
    AffectationsFormComponent,
    AffectationsListeComponent,
    AffectationsSuppressionComponent,
    UtilisateursFormComponent,
    SidebarComponent,
    ContainerComponent,
    UtilisateurDeleteComponent,
    AffectationDeleteComponent,
    Erreur404Component
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttperrInterceptor, multi: true},
    { provide: ErrorHandler, useClass: GlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

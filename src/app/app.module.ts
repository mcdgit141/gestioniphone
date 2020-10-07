import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms' 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AffectationsClotureComponent } from './container/affectations-container/affectations-cloture/affectations-cloture.component';
import { AffectationsDetailsComponent } from './container/affectations-container/affectations-details/affectations-details.component';
import { AffectationsFormComponent } from './container/affectations-container/affectations-form/affectations-form.component';
import { AffectationsListeComponent } from './container/affectations-container/affectations-liste/affectations-liste.component';
import { AffectationsSuppressionComponent } from './container/affectations-container/affectations-suppression/affectations-suppression.component';
import { UtilisateursFormComponent } from './container/utilisateurs-container/utilisateurs-form/utilisateurs-form.component';
import { SidebarComponent } from './container/sidebar/sidebar.component';

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
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

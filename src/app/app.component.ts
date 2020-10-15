import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-gestiphone',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestioniphone';

  constructor(private router:Router, private loginService:LoginService, public loaderService:LoaderService) {
    
 }
 
   logOut(ev) {
   ev.preventDefault();
   this.loginService.logout();
  localStorage.clear();
  this.router.navigate(["/login"]);
  }
}

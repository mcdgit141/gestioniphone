import { compileNgModule } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private loginService: LoginService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		let url: string = state.url;
      let isLoggedIn = this.checkLogin(url);
      let hasRights = this.checkRights(route)
      return isLoggedIn && hasRights
	}

	checkLogin(url: string): boolean {
		if (this.loginService.getUser() != null) { return true; }
      
      this.loginService.redirectUrl = url;
		this.router.navigate(['/login'], { queryParams: { redirectUrl: url }});

		return false;
   }
   
   checkRights(route):boolean {
      
      
      let roles:[] = route.data['roles'];
      let hasRights = true;

      
      if (roles) {
         hasRights = this.loginService.hasAnyRole(roles);
      }
      if (!hasRights) {
         // Si l'utilisateur na pas les habilitations : redirection vers la page d'accueil
         alert('Vous n\'avez pas les droits');
         this.router.navigate(['/home']);
      }

      return hasRights;
   }

}
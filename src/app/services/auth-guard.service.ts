import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

	// constructor(private authService: AuthService, private router: Router) { }
	constructor(private loginService: LoginService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		let url: string = state.url;
		return this.checkLogin(url);
	}

	checkLogin(url: string): boolean {
      console.log("checkLogin - isLoggedIn : " + this.loginService.isLoggedIn);
      console.log("checkLogin - url : " + url);
      console.log("checkLogin - this.router.url : " + this.router.url);
      
		if (this.loginService.isLoggedIn) { return true; }
		this.loginService.redirectUrl = url;
		// this.router.navigate(['/login'], { queryParams: { redirectUrl: this.router.url }});
		this.router.navigate(['/login'], { queryParams: { redirectUrl: url }});

		return false;
	}

}
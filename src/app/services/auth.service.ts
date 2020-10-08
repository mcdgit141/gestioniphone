import { Injectable } from '@angular/core';
// RxJS 6
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class AuthService {
	getTokenFromLocalStorage() {
		return localStorage.getItem('token')
	  }
	
	  setTokenInLocalStorage(value) {
		localStorage.setItem('token', value);
	  }
}
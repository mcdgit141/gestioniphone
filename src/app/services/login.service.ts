import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API=environment.API_URL;
  roles:[any];
  isLoggedIn: boolean = false;
  isAdmin:boolean = false;
  redirectUrl: string;



  constructor(private http:HttpClient) { }

  async authentification(credentials) {
     await this.http.post("http://localhost:9095/authenticate",credentials)
    .toPromise().then((response:any) => {
      this.setToken(response.jwtToken);
      this.roles=response.authorities;
      this.isLoggedIn=true;
    });
    
    this.roles.forEach(e => {
      if (e.authority == "ROLE_ADMIN") {
        this.isAdmin = true;
      }});
    console.log("isLoggedIn : " + this.isLoggedIn)
    console.log("isAmin : " + this.isAdmin);
  }

  setToken(token) {
    localStorage.setItem("token",token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}

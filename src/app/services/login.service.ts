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
  passwordIsDefault:boolean;
  isLoggedIn: boolean = false;
  isAdmin:boolean = false;
  isType1:boolean = false;
  isType2:boolean = false;
  redirectUrl: string;



  constructor(private http:HttpClient) { }

  async authentification(credentials) {
     await this.http.post("http://localhost:9095/authenticate",credentials)
    .toPromise().then((response:any) => {
      this.setToken(response.jwtToken);
      this.roles=response.authorities;
      this.passwordIsDefault=response.defaultPassword;
      
      this.setRoles(response.authorities);
      this.setUser(credentials.username);

      this.isLoggedIn=true;
    });
    
  }

   logout() {
      localStorage.clear();
      this.isAdmin = false;
      this.isType1 = false;
      this.isType2 = false;
      this.isLoggedIn = false;
      
   }


  setToken(token) {
    localStorage.setItem("token",token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

   setUser(username: string) {
      localStorage.setItem("user", username);
   }

   getUser() {
      return localStorage.getItem('user');
   }

   setRoles(roles: [any]) {
      roles.forEach(e => {
         switch (e.authority) {
            case "ROLE_ADMIN": {
               this.isAdmin = true;
               break;
            }
            case "ROLE_TYPE1": {
               this.isType1 = true;
               break;
            }
            case "ROLE_TYPE2": {
               this.isType2 = true;
               break;
            }
         }

         if (this.isAdmin) {
            localStorage.setItem("roles", "ADMIN");
         } else {
            if (this.isType2) {
               localStorage.setItem("roles", "TYPE2");
            }
            else {
               if (this.isType1) {
                  localStorage.setItem("roles", "TYPE1");
               }
            }
         }
      });

   }

   getRoles() {
      let role:String = localStorage.getItem('roles');
      
      // Alimentation des booleens qui seront utilisés dans les .html
      switch (role) {
         case "ADMIN" : {
            this.isAdmin = true;
            break;
         }
         case "TYPE2" : {
            this.isType2 = true;
            break;
         }
         case "TYPE1" : {
            this.isType1 = true;
            break;
         }
      }

      return role;
   }

   hasAnyRole(roles: String[]) {
      let userRole = this.getRoles();
      for (let role of roles) {
         if (roles.includes(userRole)) { 
            return true;
         }
      }
      return false;
   }

   isItAdmin() {
      return this.hasAnyRole(['ADMIN']);
   }

   isItType2() {
      return this.hasAnyRole(['TYPE2']);
   }


}

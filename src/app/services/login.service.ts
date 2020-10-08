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
  isType1:boolean = false;
  isType2:boolean = false;
  redirectUrl: string;



  constructor(private http:HttpClient) { }

  async authentification(credentials) {
     await this.http.post("http://localhost:9095/authenticate",credentials)
    .toPromise().then((response:any) => {
      this.setToken(response.jwtToken);
      this.roles=response.authorities;
      // console.log(" response.authorities : " + response.authorities + "-" + typeof response.authorities);
      // console.log(" response.authorities : " + response.authorities.values + "-" + typeof response.authorities);
      // console.log(" this.roles : "  + this.roles + "-" + typeof this.roles); 
      // console.log(" this.roles : "  + this.roles.values + "-" + typeof this.roles); 
      // let truc;
      
      this.setRoles(response.authorities);
      this.setUser(credentials.username);
      // console.log("credentials : ");
      // console.log(credentials);
      // console.log(credentials.username);
      
      this.isLoggedIn=true;
    });
    
   //  this.roles.forEach(e => {
   //    if (e.authority == "ROLE_ADMIN") {
   //      this.isAdmin = true;
   //    }});
   //  console.log("isLoggedIn : " + this.isLoggedIn)
   //  console.log("isAmin : " + this.isAdmin);
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
    localStorage.getItem('token');
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
      return localStorage.getItem('roles');
   }

   hasAnyRole(roles: string[]) {
      console.log("hasAnyRole - entre" )
      let userRole = this.getRoles();

      for (let role of roles) {
         if (roles.includes(userRole)) {
            console.log("hasAnyRole - trouve !");
            
            return true;
         }
      }
      return false;
   }


}

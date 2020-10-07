import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API=environment.API_URL
  public roles:[]


  constructor(private http:HttpClient) { }

  async authentification(credentials) {
     await this.http.post(this.API+"/authenticate",credentials)
    .toPromise().then((response:any) => {
      localStorage.setItem("token",response.jwtToken);
      this.roles = response.authorities;
    });
    
    console.log(this.roles);
  
    
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private API=environment.API_URL;
  authService: any;

  constructor(private http:HttpClient) { }
  
    async createAffectation(dataCreateAffectation) {
    await this.http.post(this.API+"/affectation/creation",dataCreateAffectation,
    {
       headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.getTokenFromLocalStorage()
       )
     }).toPromise();
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private API=environment.API_URL;
  
  constructor(private http:HttpClient) { }

    createAffectation(mesdata)  {
      console.log("mesdatadansservicecreation--" + mesdata);
      return this.http.post(this.API+"/affectation/creation",mesdata);

      // await this.http.post(this.API+"/affectation/creation",mesdata).toPromise().then(
       // (response:any) => alert("affectation créée"))
    
      }
}

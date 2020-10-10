import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private API=environment.API_URL;
  
  constructor(private http:HttpClient) { }

    createAffectation(mesdata)  {
    //  console.log("mesdatadansservicecreation--" + formatJsonMesDatas);
      //return this.http.post(this.API+"/affectation/creation",mesdata);

      //await this.http.post(this.API+"/affectation/creation",formatJsonMesDatas).toPromise().then(
     //  (response:any) => alert("affectation créée"))
    //
     // }


      this.http.post(this.API+"/affectation/creation",mesdata)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error:HttpErrorResponse) => {
          console.log('Erreur ! : ' , error.status); }
        );
        }

}

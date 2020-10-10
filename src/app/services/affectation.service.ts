import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Affectation } from '../models/affectation';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private API=environment.API_URL;
  authService: any;
  
  private _affectationSubject = new BehaviorSubject<Affectation[]>([]);
   // _affectationSubject = new BehaviorSubject<[]>([]);
   readonly affectations$:Observable<Affectation[]> = this._affectationSubject.asObservable();

  constructor(private http:HttpClient) { }
  
    getAffectations() {
       console.log("getAffectations - entre");
       
       
       let param = {};
       console.log(this._affectationSubject);
      //  this._affectationSubject.subscribe(
         //  data => { if (data.length === 0) {
         //  data =>  {
    }
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

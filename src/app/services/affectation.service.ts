import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
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
          alert("affectation créée");
        },
        (error:HttpErrorResponse) => {
          console.log('Erreur ! : ' , error.status); }
        );
        }

        
    getAffectations() {
      console.log("getAffectations - entre");
            
      let param = {};
      console.log(this._affectationSubject);
     //  this._affectationSubject.subscribe(
        //  data => { if (data.length === 0) {
        //  data =>  {

           //  console.log("getAffectations - avant post");
             this.http.post(this.API+"/affectation/liste",param).subscribe(
                (data:[]) => {
                   console.log(data);
                 //   let affectation = data[''];
                 //   console.log(affectation);
                   
                   this._affectationSubject.next(data)
                }
                )
        // }
        //  }
     //  )
      console.log(this._affectationSubject);

      return this._affectationSubject;
      
   }
   cloturerAffectation(dataClotureAffectation)  {
    
    console.log("dans cloturerAffectation--dataCloturerAffectation---", dataClotureAffectation);

    this.http.put(this.API+"/affectation/cloture",dataClotureAffectation)
      .subscribe(
        () => {
          console.log('clôture effectuée !');
          alert("affectation clôturée");
        },
        (error:HttpErrorResponse) => {
          console.log('Erreur sur la clôture ! : ' , error.status); }
        );
        }

    supprimerAffectation(numeroaffectationasupprimer,commentaireasupprimer)  {

      console.log("dans supprimer affectation---commentaireasupprimer*************", commentaireasupprimer);
      let mot1='"';
      let commentaireaenvoyer = commentaireasupprimer;
      let commentaire = mot1+commentaireaenvoyer+mot1;

      console.log("dans supprimer affectation---commentaire ***********",commentaire);

      let deleteParams= new HttpParams().set("id",numeroaffectationasupprimer)
                                        .set("commentaire",commentaire);

     
     console.log("dans supprimer affectation---deleteParams---", deleteParams);
      this.http.delete(this.API+"/affectation/suppression",{params:deleteParams})
          .subscribe(
              () => {
                console.log('suppression effectuée !');
                alert("affectation supprimée");
              },
              (error:HttpErrorResponse) => {
                console.log('Erreur sur la suppression! : ' , error.status); }
              );
              }
      
}


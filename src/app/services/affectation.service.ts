import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
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
  private _affectationMetaSubject = new BehaviorSubject({});

   // _affectationSubject = new BehaviorSubject<[]>([]);
  readonly affectations$:Observable<Affectation[]> = this._affectationSubject.asObservable();
  readonly affectationMeta$:Observable<any> = this._affectationMetaSubject.asObservable();

  constructor(private router: Router, private http:HttpClient) { }

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
          this.router.navigate(['/container/liste']);
        },
        (error:HttpErrorResponse) => {
          console.log('Erreur ! : ' , error.status); }
        );
        }

        
    getAffectations(param) {
      console.log("getAffectations - entre");
            
      // let param1 = {
      //     "uid": "100200",
      // //    "uid": null,
      //       "nom": null,
      //       "codeUo": null,
      //       "nomUsageUo": null,
      //       "nomSite": null,
      //       "numeroLigneCollaborateur": null,
      //       "nomModeleIphone": null,
      //       "dateRenouvMin": null,
      //       // "dateRenouvMin": "2020-07-07",
      //       "dateRenouvMax": null,
      //       // "taillePage": 5,
      //       "taillePage": null,
      //       "numeroDePage": 1,
      //       "critereDeTri": "UID",
      //       "sensduTri": "D"
      // }

      console.log(this._affectationSubject);
     //  this._affectationSubject.subscribe(
        //  data => { if (data.length === 0) {
        //  data =>  {

            console.log("getAffectations param - avant post********--" , param);
             this.http.post(this.API+"/affectation/liste2",param).subscribe(
                (data:any) => {
                   console.log(data);
                   console.log(data.metadata);
                   console.log(data.datas);
                 //   let affectation = data[''];
                 //   console.log(affectation);
                   
                   this._affectationSubject.next(data.datas)
                   this._affectationMetaSubject.next(data.metadata)
                }
                )
        // }
        //  }
     //  )
      console.log(this._affectationSubject);

      return this._affectationSubject;
      
   }

  
   cloturerAffectation(mesdatacloture)  {
    
    console.log("dans cloturerAffectation--mesdatacloture*****---", mesdatacloture);
       
    this.http.put(this.API+"/affectation/cloture",mesdatacloture)
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
      let commentaire1 = commentaire.toString();
      console.log("dans supprimer affectation---commentaire ***********",commentaire);
      console.log("dans supprimer affectation---commentaire1 en toString ***********",commentaire1);

      let deleteParams= new HttpParams().set("id",numeroaffectationasupprimer)
                                        .set("commentaire",commentaire1);

     
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


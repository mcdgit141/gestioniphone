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

  private API = environment.API_URL;
  authService: any;

  private _affectationSubject = new BehaviorSubject<Affectation[]>([]);
  private _affectationMetaSubject = new BehaviorSubject({});

  readonly affectations$: Observable<Affectation[]> = this._affectationSubject.asObservable();
  readonly affectationMeta$: Observable<any> = this._affectationMetaSubject.asObservable();

  constructor(private http: HttpClient) { }

  createAffectation(mesdata) {
    this.http.post(this.API + "/affectation/creation", mesdata)
      .subscribe(
        () => alert("affectation créée")
      );
  }


  getAffectations(param) {
    this.http.post(this.API + "/affectation/liste2", param).subscribe(
      (data: any) => {
        this._affectationSubject.next(data.datas)
        this._affectationMetaSubject.next(data.metadata)
      }
    )
    return this._affectationSubject;

  }


  cloturerAffectation(mesdatacloture) {
    console.log("****4- methode cloturerAffectatoin dans le serviceAffectation")
    this.http.put(this.API + "/affectation/cloture", mesdatacloture)
      .subscribe(
        () => alert("affectation clôturée")
      );
  }

  supprimerAffectation(numeroaffectationasupprimer, commentaireasupprimer) {

    let mot1 = '"';
    let commentaireaenvoyer = commentaireasupprimer;
    let commentaire = mot1 + commentaireaenvoyer + mot1;
    let commentaire1 = commentaire.toString();

    let deleteParams = new HttpParams().set("id", numeroaffectationasupprimer)
      .set("commentaire", commentaire1);

    this.http.delete(this.API + "/affectation/suppression", { params: deleteParams })
      .subscribe(
        () => alert("affectation supprimée")
      );
  }

}


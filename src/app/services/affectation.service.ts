import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
    async createAffectation(dataCreateAffectation) {
    await this.http.post(this.API+"/affectation/creation",dataCreateAffectation,
    {
       headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.getTokenFromLocalStorage()
       )
     }).toPromise();
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


}

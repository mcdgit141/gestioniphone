import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iphone } from '../models/iphone';

@Injectable({
  providedIn: 'root'
})
export class TelephoneService {

  private API = environment.API_URL;

  constructor(private http:HttpClient) { }

  private _telephoneSubject:BehaviorSubject<any> = new BehaviorSubject({});
  readonly telephone$:Observable<Iphone> = this._telephoneSubject.asObservable();

  rechercheModeleTel(modeleiphone:string) {
    console.log("modeleiphone dans service--"+modeleiphone);
    return this.http.get(this.API + '/iphone/'+modeleiphone)
    .subscribe( data => {this._telephoneSubject.next(data);} )
  }
    
}

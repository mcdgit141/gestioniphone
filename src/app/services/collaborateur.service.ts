import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Collaborateur } from '../models/collaborateur';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
  
  private API = environment.API_URL;

  constructor(private http:HttpClient) { }


  private _collaborateurSubject:BehaviorSubject<any> = new BehaviorSubject([]);
  readonly collaborateur$:Observable<CollaborateurService> = this._collaborateurSubject.asObservable();

  rechercheUid(uid:string) {
       return this.http.get(this.API + '/collaborateur/listeuid/'+uid).pipe().toPromise()
    .then( (data:Collaborateur) => {
      this._collaborateurSubject.next(data);
          
      })
  }
}

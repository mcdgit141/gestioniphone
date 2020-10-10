import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

private _utilisateur:BehaviorSubject<any> = new BehaviorSubject({});
// public utilisateur$:Observable<Utilisateur>  = this._utilisateur.asObservable(); 

  constructor(private http:HttpClient) { }


  async habiliterUtilisateur(body){
    await this.http.post(environment.API_URL+"/utilisateur/create",body).toPromise().then(
      (response:any) => alert("utilisateur Habilité")
    )
  }

  async rechercherUtilisateur(uid) {
    await this.http.get(environment.API_URL+"/utilisateur/retrieve/"+uid).toPromise().then(
      
      (reponse:any) => {
        this._utilisateur.next(reponse)
                       }
    )
  }

  async deleteUser(uid) {
    let deleteParams= new HttpParams().set("uid",uid);
    console.log(deleteParams)
    await this.http.delete(environment.API_URL+"/utilisateur/delete",{params:deleteParams}).toPromise().then();
  }

  getUtilisateur() {
    return this._utilisateur.getValue();
  }
}

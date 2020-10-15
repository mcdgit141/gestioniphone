import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

private _utilisateur:BehaviorSubject<any> = new BehaviorSubject({});
public utilisateurASupprimer$:Observable<Utilisateur>  = this._utilisateur.asObservable(); 

  constructor(private http:HttpClient) { }


   async habiliterUtilisateur(body){
    await this.http.post(environment.API_URL+"/utilisateur/create",body).toPromise().then(
      (response:any) => alert("utilisateur créé")
    )

  }

  async rechercherUtilisateur(uid:string) {
     await this.http.get(environment.API_URL+"/utilisateur/retrieve/"+uid).toPromise().then( 
      (reponse:any) => {
        this._utilisateur.next(reponse)
                       }
    )

  }

  async deleteUser(uid) {
    let deleteParams= new HttpParams().set("uid",uid);
    await this.http.delete(environment.API_URL+"/utilisateur/delete",{params:deleteParams}).toPromise().then();

  }

  getUtilisateur() {
    return this._utilisateur.getValue();
  }

  resetUtilisateurSubject(){
    this._utilisateur.next({});
  }

  updatePassword(login:string,password:string) {
    let body = {
      "login": login,
      "password": password
    }
    this.http.put(environment.API_URL+"/utilisateur/update",body).toPromise().then(
      () => alert("Mot de passe modifié avec succès")
    );
  }
}

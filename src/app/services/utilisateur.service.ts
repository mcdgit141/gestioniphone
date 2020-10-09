import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {



  constructor(private http:HttpClient) { }

  async habiliterUtilisateur(body){
    await this.http.post(environment.API_URL+"/utilisateur/create",body).toPromise().then(
      (response:any) => alert("utilisateur Habilité")
    )
  }
}

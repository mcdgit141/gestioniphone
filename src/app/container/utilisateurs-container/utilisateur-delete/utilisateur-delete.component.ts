import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-delete',
  templateUrl: './utilisateur-delete.component.html',
  styleUrls: ['./utilisateur-delete.component.scss']
})
export class UtilisateurDeleteComponent implements OnInit {

  utilisateurTrouve:Utilisateur;

  constructor(private utilisateurService:UtilisateurService) { }

  ngOnInit(): void {
  }

  supprimerUtilisateur(uid){
    this.utilisateurService.rechercherUtilisateur(uid).then(
      (reponse:any) => {
        this.utilisateurTrouve = this.utilisateurService.getUtilisateur();
        if (confirm("Confirmer la suppression de l'utilisateur  avec le login: " + this.utilisateurTrouve.login)) {
          console.log("je supprime l'utilisateur", uid)
          // this.utilisateurService.deleteUser(uid);
        }
      }
      
    )
    
  }
}

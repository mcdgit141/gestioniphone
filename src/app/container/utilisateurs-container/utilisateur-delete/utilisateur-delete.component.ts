import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-delete',
  templateUrl: './utilisateur-delete.component.html',
  styleUrls: ['./utilisateur-delete.component.scss']
})
export class UtilisateurDeleteComponent implements OnInit {

  utilisateurTrouve:Utilisateur;
  userToDeleteFound:boolean = false;
  confirmationForm:FormGroup;
  utilisateurAttributes:Array<string>;

  constructor(public utilisateurService:UtilisateurService, private fb:FormBuilder) { }

  ngOnInit(): void {
   this.confirmationForm=this.fb.group(
    {
      id:[""],
      uid: [""],
      nom:[""],
      prenom:[""],
      login:[""],
      userRole: [""],
      password:["**********"]
    }
   )
  }

  demanderSuppression(uid){
    this.utilisateurService.rechercherUtilisateur(uid).then(
      (reponse:any) => {
        this.userToDeleteFound=true;
        this.utilisateurTrouve = this.utilisateurService.getUtilisateur();
        this.remplirFormulaireConfirmation();
        this.utilisateurAttributes=Object.getOwnPropertyNames(this.utilisateurTrouve);
        console.log("tableau des attributs de utilisateur", this.utilisateurAttributes)
        // if (confirm("Confirmer la suppression de l'utilisateur " + this.utilisateurTrouve.prenom + " " + this.utilisateurTrouve.nom)) {
        //   console.log("je supprime l'utilisateur", uid)
        //   // this.utilisateurService.deleteUser(uid);
        // }
      }
      
    )
    
  }

  remplirFormulaireConfirmation() {
    this.confirmationForm.controls.uid.setValue(this.utilisateurTrouve.uid);
    this.confirmationForm.controls.nom.setValue(this.utilisateurTrouve.nom);
    this.confirmationForm.controls.prenom.setValue(this.utilisateurTrouve.prenom);
    this.confirmationForm.controls.login.setValue(this.utilisateurTrouve.login);
    this.confirmationForm.controls.userRole.setValue(this.utilisateurTrouve.userRole);

  }

  confirmerSuppression(uid){
    //faire un prompt pour demander à resaisir le mdp, et comparé la valeur saisi avec le mdp contenu dans le token.
    console.log("je supprime l'utilisateur", uid)
          // this.utilisateurService.deleteUser(uid);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-delete',
  templateUrl: './utilisateur-delete.component.html',
  styleUrls: ['./utilisateur-delete.component.scss']
})
export class UtilisateurDeleteComponent implements OnInit {

  utilisateurTrouve: Utilisateur;
  userToDeleteFound: boolean = false;
  confirmationForm: FormGroup;
  utilisateurAttributes: Array<string>;
  subsUtilisateur:Subscription;

  constructor(public utilisateurService: UtilisateurService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.confirmationForm = this.fb.group(
      {
        id: [""],
        uid: [""],
        nom: [""],
        prenom: [""],
        login: [""],
        roleUtilisateur: [""],
        password: ["**********"]
      }
    )
  }

  demanderSuppression(uid) {

    this.utilisateurService.rechercherUtilisateur(uid).then( () => {

      this.userToDeleteFound = true;
      this.utilisateurTrouve = this.utilisateurService.getUtilisateur();
      this.remplirFormulaireConfirmation();
      this.utilisateurAttributes = Object.getOwnPropertyNames(this.utilisateurTrouve);
    }
    )



  }

  remplirFormulaireConfirmation() {
    this.confirmationForm.controls.uid.setValue(this.utilisateurTrouve.uid);
    this.confirmationForm.controls.nom.setValue(this.utilisateurTrouve.nom);
    this.confirmationForm.controls.prenom.setValue(this.utilisateurTrouve.prenom);
    this.confirmationForm.controls.login.setValue(this.utilisateurTrouve.login);
    this.confirmationForm.controls.roleUtilisateur.setValue(this.utilisateurTrouve.roleUtilisateur.substring(5));

  }

  confirmerSuppression(uid) {
    this.utilisateurService.deleteUser(uid).then(
      () => {
        if (confirm("Supprimer un autre utilisateur?")) {
          this.userToDeleteFound = false;
        } else {
          this.route.navigate(["/home"])
        }
      }
    )
  }

}

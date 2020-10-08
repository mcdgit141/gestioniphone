import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/models/Utilisateur';

@Component({
  selector: 'app-utilisateurs-form',
  templateUrl: './utilisateurs-form.component.html',
  styleUrls: ['./utilisateurs-form.component.scss']
})
export class UtilisateursFormComponent implements OnInit {
  
  utilisateur;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.utilisateur = this.fb.group(
			{
				role: ['', Validators.required] ,
        uid: ['', Validators.required],
			}

		)
  }


  creerUtilisateur(utilisateur) {
    console.log("donnee du formulaire de création de l'utilisateur",utilisateur.value);
  }
}

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleUtilisateur } from 'src/app/models/RoleUtilisateur';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateurs-form',
  templateUrl: './utilisateurs-form.component.html',
  styleUrls: ['./utilisateurs-form.component.scss']
})
export class UtilisateursFormComponent implements OnInit {
  
  utilisateur:FormGroup;
  rolesPossible:Array<string> = Object.values(RoleUtilisateur);

  constructor(private fb:FormBuilder, 
            private utilisateurService:UtilisateurService) { 
            }

  ngOnInit(): void {
    this.utilisateur = this.fb.group(
			{
				roleUtilisateur: ['', Validators.required] ,
        uid: ['', Validators.required]
			}
    );

  }


  creerUtilisateur(utilisateur) {
    this.utilisateurService.habiliterUtilisateur(utilisateur.value).then(
      () => this.utilisateur.reset()
    )
  }
}

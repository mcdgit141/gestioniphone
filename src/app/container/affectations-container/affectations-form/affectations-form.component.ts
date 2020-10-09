import { Component, OnInit } from '@angular/core';
import { FormBuilder, MaxLengthValidator, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Affectation } from 'src/app/models/affectation';
import { Collaborateur } from 'src/app/models/collaborateur';
import { AffectationService } from 'src/app/services/affectation.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

@Component({
  selector: 'app-affectations-form',
  templateUrl: './affectations-form.component.html',
  styleUrls: ['./affectations-form.component.scss']
})
export class AffectationsFormComponent implements OnInit {
  
  collaborateur$:Observable<any>;
  affectation$:Observable<any>;
  dataCreateAffectation;
    constructor(private fb:FormBuilder, 
    private serviceAffectation:AffectationService, 
    private serviceCollaborateur:CollaborateurService) { }

  ngOnInit(): void {

    this.collaborateur$ = this.serviceCollaborateur.collaborateur$;
    this.dataCreateAffectation = this.fb.group(
			{
				uid: ['', Validators.required, Validators.maxLength(6)] ,
        modeleiphone: ['', Validators.required,Validators.maxLength(20)],
        dateaffectation:['', Validators.required],
        commentaire:''
      } )
  
  }
  soumissionAffectation(dataCreateAffectation){
    console.log("soumissionLogin",dataCreateAffectation.value);
    this.serviceAffectation.createAffectation(dataCreateAffectation.value);
  }
  rechercheEnBase(uid:string){
    console.log("recherche uid dans le ts");
    this.serviceCollaborateur.rechercheUid(uid);
  }

}

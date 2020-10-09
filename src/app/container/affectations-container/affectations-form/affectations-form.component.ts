import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, MaxLengthValidator, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { Affectation } from 'src/app/models/affectation';
import { Collaborateur } from 'src/app/models/collaborateur';
import { Iphone } from 'src/app/models/iphone';
import { AffectationService } from 'src/app/services/affectation.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { TelephoneService } from 'src/app/services/telephone.service';

@Component({
  selector: 'app-affectations-form',
  templateUrl: './affectations-form.component.html',
  styleUrls: ['./affectations-form.component.scss']
})
export class AffectationsFormComponent implements OnInit {

  //collaborateur$:Observable<any>;
  //telephone$:Observable<any>;
  collaborateur:Collaborateur;
  telephone:Iphone;
  affectation$:Observable<any>;
  telephoneRecupere = false;
  collaborateurRecupere = false;

  dataCreateAffectation;
  ListeIphone=["Iphone8","Iphone9","Iphone10","Iphone11"];
    
    constructor(private fb:FormBuilder, 
    private serviceAffectation:AffectationService,
    private serviceTelephone:TelephoneService,
    private serviceCollaborateur:CollaborateurService) { }

  ngOnInit(): void {

    //this.collaborateur$ = this.serviceCollaborateur.collaborateur$;

    this.serviceCollaborateur.collaborateur$.subscribe(data => {
      this.collaborateur = data 
      this.collaborateurRecupere=true
    })

    this.serviceTelephone.telephone$.subscribe(data => {
      this.telephone = data 
      this.telephoneRecupere=true
    });
    this.dataCreateAffectation = this.fb.group(
			{
				uid: ['', Validators.required, Validators.maxLength(6)] ,
        modeleiphone: ['', Validators.required],
        dateaffectation:['', Validators.required],
        commentaire:''
      } )
  
  }
  creationAffectation(dataCreateAffectation){
    console.log("soumissionLogin",dataCreateAffectation.value);
    this.serviceAffectation.createAffectation(dataCreateAffectation.value);
  }
  rechercheEnBase(uid:string){
    console.log("recherche uid dans le ts");
    this.serviceCollaborateur.rechercheUid(uid);
  }

  rechercheEnBaseTel(modeleiphone:string) {
    console.log("modeleiphone" + modeleiphone);
    
    this.serviceTelephone.rechercheModeleTel(modeleiphone);

  }
  
}

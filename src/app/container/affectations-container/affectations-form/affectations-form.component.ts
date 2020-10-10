import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Observable, Subscription } from 'rxjs';
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
export class AffectationsFormComponent implements OnInit, OnDestroy {

  //collaborateur$:Observable<any>;
  //telephone$:Observable<any>;

  collaborateur:Collaborateur;
  telephone:Iphone;
  affectation$:Observable<any>;
  telephoneRecupere = false;
  collaborateurRecupere = false;
  
  dataCreateAffectation;
  ListeIphone=["Iphone8","Iphone9","Iphone10","Iphone11"];
  subsCollaborateur:Subscription;
  subsTelephone:Subscription;

    constructor(private fb:FormBuilder, 
    private serviceAffectation:AffectationService,
    private serviceTelephone:TelephoneService,
    private serviceCollaborateur:CollaborateurService
    ) { }

  ngOnInit(): void {

    //this.collaborateur$ = this.serviceCollaborateur.collaborateur$;

    this.subsCollaborateur = this.serviceCollaborateur.collaborateur$.subscribe(data => {
    this.collaborateur = data 
      this.collaborateurRecupere=true
    });

    this.subsTelephone = this.serviceTelephone.telephone$.subscribe(data => {
      this.telephone = data 
      this.telephoneRecupere=true
    });

    this.dataCreateAffectation = this.fb.group(
			{
				uid: ['', Validators.required, Validators.maxLength(6)] ,
        modeleiphone: ['', Validators.required],
        dateaffectation:['', Validators.required],
        numeroligne:['',Validators.required, Validators.maxLength(10),Validators.minLength(10)],
        commentaire:[''],
        
      } );
  
  }
  ngOnDestroy(): void{
    this.subsCollaborateur.unsubscribe();
    this.subsTelephone.unsubscribe();

  }
  creationAffectation(dataCreateAffectation){

    console.log("soumissionAffectationdatacreateaffectation",dataCreateAffectation.value);
    console.log("soumissionAffectationdatanumeroSerie",dataCreateAffectation.value.numeroSerie);
    let mesdata = {
      collaborateur: {
        "numeroLigne": dataCreateAffectation.value.numeroligne,
        "uid": dataCreateAffectation.value.uid
      },
      "commentaire": dataCreateAffectation.value.commentaire,
      "dateAffectation": dataCreateAffectation.value.dateaffectation,
      "iphone": {
        "numeroSerie": this.telephone.numeroSerie
      }}
      
      //affectation: Affectation = new Affectation;
    console.log("mesdata dans creation ts---",mesdata);
    //let formatJsonMesDatas = JSON.stringify(mesdata);

    this.serviceAffectation.createAffectation(mesdata);
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

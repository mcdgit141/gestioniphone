import { ValueTransformer } from '@angular/compiler/src/util';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Observable, Subscription } from 'rxjs';
import { Affectation } from 'src/app/models/affectation';
import { Collaborateur } from 'src/app/models/collaborateur';
import { Iphone } from 'src/app/models/iphone';
import { ListeIphone } from 'src/app/models/listeiphone';
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
  
  
  dataCreateAffectation;
  listeIphone:Array<string> = Object.values(ListeIphone);
 
  subsCollaborateur:Subscription;
  subsTelephone:Subscription;

  telephoneRecupere = false;
  collaborateurRecupere = false;
  
  errorMessages = {
   'uid': [
     { type: 'required', message: 'uid is required' },
     { type: 'maxlength', message: 'uid is too long' }
   ]
 };

    constructor(private fb:FormBuilder, 
    private serviceAffectation:AffectationService,
    private serviceTelephone:TelephoneService,
    private serviceCollaborateur:CollaborateurService
    ) { }

  ngOnInit(): void {

    this.dataCreateAffectation = this.fb.group(
			{
		  uid: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]) , 
        modeleiphone: new FormControl(['', Validators.required]),
        dateaffectation:['', Validators.required],
        numeroligne: new FormControl('', Validators.compose( [ Validators.minLength(10), Validators.maxLength(10), Validators.required])),
        commentaire:['',Validators.required]
        
      } );
        
  }

  ngOnDestroy(): void{
     
     this.collaborateurRecupere = false;
       
  }

   creationAffectation(dataCreateAffectation) {

      let mesdata = {
         collaborateur: {
            "numeroLigne": dataCreateAffectation.value.numeroligne,
            "uid": dataCreateAffectation.value.uid
         },
         "commentaire": dataCreateAffectation.value.commentaire,
         "dateAffectation": dataCreateAffectation.value.dateaffectation,
         "iphone": {
         "numeroSerie": this.telephone.numeroSerie
         }
      }
          
      this.serviceAffectation.createAffectation(mesdata);
   }

   rechercheEnBase(event: Event) {
      event.preventDefault();

      this.subsCollaborateur = this.serviceCollaborateur.collaborateur$.subscribe((data:any) => {
         this.collaborateur = data
         if (data.length != 0){
            this.collaborateurRecupere = true
         }
      });
      this.serviceCollaborateur.rechercheUid(this.dataCreateAffectation.value.uid);
   }

      rechercheEnBaseTel(modeleiphone: string) {
          
      if (this.dataCreateAffectation.value.modeleiphone) {
         this.subsTelephone = this.serviceTelephone.telephone$.subscribe((data:any) => {
           
            this.telephone = data
            if (data.valueof != 0) {
               this.telephoneRecupere = true
            }
         });

         this.telephoneRecupere = false ;
         this.serviceTelephone.rechercheModeleTel(this.dataCreateAffectation.value.modeleiphone);
      }

   }
  
}

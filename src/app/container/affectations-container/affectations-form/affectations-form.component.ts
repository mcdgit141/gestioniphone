import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
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
  
  
  dataCreateAffectation;
  ListeIphone=["Iphone8","Iphone9","Iphone10","Iphone11"];
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
     console.log("Ondestroy");
     this.collaborateurRecupere = false;
     
    //this.subsCollaborateur.unsubscribe();
   //  this.subsCollaborateur.
   // this.subsTelephone.unsubscribe();

  }


   creationAffectation(dataCreateAffectation) {

      console.log("soumissionAffectationdatacreateaffectation", dataCreateAffectation.value);
      console.log("soumissionAffectationdatanumeroSerie", dataCreateAffectation.value.numeroSerie);
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

      //affectation: Affectation = new Affectation;
      console.log("mesdata dans creation ts---", mesdata);
      //let formatJsonMesDatas = JSON.stringify(mesdata);

      this.serviceAffectation.createAffectation(mesdata);
   }



   rechercheEnBase(event: Event) {
      event.preventDefault();

      this.subsCollaborateur = this.serviceCollaborateur.collaborateur$.subscribe(data => {
         this.collaborateur = data
         this.collaborateurRecupere = true

      });
      this.serviceCollaborateur.rechercheUid(this.dataCreateAffectation.value.uid);
   }


   
   rechercheEnBaseTel(modeleiphone: string) {
      if (this.dataCreateAffectation.value.modeleiphone) {
         this.subsTelephone = this.serviceTelephone.telephone$.subscribe(data => {
            this.telephone = data
            this.telephoneRecupere = true
         });
         this.serviceTelephone.rechercheModeleTel(this.dataCreateAffectation.value.modeleiphone);
      }

   }


  
}

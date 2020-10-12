import { ValueTransformer } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MotifFin } from 'src/app/models/motiffin';
import { AffectationService } from 'src/app/services/affectation.service';

@Component({
  selector: 'app-affectations-cloture',
  templateUrl: './affectations-cloture.component.html',
  styleUrls: ['./affectations-cloture.component.scss']
})
export class AffectationsClotureComponent implements OnInit {


dataClotureAffectation:FormGroup;
motifTrouve:Array<string> = Object.values(MotifFin);

numeroAffectationRecu;
numeroAffectationTransforme;

  constructor(private fb:FormBuilder,private serviceAffectation:AffectationService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
     this.numeroAffectationRecu = params.get("numeroAffectation");

     console.log("dans detail affectation--numeroAffectation",this.numeroAffectationRecu);
     
     this.numeroAffectationTransforme = parseInt(this.numeroAffectationRecu, 10);
           
      })

    this.dataClotureAffectation = this.fb.group(
			{
        commentaire:['',Validators.required],
        motifFin: ['', Validators.required],
        dateFin:['', Validators.required],
                
      } );
     
     
  } // fin du ngOnInit

  clotureAffectation(dataClotureAffectation){
    
    console.log("dans le ts clôture Affectation formulaire dataclotureaffectation", dataClotureAffectation);
    
    console.log("dans le ts clôture Affectation formulaire numeroAffectationTransformé", this.numeroAffectationTransforme);

    let mesdatacloture = 
      {
        "numeroAffectation": this.numeroAffectationTransforme,
        "commentaire": dataClotureAffectation.commentaire, 
        "motifFin": dataClotureAffectation.motifFin,
        "dateFin": dataClotureAffectation.dateFin
      }
    
    console.log("dans le ts clôture Affectation mesdatacloture", mesdatacloture);

    if(confirm('Voulez-vous vraiment clôturer? ' )) { 
     
      this.serviceAffectation.cloturerAffectation(mesdatacloture);  
    }
     
  }

}


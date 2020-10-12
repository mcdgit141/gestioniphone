import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AffectationService } from 'src/app/services/affectation.service';

@Component({
  selector: 'app-affectation-delete',
  templateUrl: './affectation-delete.component.html',
  styleUrls: ['./affectation-delete.component.scss']
})
export class AffectationDeleteComponent implements OnInit {

  dataSuppressionAffectation:FormGroup;
  numeroAffectationRecu;

  constructor(private fb:FormBuilder,private serviceAffectation:AffectationService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.numeroAffectationRecu = params.get("numeroAffectation");
      
      console.log("dans detail affectation--numeroAffectationReçu --type---", typeof(this.numeroAffectationRecu));
            
       })
 
     this.dataSuppressionAffectation = this.fb.group(
       {
         commentaire:['',Validators.required],
       } );
       
  }
  suppressionAffectation(dataSuppressionAffectation){
    
    console.log("dans le ts clôture Affectation formulaire dataclotureaffectation", dataSuppressionAffectation);
    let numeroAffectationAsupprimer = this.numeroAffectationRecu;
    let commentaireAsupprimer = dataSuppressionAffectation.commentaire;
    //let mot1 = "?id=";
   // let mot2 = numeroAffectationAsupprimer;
    //let mot3 = "&commentaire=";
    //let mot4 = '"';
    //let mot5 = commentaireAsupprimer;
    //let param = mot1+mot2+mot3+mot4+mot5+mot4;
    
    console.log("dans le ts clôture Affectation numeroAffectationAsupprimer---" , numeroAffectationAsupprimer);
    console.log("dans le ts clôture Affectation commentaireAsupprimer---" , commentaireAsupprimer);
    //console.log("dans le ts clôture Affectation parametre---" , mot1);
    //console.log("dans le ts clôture Affectation parametre---" , mot2);
    //console.log("dans le ts clôture Affectation parametre---" , mot3);
    //console.log("dans le ts clôture Affectation parametre---" , mot4);
    //console.log("dans le ts clôture Affectation parametre---" , param);

    //let mesdatadelete = 
    //  {
    //    commentaire : dataSuppressionAffectation.commentaire, 
    //    
    //  }
    
   

    if(confirm('Voulez-vous vraiment supprimer cette affectaton? Opération irréversible!' )) { 
     
      this.serviceAffectation.supprimerAffectation(numeroAffectationAsupprimer,commentaireAsupprimer);  
    }
     
  }

}



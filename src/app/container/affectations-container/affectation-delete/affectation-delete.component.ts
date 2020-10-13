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
                        
       })
 
     this.dataSuppressionAffectation = this.fb.group(
       {
         commentaire:['',Validators.required],
       } );
       
  }
  suppressionAffectation(dataSuppressionAffectation){
    
    let numeroAffectationAsupprimer = this.numeroAffectationRecu;
    let commentaireAsupprimer = dataSuppressionAffectation.commentaire;
    
    if(confirm('Voulez-vous vraiment supprimer cette affectaton? Opération irréversible!' )) { 
     
      this.serviceAffectation.supprimerAffectation(numeroAffectationAsupprimer,commentaireAsupprimer);  
    }
     
  }

}



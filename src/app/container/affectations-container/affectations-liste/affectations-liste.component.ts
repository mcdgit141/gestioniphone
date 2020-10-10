import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/affectation';
import { AffectationService } from 'src/app/services/affectation.service';

@Component({
  selector: 'app-affectations-liste',
  templateUrl: './affectations-liste.component.html',
  styleUrls: ['./affectations-liste.component.scss']
})
export class AffectationsListeComponent implements OnInit {

   listAffectations:Array<Affectation> = []; 

   loading:boolean      

  constructor(private affectationService:AffectationService) { }

  ngOnInit(): void {
   //   this.affectationService.getAffectations().subscribe (
     this.loading = true;
      this.affectationService.affectations$.subscribe (
        data => {
           this.listAffectations= data;
           this.loading = false;
         //   data.forEach( (affectation:Affectation) => {console.log(affectation.numeroAffectation)
                  // console.log(affectation.motifFin);
                  // console.log(affectation.commentaire);
                  // console.log(affectation.dateAffectation);
                  // console.log(affectation.dateFin);
                  // console.log(affectation.dateRenouvellementPrevue);
                  // console.log(affectation.iphone);
                  // console.log(affectation.collaborateur);
               // }
         //   )
        }
     )

      this.affectationService.getAffectations();
  }

}

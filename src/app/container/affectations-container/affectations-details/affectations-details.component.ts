import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Affectation } from 'src/app/models/affectation';
import { AffectationService } from 'src/app/services/affectation.service';

@Component({
  selector: 'app-affectations-details',
  templateUrl: './affectations-details.component.html',
  styleUrls: ['./affectations-details.component.scss']
})
export class AffectationsDetailsComponent implements OnInit {

  affectation:Affectation;
  numeroAffectation:string;
  loading:boolean;  

  constructor(private affectationService:AffectationService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
      this.numeroAffectation = params.get("numeroAffectation");
      console.log("dans detail affectation--numeroAffectation",this.numeroAffectation);

      this.loading = true;

      this.affectationService.affectations$.subscribe(data => {
        //console.log("dans detail affectation--numeroAffectation",this.numeroAffectation);
        //console.log("data-associé a numero affectation--", data[0].numeroAffectation);
        //console.log("dans détail---type numeroAffectation",typeof(this.numeroAffectation));
       
        //console.log("dans détail---type numeroAffectation data", typeof(data[0].numeroAffectation));
        this.affectation = data.filter(affectationSelectionne => affectationSelectionne.numeroAffectation.toString()
          ===  this.numeroAffectation)[0];
              
          this.loading = false;
       })
       
      })
      
    }

}

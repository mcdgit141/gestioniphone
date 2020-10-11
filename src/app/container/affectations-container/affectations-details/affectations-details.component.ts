import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Affectation } from 'src/app/models/affectation';
import { AffectationService } from 'src/app/services/affectation.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-affectations-details',
  templateUrl: './affectations-details.component.html',
  styleUrls: ['./affectations-details.component.scss']
})
export class AffectationsDetailsComponent implements OnInit {

  affectation:Affectation;
  numeroAffectation:string;
  loading:boolean;  
  isAdmin:boolean;
  isType2:boolean;

  constructor(private affectationService:AffectationService, private loginService:LoginService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

      this.isAdmin = this.loginService.isItAdmin();
      this.isType2 = this.loginService.isItType2();
      console.log("booleen isAdmin dans détail affectation", this.isAdmin);
      console.log("booleen isType2 dans détail affectation", this.isType2);

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
      
    } //fin ngOnInit

    closeAffectation(event, numeroAffectation) {
      console.log("dans closeAffectation--numero affectation" , numeroAffectation)
      this.router.navigate(['container/details/cloture', numeroAffectation]);
   }

    deleteAffectation(event, numeroAffectation) {
      console.log("dans deleteAffectation--numero affectation" , numeroAffectation)
      this.router.navigate(['container/details/delete', numeroAffectation]);
  }
 }



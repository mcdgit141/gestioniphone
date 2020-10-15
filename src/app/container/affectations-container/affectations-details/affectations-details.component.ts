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

  affectationDuJour:boolean;
  loading:boolean;  
  isAdmin:boolean;
  isType2:boolean;

  constructor(private affectationService:AffectationService, private loginService:LoginService, private router:Router, private route:ActivatedRoute) { }

   ngOnInit(): void {

      this.isAdmin = this.loginService.isItAdmin();
      this.isType2 = this.loginService.isItType2();

      this.route.paramMap.subscribe(params => {
         this.numeroAffectation = params.get("numeroAffectation");


         this.loading = true;

         this.affectationService.affectations$.subscribe(data => {

            this.affectation = data.filter(affectationSelectionne => affectationSelectionne.numeroAffectation.toString()
               === this.numeroAffectation)[0];

            this.loading = false;

            this.affectationDuJour = false;
            let dateJour = new Date().toISOString().slice(0, 10);
            if (dateJour == this.affectation.dateAffectation.toString()) {
               this.affectationDuJour = true
            }
         })

      })

   } //fin ngOnInit



   
    closeAffectation(event, numeroAffectation) {
     this.router.navigate(['container/details/cloture', numeroAffectation]);
   }


    deleteAffectation(event, numeroAffectation) {
      this.router.navigate(['container/details/delete', numeroAffectation]);
  }
 }



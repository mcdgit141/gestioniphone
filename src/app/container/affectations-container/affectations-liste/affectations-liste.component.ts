import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affectation } from 'src/app/models/affectation';
import { AffectationService } from 'src/app/services/affectation.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-affectations-liste',
  templateUrl: './affectations-liste.component.html',
  styleUrls: ['./affectations-liste.component.scss']
})
export class AffectationsListeComponent implements OnInit {

   listAffectations:Array<Affectation> = []; 
   isAdmin:boolean;
   isType2:boolean;
   loading:boolean;  

  constructor(private affectationService:AffectationService, private loginService:LoginService, private router:Router) { }

   ngOnInit(): void {
      //   this.affectationService.getAffectations().subscribe (

      this.isAdmin = this.loginService.isItAdmin();
      this.isType2 = this.loginService.isItType2();

      this.loading = true;
      this.affectationService.affectations$.subscribe(
         data => {
            this.listAffectations = data;
            this.loading = false;
         }
      )

      this.affectationService.getAffectations();
   }
   

   showDetail(event, numeroAffectation) {
      console.log("dans showDetail--numero affectation" , numeroAffectation)
      this.router.navigate(['container/details', numeroAffectation]);
   }

   //closeAffectationAction(event, numeroAffectation) {
     // this.router.navigate(['container/cloture', numeroAffectation]);
   //}

}

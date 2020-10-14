import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Affectation } from 'src/app/models/affectation';
import { FiltreAffectation } from 'src/app/models/FiltreAffectation';
import { AffectationService } from 'src/app/services/affectation.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
   selector: 'app-affectations-liste',
   templateUrl: './affectations-liste.component.html',
   styleUrls: ['./affectations-liste.component.scss']
})
export class AffectationsListeComponent implements OnInit {
   @ViewChild('inputUID')
   inputUID;
   @ViewChild('inputNom')
   inputNom;
   @ViewChild('inputCodeUo')
   inputCodeUo;
   @ViewChild('inputNomUo')
   inputNomUo;
   @ViewChild('inputSite')
   inputSite;
   @ViewChild('inputNumLigne')
   inputNumLigne;
   @ViewChild('inputModel')
   inputModel;
   @ViewChild('inputDateRenouvMin')
   inputDateRenouvMin;
   @ViewChild('inputDateRenouvMax')
   inputDateRenouvMax

   listAffectations: Array<Affectation> = [];
   isAdmin: boolean;
   isType2: boolean;
   loading: boolean;
   pagination$: Observable<any>;
   filtre: FiltreAffectation;

   constructor(private affectationService: AffectationService, private loginService: LoginService, private router: Router) { }

   ngOnInit(): void {
      this.filtre = {

         "uid": null,
         "nom": null,
         "codeUo": null,
         "nomUsageUo": null,
         "nomSite": null,
         "numeroLigneCollaborateur": null,
         "nomModeleIphone": null,
         "dateRenouvMin": null,
         "dateRenouvMax": null,
         "taillePage": 3,
         // "taillePage": null,
         "numeroDePage": 1,
         "critereDeTri": null,
         "sensduTri": "D"
      };

      this.isAdmin = this.loginService.isItAdmin();
      this.isType2 = this.loginService.isItType2();
      this.pagination$ = this.affectationService.affectationMeta$;

      this.loading = true;
      this.affectationService.affectations$.subscribe(
         data => {
            this.listAffectations = data;
            this.loading = false;
         }
      )

      // this.affectationService.getAffectations(param1);
      this.affectationService.getAffectations(this.filtre);

   }


   showDetail(event, numeroAffectation) {

      this.router.navigate(['container/details', numeroAffectation]);
   }

   effacerFiltre() {
      this.inputUID.nativeElement.value = null;
      this.inputNom.nativeElement.value = null;
      this.inputCodeUo.nativeElement.value = null;
      this.inputNomUo.nativeElement.value = null;
      this.inputSite.nativeElement.value = null;
      this.inputNumLigne.nativeElement.value = null;
      this.inputModel.nativeElement.value = null;
      this.inputDateRenouvMin.nativeElement.value = null;
      this.inputDateRenouvMax.nativeElement.value = null;
      this.filtre.numeroDePage = 1;
      this.rechercheFiltre();

   }

   rechercheFiltre() {
      this.construireLeFiltre()
      this.affectationService.getAffectations(this.filtre);
   }

   previousPage(pageEnCours) {
      this.filtre.numeroDePage = pageEnCours - 1;
      this.rechercheFiltre();
   }

   nextPage(pageEnCours) {
      this.filtre.numeroDePage = pageEnCours + 1;
      this.rechercheFiltre();
   }

   construireLeFiltre() {
      this.filtre.uid = this.inputUID.nativeElement.value;
      this.filtre.nom = this.inputNom.nativeElement.value;
      this.filtre.codeUo = this.inputCodeUo.nativeElement.value;
      this.filtre.nomUsageUo = this.inputNomUo.nativeElement.value;
      this.filtre.nomSite = this.inputSite.nativeElement.value;
      this.filtre.numeroLigneCollaborateur = this.inputNumLigne.nativeElement.value;
      this.filtre.nomModeleIphone = this.inputModel.nativeElement.value;
      this.filtre.dateRenouvMin = this.inputDateRenouvMin.nativeElement.value;
      this.filtre.dateRenouvMax = this.inputDateRenouvMax.nativeElement.value;
   }
}

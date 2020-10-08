import { Component, OnInit } from '@angular/core';
import { FormBuilder, MaxLengthValidator, Validators } from '@angular/forms';
import { AffectationService } from 'src/app/services/affectation.service';

@Component({
  selector: 'app-affectations-form',
  templateUrl: './affectations-form.component.html',
  styleUrls: ['./affectations-form.component.scss']
})
export class AffectationsFormComponent implements OnInit {
  
  dataCreateAffectation;

  constructor(private fb:FormBuilder, private serviceAffectation:AffectationService) { }

  ngOnInit(): void {
    this.dataCreateAffectation = this.fb.group(
			{
				uid: ['', Validators.required, Validators.maxLength(6)] ,
        numserieiphone: ['', Validators.required,Validators.maxLength(20)],
        dateaffectation:['', Validators.required],
        commentaire:''
      } )
  
  }
  soumissionAffectation(dataCreateAffectation){
    console.log("soumissionLogin",dataCreateAffectation.value);
    this.serviceAffectation.createAffectation(dataCreateAffectation.value);
  }

}

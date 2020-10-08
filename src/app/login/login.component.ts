import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms' 
 
import { ReactiveFormsModule} from '@angular/forms' 

@Component({
	selector: 'login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	credentials;


	constructor(private fb:FormBuilder, private serviceLogin:LoginService) { }

	ngOnInit() {
		this.credentials = this.fb.group(
			{
				username: ['', Validators.required] ,
				password: ['', Validators.required]
			}
			
		)
		
	}

	soumissionLogin(credentials) {
		console.log("soumissionLogin",credentials.value);
		this.serviceLogin.authentification(credentials.value);
		
	}
	
}

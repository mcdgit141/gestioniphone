import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms' 
 
import { ReactiveFormsModule} from '@angular/forms' 

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	credentials;


	constructor(private fb:FormBuilder, private serviceLogin:LoginService, private router:Router, private route:ActivatedRoute) { }

	ngOnInit() {
		this.credentials = this.fb.group(
			{
				username: ['', Validators.required] ,
				password: ['', Validators.required]
			}
			
		)
		
	}

	// async soumissionLogin(credentials) {
	soumissionLogin(credentials) {
		console.log("soumissionLogin",credentials.value);
		// await this.serviceLogin.authentification(credentials.value);
		this.serviceLogin.authentification(credentials.value).then(()=>{
      
      // On récupère l'url de redirection
      const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/home';
      
		console.log("soumissionLogin",redirectUrl);
      
    // On accède à la page souhaitée
    this.router.navigate([redirectUrl]);}
   )
	}
	
}

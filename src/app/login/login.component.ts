import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

import { UtilisateurService } from '../services/utilisateur.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	credentials:FormGroup;
	dataPassword:FormGroup;
	OKchange: boolean = false;


	constructor(private fb: FormBuilder,
		private serviceLogin: LoginService,
		private router: Router,
		private route: ActivatedRoute,
		private utilisateurService:UtilisateurService) { }

	ngOnInit() {
		this.credentials = this.fb.group(
			{
				username: ['', Validators.required],
				password: ['', Validators.required]
			}
		)

		this.dataPassword = this.fb.group(
			{
				password: ['', Validators.required],
				confirmPassword: ['', Validators.required]
			}
		)

	}

	soumissionLogin(credentials) {
		this.credentials = this.fb.group(
			{
				username: credentials.value.username,
				password: credentials.value.password
			}
		)
		this.serviceLogin.authentification(credentials.value).then(
			() => {
				if (this.serviceLogin.passwordIsDefault) {
					if (confirm("Voulez vous modifier votre mot de passe?")) {
						this.OKchange = true;
					} else {
						// On récupère l'url de redirection
						const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/home';
						// On accède à la page souhaitée
						this.router.navigate([redirectUrl]);
					}
				} else {
					// On récupère l'url de redirection
					const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/home';
					// On accède à la page souhaitée
					this.router.navigate([redirectUrl]);
				}

			}
		)
	}

	modificationMDP(dataPassword) {
		if (dataPassword.password != dataPassword.confirmPassword) {
			alert("les 2 saisies ne sont pas identiques, merci de saisir à nouveau");
			this.dataPassword.controls.password.setValue("");
			this.dataPassword.controls.confirmPassword.setValue("");
		} else {
			this.utilisateurService.updatePassword(this.credentials.get('username').value, dataPassword.password);
			// On récupère l'url de redirection
			const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/home';
			// On accède à la page souhaitée
			this.router.navigate([redirectUrl]);
		}
	}

	abandonModifMDP() {
		const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/home';
			// On accède à la page souhaitée
			this.router.navigate([redirectUrl]);
	}

}

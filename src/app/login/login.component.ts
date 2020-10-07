import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms' 
 
import { ReactiveFormsModule} from '@angular/forms' 

@Component({
	selector: 'login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
	private name: string;
	private password: string;

	constructor(
		public authService: AuthService,
		public router: Router,
		public titleService: Title) { }

	ngOnInit() {
		this.titleService.setTitle('Connexion');
	}

	// Informe l'utilisateur sur son authentfication.
	setMessage() {
		this.message = this.authService.isLoggedIn ?
			'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
	}

	// Connecte l'utilisateur auprès du Guard
	login() {
		this.message = 'Tentative de connexion en cours ...';
		this.authService.login(this.name, this.password).subscribe(() => {
			this.setMessage();
			if (this.authService.isLoggedIn) {
				// Récupère l'URL de redirection depuis le service d'authentification
				// Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
				// Redirige l'utilisateur
				this.router.navigate([redirect]);
			} else {
				this.password = '';
			}
		});
	}

	// Déconnecte l'utilisateur
	logout() {
		this.authService.logout();
		this.setMessage();
	}
}

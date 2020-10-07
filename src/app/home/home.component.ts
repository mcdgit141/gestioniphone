import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  getLogin() {
    return JSON.parse(localStorage.getItem('user')).login;
  }
  
  logout() {
    console.log('Tentative de déconnexion');
  
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}

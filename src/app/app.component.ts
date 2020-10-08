import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestiphone',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestioniphone';

  constructor(private router:Router) {

  }

  logOut(ev) {
    ev.preventDefault();
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAdmin:boolean;
  isType2:boolean;
  roleUtilisateur: String;

  constructor(private loginService:LoginService) { 
   //  this.isAdmin=this.loginService.isAdmin;
  }

  ngOnInit(): void {
   let roleUtilisateur:String = this.loginService.getRoles();
   this.isAdmin=this.loginService.isAdmin;
     this.isType2=this.loginService.isType2;
  }


}

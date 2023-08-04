import { Component, OnInit } from '@angular/core';
import { LoginapiService } from '../services/loginapi.service'
import { Route, Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn=false;

  welcomeName:any;

  constructor(private loginService: LoginapiService, private router: Router) { }

  flag:number=0;

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
    console.log(this.loggedIn);
    if(this.loggedIn==true){
      this.welcomeName=this.loginService.getName();
    }
  }


  logoutUser(){
    this.loginService.logout();
    location.reload();
  }

}

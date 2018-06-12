import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './domain/entities';
// import { MatButton } from '@angular/material'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  auth: Auth;
  title = 'Awesome Todos';
  constructor(@Inject('auth') private service, private router: Router){
  }
  ngOnInit() {
    this.service
      .getAuth()
      .subscribe(auth => {
        this.auth = Object.assign({}, auth) //这样可以类似于全局变量的形式
        // this.router.navigate(['login']);
      });
  }
  login() {
    this.router.navigate(['login']);
  }
  logout(){
    this.service.unAuth();
    this.auth = null;
    this.router.navigate(['login']);
  }
}
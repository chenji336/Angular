import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auth } from '../domain/entities';
// import {AuthService} from '../core/auth.service';

// 没有使用双向绑定如何取值
/* <div>
    <input #usernameRef type="text">
    <input #passwordRef type="password">
    <button (click)='onClick(usernameRef.value, passwordRef.value)'>Login</button>
  </div> */

@Component({
  selector: 'app-login',
  template: `
  <div>
    <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
      <fieldset ngModelGroup="login">
        <input type="text"
          required minlength='3'
          name="username"
          [(ngModel)]="username"
          #usernameRef='ngModel'
        /> {{usernameRef.valid}}--{{usernameRef.errors | json}}
        <div *ngIf="usernameRef.errors?.required">this is required</div>
        <div *ngIf="usernameRef.errors?.minlength">should be at least 3 charactors</div><br>
        <input type="password" required
          name="password"
          [(ngModel)]="password"
          #passwordRef='ngModel'
        /> {{passwordRef.valid}}<br>
        <button 
          type="submit"
          [@loginState]="loginBtnState"
          (mouseenter)="toggleLoginState(true)"
          (mouseleave)="toggleLoginState(false)"
        >Submit</button>
        <div *ngIf="auth?.hasError">{{auth.errMsg}}</div>
      </fieldset>
    </form>
  </div>
  `,
  styles: [`
    input.ng-invalid{
      border: 3px solid red;
    }
    input.ng-valid{
      border: 3px solid green;
    }
  `],
  animations:[
    trigger('loginState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active',style({
        transform: 'scale(1.2)'
      })),
      transition('inactive => active',animate('100ms ease-in')),
      transition('active => inactive',animate('100ms ease-out'))
    ])
  ],
  providers: []
})

export class LoginComponent implements OnInit {

  username = '';
  password = '';
  auth: Auth;

  loginBtnState: string = 'inactive';

  constructor(@Inject('auth') private service, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formValue) {
    this.service
      .loginWithCredentials(this.username, this.password)
      /* .then(auth => {
        let redirectUrl = (auth.redirectUrl === null)? '/': auth.redirectUrl;
        if(!auth.hasError){
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      }); */
      .subscribe(auth => {
        this.auth = Object.assign({}, auth);
        if (!auth.hasError) {
          this.router.navigate(['todo']);
        }
      });
  }

  toggleLoginState(state: boolean){
    this.loginBtnState = state ? 'active' : 'inactive';
  }
}
